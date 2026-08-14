/* ==========================================================================
   Interactive ID lanyard — hero section
   Card drag/fall physics keeps the same spring-based approach and event
   style as the original reference (mousedown on card, mousemove/mouseup on
   document).

   The strap is a small verlet rope simulation — a chain of points pinned at
   the anchor on one end and the card's hole on the other, with its own
   gravity and distance constraints — instead of a single rotated line. The
   anchor is measured against the very top edge of the .hero section (not
   just the top of the small stage box), so the rope visually runs all the
   way up to the top of the page, disappearing behind the fixed navbar like
   it's hung from the ceiling of the browser.
   ========================================================================== */
(function () {
  "use strict";

  const stage = document.getElementById('lanyardStage');
  const lanyard = document.getElementById('lanyardCard');
  const cardInner = document.getElementById('lanyardCardInner');
  const ropePath = document.getElementById('lanyardRopePath');
  const clip = document.getElementById('lanyardClip');
  const frontShine = lanyard ? lanyard.querySelector('.lanyard-front .lanyard-shine') : null;
  const backShine = lanyard ? lanyard.querySelector('.lanyard-back .lanyard-shine') : null;
  if (!stage || !lanyard || !cardInner || !ropePath || !clip) return;

  const heroEl = stage.closest('.hero') || stage.closest('section') || document.body;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Titik tengah default di dalam stage (tempat menggantung ideal)
  let homeX = 0;
  let homeY = 130;
  // Titik jangkar tali (koordinat lokal-stage), diukur sampai ke tepi paling
  // atas section hero — bukan cuma atas kotak stage — supaya tali terlihat
  // menjuntai dari sangat atas halaman.
  let anchorY = 0;

  function measureAnchor() {
    const stageRect = stage.getBoundingClientRect();
    const heroRect = heroEl.getBoundingClientRect();
    homeX = stageRect.width / 2;
    anchorY = heroRect.top - stageRect.top;
  }
  measureAnchor();

  /* ---------------- Rope: rantai titik dengan verlet integration ---------------- */
  const ROPE_SLACK = 1.035;   // tali panjang & mepet atas → sedikit kendur saja, tidak melingkar besar
  const GRAVITY = 0.62;
  const ROPE_DAMPING = 0.985;
  const ROPE_ITERATIONS = 6;
  const MIN_SEGMENTS = 10;
  const TARGET_SEG_LENGTH = 42; // px per ruas, dipakai untuk menentukan jumlah ruas otomatis

  let ropeLength = 0;
  let segLength = 0;
  let ropeSegCount = MIN_SEGMENTS;
  let ropePoints = [];

  function buildRope() {
    const totalDist = (homeY + 8) - anchorY;
    ropeLength = totalDist * ROPE_SLACK;
    ropeSegCount = Math.max(MIN_SEGMENTS, Math.round(ropeLength / TARGET_SEG_LENGTH));
    segLength = ropeLength / ropeSegCount;

    ropePoints = [];
    for (let i = 0; i <= ropeSegCount; i++) {
      const t = i / ropeSegCount;
      const y = anchorY + totalDist * t;
      ropePoints.push({ x: homeX, y: y, oldx: homeX, oldy: y, pinned: i === 0 });
    }
  }
  buildRope();

  function ropeConstraint(a, b, len) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
    const diff = (dist - len) / dist;
    const offX = dx * 0.5 * diff;
    const offY = dy * 0.5 * diff;
    if (!a.pinned) { a.x += offX; a.y += offY; }
    if (!b.pinned) { b.x -= offX; b.y -= offY; }
  }

  function updateRope(endX, endY) {
    const last = ropePoints[ropePoints.length - 1];
    last.pinned = true;
    last.x = endX;
    last.y = endY;
    last.oldx = endX;
    last.oldy = endY;

    // Verlet integration untuk titik-titik tengah (bukan ujung yang di-pin)
    for (let i = 1; i < ropePoints.length - 1; i++) {
      const p = ropePoints[i];
      const vx = (p.x - p.oldx) * ROPE_DAMPING;
      const vy = (p.y - p.oldy) * ROPE_DAMPING;
      const nx = p.x + vx;
      const ny = p.y + vy + GRAVITY;
      p.oldx = p.x; p.oldy = p.y;
      p.x = nx; p.y = ny;
    }

    // Relaksasi constraint jarak antar ruas, beberapa iterasi agar stabil
    for (let iter = 0; iter < ROPE_ITERATIONS; iter++) {
      for (let i = 0; i < ropePoints.length - 1; i++) {
        ropeConstraint(ropePoints[i], ropePoints[i + 1], segLength);
      }
    }
  }

  function renderRope() {
    let d = `M ${ropePoints[0].x} ${ropePoints[0].y}`;
    for (let i = 1; i < ropePoints.length - 1; i++) {
      const xc = (ropePoints[i].x + ropePoints[i + 1].x) / 2;
      const yc = (ropePoints[i].y + ropePoints[i + 1].y) / 2;
      d += ` Q ${ropePoints[i].x} ${ropePoints[i].y} ${xc} ${yc}`;
    }
    const last = ropePoints[ropePoints.length - 1];
    d += ` L ${last.x} ${last.y}`;
    ropePath.setAttribute('d', d);
    clip.style.transform = `translate3d(${last.x - 8}px, ${last.y - 8}px, 0)`;
  }

  function mapRange(v, inMin, inMax, outMin, outMax) {
    const t = (v - inMin) / (inMax - inMin);
    return outMin + (outMax - outMin) * t;
  }
  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  // Kilau mengikuti sumber cahaya "matahari" (pojok kanan-atas stage) secara
  // real-time: makin kartu diputar/dimiringkan (angleY dari drag kiri-kanan,
  // angleZ dari ayunan), makin bergeser posisi & intensitas pantulannya —
  // seperti cahaya sungguhan memantul di permukaan mengkilap yang bergerak.
  let idlePhase = 0;
  function updateShine(angleYVal, angleZVal) {
    if (!frontShine && !backShine) return;
    idlePhase += 0.012;
    const idleDrift = Math.sin(idlePhase) * 14; // glint halus saat kartu diam

    const rotInfluence = clamp(angleYVal, -150, 150);
    const shineX = mapRange(rotInfluence, -150, 150, -50, 330) + idleDrift * 0.6;
    const tiltSkew = clamp(angleZVal * 0.45, -16, 16);

    const proximityToFace = 1 - Math.min(1, Math.abs(rotInfluence) / 150);
    const intensity = 0.35 + 0.55 * proximityToFace;

    const t = `rotate(${32 + tiltSkew}deg) translateX(${shineX}%)`;
    if (frontShine) { frontShine.style.transform = t; frontShine.style.opacity = intensity; }
    if (backShine) { backShine.style.transform = t; backShine.style.opacity = intensity; }
  }


  if (prefersReducedMotion) {
    lanyard.style.transform = `translate3d(${homeX - 110}px, ${homeY}px, 0)`;
    for (let i = 0; i < ROPE_ITERATIONS * 3; i++) updateRope(homeX, homeY + 8);
    renderRope();

    let flipped = false;
    cardInner.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)';
    updateShine(0, 0);
    lanyard.addEventListener('click', () => {
      flipped = !flipped;
      cardInner.style.transform = `rotateY(${flipped ? 180 : 0}deg)`;
      updateShine(flipped ? 180 : 0, 0);
    });
    window.addEventListener('resize', () => {
      measureAnchor();
      buildRope();
      lanyard.style.transform = `translate3d(${homeX - 110}px, ${homeY}px, 0)`;
      for (let i = 0; i < ROPE_ITERATIONS * 3; i++) updateRope(homeX, homeY + 8);
      renderRope();
    });
    return;
  }

  // ANIMASI JATUH NATURAL: Kartu dilempar sedikit ke kanan atas di luar area
  // Agar saat jatuh, kartu tidak lurus kaku, melainkan mengayun melingkar seperti pendulum
  let currentX = homeX + 140;
  let currentY = -300;

  let targetX = homeX;
  let targetY = homeY;

  let vx = 0; let vy = 0;
  let angleZ = 0; let vAngleZ = 0;
  let angleY = 0; let targetAngleY = 0; let vAngleY = 0;

  // FORMULA PEGAS UNTUK KAIN LENTUR (Ultra-flexible fabric physics)
  // Spring diperkecil & friction diperbesar supaya kartu jatuh lebih pelan
  // dan berbobot, bukan "snap" cepat ke posisi diam.
  const springPos = 0.010;    // tarikan balik lembut → jatuh landai, tidak cepat
  const frictionPos = 0.94;   // redaman rendah → ayunan bertahan lebih lama
  const springRot = 0.022;    // putaran 3D yang lambat dan berbobot
  const frictionRot = 0.90;   // redaman putaran halus

  let isDragging = false;
  let startMouseX = 0; let startMouseY = 0;
  let startCardX = 0; let startCardY = 0;

  // Pembuat Logika Tarikan (Berlaku untuk Mouse & Jari HP)
  function startDrag(clientX, clientY) {
    isDragging = true;
    startMouseX = clientX;
    startMouseY = clientY;
    startCardX = currentX;
    startCardY = currentY;
  }

  function moveDrag(clientX, clientY) {
    if (!isDragging) return;

    const deltaX = clientX - startMouseX;
    const deltaY = clientY - startMouseY;

    let nextX = startCardX + deltaX;
    let nextY = startCardY + deltaY;

    // Tali fisik tidak molor: batasi jarak kartu dari titik jangkar sesuai
    // panjang tali, seperti lanyard sungguhan yang menahan tarikan.
    const attachY = nextY + 8;
    const dx = nextX - homeX;
    const dy = attachY - anchorY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = ropeLength;
    if (dist > maxDist) {
      const scale = maxDist / dist;
      nextX = homeX + dx * scale;
      nextY = anchorY + dy * scale - 8;
    }

    targetX = nextX;
    targetY = nextY;
    currentX = targetX;
    currentY = targetY;

    // Efek putar 3D (Y) saat ditarik menjauh melewati jarak 140px
    const distanceFromCenter = targetX - homeX;
    if (Math.abs(distanceFromCenter) > 140) {
      targetAngleY = distanceFromCenter > 0 ? 180 : -180;
    } else {
      targetAngleY = distanceFromCenter * 0.4;
    }

    // Hitung goyangan sudut Z berdasarkan kecepatan tarikan horizontal
    angleZ = Math.max(Math.min(deltaX * 0.15, 30), -30);
    angleY = targetAngleY;

    // Render dengan dukungan akselerasi kartu grafis (GPU)
    lanyard.style.transform = `translate3d(${currentX - 110}px, ${currentY}px, 0) rotate(${angleZ}deg)`;
    cardInner.style.transform = `rotateY(${angleY}deg)`;
    updateShine(angleY, angleZ);

    updateRope(currentX, currentY + 10);
    renderRope();
  }

  function stopDrag() {
    if (!isDragging) return;
    isDragging = false;

    targetX = homeX;
    targetY = homeY;
    targetAngleY = 0; // Kembalikan kartu menghadap ke depan
  }

  // EVENT LISTENER MOUSE (LAPTOP / PC)
  lanyard.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
  document.addEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY));
  document.addEventListener('mouseup', stopDrag);

  // EVENT LISTENER TOUCH (SMARTPHONE / HP / TABLET)
  lanyard.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  });
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      moveDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });
  document.addEventListener('touchend', stopDrag);

  // LOOP UTAMA ANIMASI FISIKA (Mengontrol efek jatuh bebas & ayunan kain)
  function updatePhysics() {
    if (!isDragging) {
      // 1. Hitung Pergerakan Pegas untuk Koordinat X & Y
      let ax = (targetX - currentX) * springPos;
      let ay = (targetY - currentY) * springPos;
      vx += ax; vy += ay;
      vx *= frictionPos; vy *= frictionPos;
      currentX += vx; currentY += vy;

      // 2. LOGIKA AYUNAN KAIN ALAMI (Rotasi Z):
      // Menggunakan laju kecepatan vertikal dan horizontal (vx & vy)
      // sehingga saat jatuh menghentak, kartu otomatis bergoyang melingkar dengan luwes
      let targetAngleZ_Dynamic = (vx * 0.4) + (Math.sin(Date.now() * 0.005) * (vy * 0.1));
      let aAngleZ = (targetAngleZ_Dynamic - angleZ) * 0.04;
      vAngleZ += aAngleZ;
      vAngleZ *= 0.92; // Redaman ayunan samping yang halus
      angleZ += vAngleZ;

      // 3. Hitung Putaran Halus 3D Depan-Belakang (Rotasi Y)
      let aAngleY = (targetAngleY - angleY) * springRot;
      vAngleY += aAngleY; vAngleY *= frictionRot;
      angleY += vAngleY;

      // Terapkan semua transformasi fisikanya ke style CSS
      lanyard.style.transform = `translate3d(${currentX - 110}px, ${currentY}px, 0) rotate(${angleZ}deg)`;
      cardInner.style.transform = `rotateY(${angleY}deg)`;
      updateShine(angleY, angleZ);
    }

    // Tali disimulasikan setiap frame (baik saat drag maupun bebas), supaya
    // tetap ikut bergoyang dengan gravitasinya sendiri dan sedikit "lag"
    // natural di belakang gerakan kartu.
    updateRope(currentX, currentY + 10);
    renderRope();

    requestAnimationFrame(updatePhysics);
  }

  // Mengatur ulang jangkar & tali secara otomatis jika ukuran layar berubah (Resize)
  window.addEventListener('resize', () => {
    measureAnchor();
    buildRope();
    if (!isDragging) {
      targetX = homeX;
      targetY = homeY;
    }
  });

  // Jalankan inisialisasi awal saat halaman dibuka
  for (let i = 0; i < ROPE_ITERATIONS * 4; i++) updateRope(currentX, currentY + 10);
  renderRope();
  updateShine(angleY, angleZ);
  updatePhysics();
})();