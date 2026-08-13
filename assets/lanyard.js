/* ==========================================================================
   Interactive ID lanyard — hero section
   Follows the structure/style of the original full-viewport lanyard demo
   almost line-for-line: same variable names, same spring/friction physics,
   same event flow (mousedown on the card, mousemove/mouseup on document).
   The only real difference is that the anchor point (homeX/homeY) is
   measured from the .lanyard-stage container instead of window, so it
   hangs correctly inside the hero section instead of the full page.
   ========================================================================== */
(function () {
  "use strict";

  const stage = document.getElementById('lanyardStage');
  const lanyard = document.getElementById('lanyardCard');
  const cardInner = document.getElementById('lanyardCardInner');
  const strap = document.getElementById('lanyardStrap');
  if (!stage || !lanyard || !cardInner || !strap) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Titik tengah default di dalam stage (tempat menggantung ideal)
  let homeX = stage.getBoundingClientRect().width / 2;
  let homeY = 130;

  if (prefersReducedMotion) {
    // Tanpa animasi ayun: kartu diam tergantung, klik untuk membalik saja.
    lanyard.style.transform = `translate3d(${homeX - 110}px, ${homeY}px, 0)`;
    strap.style.height = `${homeY}px`;
    let flipped = false;
    cardInner.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)';
    lanyard.addEventListener('click', () => {
      flipped = !flipped;
      cardInner.style.transform = `rotateY(${flipped ? 180 : 0}deg)`;
    });
    window.addEventListener('resize', () => {
      homeX = stage.getBoundingClientRect().width / 2;
      lanyard.style.transform = `translate3d(${homeX - 110}px, ${homeY}px, 0)`;
    });
    return;
  }

  // ANIMASI JATUH NATURAL: Kartu dilempar sedikit ke kanan atas di luar area
  // Agar saat jatuh, kartu tidak lurus kaku, melainkan mengayun melingkar seperti pendulum
  let currentX = homeX + 140;
  let currentY = -320;

  let targetX = homeX;
  let targetY = homeY;

  let vx = 0; let vy = 0;
  let angleZ = 0; let vAngleZ = 0;
  let angleY = 0; let targetAngleY = 0; let vAngleY = 0;

  // FORMULA PEGAS UNTUK KAIN LENTUR (Ultra-flexible fabric physics)
  // Nilai spring diperkecil agar tarikan balik terasa lembut (tidak kaku seperti karet tebal)
  // Nilai friction ditingkatkan mendekati 1 agar ayunannya bertahan lebih lama sebelum berhenti
  const springPos = 0.022;    // Tarikan balik yang sangat lembut khas kain panjang
  const frictionPos = 0.91;   // Redaman rendah agar kartu mengayun dan membal lebih lama
  const springRot = 0.03;     // Putaran 3D yang lebih lambat dan berbobot
  const frictionRot = 0.88;   // Redaman putaran halus

  let isDragging = false;
  let startMouseX = 0; let startMouseY = 0;
  let startCardX = 0; let startCardY = 0;

  // Fungsi Matematika & Visual untuk Menggerakkan Tali secara Real-Time
  function updateStrap(cardCenterX, cardTopY) {
    const anchorX = homeX;
    const anchorY = 0;

    const dx = cardCenterX - anchorX;
    const dy = cardTopY - anchorY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const strapAngle = Math.atan2(dy, dx) * (180 / Math.PI) - 90;

    strap.style.height = `${distance}px`;
    strap.style.transform = `translateX(-50%) rotate(${strapAngle}deg)`;
  }

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

    targetX = startCardX + deltaX;
    targetY = startCardY + deltaY;
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

    updateStrap(currentX, currentY + 10);
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

      // Perbarui visual tali lanyard agar ikut melar, menyusut, dan bergetar gemulai
      updateStrap(currentX, currentY + 10);
    }

    requestAnimationFrame(updatePhysics);
  }

  // Mengatur ulang posisi tengah secara otomatis jika ukuran stage berubah (Resize)
  window.addEventListener('resize', () => {
    homeX = stage.getBoundingClientRect().width / 2;
    if (!isDragging) {
      targetX = homeX;
      targetY = homeY;
    }
  });

  // Jalankan inisialisasi awal saat halaman dibuka
  lanyard.style.left = "0px"; lanyard.style.top = "0px";
  updateStrap(currentX, currentY + 10);
  updatePhysics();
})();