/* ==========================================================================
   Semester 1 — Timeline Refleksi Mata Kuliah
   Data 4C (Connection, Challenge, Concept, Change) + render timeline
   zig-zag interaktif dan modal popup detail.
   ========================================================================== */
(function () {
  "use strict";

  var COURSES = [
    {
      id: "filosofi-pendidikan",
      title: "Filosofi Pendidikan dan Pendidikan Nilai",
      summary: "Menelaah hakikat pendidikan melalui pemikiran Ki Hadjar Dewantara, khususnya konsep kodrat zaman dan kodrat alam sebagai dasar dalam menuntun peserta didik.",
      c: {
        connection: "Selama menempuh mata kuliah Filosofi Pendidikan, saya mempelajari berbagai hal mendasar tentang hakikat pendidikan, mulai dari merumuskan visi pribadi tentang pendidikan, sejarah dan latar belakang pendidikan nasional, hingga pokok-pokok pemikiran para tokoh pendidikan Indonesia. Topik yang paling menarik dan berguna bagi saya adalah pola pikir Ki Hadjar Dewantara, khususnya melalui aktivitas membaca tulisan \"Dasar-dasar Pendidikan\" dan diskusi kelompok menyimpulkan pokok-pokok pikiran beliau. Saya menyadari bahwa pemahaman saya tentang mengajar selama ini lebih berorientasi pada penyampaian materi, dan belum sepenuhnya mencerminkan semangat \"menuntun\" sesuai kodrat peserta didik.",
        challenge: "Tantangan yang paling menonjol bagi saya adalah memahami dan menerapkan konsep kodrat zaman dalam konteks pendidikan masa kini. KHD menekankan bahwa pendidikan harus disesuaikan dengan zaman peserta didik hidup, bukan zaman gurunya — sementara secara praktik saya cenderung mengajar dengan cara yang mirip seperti saat saya bersekolah dulu, padahal peserta didik saat ini hidup di era digital yang sangat berbeda. Memahami bahwa pendidik \"hanya dapat menuntun, bukan mengubah kodrat dasar anak\" juga menantang asumsi lama saya bahwa guru bisa dan harus membentuk murid sepenuhnya sesuai kehendaknya.",
        concept: "Konsep utama yang paling bermakna adalah kodrat zaman — bahwa pendidikan bersifat kodrati dalam isi dan tujuannya, tetapi bentuk dan caranya harus senantiasa disesuaikan dengan konteks zaman peserta didik. Konsep ini berkaitan erat dengan kodrat alam dan gagasan bahwa pendidik hanya dapat \"menuntun\", bukan mengubah kodrat dasar anak — sebagaimana petani yang hanya bisa menuntun tumbuhnya padi, bukan mengubahnya menjadi jagung. Prinsip ini menyadarkan saya bahwa mendidik bukan soal mencetak peserta didik sesuai keinginan guru, melainkan memfasilitasi mereka tumbuh sesuai kodrat dan zamannya masing-masing.",
        change: "Setelah mempelajari mata kuliah ini, saya ingin mengubah pendekatan mengajar saya agar lebih kontekstual dengan zaman peserta didik saat ini — misalnya dengan memanfaatkan teknologi dan media digital yang akrab bagi mereka, mengaitkan materi pelajaran dengan isu kekinian yang relevan, serta lebih terbuka terhadap cara belajar yang berbeda dari generasi saya dulu. Saya juga ingin lebih sering melakukan refleksi terhadap praktik mengajar saya sendiri, agar tidak terjebak mengulang pola lama."
      }
    },
    {
      id: "pemahaman-peserta-didik",
      title: "Pemahaman tentang Peserta Didik dan Pembelajaran",
      summary: "Mendalami karakteristik peserta didik dan pembelajaran berpusat pada peserta didik (student-centered learning) lewat studi kasus kelas yang pasif.",
      c: {
        connection: "Selama menempuh mata kuliah ini, saya mempelajari karakteristik peserta didik dan bagaimana mereka belajar, mulai dari teori perkembangan kognitif, kebutuhan belajar yang beragam, hingga cara merancang pembelajaran yang sesuai. Topik yang paling menarik bagi saya adalah Pembelajaran Berpusat pada Peserta Didik (Student-Centered Learning), yang saya pelajari melalui studi kasus kelas XI IPS 2 milik Bu Sinta — murid yang pasif, bergantung pada instruksi guru, takut salah, dan kesulitan mengerjakan tugas analitis. Melalui \"diagnosis mendalam\" terhadap kasus tersebut, saya memahami bahwa pembelajaran berpusat pada peserta didik bukan sekadar strategi mengajar, melainkan cara pandang utuh tentang bagaimana murid seharusnya belajar.",
        challenge: "Tantangan yang paling menonjol adalah menyadari bahwa pasivitas murid kemungkinan besar bukan sekadar \"sifat murid\", melainkan hasil bentukan dari pola pembelajaran yang berpusat pada guru — sesuatu yang sebelumnya saya anggap wajar, bahkan efisien. Materi ini menantang keyakinan saya bahwa pendekatan \"guru menjelaskan, murid mendengarkan\" adalah cara yang aman. Kesulitan yang saya rasakan adalah membayangkan penerapan pembelajaran berpusat pada peserta didik secara nyata di kelas dengan jumlah murid banyak dan waktu terbatas, tanpa kehilangan kendali atas jalannya pembelajaran.",
        concept: "Konsep utama yang paling bermakna adalah Pembelajaran Berpusat pada Peserta Didik, titik temu dari tiga landasan teori: Konstruktivisme (pengetahuan dibangun aktif oleh murid, guru sebagai fasilitator), Humanisme (motivasi intrinsik dan lingkungan belajar yang aman secara psikologis agar murid berani salah), dan Pembelajaran terdiferensiasi (menyesuaikan konten, proses, produk, dan lingkungan belajar karena setiap murid unik). Ketiganya menyadarkan saya bahwa memahami peserta didik juga berarti merancang ulang peran guru dan iklim kelas agar murid benar-benar menjadi subjek aktif.",
        change: "Setelah mempelajari mata kuliah ini, saya ingin mengubah peran saya di kelas dari \"instruktur\" menjadi lebih banyak berperan sebagai fasilitator: lebih sering menggali pengetahuan awal murid sebelum mengajarkan materi baru, memberi ruang bagi murid untuk berdiskusi dan bernegosiasi makna dengan teman sebaya, menciptakan suasana kelas yang membuat murid tidak takut salah, serta mulai menerapkan elemen diferensiasi sederhana seperti memberi pilihan cara murid menunjukkan pemahamannya."
      }
    },
    {
      id: "kebugaran-jasmani",
      title: "Kebugaran Jasmani",
      summary: "Menguatkan personal wellbeing sebagai fondasi profesionalisme guru, serta peran guru sebagai promotor budaya hidup sehat di sekolah.",
      c: {
        connection: "Mata kuliah elektif ini saya ikuti untuk menguatkan personal wellbeing, meningkatkan literasi kesehatan dan kebugaran, serta memahami peran guru sebagai promotor budaya hidup sehat di sekolah. Topik yang paling bermakna bagi saya adalah pemahaman bahwa personal wellbeing merupakan fondasi dari profesionalisme guru, bukan sekadar urusan pribadi yang terpisah dari peran mengajar. Mata kuliah ini menegaskan bahwa kebugaran jasmani dan kesehatan mental guru adalah prasyarat bagi terciptanya iklim belajar yang aman, inklusif, dan bebas dari kekerasan.",
        challenge: "Tantangan yang paling menonjol adalah menyadari bahwa selama menjalani perkuliahan PPG yang padat, saya cenderung mengabaikan kesehatan dan kebugaran pribadi demi mengejar tuntutan akademik — begadang mengerjakan tugas, kurang berolahraga, atau menunda istirahat. Materi ini menegaskan bahwa mengorbankan wellbeing pribadi demi produktivitas jangka pendek berisiko mengurangi kualitas saya sebagai calon pendidik dalam jangka panjang. Kesulitannya adalah menyeimbangkan tuntutan akademik yang padat dengan komitmen menjaga gaya hidup aktif dan sehat secara konsisten.",
        concept: "Konsep utama yang paling bermakna adalah bahwa kebugaran jasmani dan kesehatan mental guru merupakan fondasi kesejahteraan personal sekaligus profesional, bukan dua hal yang terpisah. Guru yang sehat secara fisik dan mental lebih mampu hadir sepenuhnya di kelas, mengelola stres dan emosi dengan baik, serta menjadi teladan yang otentik bagi murid-muridnya. Sebelum guru bisa mendorong murid untuk hidup sehat, guru terlebih dahulu perlu membangun kesadaran dan komitmen terhadap kesehatannya sendiri.",
        change: "Setelah mempelajari mata kuliah ini, saya ingin mulai memandang kesehatan dan kebugaran pribadi sebagai bagian dari tanggung jawab profesional saya: menyisihkan waktu secara konsisten untuk aktivitas fisik meskipun jadwal padat, menjaga pola istirahat dan tidur yang cukup agar tidak mudah lelah secara emosional di depan murid, serta membangun kesadaran bahwa menjaga diri sendiri adalah investasi agar saya bisa hadir maksimal dan menjadi teladan hidup sehat bagi murid-murid saya kelak."
      }
    },
    {
      id: "literasi-kesehatan-mental",
      title: "Literasi Kesehatan Mental",
      summary: "Meluruskan miskonsepsi dan melawan stigma kesehatan mental, serta memahami peran guru sebagai agen pemutus rantai stigma di sekolah.",
      c: {
        connection: "Mata kuliah ini membekali saya empat pemahaman utama: meluruskan miskonsepsi dan melawan stigma, memahami spektrum kesehatan mental versus gangguan mental, keterampilan Psychological First Aid, serta pentingnya iklim kelas bagi resiliensi dan kebahagiaan siswa. Yang paling menarik bagi saya adalah Meluruskan Miskonsepsi dan Melawan Stigma — materi ini mengajak saya menyadari bahwa stigma bukan sekadar sikap negatif yang abstrak, melainkan sesuatu yang nyata bisa menutup jalan seorang murid untuk sembuh atau mencari bantuan.",
        challenge: "Tantangan yang paling menonjol adalah menyadari bahwa saya sendiri mungkin selama ini tanpa sadar turut menyimpan sebagian miskonsepsi atau stigma — misalnya menganggap seseorang dengan gangguan mental sebagai \"lemah\", atau menganggap masalah psikologis murid akan \"hilang sendiri seiring waktu\". Kesulitan yang saya rasakan adalah membayangkan bagaimana caranya menjadi \"agen pemutus rantai stigma\" secara konkret, mengingat stigma semacam itu sering sudah tertanam kuat dalam budaya masyarakat, termasuk di kalangan sesama guru atau orang tua murid.",
        concept: "Konsep utama yang paling bermakna adalah bahwa guru bisa berperan sebagai agen pemutus rantai stigma kesehatan mental di lingkungan sekolah — tidak hanya dituntut untuk tidak melakukan stigmatisasi terhadap murid, tetapi juga secara aktif menciptakan lingkungan yang membuat murid merasa aman untuk bicara tentang kondisi psikologisnya tanpa takut dihakimi. Dengan meluruskan miskonsepsi umum, stigma dapat dikurangi, dan pada akhirnya membuka lebih banyak \"jalan\" bagi murid untuk mencari bantuan dan pulih.",
        change: "Setelah mempelajari topik ini, saya ingin secara aktif mengubah cara saya bersikap dan berbicara tentang isu kesehatan mental di sekolah: lebih berhati-hati memilih kata-kata agar tidak melabeli kondisi psikologis murid, aktif mengedukasi diri sendiri untuk membedakan miskonsepsi umum, serta berani menjadi contoh dengan berbicara terbuka dan tanpa menghakimi. Saya juga ingin menciptakan suasana kelas yang membuat murid merasa aman untuk bercerita."
      }
    },
    {
      id: "pembelajaran-mendalam",
      title: "Pembelajaran Mendalam dan Asesmen Dasar",
      summary: "Mempelajari pentingnya refleksi dan asesmen berkelanjutan melalui inkuiri kolaboratif antar-pendidik untuk memperbaiki kualitas pembelajaran.",
      c: {
        connection: "Selama menempuh mata kuliah ini, saya mempelajari bagaimana seorang pendidik tidak cukup hanya menyampaikan materi, tetapi juga perlu terus menilai dan memperbaiki praktik pembelajarannya melalui asesmen dan refleksi. Topik yang paling menarik bagi saya adalah Inkuiri Kolaboratif, yang saya pelajari melalui studi kasus Pak Fajar, guru IPA di SMP pesisir Jawa Tengah, yang berkolaborasi dengan guru lain, kepala sekolah, dan wali kelas untuk merancang pembelajaran terpadu berbasis penelitian sederhana tentang banjir — topik yang dekat dengan kehidupan murid namun tadinya diajarkan terlalu teoritis.",
        challenge: "Tantangan yang paling menonjol adalah menyadari bahwa refleksi pembelajaran selama ini sering saya lakukan secara individual dan tidak terstruktur — sekadar renungan pribadi setelah mengajar, tanpa melibatkan sesama pendidik atau data asesmen secara sistematis. Inkuiri kolaboratif menuntut keterbukaan untuk berdiskusi, diamati, dan menerima umpan balik dari rekan sejawat, yang tidak selalu mudah dilakukan. Kesulitan lain adalah membayangkan bagaimana mengelola kolaborasi lintas mata pelajaran di tengah keterbatasan waktu dan jadwal masing-masing guru.",
        concept: "Konsep utama yang paling bermakna adalah Inkuiri Kolaboratif, yaitu proses refleksi dan perbaikan pembelajaran yang dilakukan bersama sesama pendidik, mencakup dua bentuk: refleksi diri (prioritas dan motivasi, proses dan strategi, dampak pada murid, tantangan dan solusi, rencana perbaikan) dan refleksi sesama pendidik (dialog profesional yang setara lewat diskusi dan observasi bersama). Pada kasus Pak Fajar, ini menyadarkan saya bahwa data hasil asesmen bukan sekadar angka, melainkan bahan refleksi bersama untuk merencanakan langkah perbaikan yang lebih tepat.",
        change: "Setelah mempelajari mata kuliah ini, saya ingin mengubah kebiasaan refleksi saya dari individual dan sesekali, menjadi lebih terstruktur dan kolaboratif: menjadwalkan refleksi diri secara rutin dengan pertanyaan-pertanyaan pemandu, aktif mengajak rekan sejawat untuk saling mengamati dan memberi umpan balik, serta lebih berani membuka praktik mengajar saya untuk didiskusikan bersama, seperti yang dilakukan Pak Fajar dan rekan-rekannya."
      }
    },
    {
      id: "growth-mindset",
      title: "Growth Mindset",
      summary: "Memahami bahwa guru harus lebih dulu memiliki growth mindset sebelum bisa menumbuhkannya pada murid, lewat kerangka mindset-skillset-toolset.",
      c: {
        connection: "Selama menempuh mata kuliah ini, saya mempelajari bagaimana rendahnya mutu pendidikan Indonesia tidak bisa hanya diselesaikan dengan menambah jam pelajaran, melainkan berakar pada dominasi pola pikir tetap (fixed mindset) pada murid dan guru. Poin yang paling berkesan bagi saya adalah bahwa guru harus memiliki growth mindset terlebih dahulu, sebelum ia bisa mengembangkan growth mindset pada murid-muridnya — menyadarkan saya bahwa perubahan pada murid tidak bisa dituntut tanpa perubahan terlebih dahulu pada diri pendidik sendiri.",
        challenge: "Tantangan yang paling menonjol adalah menyadari bahwa saya sendiri mungkin masih menyimpan unsur fixed mindset tanpa disadari — misalnya menghindari tantangan baru dalam mengajar karena takut terlihat tidak kompeten, atau menanggapi kritik secara defensif. Materi ini menantang asumsi saya bahwa growth mindset hanya perlu ditanamkan pada murid, padahal guru justru harus menjadi teladan dan sumber pertama dari pola pikir tersebut.",
        concept: "Konsep utama yang paling bermakna adalah hierarki mindset–skillset–toolset, di mana mindset menjadi fondasi paling dasar yang menentukan arah penggunaan skillset dan toolset. Tanpa mindset yang tepat, secanggih apa pun toolset dan setinggi apa pun skillset seorang guru, semuanya berisiko salah arah. Ini berkaitan dengan kerangka Mindset, Action, Result (MAR): keyakinan dasar guru mendorong perilaku dan praktik mengajarnya, yang pada akhirnya membentuk hasil belajar murid — baik akademik maupun non-akademik seperti resiliensi dan motivasi intrinsik.",
        change: "Setelah mempelajari mata kuliah ini, saya ingin lebih dulu menumbuhkan growth mindset dalam diri saya sendiri sebelum berupaya menumbuhkannya pada murid: memandang tantangan mengajar sebagai peluang belajar, tidak mudah menyerah menghadapi kesulitan di kelas, menerima kritik secara terbuka, serta menjadikan kesuksesan guru lain sebagai sumber inspirasi, bukan ancaman."
      }
    },
    {
      id: "ppl-terbimbing",
      title: "PPL Terbimbing",
      summary: "Pengalaman transisi dari latar belakang Teknik Informatika menuju praktik mengajar sesungguhnya, memadukan logika teknik dengan dinamika manusia di kelas.",
      c: {
        connection: "PPL Terbimbing merupakan pengalaman belajar yang paling berkesan sekaligus paling menantang bagi saya selama PPG, karena berbeda dari sebagian besar rekan sejawat, latar belakang S1 saya adalah Teknik Informatika, bukan pendidikan. Selama ini saya terbiasa dengan pola pikir dunia teknik — logis, sistematis, berorientasi pada solusi yang terukur — namun ketika berhadapan langsung dengan murid, saya menyadari bahwa mengajar adalah dunia yang penuh dinamika manusia, emosi, dan ketidakpastian yang tidak bisa didekati semata dengan logika seperti menyusun algoritma.",
        challenge: "Tantangan paling menonjol yang saya hadapi adalah kesenjangan antara latar belakang keilmuan saya dengan tuntutan pedagogis di lapangan. Sebagai lulusan Teknik Informatika, saya tidak pernah dibekali secara formal tentang cara mengelola kelas, membangun komunikasi dengan murid dari berbagai karakter, atau merespons situasi kelas yang tidak terduga. Kesulitan ini muncul terutama pada aspek non-teknis mengajar, misalnya menjaga perhatian murid yang mudah teralihkan atau menangani murid yang kurang termotivasi.",
        concept: "Konsep utama yang paling bermakna dari pengalaman PPL ini adalah menyadari bahwa mengajar bukan sekadar transfer pengetahuan teknis, melainkan proses membangun relasi dan memahami kebutuhan manusia. Di sisi lain, saya juga menemukan bahwa latar belakang Teknik Informatika saya menjadi kekuatan tersendiri: kemampuan berpikir sistematis dan problem-solving justru membantu saya merancang pembelajaran secara terstruktur dan memanfaatkan teknologi untuk media ajar — bukan sekadar kekurangan yang perlu ditutupi.",
        change: "Setelah menjalani PPL Terbimbing, saya ingin terus mengembangkan kompetensi pedagogis yang selama ini menjadi celah dari latar belakang non-kependidikan saya — belajar lebih banyak tentang manajemen kelas dan komunikasi dengan murid. Di sisi lain, saya juga ingin secara sadar memanfaatkan kekuatan latar belakang Teknik Informatika saya, misalnya mengintegrasikan pembelajaran berbasis teknologi dan computational thinking ke dalam praktik mengajar — menjadikan latar belakang berbeda ini sebagai nilai tambah, bukan hambatan."
      }
    }
  ];

  var root = document.getElementById("timeline-root");
  if (!root) return;

  var C_LABELS = {
    connection: "Connection",
    challenge: "Challenge",
    concept: "Concept",
    change: "Change"
  };

  /* ---------------- Render timeline items ---------------- */
  COURSES.forEach(function (course, index) {
    var li = document.createElement("div");
    li.className = "tl-v-item reveal";
    li.style.setProperty("--i", index % 8);

    var num = document.createElement("span");
    num.className = "tl-v-num";
    num.textContent = String(index + 1).padStart(2, "0");
    li.appendChild(num);

    var card = document.createElement("div");
    card.className = "tl-v-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-expanded", "false");

    card.innerHTML =
      '<span class="tl-v-tag">Semester 1 · Mata Kuliah ' + (index + 1) + '</span>' +
      '<h3>' + course.title + '</h3>' +
      '<div class="tl-v-body">' +
        '<p>' + course.summary + '</p>' +
        '<button type="button" class="btn btn-ghost btn-sm js-open-modal">Lihat Refleksi 4C</button>' +
      '</div>';

    card.addEventListener("click", function (e) {
      if (e.target.closest(".js-open-modal")) return; // handled separately
      var isOpen = card.classList.toggle("is-open");
      card.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    card.addEventListener("keydown", function (e) {
      if (e.target.closest(".js-open-modal")) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
    card.querySelector(".js-open-modal").addEventListener("click", function (e) {
      e.stopPropagation();
      openModal(course);
    });

    li.appendChild(card);
    root.appendChild(li);
  });

  // Let the shared reveal-on-scroll observer pick up the newly created items.
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    root.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    root.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------------- Modal ---------------- */
  var overlay = document.querySelector(".modal-overlay");
  var modalTitle = overlay ? overlay.querySelector(".js-modal-title") : null;
  var modalBody = overlay ? overlay.querySelector(".js-modal-4c") : null;
  var closeBtn = overlay ? overlay.querySelector(".modal-close") : null;
  var lastFocused = null;

  function openModal(course) {
    if (!overlay) return;
    lastFocused = document.activeElement;
    modalTitle.textContent = course.title;
    modalBody.innerHTML = ["connection", "challenge", "concept", "change"].map(function (key) {
      return (
        '<div class="modal-4c-block">' +
          "<h4>" + C_LABELS[key] + "</h4>" +
          "<p>" + course.c[key] + "</p>" +
        "</div>"
      );
    }).join("");
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  if (overlay) {
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) closeModal();
    });
  }
})();