/* ==========================================================================
   Semester 2 — Timeline Refleksi Mata Kuliah
   Data 4C (Connection, Challenge, Concept, Change) + render timeline
   zig-zag interaktif dan modal popup detail.
   Struktur identik dengan assets/semester1.js — dipisah agar Semester 1 dan
   Semester 2 bisa tampil independen di halaman yang sama (about.html).
   ========================================================================== */
(function () {
  "use strict";

  var COURSES = [
    {
      id: "dup",
      title: "Pembelajaran Mendalam dan Asesmen Lanjut",
      summary: "Mendalami Desain Universal untuk Pembelajaran (DUP) sebagai cara merancang pembelajaran yang inklusif sejak awal, bukan sekadar dimodifikasi belakangan bagi murid yang kesulitan.",
      c: {
        connection: "Mata kuliah Pembelajaran Mendalam dan Asesmen Lanjut membekali saya dengan kemampuan menggunakan data hasil asesmen untuk merancang pembelajaran yang adaptif, inklusif, dan berpihak pada murid, melalui tiga kerangka utama: Desain Universal untuk Pembelajaran (DUP), Teaching at the Right Level (TaRL), dan Culturally Responsive Teaching (CRT). Dari ketiganya, yang paling menarik dan berkesan bagi saya adalah Desain Universal untuk Pembelajaran (DUP), karena kerangka ini mengajak saya berpikir tentang pembelajaran bukan dari sudut pandang \"murid rata-rata\", melainkan merancang sejak awal agar dapat diakses oleh seluruh keberagaman murid, termasuk mereka dengan kebutuhan belajar yang berbeda-beda. Topik ini sangat terkait dengan peran saya sebagai calon guru, karena selama ini saya cenderung merancang pembelajaran dengan satu cara penyampaian dan satu jenis penilaian untuk semua murid, lalu baru melakukan penyesuaian ketika ada murid yang kesulitan mengikuti. Saya kategorikan topik ini sebagai pengalaman belajar yang berguna dan menarik, karena mengubah cara pandang saya dari \"merancang lalu memodifikasi\" menjadi \"merancang secara inklusif sejak awal\".",
        challenge: "Tantangan yang paling menonjol bagi saya dalam memahami DUP adalah menyadari bahwa pendekatan \"satu ukuran untuk semua\" yang selama ini sering saya (dan mungkin banyak guru) terapkan sebenarnya secara tidak sadar mengecualikan sebagian murid sejak awal — bukan karena kemampuan mereka, tetapi karena cara penyampaian materi atau bentuk penilaian yang tidak sesuai dengan cara mereka belajar. Materi ini menantang kebiasaan saya yang cenderung menganggap \"modifikasi bagi murid tertentu\" sebagai solusi yang cukup, padahal DUP menekankan bahwa desain yang inklusif seharusnya menjadi rencana dasar, bukan penyesuaian tambahan di akhir. Kesulitan yang saya rasakan adalah membayangkan bagaimana merancang satu rencana pembelajaran yang benar-benar mengakomodasi keberagaman cara belajar, cara mengekspresikan pemahaman, dan cara termotivasi setiap murid, tanpa membuat perencanaan menjadi terlalu rumit atau memakan waktu berlebih bagi guru. Mengapa hal ini terjadi: karena pola pikir \"mengajar untuk murid rata-rata lalu menyesuaikan bagi yang berbeda\" sudah lama menjadi kebiasaan umum dalam pendidikan, sehingga bergeser ke pendekatan yang merancang keberagaman sejak awal terasa sebagai perubahan besar dalam cara berpikir merencanakan pembelajaran.",
        concept: "Konsep utama yang paling bermakna dari topik DUP adalah bahwa pembelajaran yang inklusif dirancang melalui tiga prinsip utama: menyediakan beragam cara penyampaian materi (representasi) agar murid dapat mengakses informasi sesuai cara belajar mereka, menyediakan beragam cara bagi murid untuk menunjukkan pemahaman (aksi dan ekspresi) sehingga murid tidak dipaksa membuktikan kemampuannya dengan satu format yang sama, serta menumbuhkan beragam cara untuk melibatkan dan memotivasi murid (keterlibatan) agar setiap murid menemukan alasan personal untuk terlibat dalam pembelajaran. Konsep ini sejalan dengan gagasan yang saya pelajari di mata kuliah lain tentang pembelajaran terdiferensiasi, namun DUP menegaskan bahwa keberagaman ini seharusnya menjadi fondasi perancangan sejak awal, bukan penyesuaian yang dilakukan belakangan setelah menemukan murid yang \"tidak cocok\" dengan rencana awal.",
        change: "Setelah mempelajari kerangka DUP, saya ingin mengubah cara saya merancang pembelajaran dari yang sebelumnya berbasis satu pendekatan seragam, menjadi merancang keberagaman pilihan sejak tahap perencanaan awal. Perubahan konkret yang ingin saya lakukan antara lain: menyediakan lebih dari satu format penyampaian materi (misalnya teks, visual, dan audio/video) untuk topik yang sama, memberi murid pilihan dalam cara menunjukkan pemahaman mereka (misalnya melalui tulisan, presentasi lisan, atau proyek visual), serta merancang aktivitas yang dapat menjangkau berbagai sumber motivasi murid, alih-alih hanya mengandalkan satu jenis aktivitas untuk seluruh kelas. Saya berharap dengan menerapkan DUP sejak perencanaan, saya bisa mengurangi kebutuhan untuk terus-menerus \"memadamkan kebakaran\" ketika ada murid yang kesulitan mengikuti, karena keberagaman sudah diakomodasi sejak awal."
      }
    },
    {
      id: "pse",
      title: "Pembelajaran Sosial Emosional",
      summary: "Memahami peran guru sebagai pendidik, pembimbing, dan lapis pertama dukungan emosional murid, sekaligus mengenali batas kewenangan sebelum merujuk ke guru BK/konselor.",
      c: {
        connection: "Mata kuliah Pembelajaran Sosial Emosional membekali saya dengan pemahaman tentang pentingnya membangun relasi yang baik dengan murid, memahami faktor-faktor yang memengaruhi kondisi sosial emosional individu, hingga mengimplementasikan keterampilan sosial emosional berbasis growth mindset dalam pembelajaran. Dari seluruh capaian pembelajaran tersebut, yang paling menarik dan berkesan bagi saya adalah topik tentang peran guru sebagai pendidik, pembimbing, dan konselor dalam mendukung kesejahteraan murid. Topik ini menyadarkan saya bahwa peran guru ternyata jauh lebih luas dari sekadar menyampaikan materi pelajaran — guru juga dituntut untuk bisa membimbing dan bahkan menjadi tempat pertama murid mencari dukungan emosional, sebelum kasus tersebut dirujuk ke guru BK/konselor profesional. Topik ini sangat terkait dengan pengalaman saya di mata kuliah Literasi Kesehatan Mental sebelumnya, yang juga membahas bagaimana guru bisa menjadi agen pemutus stigma dan pemberi dukungan psikologis awal bagi murid. Saya kategorikan topik ini sebagai pengalaman belajar yang berguna dan menarik, karena memperluas pemahaman saya tentang cakupan tanggung jawab seorang guru yang sesungguhnya.",
        challenge: "Tantangan yang paling menonjol bagi saya dalam memahami peran ganda ini adalah menyadari bahwa peran pendidik, pembimbing, dan konselor memiliki batasan yang perlu dipahami dengan jelas — guru bukanlah pengganti konselor profesional, namun di sisi lain guru juga tidak bisa sepenuhnya lepas tangan dan menyerahkan semua urusan sosial emosional murid kepada guru BK. Materi ini menantang pandangan saya sebelumnya yang cenderung menganggap urusan bimbingan dan konseling murid sepenuhnya \"bukan wilayah\" guru mata pelajaran, melainkan tanggung jawab eksklusif guru BK. Kesulitan yang saya rasakan adalah membayangkan bagaimana menemukan keseimbangan yang tepat: kapan saya sebagai guru cukup berperan sebagai pendamping yang mendengarkan dan memberi dukungan awal, dan kapan situasi murid sudah memerlukan rujukan ke pihak yang lebih kompeten. Mengapa hal ini terjadi: karena peran guru sebagai pembimbing dan \"konselor pertama\" ini jarang dibekali secara eksplisit dalam pendidikan sebelumnya (termasuk bagi saya yang berlatar belakang non-kependidikan), sehingga batas antara mendukung dan melampaui kewenangan sering kali tidak jelas tanpa panduan yang memadai.",
        concept: "Konsep utama yang paling bermakna dari topik ini adalah bahwa guru memiliki tiga peran yang saling melengkapi namun berbeda level kewenangannya: sebagai pendidik yang menyampaikan pengetahuan dan nilai, sebagai pembimbing yang mendampingi murid dalam perkembangan pribadi dan sosialnya sehari-hari, serta sebagai figur yang mendukung peran guru BK/konselor dalam menjaga kesejahteraan murid — tanpa harus menggantikan fungsi profesional konselor. Ketiga peran ini menegaskan bahwa kesejahteraan murid bukan hanya tanggung jawab satu pihak (guru BK saja), melainkan tanggung jawab bersama seluruh warga sekolah, di mana guru mata pelajaran memiliki posisi strategis karena interaksi harian yang lebih intens dengan murid dibanding guru BK yang jumlahnya terbatas. Konsep ini juga menghubungkan kembali pemahaman saya tentang pentingnya relasi yang baik dan keterampilan sosial emosional guru sebagai prasyarat untuk bisa menjalankan ketiga peran tersebut secara efektif.",
        change: "Setelah mempelajari topik ini, saya ingin mengubah cara pandang saya tentang batasan peran sebagai guru — dari yang sebelumnya menganggap urusan sosial emosional murid \"bukan wilayah saya\", menjadi menyadari bahwa saya memiliki peran aktif sebagai lapis pertama dukungan bagi murid. Perubahan konkret yang ingin saya lakukan antara lain: lebih peka mengenali tanda-tanda murid yang membutuhkan perhatian lebih (secara akademik maupun emosional), meluangkan waktu untuk mendengarkan murid tanpa terburu-buru menghakimi atau memberi solusi instan, serta membangun komunikasi yang baik dengan guru BK di sekolah agar saya tahu kapan dan bagaimana melakukan rujukan yang tepat ketika suatu kasus berada di luar kompetensi saya sebagai guru mata pelajaran."
      }
    },
    {
      id: "inklusi",
      title: "Pendidikan Inklusi",
      summary: "Mempelajari penyusunan Profil Peserta Didik Berkebutuhan Khusus (PDBK) sebagai fondasi sistematis merancang pembelajaran yang benar-benar berpihak pada kebutuhan individu.",
      c: {
        connection: "Mata kuliah Pendidikan Inklusi membekali saya dengan pemahaman mendalam mengenai berbagai aspek dalam mendukung peserta didik berkebutuhan khusus (PDBK), mulai dari model dan tahapan penerimaan PDBK, penyusunan profil PDBK, penyusunan modul ajar di sekolah inklusif, hingga analisis kendala pelaksanaan pembelajaran inklusif. Dari keempat topik tersebut, yang paling menarik dan berkesan bagi saya adalah penyusunan Profil Peserta Didik Berkebutuhan Khusus, yang mencakup proses pengumpulan data, analisis kebutuhan, hingga penyusunan profil yang memungkinkan pembelajaran disesuaikan dengan karakteristik setiap individu. Topik ini sangat terkait dengan pengalaman saya di mata kuliah Pemahaman Peserta Didik dan Pembelajarannya, khususnya tentang pembelajaran terdiferensiasi — namun di konteks pendidikan inklusi, penyesuaian ini menjadi jauh lebih krusial karena menyangkut kebutuhan dasar PDBK agar bisa mengakses pembelajaran secara setara. Saya kategorikan topik ini sebagai pengalaman belajar yang berguna dan menarik, karena menyadarkan saya bahwa sebelum merancang pembelajaran apa pun bagi PDBK, guru terlebih dahulu harus benar-benar mengenal siapa peserta didik tersebut secara mendalam dan sistematis.",
        challenge: "Tantangan yang paling menonjol bagi saya dalam memahami penyusunan profil PDBK adalah menyadari bahwa proses ini menuntut ketelitian dan pendekatan yang jauh lebih personal dibandingkan asesmen pada murid pada umumnya — mulai dari mengumpulkan data yang akurat tentang kondisi, kebutuhan, dan karakteristik unik setiap PDBK, hingga menerjemahkannya menjadi profil yang benar-benar bisa dijadikan dasar merancang pembelajaran. Materi ini menantang asumsi saya sebelumnya bahwa \"mengenal murid\" cukup dilakukan secara umum di awal semester, padahal bagi PDBK, proses pengenalan ini perlu lebih sistematis, mendalam, dan berkelanjutan. Kesulitan yang saya rasakan adalah membayangkan bagaimana melakukan pengumpulan data dan analisis kebutuhan PDBK secara tepat tanpa latar belakang pendidikan khusus yang mendalam, mengingat setiap jenis kebutuhan khusus (misalnya kesulitan belajar, gangguan sensorik, atau kondisi lainnya) memerlukan pendekatan yang berbeda-beda. Mengapa hal ini terjadi: karena penyusunan profil PDBK memerlukan kolaborasi lintas keahlian (guru kelas, guru pembimbing khusus, orang tua, bahkan tenaga profesional lain), sementara sebagai calon guru saya belum terbiasa bekerja dalam kerangka kolaboratif semacam ini.",
        concept: "Konsep utama yang paling bermakna dari topik ini adalah bahwa profil PDBK bukan sekadar dokumen administratif, melainkan fondasi utama untuk merancang pembelajaran yang benar-benar berpihak pada peserta didik berkebutuhan khusus. Proses penyusunannya mencakup tiga tahap penting: pengumpulan data (memahami kondisi dan riwayat PDBK secara menyeluruh), analisis kebutuhan (menerjemahkan data menjadi kebutuhan belajar yang spesifik), dan penyusunan profil itu sendiri (merangkum semuanya menjadi acuan yang dapat digunakan guru dalam merancang pembelajaran, termasuk penyusunan modul ajar yang sesuai). Konsep ini menyadarkan saya bahwa pendidikan inklusif yang efektif tidak bisa berhenti pada niat baik untuk \"menerima\" PDBK di sekolah reguler, tetapi harus didukung oleh proses pemahaman yang sistematis agar penerimaan tersebut benar-benar bermakna dan tidak sekadar formalitas.",
        change: "Setelah mempelajari topik ini, saya ingin mengubah cara saya memandang proses mengenal peserta didik, khususnya PDBK, dari yang sebelumnya bersifat sekilas dan umum, menjadi lebih sistematis dan berbasis data. Perubahan konkret yang ingin saya lakukan antara lain: belajar lebih banyak tentang teknik pengumpulan data dan asesmen kebutuhan PDBK, membangun kebiasaan berkolaborasi dengan guru pembimbing khusus dan orang tua dalam memahami kebutuhan murid, serta memastikan bahwa modul ajar yang saya rancang benar-benar berangkat dari profil kebutuhan PDBK yang nyata, bukan asumsi umum semata. Saya juga ingin lebih peka terhadap tanda-tanda kebutuhan khusus pada murid yang mungkin belum teridentifikasi secara formal, agar bisa segera menindaklanjutinya dengan tepat."
      }
    },
    {
      id: "projek-kepemimpinan",
      title: "Projek Kepemimpinan",
      summary: "Mengembangkan LMS \"Smart IT\", platform kolaborasi antar-guru, sebagai wujud kepemimpinan dalam pendidikan lewat pemberdayaan sistem, bukan sekadar posisi struktural.",
      c: {
        connection: "Mata kuliah Projek Kepemimpinan dilandasi keyakinan bahwa kapasitas kepemimpinan bukanlah bakat bawaan, melainkan kompetensi yang dapat terus dikembangkan melalui pola pikir bertumbuh (growth mindset). Bagi saya, mata kuliah ini menjadi ruang yang sangat tepat untuk mengintegrasikan latar belakang S1 saya di Teknik Informatika dengan peran baru saya sebagai calon guru. Saya memilih mengembangkan LMS \"Smart IT\", sebuah platform pembelajaran digital yang tidak hanya berfungsi sebagai wadah satu arah (guru mengunggah materi, murid mengumpulkan tugas) seperti kebanyakan LMS pada umumnya, tetapi juga menghadirkan mekanisme kolaborasi antar-guru — di mana guru dapat mengajukan kelas untuk disetujui admin, kemudian kelas tersebut dapat diduplikasi dan dikembangkan lebih lanjut oleh guru lain. Topik ini saya kategorikan sebagai pengalaman belajar yang berguna dan menarik, karena menjadi bukti nyata bahwa kepemimpinan dalam pendidikan tidak selalu berbentuk memimpin orang secara langsung, tetapi juga bisa berupa menciptakan sistem atau alat yang memberdayakan sesama pendidik untuk berbagi dan bertumbuh bersama.",
        challenge: "Tantangan yang paling menonjol bagi saya dalam mengerjakan proyek ini adalah menyadari bahwa keahlian teknis membangun sebuah website atau sistem LMS saja tidak cukup untuk menghasilkan solusi yang benar-benar dibutuhkan dunia pendidikan. Saya perlu memahami secara mendalam permasalahan nyata di lapangan — bahwa mayoritas LMS yang ada saat ini bersifat satu arah dan belum mengakomodasi kebutuhan kolaborasi antar-guru dalam mengembangkan konten dan strategi pembelajaran. Materi ini menantang kebiasaan saya sebagai lulusan Teknik Informatika yang cenderung langsung fokus pada aspek teknis pengembangan sistem, padahal proyek kepemimpinan menuntut saya terlebih dahulu memahami akar masalah dari sisi pengguna (guru dan sekolah), baru kemudian merancang solusi teknisnya. Kesulitan lain adalah merancang mekanisme kurasi (ACC oleh admin) yang tepat, agar budaya berbagi antar-guru tetap terjaga kualitasnya dan tidak menimbulkan konten yang asal-asalan. Mengapa hal ini terjadi: karena membangun solusi kepemimpinan yang berdampak nyata memerlukan keseimbangan antara kemampuan teknis dan pemahaman kontekstual terhadap kebutuhan pengguna, dua hal yang sebelumnya jarang saya latih secara bersamaan.",
        concept: "Konsep utama yang paling bermakna dari proyek ini adalah bahwa kepemimpinan dalam pendidikan dapat diwujudkan melalui inisiatif menciptakan sistem yang memberdayakan orang lain, bukan hanya melalui posisi struktural formal. Dengan merancang mekanisme pengajuan dan duplikasi kelas antar-guru, saya menerapkan prinsip bahwa seorang pemimpin yang baik tidak hanya menyelesaikan masalahnya sendiri, tetapi membangun wadah yang memungkinkan orang lain (dalam hal ini sesama guru) untuk saling belajar, berbagi ide kreatif, dan meningkatkan kualitas pengajaran secara kolektif. Konsep pola pikir bertumbuh yang menjadi landasan mata kuliah ini juga tercermin dalam proses saya mengembangkan LMS ini — melalui eksperimen dengan berbagai fitur, belajar dari kekurangan desain awal, dan terus memperbaiki sistem berdasarkan kebutuhan nyata pengguna, alih-alih menyerah ketika menemui kendala teknis maupun konseptual.",
        change: "Setelah menjalani Projek Kepemimpinan ini, saya semakin yakin bahwa saya bisa memberi kontribusi unik dalam dunia pendidikan dengan menggabungkan latar belakang teknis saya dan pemahaman pedagogis yang saya peroleh selama PPG. Perubahan konkret yang ingin saya lakukan ke depan antara lain: terus mengembangkan LMS Smart IT agar benar-benar dapat digunakan dan bermanfaat bagi guru-guru di lapangan (tidak berhenti sebagai proyek tugas kuliah semata), aktif mendorong budaya berbagi dan kolaborasi antar-guru di lingkungan sekolah tempat saya mengajar kelak, serta terus menumbuhkan pola pikir bertumbuh dalam diri saya sendiri sebagai pemimpin — berani mengambil inisiatif, bereksperimen dengan solusi kreatif, dan tidak takut belajar dari kegagalan dalam proses menciptakan dampak yang lebih luas bagi pendidikan."
      }
    },
    {
      id: "bsan",
      title: "Pencegahan dan Penanganan Kekerasan",
      summary: "Mendalami Budaya Sekolah Aman dan Nyaman (BSAN) yang mencakup empat dimensi — spiritual, fisik, psiko-sosial, dan digital — sebagai tanggung jawab bersama seluruh warga sekolah.",
      c: {
        connection: "Mata kuliah Pencegahan dan Penanganan Kekerasan membekali saya dengan pemahaman mendalam tentang urgensi lingkungan pendidikan yang aman dan menyenangkan, mulai dari dasar hukum yang melandasinya, jenis-jenis kekerasan, relasi kuasa dan bias implisit, ancaman kekerasan berbasis elektronik, hingga upaya pencegahan dan penanganannya. Dari seluruh materi tersebut, topik yang paling menarik dan berkesan bagi saya adalah Budaya Sekolah Aman dan Nyaman (BSAN) secara umum, sebagaimana diatur dalam Permendikdasmen Nomor 6 Tahun 2026. Topik ini menyadarkan saya bahwa menciptakan sekolah yang aman bukan sekadar soal mencegah kekerasan fisik semata, melainkan mencakup empat dimensi yang saling terkait: lingkungan spiritual, fisik, psiko-sosial, dan digital. Topik ini sangat terkait dengan peran saya sebagai calon guru, karena menegaskan bahwa keamanan dan kenyamanan sekolah adalah tanggung jawab bersama, bukan hanya tugas satuan keamanan atau guru BK. Saya kategorikan topik ini sebagai pengalaman belajar yang berguna dan menarik, karena memberi saya kerangka yang komprehensif tentang apa saja yang perlu diperhatikan untuk menciptakan sekolah yang benar-benar aman bagi semua warga sekolah.",
        challenge: "Tantangan yang paling menonjol bagi saya dalam memahami BSAN adalah menyadari bahwa selama ini pemahaman saya tentang \"sekolah yang aman\" cenderung sempit — hanya terbatas pada aspek fisik seperti bebas dari perundungan atau kekerasan fisik, tanpa menyadari bahwa ada dimensi lain yang sama pentingnya, seperti lingkungan digital yang aman dari disinformasi dan ancaman kekerasan siber, atau lingkungan spiritual yang menghormati keberagaman agama dan kepercayaan. Materi ini menantang pandangan saya yang sebelumnya menganggap keamanan digital sebagai isu terpisah dari tanggung jawab sekolah, padahal BSAN secara eksplisit mencakup edukasi literasi digital dan perlindungan data pribadi warga sekolah sebagai bagian dari budaya sekolah yang aman. Kesulitan yang saya rasakan adalah membayangkan bagaimana seorang guru mata pelajaran seperti saya bisa berkontribusi nyata pada keempat dimensi BSAN sekaligus, mengingat cakupannya yang luas dan sebagian di antaranya (seperti keamanan fisik bangunan) berada di luar kendali langsung guru. Mengapa hal ini terjadi: karena selama ini isu keamanan sekolah sering dipahami secara parsial dan reaktif (baru diperhatikan setelah ada kejadian), bukan sebagai budaya yang dibangun secara proaktif dan menyeluruh sejak awal.",
        concept: "Konsep utama yang paling bermakna dari topik ini adalah definisi BSAN sebagai keseluruhan tata nilai, sikap, kebiasaan, dan perilaku yang dibangun untuk menjamin pemenuhan kebutuhan spiritual, perlindungan fisik, kesejahteraan psikologis, keamanan sosiokultural, serta keadaban dan keamanan digital. Empat cakupan BSAN — lingkungan spiritual, fisik, psiko-sosial, dan digital — menunjukkan bahwa keamanan sekolah bersifat multidimensi dan saling melengkapi: lingkungan fisik yang aman tidak akan cukup jika lingkungan psiko-sosialnya tidak menghargai keberagaman, begitu pula keamanan digital menjadi semakin penting seiring interaksi warga sekolah yang makin banyak terjadi di ruang daring. Konsep ini juga menegaskan bahwa menciptakan budaya, bukan sekadar aturan, berarti keamanan dan kenyamanan harus tertanam dalam kebiasaan dan perilaku sehari-hari seluruh warga sekolah, bukan hanya berupa kebijakan tertulis yang tidak benar-benar dijalankan.",
        change: "Setelah mempelajari konsep BSAN, saya ingin menjadi guru yang secara aktif berkontribusi pada keempat dimensi budaya sekolah yang aman dan nyaman, sesuai dengan kapasitas saya. Perubahan konkret yang ingin saya lakukan antara lain: menciptakan suasana kelas yang menghargai keberagaman keyakinan dan latar belakang murid (dimensi spiritual dan psiko-sosial), lebih peka terhadap tanda-tanda ketidaknyamanan psikologis pada murid dan memberi ruang bagi mereka untuk berpendapat secara setara, serta secara khusus memanfaatkan latar belakang Teknik Informatika saya untuk mengedukasi murid tentang literasi digital dan keamanan siber — mengingat ancaman kekerasan berbasis elektronik menjadi salah satu risiko yang semakin nyata bagi murid generasi digital saat ini. Saya juga ingin memastikan bahwa saya memahami mekanisme pelaporan yang berlaku (baik SAHABAT untuk masa PPG maupun jalur BSAN di satuan pendidikan) agar bisa bertindak tepat jika suatu saat mendapati atau menyaksikan dugaan kekerasan."
      }
    },
    {
      id: "ppl-mandiri",
      title: "PPL Mandiri",
      summary: "Merancang dan melaksanakan pembelajaran mandiri dengan mengintegrasikan Pembelajaran Mendalam, TaRL, dan CRT sebagai puncak sintesis seluruh teori PPG dalam praktik nyata.",
      c: {
        connection: "PPL Mandiri merupakan puncak dari seluruh pembelajaran yang saya jalani selama PPG, karena di sinilah saya dituntut untuk merancang dan melaksanakan pembelajaran secara mandiri di sekolah, tanpa lagi didampingi sepenuhnya seperti pada PPL Terbimbing. Dari seluruh tahapan PPL Mandiri — orientasi, observasi, pembelajaran mandiri, kegiatan non-mengajar, hingga diskusi refleksi akhir — yang paling menarik dan berkesan bagi saya adalah proses merancang dan melaksanakan pembelajaran mandiri dengan mengintegrasikan pendekatan Pembelajaran Mendalam, Teaching at the Right Level (TaRL), dan Culturally Responsive Teaching (CRT). Bagi saya, tahap ini adalah momen di mana seluruh teori yang saya pelajari secara terpisah di berbagai mata kuliah sebelumnya — termasuk Desain Universal untuk Pembelajaran di mata kuliah Pembelajaran Mendalam dan Asesmen Lanjut — akhirnya benar-benar terintegrasi dan diuji dalam praktik nyata, bukan lagi sekadar konsep di atas kertas. Sebagai calon guru dengan latar belakang Teknik Informatika, momen ini terasa istimewa karena menjadi bukti bahwa saya mampu menerjemahkan pengetahuan pedagogis yang saya pelajari selama PPG menjadi rancangan pembelajaran yang benar-benar bisa dijalankan secara mandiri di kelas.",
        challenge: "Tantangan yang paling menonjol bagi saya dalam merancang dan melaksanakan pembelajaran mandiri adalah mengintegrasikan tiga pendekatan sekaligus — Pembelajaran Mendalam, TaRL, dan CRT — dalam satu rancangan pembelajaran yang koheren, bukan menerapkannya secara terpisah-pisah. TaRL menuntut saya mengelompokkan murid sesuai tingkat kemampuan aktual mereka (bukan berdasarkan usia atau kelas semata), sementara CRT menuntut saya peka terhadap latar belakang budaya murid yang beragam, dan Pembelajaran Mendalam menuntut kebermaknaan serta keterlibatan penuh murid dalam prosesnya. Sebagai calon guru tanpa latar belakang kependidikan formal sebelumnya, saya merasa perlu ekstra usaha untuk memahami bagaimana ketiga pendekatan ini bisa saling melengkapi, bukan justru tumpang tindih atau membingungkan dalam praktiknya. Kesulitan lain adalah melakukan semuanya secara mandiri, tanpa bimbingan intensif seperti saat PPL Terbimbing — saya harus lebih percaya diri mengambil keputusan pedagogis sendiri, sekaligus tetap terbuka menerima umpan balik dari guru pamong dan dosen pembimbing setelah pembelajaran berlangsung. Mengapa hal ini terjadi: karena mengintegrasikan berbagai pendekatan pembelajaran ke dalam satu rancangan yang utuh membutuhkan jam terbang dan pengalaman mengajar yang belum banyak saya miliki, mengingat latar belakang saya yang berbeda dari rekan-rekan berlatar belakang kependidikan.",
        concept: "Konsep utama yang paling bermakna dari pengalaman ini adalah bahwa merancang pembelajaran yang bermakna memerlukan sintesis dari berbagai pendekatan, bukan memilih salah satu secara eksklusif. Pembelajaran Mendalam memberi arah tentang bagaimana pembelajaran seharusnya bermakna, menyenangkan, dan berkesadaran; TaRL memberi kerangka tentang bagaimana menyesuaikan tingkat kesulitan pembelajaran dengan kemampuan aktual murid, bukan asumsi berdasarkan jenjang kelas; dan CRT memberi kepekaan tentang bagaimana konteks budaya dan latar belakang murid perlu dihargai dan dijadikan jembatan dalam proses belajar. Ketiganya, ketika diintegrasikan, menghasilkan rancangan pembelajaran yang benar-benar berpihak pada peserta didik secara utuh — bukan hanya dari sisi akademik, tetapi juga sosial dan kultural. Saya juga menyadari bahwa proses merancang secara mandiri ini adalah wujud nyata dari evaluasi diri dan perbaikan berkelanjutan — setiap pembelajaran yang saya laksanakan menjadi bahan refleksi untuk memperbaiki rancangan berikutnya, sejalan dengan prinsip pola pikir bertumbuh yang menjadi landasan PPG secara keseluruhan.",
        change: "Setelah menjalani PPL Mandiri dengan fokus merancang dan melaksanakan pembelajaran terintegrasi ini, saya ingin terus mengasah kemampuan saya dalam menyusun rancangan pembelajaran yang secara sadar mempertimbangkan kesiapan belajar murid (TaRL), latar belakang budaya mereka (CRT), dan kebermaknaan pembelajaran secara holistik (Pembelajaran Mendalam) — bukan lagi merancang pembelajaran secara generik lalu menyesuaikan setelahnya. Perubahan konkret yang ingin saya lakukan ke depan antara lain: melakukan asesmen awal yang lebih cermat untuk memetakan kesiapan belajar murid sebelum merancang pembelajaran, secara aktif menggali latar belakang budaya dan konteks murid saya sebagai bahan merancang aktivitas yang relevan, serta memanfaatkan kemampuan teknis saya dari latar belakang Teknik Informatika untuk mengintegrasikan teknologi secara tepat guna dalam pembelajaran berbasis proyek, sebagaimana yang menjadi salah satu capaian mata kuliah ini."
      }
    }
  ];

  var root = document.getElementById("timeline-root-2");
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
      '<span class="tl-v-tag">Semester 2 · Mata Kuliah ' + (index + 1) + '</span>' +
      '<h3>' + course.title + '</h3>' +
      '<div class="tl-v-body">' +
        '<p>' + course.summary + '</p>' +
        '<button type="button" class="btn btn-ghost btn-sm js-open-modal">Lihat Refleksi 4C</button>' +
      '</div>';

    card.addEventListener("click", function (e) {
      if (e.target.closest(".js-open-modal")) return;
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

  /* ---------------- Modal (shared overlay with Semester 1) ---------------- */
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