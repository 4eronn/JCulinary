/* ============================================================= JAPANESE CULINARY ARCHIVE APP SCRIPT */

/* 1. In-Memory State */
const AppState = {
  isAuth: false,
  currentUserEmail: '',
  kotowazaIndex: 0,
  isPlayingAudio: false,
  failedLoginCount: 0,
  authMode: 'login',
  
  kotowazaList: [
    { kanji: "七転び八起き", romaji: "Nanakorobi yaoki", makna: "Jatuh tujuh kali, bangkit delapan kali. Kalau hari ini capek belajar Kanji, besok kita obati dengan nongkrong bareng sambil jajan." },
    { kanji: "一期一会", romaji: "Ichigo ichie", makna: "Satu kali, satu pertemuan. Hargai setiap detik kumpul bareng, karena obrolan seru malam ini tidak akan pernah terulang sama persis." },
    { kanji: "継続は力なり", romaji: "Keizoku wa chikara nari", makna: "Konsistensi adalah kekuatan. Rutin nongkrong dan main setiap minggu bikin pertemanan makin erat." },
    { kanji: "笑う門には福来る", romaji: "Warau kado ni wa fuku kitaru", makna: "Kebahagiaan selalu datang ke tempat yang penuh tawa. Kumpul bareng teman adalah obat penat paling ampuh." },
    { kanji: "和敬清寂", romaji: "Wakei seijaku", makna: "Harmoni, rasa hormat, kemurnian, dan ketenangan jiwa. Nikmati waktu santai bersama teman-teman." },
    { kanji: "温故知新", romaji: "Onko chishin", makna: "Mengenal masa lalu untuk menemukan hal baru. Dari tempat nongkrong lama sampai tempat jajan baru, ayo dicoba." },
    { kanji: "石の上にも三年", romaji: "Ishi no ue ni mo sannen", makna: "Duduk di atas batu dingin pun akan hangat setelah tiga tahun. Kesabaran selalu membuahkan hasil." },
    { kanji: "十人十色", romaji: "Juu nin to iro", makna: "Sepuluh orang, sepuluh warna. Ada yang suka ngobrol, main game, jajan manis, atau cuma numpang tidur, semua tetap satu circle." },
    { kanji: "雨降って地固まる", romaji: "Ame futte ji katamaru", makna: "Setelah hujan turun, tanah menjadi kokoh. Kehujanan bareng saat naik motor malam hari justru jadi cerita paling diingat." },
    { kanji: "切磋琢磨", romaji: "Sessa takuma", makna: "Saling mengasah dan mendukung satu sama lain. Belajar bareng, main bareng, jajan bareng." },
    { kanji: "能ある鷹は爪を隠す", romaji: "Nou aru taka wa tsume wo kakusu", makna: "Elang berbakat menyembunyikan cakarnya. Kelihatannya cuma hobi nongkrong, tapi pas ujian nilainya tetap aman." },
    { kanji: "塵も積もれば山となる", romaji: "Chiri mo tsumoreba yama to naru", makna: "Sedikit demi sedikit lama-lama menjadi bukit. Kumpulan uang kas receh bisa dipakai buat acara main bersama." },
    { kanji: "初志貫徹", romaji: "Shoshi kantetsu", makna: "Teguh pada niat awal. Dari awal janjian kumpul jam 7 malam, pantang pulang sebelum semua puas ngobrol." },
    { kanji: "明日は明日の風が吹く", romaji: "Ashita wa ashita no kaze ga fuku", makna: "Besok angin hari esok yang berhembus. Jangan pusingkan tugas hari ini, mari rehat dan senang-senang dulu." },
    { kanji: "案ずるより産むが易し", romaji: "Anzuru yori umu ga yasashi", makna: "Mencobanya lebih mudah daripada mengkhawatirkannya. Rencana jalan jangan cuma jadi wacana, langsung berangkat saja." },
    { kanji: "初心忘るべからず", romaji: "Shoshin wasuru bekarazu", makna: "Jangan lupakan awal mula. Ingat pertama kali ketemu di kelas bahasa Jepang yang canggung sampai akhirnya seakrab sekarang." },
    { kanji: "千里の道も一歩から", romaji: "Senri no michi mo ippo kara", makna: "Perjalanan seribu mil dimulai dari satu langkah pertama. Dari jajan gorengan pinggir jalan sampai rencana liburan bareng." },
    { kanji: "日進月歩", romaji: "Nisshin geppo", makna: "Kemajuan hari demi hari. Kosakata bahasa Jepang nambah sedikit, tapi koleksi cerita nongkrong nambah banyak." },
    { kanji: "自業自得", romaji: "Jigou jitoku", makna: "Menuai apa yang ditanam. Siapa suruh begadang main game bareng, paginya ngantuk pas kelas." },
    { kanji: "花より団子", romaji: "Hana yori dango", makna: "Lebih memilih kue dango daripada bunga. Daripada cuma foto estetik, yang penting jajannya habis dinikmati bersama." },
    { kanji: "井の中の蛙大海を知らず", romaji: "I no naka no kawazu taikai wo shirazu", makna: "Katak dalam tempurung. Jangan cuma nongkrong di satu tempat, ayo jelajahi tempat seru lainnya." },
    { kanji: "百聞は一見に如かず", romaji: "Hyakubun wa ikken ni shikazu", makna: "Mendengar seratus kali tak sebanding melihat sekali. Kalau ada tempat main baru, langsung datang dan buktikan sendiri." },
    { kanji: "禍を転じて福と為す", romaji: "Wazawai wo tenjite fuku to nasu", makna: "Mengubah kesulitan jadi keberuntungan. Tempat tujuan pertama tutup, untung pindah ke tempat kedua yang ternyata lebih seru." },
    { kanji: "猿も木から落ちる", romaji: "Saru mo ki kara ochiru", makna: "Monyet pun bisa jatuh dari pohon. Siapapun bisa salah jalan saat konvoi, nikmati saja perjalanannya." },
    { kanji: "光陰矢の如し", romaji: "Kouin ya no gotoshi", makna: "Waktu berlalu secepat anak panah. Tidak terasa kebersamaan di Japanese Club ini sudah melewati banyak cerita." },
    { kanji: "一山越えてまた一山", romaji: "Hito yama koete mata hito yama", makna: "Melewati satu rintangan, bertemu yang lain. Habis pusing ujian kelas, lanjut pusing nentuin tempat nongkrong." },
    { kanji: "一石二鳥", romaji: "Isseki nichou", makna: "Sekali merengkuh dayung, dua tiga pulau terlampaui. Kumpul santai sambil latihan ngomong bahasa Jepang bareng teman circle." },
    { kanji: "急がば回れ", romaji: "Isogaba maware", makna: "Bila tergesa-gesa, pilihlah jalan yang aman. Nikmati proses nongkrong tanpa harus buru-buru pulang." },
    { kanji: "自画自賛", romaji: "Jiga jisan", makna: "Memuji diri sendiri. Merasa rekomendasi tempat nongkrong pilihan sendiri paling juara di grup." },
    { kanji: "臥薪嘗胆", romaji: "Gashin shoutan", makna: "Berjuang pantang menyerah. Rela keliling malam-malam demi mencari tempat ngobrol yang masih buka." }
  ],

  galleryList: [
  {
    "title": "Kumpul Circle #1",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0000.jpg",
    "video": "",
    "isVideo": false,
    "author": "Yasha",
    "avatar": "Asset Foto/Yasha.jpeg"
  },
  {
    "title": "Kumpul Circle #2",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0001.jpg",
    "video": "",
    "isVideo": false,
    "author": "Alex",
    "avatar": "Asset Foto/Alex.jpeg"
  },
  {
    "title": "Kumpul Circle #3",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0004.jpg",
    "video": "",
    "isVideo": false,
    "author": "Ilma",
    "avatar": "Asset Foto/Ilma.jpeg"
  },
  {
    "title": "Kumpul Circle #4",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0005.jpg",
    "video": "",
    "isVideo": false,
    "author": "Mail",
    "avatar": "Asset Foto/Mail.jpeg"
  },
  {
    "title": "Kumpul Circle #5",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0006.jpg",
    "video": "",
    "isVideo": false,
    "author": "Sigit",
    "avatar": "Asset Foto/Sigit.jpeg"
  },
  {
    "title": "Kumpul Circle #6",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0007.jpg",
    "video": "",
    "isVideo": false,
    "author": "Shafira",
    "avatar": "Asset Foto/Shafira.jpeg"
  },
  {
    "title": "Kumpul Circle #7",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0008.jpg",
    "video": "",
    "isVideo": false,
    "author": "Amel",
    "avatar": "Asset Foto/Amel.jpeg"
  },
  {
    "title": "Kumpul Circle #8",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0009.jpg",
    "video": "",
    "isVideo": false,
    "author": "Zahwa",
    "avatar": "Asset Foto/Zahwa.jpeg"
  },
  {
    "title": "Kumpul Circle #9",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0010.jpg",
    "video": "",
    "isVideo": false,
    "author": "Yasha",
    "avatar": "Asset Foto/Yasha.jpeg"
  },
  {
    "title": "Kumpul Circle #10",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0011.jpg",
    "video": "",
    "isVideo": false,
    "author": "Alex",
    "avatar": "Asset Foto/Alex.jpeg"
  },
  {
    "title": "Kumpul Circle #11",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0012.jpg",
    "video": "",
    "isVideo": false,
    "author": "Ilma",
    "avatar": "Asset Foto/Ilma.jpeg"
  },
  {
    "title": "Kumpul Circle #12",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0013.jpg",
    "video": "",
    "isVideo": false,
    "author": "Mail",
    "avatar": "Asset Foto/Mail.jpeg"
  },
  {
    "title": "Kumpul Circle #13",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0014.jpg",
    "video": "",
    "isVideo": false,
    "author": "Sigit",
    "avatar": "Asset Foto/Sigit.jpeg"
  },
  {
    "title": "Kumpul Circle #14",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0015.jpg",
    "video": "",
    "isVideo": false,
    "author": "Shafira",
    "avatar": "Asset Foto/Shafira.jpeg"
  },
  {
    "title": "Kumpul Circle #15",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0016.jpg",
    "video": "",
    "isVideo": false,
    "author": "Amel",
    "avatar": "Asset Foto/Amel.jpeg"
  },
  {
    "title": "Kumpul Circle #16",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0017.jpg",
    "video": "",
    "isVideo": false,
    "author": "Zahwa",
    "avatar": "Asset Foto/Zahwa.jpeg"
  },
  {
    "title": "Kumpul Circle #17",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0018.jpg",
    "video": "",
    "isVideo": false,
    "author": "Yasha",
    "avatar": "Asset Foto/Yasha.jpeg"
  },
  {
    "title": "Kumpul Circle #18",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0019.jpg",
    "video": "",
    "isVideo": false,
    "author": "Alex",
    "avatar": "Asset Foto/Alex.jpeg"
  },
  {
    "title": "Kumpul Circle #19",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0020.jpg",
    "video": "",
    "isVideo": false,
    "author": "Ilma",
    "avatar": "Asset Foto/Ilma.jpeg"
  },
  {
    "title": "Kumpul Circle #20",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0021.jpg",
    "video": "",
    "isVideo": false,
    "author": "Mail",
    "avatar": "Asset Foto/Mail.jpeg"
  },
  {
    "title": "Kumpul Circle #21",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0022.jpg",
    "video": "",
    "isVideo": false,
    "author": "Sigit",
    "avatar": "Asset Foto/Sigit.jpeg"
  },
  {
    "title": "Kumpul Circle #22",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0023.jpg",
    "video": "",
    "isVideo": false,
    "author": "Shafira",
    "avatar": "Asset Foto/Shafira.jpeg"
  },
  {
    "title": "Kumpul Circle #23",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0024.jpg",
    "video": "",
    "isVideo": false,
    "author": "Amel",
    "avatar": "Asset Foto/Amel.jpeg"
  },
  {
    "title": "Kumpul Circle #24",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0025.jpg",
    "video": "",
    "isVideo": false,
    "author": "Zahwa",
    "avatar": "Asset Foto/Zahwa.jpeg"
  },
  {
    "title": "Kumpul Circle #25",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0026.jpg",
    "video": "",
    "isVideo": false,
    "author": "Yasha",
    "avatar": "Asset Foto/Yasha.jpeg"
  },
  {
    "title": "Kumpul Circle #26",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0027.jpg",
    "video": "",
    "isVideo": false,
    "author": "Alex",
    "avatar": "Asset Foto/Alex.jpeg"
  },
  {
    "title": "Kumpul Circle #27",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0028.jpg",
    "video": "",
    "isVideo": false,
    "author": "Ilma",
    "avatar": "Asset Foto/Ilma.jpeg"
  },
  {
    "title": "Kumpul Circle #28",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0029.jpg",
    "video": "",
    "isVideo": false,
    "author": "Mail",
    "avatar": "Asset Foto/Mail.jpeg"
  },
  {
    "title": "Kumpul Circle #29",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0030.jpg",
    "video": "",
    "isVideo": false,
    "author": "Sigit",
    "avatar": "Asset Foto/Sigit.jpeg"
  },
  {
    "title": "Kumpul Circle #30",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0032.jpg",
    "video": "",
    "isVideo": false,
    "author": "Shafira",
    "avatar": "Asset Foto/Shafira.jpeg"
  },
  {
    "title": "Kumpul Circle #31",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0033.jpg",
    "video": "",
    "isVideo": false,
    "author": "Amel",
    "avatar": "Asset Foto/Amel.jpeg"
  },
  {
    "title": "Kumpul Circle #32",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0035.jpg",
    "video": "",
    "isVideo": false,
    "author": "Zahwa",
    "avatar": "Asset Foto/Zahwa.jpeg"
  },
  {
    "title": "Kumpul Circle #33",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0036.jpg",
    "video": "",
    "isVideo": false,
    "author": "Yasha",
    "avatar": "Asset Foto/Yasha.jpeg"
  },
  {
    "title": "Kumpul Circle #34",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0037.jpg",
    "video": "",
    "isVideo": false,
    "author": "Alex",
    "avatar": "Asset Foto/Alex.jpeg"
  },
  {
    "title": "Kumpul Circle #35",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0038.jpg",
    "video": "",
    "isVideo": false,
    "author": "Ilma",
    "avatar": "Asset Foto/Ilma.jpeg"
  },
  {
    "title": "Kumpul Circle #36",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0039.jpg",
    "video": "",
    "isVideo": false,
    "author": "Mail",
    "avatar": "Asset Foto/Mail.jpeg"
  },
  {
    "title": "Kumpul Circle #37",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0040.jpg",
    "video": "",
    "isVideo": false,
    "author": "Sigit",
    "avatar": "Asset Foto/Sigit.jpeg"
  },
  {
    "title": "Kumpul Circle #38",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0042.jpg",
    "video": "",
    "isVideo": false,
    "author": "Shafira",
    "avatar": "Asset Foto/Shafira.jpeg"
  },
  {
    "title": "Kumpul Circle #39",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0043.jpg",
    "video": "",
    "isVideo": false,
    "author": "Amel",
    "avatar": "Asset Foto/Amel.jpeg"
  },
  {
    "title": "Kumpul Circle #40",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0044.jpg",
    "video": "",
    "isVideo": false,
    "author": "Zahwa",
    "avatar": "Asset Foto/Zahwa.jpeg"
  },
  {
    "title": "Kumpul Circle #41",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0045.jpg",
    "video": "",
    "isVideo": false,
    "author": "Yasha",
    "avatar": "Asset Foto/Yasha.jpeg"
  },
  {
    "title": "Kumpul Circle #42",
    "cat": "KUMPUL CIRCLE",
    "date": "Oktober 2026",
    "desc": "Momen kebersamaan, cerita santai, dan keseruan anggota Japanese Club.",
    "img": "Foto Galeri/IMG-20261003-WA0046.jpg",
    "video": "",
    "isVideo": false,
    "author": "Alex",
    "avatar": "Asset Foto/Alex.jpeg"
  },
  {
    "title": "Sesi Kegiatan #1",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0001_20260315_201725_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Ilma",
    "avatar": "Asset Foto/Ilma.jpeg"
  },
  {
    "title": "Sesi Kegiatan #2",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0002_20260315_201741_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Mail",
    "avatar": "Asset Foto/Mail.jpeg"
  },
  {
    "title": "Sesi Kegiatan #3",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0003_20260315_201756_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Sigit",
    "avatar": "Asset Foto/Sigit.jpeg"
  },
  {
    "title": "Sesi Kegiatan #4",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0004_20260315_201816_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Shafira",
    "avatar": "Asset Foto/Shafira.jpeg"
  },
  {
    "title": "Sesi Kegiatan #5",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0005_20260315_201836_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Amel",
    "avatar": "Asset Foto/Amel.jpeg"
  },
  {
    "title": "Sesi Kegiatan #6",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0006_20260315_201850_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Zahwa",
    "avatar": "Asset Foto/Zahwa.jpeg"
  },
  {
    "title": "Sesi Kegiatan #7",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0007_20260315_201914_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Yasha",
    "avatar": "Asset Foto/Yasha.jpeg"
  },
  {
    "title": "Sesi Kegiatan #8",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0008_20260315_201930_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Alex",
    "avatar": "Asset Foto/Alex.jpeg"
  },
  {
    "title": "Sesi Kegiatan #9",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0223_20260315_202251_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Ilma",
    "avatar": "Asset Foto/Ilma.jpeg"
  },
  {
    "title": "Sesi Kegiatan #10",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0224_20260315_202309_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Mail",
    "avatar": "Asset Foto/Mail.jpeg"
  },
  {
    "title": "Sesi Kegiatan #11",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0225_20260315_202322_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Sigit",
    "avatar": "Asset Foto/Sigit.jpeg"
  },
  {
    "title": "Sesi Kegiatan #12",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0226_20260315_202339_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Shafira",
    "avatar": "Asset Foto/Shafira.jpeg"
  },
  {
    "title": "Sesi Kegiatan #13",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0227_20260315_202356_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Amel",
    "avatar": "Asset Foto/Amel.jpeg"
  },
  {
    "title": "Sesi Kegiatan #14",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0228_20260315_202410_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Zahwa",
    "avatar": "Asset Foto/Zahwa.jpeg"
  },
  {
    "title": "Sesi Kegiatan #15",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0229_20260315_202422_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Yasha",
    "avatar": "Asset Foto/Yasha.jpeg"
  },
  {
    "title": "Sesi Kegiatan #16",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0230_20260315_202437_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Alex",
    "avatar": "Asset Foto/Alex.jpeg"
  },
  {
    "title": "Sesi Kegiatan #17",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0231_20260315_202454_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Ilma",
    "avatar": "Asset Foto/Ilma.jpeg"
  },
  {
    "title": "Sesi Kegiatan #18",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0232_20260315_202508_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Mail",
    "avatar": "Asset Foto/Mail.jpeg"
  },
  {
    "title": "Sesi Kegiatan #19",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0233_20260315_202616_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Sigit",
    "avatar": "Asset Foto/Sigit.jpeg"
  },
  {
    "title": "Sesi Kegiatan #20",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0234_20260315_202632_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Shafira",
    "avatar": "Asset Foto/Shafira.jpeg"
  },
  {
    "title": "Sesi Kegiatan #21",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0235_20260315_202648_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Amel",
    "avatar": "Asset Foto/Amel.jpeg"
  },
  {
    "title": "Sesi Kegiatan #22",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0236_20260315_202704_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Zahwa",
    "avatar": "Asset Foto/Zahwa.jpeg"
  },
  {
    "title": "Sesi Kegiatan #23",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0237_20260315_202716_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Yasha",
    "avatar": "Asset Foto/Yasha.jpeg"
  },
  {
    "title": "Sesi Kegiatan #24",
    "cat": "SESI KEGIATAN",
    "date": "Maret 2026",
    "desc": "Potret kenangan dan dokumentasi kegiatan seru circle Japanese Club.",
    "img": "Foto Galeri/IMG_0238_20260315_202733_3600.jpeg",
    "video": "",
    "isVideo": false,
    "author": "Alex",
    "avatar": "Asset Foto/Alex.jpeg"
  },
  {
    "title": "Video Circle #1",
    "cat": "VIDEO ARCHIVE",
    "date": "Oktober 2026",
    "desc": "Cuplikan video rekaman keseruan momen dan tawa circle saat kumpul bareng.",
    "img": "",
    "video": "Foto Galeri/VID-20261003-WA0047.mp4",
    "isVideo": true,
    "author": "Ilma",
    "avatar": "Asset Foto/Ilma.jpeg"
  },
  {
    "title": "Video Circle #2",
    "cat": "VIDEO ARCHIVE",
    "date": "Oktober 2026",
    "desc": "Cuplikan video rekaman keseruan momen dan tawa circle saat kumpul bareng.",
    "img": "",
    "video": "Foto Galeri/VID-20261003-WA0048.mp4",
    "isVideo": true,
    "author": "Mail",
    "avatar": "Asset Foto/Mail.jpeg"
  },
  {
    "title": "Video Circle #3",
    "cat": "VIDEO ARCHIVE",
    "date": "Oktober 2026",
    "desc": "Cuplikan video rekaman keseruan momen dan tawa circle saat kumpul bareng.",
    "img": "",
    "video": "Foto Galeri/VID-20261003-WA0049.mp4",
    "isVideo": true,
    "author": "Sigit",
    "avatar": "Asset Foto/Sigit.jpeg"
  },
  {
    "title": "Video Circle #4",
    "cat": "VIDEO ARCHIVE",
    "date": "Oktober 2026",
    "desc": "Cuplikan video rekaman keseruan momen dan tawa circle saat kumpul bareng.",
    "img": "",
    "video": "Foto Galeri/VID-20261003-WA0050.mp4",
    "isVideo": true,
    "author": "Shafira",
    "avatar": "Asset Foto/Shafira.jpeg"
  },
  {
    "title": "Video Circle #5",
    "cat": "VIDEO ARCHIVE",
    "date": "Oktober 2026",
    "desc": "Cuplikan video rekaman keseruan momen dan tawa circle saat kumpul bareng.",
    "img": "",
    "video": "Foto Galeri/VID-20261003-WA0051.mp4",
    "isVideo": true,
    "author": "Amel",
    "avatar": "Asset Foto/Amel.jpeg"
  },
  {
    "title": "Video Circle #6",
    "cat": "VIDEO ARCHIVE",
    "date": "Oktober 2026",
    "desc": "Cuplikan video rekaman keseruan momen dan tawa circle saat kumpul bareng.",
    "img": "",
    "video": "Foto Galeri/VID-20261003-WA0052.mp4",
    "isVideo": true,
    "author": "Zahwa",
    "avatar": "Asset Foto/Zahwa.jpeg"
  }
],

  messages: []
};

/* 2. Parallax Intro Background (3D Depth pada Background Saja, Tulisan Tetap Stabil) */
function initIntro3DTilt() {
  const introPortal = document.getElementById('intro-portal');
  const bgEl = document.getElementById('intro-bg-el');

  if (!introPortal || !bgEl) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let animId = null;
  let isPortalActive = true;

  introPortal.addEventListener('mousemove', (e) => {
    if (!isPortalActive) return;
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    targetX = (e.clientX / w - 0.5) * 2;
    targetY = (e.clientY / h - 0.5) * 2;
  }, { passive: true });

  introPortal.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });

  function renderTilt() {
    if (!isPortalActive) return;
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    // Hanya layer background yang bergeser untuk depth 3D, tulisan tetap diam & stabil
    bgEl.style.transform = `scale(1.06) translate(${currentX * -18}px, ${currentY * -18}px)`;

    animId = requestAnimationFrame(renderTilt);
  }

  animId = requestAnimationFrame(renderTilt);

  window.addEventListener('portalDismissed', () => {
    isPortalActive = false;
    if (animId) cancelAnimationFrame(animId);
  });
}

/* 3. Audio Controller & Custom Skip Logic (04:57 -> 08:58) */
const SKIP_START = 297; // 4 minutes 57 seconds = 297s
const SKIP_TARGET = 538; // 8 minutes 58 seconds = 538s

function initAudioEngine() {
  const audio = document.getElementById('bgm-audio');
  const timerEl = document.getElementById('music-timer');
  if (!audio) return;

  audio.addEventListener('timeupdate', () => {
    const current = audio.currentTime;
    
    // Automatic Skip: When reaching 4:57, jump straight to 8:58
    if (current >= SKIP_START && current < SKIP_TARGET) {
      audio.currentTime = SKIP_TARGET;
    }

    if (timerEl) {
      const mins = Math.floor(audio.currentTime / 60);
      const secs = Math.floor(audio.currentTime % 60);
      const formatted = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
      timerEl.innerText = formatted;
    }
  });
}

function enterExperience() {
  window.dispatchEvent(new CustomEvent('portalDismissed'));
  const portal = document.getElementById('intro-portal');
  if (portal) {
    portal.classList.add('portal-hidden');
    setTimeout(() => {
      portal.style.display = 'none';
    }, 900);
  }

  playAudio();
  showToast("Selamat datang di Japanese Club! 🌸 Menikmati musik BGM...");
  triggerMascotReaction("Mari jelajahi arsip kenangan circle! ⛩️");
}

function playAudio() {
  const audio = document.getElementById('bgm-audio');
  const waves = document.getElementById('music-waves-el');
  const icon = document.getElementById('music-icon');
  if (!audio) return;

  audio.play().then(() => {
    AppState.isPlayingAudio = true;
    if (waves) waves.classList.remove('paused');
    if (icon) icon.className = 'fa-solid fa-pause';
  }).catch(e => {
    console.log('Audio autoplay prevented or waiting user gesture:', e);
  });
}

function toggleAudio() {
  const audio = document.getElementById('bgm-audio');
  const waves = document.getElementById('music-waves-el');
  const icon = document.getElementById('music-icon');
  if (!audio) return;

  if (AppState.isPlayingAudio) {
    audio.pause();
    AppState.isPlayingAudio = false;
    if (waves) waves.classList.add('paused');
    if (icon) icon.className = 'fa-solid fa-play';
    showToast("Musik dijeda.");
  } else {
    audio.play().then(() => {
      AppState.isPlayingAudio = true;
      if (waves) waves.classList.remove('paused');
      if (icon) icon.className = 'fa-solid fa-pause';
      showToast("Memutar YOASOBI Piano BGM...");
    });
  }
}

/* 4. Stationary Chibi Companion (Diam di Pojok, Tetap Animasi & Interaktif) */
let chibiBubbleTimer = null;

const chibiQuotes = [
  "Nongkrong santai di circle kita~ 🎶",
  "Habis ini mau jajan apa lagi ya? 🧋",
  "Circle Japanese Club kumpul lagi! 😎",
  "Buka arsip foto yuk! ✨",
  "Nongkrong & jajan bareng selalu seru! ⛩️",
  "Konnichiwa minna-san! 👋",
  "Ayo lihat cerita kenangan kita! 🚀"
];

function initChibiCompanion() {
  const companion = document.getElementById('chibi-companion');
  if (!companion) return;

  // Dialog bubble ramah sesekali tanpa berpindah posisi
  setInterval(() => {
    if (document.hidden) return;
    if (Math.random() > 0.55) {
      const quote = chibiQuotes[Math.floor(Math.random() * chibiQuotes.length)];
      showChibiBubble(quote, 3200);
    }
  }, 8000);
}
const initChibiRoamer = initChibiCompanion;

function showChibiBubble(text, duration = 3000) {
  const bubble = document.getElementById('chibi-bubble-el');
  if (!bubble) return;
  bubble.innerText = text;
  bubble.classList.add('show');
  clearTimeout(chibiBubbleTimer);
  chibiBubbleTimer = setTimeout(() => {
    bubble.classList.remove('show');
  }, duration);
}

function petMascot() {
  const companion = document.getElementById('chibi-companion');
  if (!companion) return;
  companion.classList.add('dance');
  const danceQuotes = [
    "Jikul Jaya Jaya Jaya",
    "When Kumpul Lagi GESSS",
    "Syudududu",
    "Senang bisa kumpul bareng kalian!"
  ];
  const q = danceQuotes[Math.floor(Math.random() * danceQuotes.length)];
  showChibiBubble(q, 3500);
  setTimeout(() => {
    companion.classList.remove('dance');
  }, 900);
}

function triggerMascotReaction(customMsg = null) {
  const companion = document.getElementById('chibi-companion');
  if (!companion) return;

  companion.classList.add('dance');
  if (customMsg) {
    showChibiBubble(customMsg, 3000);
  }

  setTimeout(() => {
    companion.classList.remove('dance');
  }, 900);
}

/* 5. Mascot Facial Expressions & Meme Login Reactions */
function setMascotState(state) {
  const wrap = document.getElementById('login-mascot-wrap-el');
  const imgEl = document.getElementById('login-mascot-img-el');
  const bubble = document.getElementById('mascot-bubble-text');

  if (!wrap || !imgEl) return;

  wrap.classList.remove('mascot-state-fail1', 'mascot-state-fail2', 'mascot-state-success');

  if (state === 'idle') {
    imgEl.src = 'mascot-cutout.png';
    if (bubble) {
      bubble.style.display = 'block';
      bubble.innerText = "Yo! Masuk akun circle ya 😎";
    }
  } else if (state === 'fail1') {
    // 1st Fail -> Gambar 1: Bebek teriak ledakan nuklir
    wrap.classList.add('mascot-state-fail1');
    imgEl.src = 'login-fail-1.png';
    if (bubble) bubble.style.display = 'none';
  } else if (state === 'fail2') {
    // 2nd Fail -> Gambar 2: Hamster cangkir kopi ledakan nuklir
    wrap.classList.add('mascot-state-fail2');
    imgEl.src = 'login-fail-2.png';
    if (bubble) bubble.style.display = 'none';
  } else if (state === 'success') {
    // Success -> Gambar 3: Hamster bentuk hati
    wrap.classList.add('mascot-state-success');
    imgEl.src = 'login-success.png';
    if (bubble) bubble.style.display = 'none';
  }
}

/* 6. Three.js Ambient Sunlight Particles */
let scene, camera, renderer, emberGroup;
let targetMX = 0, targetMY = 0, curMX = 0, curMY = 0, curScroll = 0, targetScroll = 0;

function initForest3D() {
  const canvas = document.getElementById('gl');
  const forestBg = document.getElementById('forest-bg-el');
  if (!canvas || typeof THREE === 'undefined') return;

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a2618, 0.005);

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 28;
  camera.position.y = 2;

  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const ambLight = new THREE.AmbientLight(0x10b981, 1.2);
  scene.add(ambLight);

  const sunLight = new THREE.PointLight(0xfef08a, 2.8, 60);
  sunLight.position.set(0, 16, 6);
  scene.add(sunLight);

  emberGroup = new THREE.Group();
  const embGeom = new THREE.SphereGeometry(0.06, 8, 8);
  const embMat = new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.8 });

  for (let i = 0; i < 75; i++) {
    const m = new THREE.Mesh(embGeom, embMat);
    m.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 35, (Math.random() - 0.5) * 35);
    m.userData = { vy: 0.008 + Math.random() * 0.014, vx: (Math.random() - 0.5) * 0.006 };
    emberGroup.add(m);
  }
  scene.add(emberGroup);

  window.addEventListener('mousemove', (e) => {
    targetMX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMY = (e.clientY / window.innerHeight - 0.5) * 2;
    if (forestBg) {
      forestBg.style.transform = `scale(1.04) translate(${targetMX * -12}px, ${targetMY * -12}px)`;
    }
  });

  window.addEventListener('scroll', () => {
    targetScroll = window.scrollY * 0.0025;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function renderLoop() {
    requestAnimationFrame(renderLoop);
    curMX += (targetMX - curMX) * 0.05;
    curMY += (targetMY - curMY) * 0.05;
    curScroll += (targetScroll - curScroll) * 0.08;

    camera.position.x = curMX * 1.8;
    camera.position.y = 2 - curMY * 1.2 - curScroll;
    camera.lookAt(0, -curScroll * 0.5, -14);

    if (emberGroup) {
      emberGroup.children.forEach(em => {
        em.position.y += em.userData.vy;
        em.position.x += em.userData.vx;
        if (em.position.y > 22) em.position.y = -18;
      });
    }

    renderer.render(scene, camera);
  }
  renderLoop();
}

/* 7. Reveal System */
function initScrollReveal() {
  const elements = document.querySelectorAll('[data-rv]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('rv-in');
      }
    });
  }, { threshold: 0.1 });
  elements.forEach(el => observer.observe(el));
}

/* 8. Toast */
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  const msgEl = document.getElementById('toast-msg');
  if (!t || !msgEl) return;
  msgEl.innerText = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

/* 9. Kotowaza Logic */
function renderKotowaza(idx) {
  AppState.kotowazaIndex = idx;
  const item = AppState.kotowazaList[idx];
  document.getElementById('kw-index').innerText = (idx + 1);
  document.getElementById('kw-kanji').innerText = item.kanji;
  document.getElementById('kw-romaji').innerText = item.romaji;
  document.getElementById('kw-meaning').innerText = `"${item.makna}"`;
}

function shuffleKotowaza() {
  let next;
  do {
    next = Math.floor(Math.random() * AppState.kotowazaList.length);
  } while (next === AppState.kotowazaIndex && AppState.kotowazaList.length > 1);
  renderKotowaza(next);
  showToast("Pepatah baru dimuat!");
  triggerMascotReaction("Pepatah keren! 📜");
}

function copyKotowaza() {
  const item = AppState.kotowazaList[AppState.kotowazaIndex];
  navigator.clipboard.writeText(`${item.kanji} (${item.romaji}) - "${item.makna}"`).then(() => {
    showToast("Pepatah disalin ke clipboard!");
    triggerMascotReaction("Tersalin! ✨");
  });
}

/* 10. Gallery & 3D Coverflow Carousel */
let currentGalleryFilter = 'all';
let currentGalleryViewMode = 'coverflow';

const coverflowState = {
  pos: 0,
  target: 0,
  width: 260,
  rotate: 44,
  depth: 0.6,
  perspective: 3.2,
  falloff: 0.56,
  fade: 0.1,
  gap: 0.06,
  loop: true,
  raf: null,
  drag: null,
  items: [],
  nodes: [],
  initialized: false
};

function setGalleryViewMode(mode) {
  currentGalleryViewMode = mode;
  const cfBtn = document.getElementById('view-mode-coverflow-btn');
  const gridBtn = document.getElementById('view-mode-grid-btn');
  const cfContainer = document.getElementById('gallery-coverflow-container');
  const gridContainer = document.getElementById('gallery-container');

  if (mode === 'coverflow') {
    if (cfBtn) { cfBtn.className = 'kage-btn-primary'; }
    if (gridBtn) { gridBtn.className = 'kage-btn-secondary'; }
    if (cfContainer) cfContainer.style.display = 'block';
    if (gridContainer) gridContainer.style.display = 'none';
    renderCoverflow();
  } else {
    if (cfBtn) { cfBtn.className = 'kage-btn-secondary'; }
    if (gridBtn) { gridBtn.className = 'kage-btn-primary'; }
    if (cfContainer) cfContainer.style.display = 'none';
    if (gridContainer) gridContainer.style.display = 'grid';
    renderGalleryGrid();
  }
}

function getFilteredGalleryList() {
  let list = AppState.galleryList || [];
  if (currentGalleryFilter === 'video') {
    return list.filter(item => item.isVideo);
  } else if (currentGalleryFilter !== 'all') {
    return list.filter(item => item.cat === currentGalleryFilter);
  }
  return list;
}

function filterGallery(filterType, btnEl) {
  currentGalleryFilter = filterType;
  if (btnEl) {
    document.querySelectorAll('.gallery-filter-btn').forEach(b => {
      b.classList.remove('kage-btn-primary', 'active');
      b.classList.add('kage-btn-secondary');
    });
    btnEl.classList.remove('kage-btn-secondary');
    btnEl.classList.add('kage-btn-primary', 'active');
  }
  renderGallery();
}

function handleStoryMouseEnter(el) {
  const vid = el.querySelector('video');
  if (vid) {
    vid.play().catch(() => {});
  }
}

function handleStoryMouseLeave(el) {
  const vid = el.querySelector('video');
  if (vid) {
    vid.pause();
    try {
      vid.currentTime = 0.05;
    } catch (_) {}
  }
}

function initCoverflowStage() {
  const stage = document.getElementById('cf-stage');
  if (!stage || coverflowState.initialized) return;
  coverflowState.initialized = true;

  const onPointerDown = (event) => {
    if (coverflowState.raf !== null) {
      cancelAnimationFrame(coverflowState.raf);
      coverflowState.raf = null;
    }
    stage.setPointerCapture(event.pointerId);
    coverflowState.target = coverflowState.pos;
    coverflowState.drag = {
      id: event.pointerId,
      x: event.clientX,
      pos: coverflowState.pos,
      v: 0,
      t: performance.now()
    };
  };

  const onPointerMove = (event) => {
    const drag = coverflowState.drag;
    if (!drag || drag.id !== event.pointerId) return;

    const pitch = (coverflowState.width || 260) * (1 + coverflowState.gap);
    if (!pitch) return;

    const now = performance.now();
    const previous = coverflowState.pos;
    const count = coverflowState.items.length;
    if (!count) return;

    const newPos = drag.pos - (event.clientX - drag.x) / pitch;
    coverflowState.pos = coverflowState.loop ? newPos : Math.max(0, Math.min(count - 1, newPos));
    coverflowState.drag.v = ((coverflowState.pos - previous) / Math.max(now - drag.t, 1)) * 1000;
    coverflowState.drag.t = now;

    paintCoverflow();
  };

  const onPointerUp = (event) => {
    const drag = coverflowState.drag;
    if (!drag || drag.id !== event.pointerId) return;
    coverflowState.drag = null;

    const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
    const count = coverflowState.items.length;
    if (!count) return;

    let target = Math.round(coverflowState.pos + carried);
    if (!coverflowState.loop) {
      target = Math.max(0, Math.min(count - 1, target));
    }
    coverflowSettle(target);
  };

  stage.addEventListener('pointerdown', onPointerDown);
  stage.addEventListener('pointermove', onPointerMove);
  stage.addEventListener('pointerup', onPointerUp);
  stage.addEventListener('pointercancel', onPointerUp);

  stage.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      coverflowNudge(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      coverflowNudge(1);
    }
  });

  const measure = () => {
    const card = stage.querySelector('.coverflow-card');
    if (card) {
      coverflowState.width = card.offsetWidth || 260;
      paintCoverflow();
    }
  };

  const observer = new ResizeObserver(measure);
  observer.observe(stage);
}

function renderCoverflow() {
  const track = document.getElementById('cf-track');
  const stage = document.getElementById('cf-stage');
  if (!track || !stage) return;
  initCoverflowStage();

  const list = getFilteredGalleryList();
  coverflowState.items = list;
  track.innerHTML = '';
  coverflowState.nodes = [];

  if (list.length === 0) {
    track.innerHTML = `
      <div style="position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); text-align:center; color:var(--bone-dim);">
        <p>Tidak ada konten pada kategori ini.</p>
      </div>
    `;
    const counterEl = document.getElementById('cf-counter');
    if (counterEl) counterEl.innerText = '0 / 0';
    return;
  }

  list.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'coverflow-card';
    card.tabIndex = 0;
    card.role = 'group';
    card.setAttribute('aria-label', `Slide ${index + 1} of ${list.length}`);

    const isVid = item.isVideo || !!item.video;
    const mediaSrc = encodeURI(item.img || item.video || '');

    card.innerHTML = `
      ${isVid && !item.img ? `
        <video src="${mediaSrc}#t=0.05" class="story-media" preload="metadata" muted loop playsinline></video>
      ` : `
        <img src="${mediaSrc}" alt="" class="story-media" loading="lazy">
      `}
      ${isVid ? `
        <div style="position:absolute; top:10px; right:10px; z-index:4;">
          <span class="story-vid-badge">
            <i class="fa-solid fa-play" style="font-size:8px;"></i> Video
          </span>
        </div>
      ` : ''}
    `;

    card.addEventListener('click', (e) => {
      e.stopPropagation();
      const count = coverflowState.items.length;
      let offset = index - coverflowState.pos;
      if (coverflowState.loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }
      if (Math.abs(offset) < 0.45) {
        openLightbox(item);
      } else {
        coverflowGoTo(index);
      }
    });

    card.addEventListener('mouseenter', () => handleStoryMouseEnter(card));
    card.addEventListener('mouseleave', () => handleStoryMouseLeave(card));

    track.appendChild(card);
    coverflowState.nodes.push(card);
  });

  requestAnimationFrame(() => {
    const card = track.querySelector('.coverflow-card');
    if (card) coverflowState.width = card.offsetWidth || 260;
    coverflowState.pos = 0;
    coverflowState.target = 0;
    paintCoverflow();
  });
}

function paintCoverflow() {
  const count = coverflowState.items.length;
  if (!count || !coverflowState.nodes.length) return;

  const width = coverflowState.width || 260;
  const pitch = width * (1 + coverflowState.gap);
  const pos = coverflowState.pos;

  coverflowState.nodes.forEach((card, index) => {
    if (!card) return;

    let offset = index - pos;
    if (coverflowState.loop) {
      offset = ((offset % count) + count) % count;
      if (offset > count / 2) offset -= count;
    }

    const distance = Math.abs(offset);
    const ramp = Math.pow(distance, coverflowState.falloff);
    const tilt = Math.min(coverflowState.rotate * ramp, 82) * Math.sign(offset);

    card.style.transform = `translateX(calc(-50% + ${offset * pitch}px)) translateZ(${-coverflowState.depth * width * ramp}px) rotateY(${-tilt}deg)`;

    const edge = coverflowState.loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
    card.style.opacity = String(Math.max(0, 1 - coverflowState.fade * distance) * edge);
    card.style.zIndex = String(100 - Math.round(distance));

    if (Math.abs(offset) < 0.45) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  const curIndex = ((Math.round(pos) % count) + count) % count;
  const counterEl = document.getElementById('cf-counter');
  if (counterEl) {
    counterEl.innerText = `Slide ${curIndex + 1} / ${count}`;
  }
}

function coverflowSettle(target) {
  if (coverflowState.raf !== null) cancelAnimationFrame(coverflowState.raf);
  coverflowState.target = target;

  const step = () => {
    const remaining = coverflowState.target - coverflowState.pos;
    if (Math.abs(remaining) < 0.0004) {
      coverflowState.pos = coverflowState.target;
      paintCoverflow();
      coverflowState.raf = null;
      return;
    }
    coverflowState.pos += remaining * 0.16;
    paintCoverflow();
    coverflowState.raf = requestAnimationFrame(step);
  };
  coverflowState.raf = requestAnimationFrame(step);
}

function coverflowNudge(by) {
  const count = coverflowState.items.length;
  if (!count) return;
  coverflowSettle(Math.round(coverflowState.target) + by);
}

function coverflowGoTo(index) {
  const count = coverflowState.items.length;
  if (!count) return;
  const target = coverflowState.loop
    ? index + Math.round((coverflowState.target - index) / count) * count
    : index;
  coverflowSettle(target);
}

function renderGalleryGrid() {
  const container = document.getElementById('gallery-container');
  if (!container) return;
  container.innerHTML = '';

  const list = getFilteredGalleryList();
  if (list.length === 0) {
    container.innerHTML = `
      <div class="kage-card" style="grid-column: 1 / -1; padding: 48px 24px; text-align: center; border-radius: 18px;">
        <div style="font-size: 32px; color: var(--gold); margin-bottom: 12px;">
          <i class="fa-solid fa-camera-retro"></i>
        </div>
        <h4 style="font-family:'Instrument Serif',serif; font-size:22px; margin:0 0 8px; color:#fff;">Galeri Kosong</h4>
        <p style="font-size:13px; color:var(--bone-dim); max-width:440px; margin:0 auto; line-height:1.6;">
          Tidak ada foto atau video pada kategori ini.
        </p>
      </div>
    `;
    return;
  }

  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'story-card';
    card.tabIndex = 0;
    card.role = 'button';
    card.onclick = () => openLightbox(item);
    card.onmouseenter = () => handleStoryMouseEnter(card);
    card.onmouseleave = () => handleStoryMouseLeave(card);

    const isVid = item.isVideo || !!item.video;
    const mediaSrc = encodeURI(item.img || item.video || '');

    card.innerHTML = `
      ${isVid && !item.img ? `
        <video src="${mediaSrc}#t=0.05" class="story-media" preload="metadata" muted loop playsinline></video>
      ` : `
        <img src="${mediaSrc}" alt="" class="story-media" loading="lazy">
      `}
      ${isVid ? `
        <div style="position:absolute; top:10px; right:10px; z-index:4;">
          <span class="story-vid-badge">
            <i class="fa-solid fa-play" style="font-size:8px;"></i> Video
          </span>
        </div>
      ` : ''}
    `;
    container.appendChild(card);
  });
}

function renderGallery() {
  if (currentGalleryViewMode === 'coverflow') {
    renderCoverflow();
  } else {
    renderGalleryGrid();
  }
}

function openLightbox(item) {
  const wrap = document.getElementById('lightbox-img-wrap');
  if (!wrap) return;

  if (item.isVideo && item.video) {
    wrap.innerHTML = `
      <video id="lb-video-player" src="${encodeURI(item.video)}" controls autoplay playsinline preload="auto" style="width:100%; max-height:75vh; object-fit:contain; display:block; margin:0 auto; background:#000; border-radius:12px;"></video>
    `;
  } else {
    wrap.innerHTML = `
      <img src="${encodeURI(item.img)}" alt="" style="width:100%; height:auto; max-height:75vh; object-fit:contain; display:block; margin:0 auto; border-radius:12px;">
    `;
  }

  const elCat = document.getElementById('lb-cat');
  const elDate = document.getElementById('lb-date');
  const elTitle = document.getElementById('lb-title');
  const elDesc = document.getElementById('lb-desc');

  if (item.cat === 'THE SQUAD PROFILE') {
    if (elCat) { elCat.style.display = 'block'; elCat.innerText = item.cat; }
    if (elDate) { elDate.style.display = 'block'; elDate.innerText = item.date || ''; }
    if (elTitle) { elTitle.style.display = 'block'; elTitle.innerText = item.title || ''; }
    if (elDesc) { elDesc.style.display = 'block'; elDesc.innerText = item.desc || ''; }
  } else {
    if (elCat) elCat.style.display = 'none';
    if (elDate) elDate.style.display = 'none';
    if (elTitle) elTitle.style.display = 'none';
    if (elDesc) elDesc.style.display = 'none';
  }

  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.add('open');
  triggerMascotReaction("Momen seru! 📸");
}

function closeLightbox() {
  const lbVid = document.getElementById('lb-video-player');
  if (lbVid) {
    lbVid.pause();
    lbVid.removeAttribute('src');
    lbVid.load();
  }
  const wrap = document.getElementById('lightbox-img-wrap');
  if (wrap) wrap.innerHTML = '';
  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.remove('open');
}

function openMemberLightbox(name, role, desc, imgSrc) {
  openLightbox({
    cat: 'THE SQUAD PROFILE',
    date: 'Japanese Club Circle',
    title: name,
    desc: `${role} - ${desc}`,
    img: imgSrc,
    isVideo: false
  });
}

/* 11. Guestbook */
function renderMessages() {
  const stream = document.getElementById('messages-stream');
  if (!stream) return;
  const countEl = document.getElementById('msg-count');
  if (countEl) countEl.innerText = AppState.messages ? AppState.messages.length : 0;
  stream.innerHTML = '';

  if (!AppState.messages || AppState.messages.length === 0) {
    stream.innerHTML = `
      <div class="kage-card" style="padding: 42px 24px; text-align: center; border-radius: 16px;">
        <div style="font-size: 28px; color: var(--gold); margin-bottom: 10px;">
          <i class="fa-solid fa-feather-pointed"></i>
        </div>
        <h5 style="font-family:'Instrument Serif',serif; font-size:22px; margin:0 0 6px; color:#fff;">Belum Ada Kesan & Pesan</h5>
        <p style="font-size:13px; color:var(--bone-dim); margin:0 auto; max-width:380px; line-height:1.6;">
          Papan cerita masih bersih. Masuk ke akun circle dan bagikan momen seru nongkrong atau kenangan pertamamu!
        </p>
      </div>
    `;
    return;
  }

  AppState.messages.forEach(msg => {
    const card = document.createElement('div');
    card.className = 'kage-card';
    card.style.cssText = 'padding:22px; border-radius:16px;';
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:34px; height:34px; border-radius:10px; background:linear-gradient(135deg,#a51d2d,#4e0710); display:flex; align-items:center; justify-content:center; font-weight:bold; color:var(--gold); font-size:13px;">${msg.name.charAt(0)}</div>
          <div>
            <h5 style="font-family:'Instrument Serif',serif; font-size:18px; margin:0; color:#fff;">${msg.name}</h5>
            <span style="font-size:11px; color:var(--muted);">${msg.role}</span>
          </div>
        </div>
        <div style="text-align:right;">
          <span style="font-size:10px; padding:2px 8px; border-radius:6px; background:rgba(255,255,255,0.06); border:1px solid var(--line-gold); color:var(--bone-dim);">${msg.tag}</span>
          <div style="font-size:10px; color:var(--muted); margin-top:2px;">${msg.time}</div>
        </div>
      </div>
      <p style="font-size:13.5px; color:var(--bone); line-height:1.65; margin:0; background:rgba(4,10,6,0.6); padding:12px 16px; border-radius:10px; border:1px solid var(--line-gold);">
        "${msg.content}"
      </p>
    `;
    stream.appendChild(card);
  });
}

async function loadMessagesFromApi() {
  try {
    const res = await fetch('/api/messages');
    if (!res.ok) return;
    const data = await res.json();
    if (data.success && Array.isArray(data.messages) && data.messages.length > 0) {
      AppState.messages = data.messages;
      renderMessages();
    }
  } catch (err) {
    console.log('Load messages offline or static fallback:', err);
  }
}

async function handleMessageSubmit(e) {
  e.preventDefault();
  if (!AppState.isAuth) {
    openLoginModal();
    return;
  }
  const name = document.getElementById('msg-name').value.trim();
  const role = document.getElementById('msg-role').value.trim();
  const tag = document.getElementById('msg-tag').value;
  const content = document.getElementById('msg-content').value.trim();

  try {
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role, tag, content })
    });
    const data = await res.json();
    if (data.success && data.message) {
      AppState.messages.unshift(data.message);
    } else {
      const now = new Date();
      const formattedTime = now.toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric' }) + ', ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
      AppState.messages.unshift({ id: Date.now(), name, role, tag, time: formattedTime, content });
    }
  } catch (err) {
    const now = new Date();
    const formattedTime = now.toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric' }) + ', ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    AppState.messages.unshift({ id: Date.now(), name, role, tag, time: formattedTime, content });
  }

  renderMessages();
  document.getElementById('msg-content').value = '';
  showToast("Cerita kenangan tersimpan di database!");
  triggerMascotReaction("Pesan tersimpan di database! 💌");
}

/* 12. Account Authentication & Interactive Meme Reactions */
function openLoginModal() {
  const modal = document.getElementById('login-modal');
  if (modal) modal.classList.add('open');
  const errBox = document.getElementById('login-error');
  if (errBox) errBox.style.display = 'none';
  setMascotState('idle');
  const userInput = document.getElementById('login-username');
  if (userInput) userInput.focus();
}

function closeLoginModal() {
  const modal = document.getElementById('login-modal');
  if (modal) modal.classList.remove('open');
  const errBox = document.getElementById('login-error');
  if (errBox) errBox.style.display = 'none';
  setMascotState('idle');
}

function togglePasswordVisibility() {
  const pwdInput = document.getElementById('login-password');
  const icon = document.getElementById('toggle-pwd-icon');
  if (!pwdInput) return;

  if (pwdInput.type === 'password') {
    pwdInput.type = 'text';
    if (icon) {
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  } else {
    pwdInput.type = 'password';
    if (icon) {
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  }
}

function handleQuickGalleryClick() {
  document.getElementById('galeri').scrollIntoView({ behavior: 'smooth' });
  if (!AppState.isAuth) {
    setTimeout(openLoginModal, 500);
  }
}

async function handleAccountLoginSubmit(e) {
  if (e) e.preventDefault();

  const userEl = document.getElementById('login-username');
  const passEl = document.getElementById('login-password');
  const errBox = document.getElementById('login-error');
  const errText = document.getElementById('login-error-text');

  const username = userEl ? userEl.value.trim() : '';
  const password = passEl ? passEl.value : '';

  if (!username || !password) {
    if (errBox) {
      errBox.style.display = 'block';
      if (errText) errText.innerText = 'Harap isi username dan password.';
    }
    return;
  }

  // LOGIN FLOW (Verify against API / Database first)
  let loginSuccess = false;
  let loggedEmail = username.toLowerCase();

  try {
    const res = await fetch('/api/verify-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      loginSuccess = true;
      loggedEmail = data.user?.email || loggedEmail;
    }
  } catch (err) {
    // API offline/static fallback check
    const allowedUsers = ['jikul@jc.co.id', 'jikul', 'jculinary', 'jculinary@gmail.com', 'jculinary06@gmail.com'];
    if (allowedUsers.includes(username.toLowerCase()) && password === 'japaneseculinary') {
      loginSuccess = true;
    }
  }

  if (loginSuccess) {
    AppState.isAuth = true;
    AppState.currentUserEmail = loggedEmail;
    AppState.failedLoginCount = 0;

    try {
      sessionStorage.setItem('jc_auth_email', loggedEmail);
      localStorage.setItem('jc_auth_email', loggedEmail);
    } catch (_) {}

    setMascotState('success');
    if (errBox) errBox.style.display = 'none';

    showToast("Login Berhasil! Selamat datang Circle Member! 🫶");
    triggerMascotReaction("Yaaay! Selamat datang di circle! 🎉");

    if (userEl) userEl.value = '';
    if (passEl) passEl.value = '';

    setTimeout(() => {
      closeLoginModal();
      updateAuthUI();
      const galeriEl = document.getElementById('galeri');
      if (galeriEl) galeriEl.scrollIntoView({ behavior: 'smooth' });
    }, 1200);

  } else {
    AppState.failedLoginCount++;
    if (errBox) {
      errBox.style.display = 'block';
      if (AppState.failedLoginCount === 1) {
        if (errText) errText.innerText = 'Username atau password salah. Cek kembali akun circle kamu.';
      } else {
        if (errText) errText.innerText = 'Akses Ditolak! Akun circle: jikul / password: japaneseculinary atau klik "Daftar"';
      }
    }

    if (AppState.failedLoginCount === 1) {
      setMascotState('fail1');
    } else {
      setMascotState('fail2');
    }
  }
}

// Cek sesi yang sedang aktif dari server (/api/check-session) atau local storage
async function checkExistingSession() {
  let authenticated = false;
  try {
    const res = await fetch('/api/check-session');
    const data = await res.json();
    if (data.authenticated && data.user) {
      authenticated = true;
      AppState.isAuth = true;
      AppState.currentUserEmail = data.user.email || 'jikul@jc.co.id';
      try {
        sessionStorage.setItem('jc_auth_email', AppState.currentUserEmail);
        localStorage.setItem('jc_auth_email', AppState.currentUserEmail);
      } catch (_) {}
      updateAuthUI();
    }
  } catch (err) {
    // API server tidak berjalan (mode static lokal)
  }

  if (!authenticated) {
    const local = sessionStorage.getItem('jc_auth_email') || localStorage.getItem('jc_auth_email');
    if (local) {
      AppState.isAuth = true;
      AppState.currentUserEmail = local;
      updateAuthUI();
    }
  }
}

async function handleLogout() {
  try {
    await fetch('/api/logout');
  } catch (e) {
    console.log('Logout fetch error:', e);
  }
  try {
    sessionStorage.removeItem('jc_auth_email');
    localStorage.removeItem('jc_auth_email');
  } catch (_) {}
  AppState.isAuth = false;
  AppState.currentUserEmail = '';
  AppState.failedLoginCount = 0;
  updateAuthUI();
  showToast("Anda telah keluar sesi.");
  triggerMascotReaction("Sampai jumpa lagi! 👋");
}

function updateAuthUI() {
  const actions = document.getElementById('auth-actions');
  const lockedGallery = document.getElementById('gallery-locked');
  const unlockedGallery = document.getElementById('gallery-unlocked');
  const navBadge = document.getElementById('nav-lock-badge');
  const lockedMsgForm = document.getElementById('msg-form-locked');
  const unlockedMsgForm = document.getElementById('msg-form-unlocked');

  if (AppState.isAuth) {
    if (actions) {
      actions.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px;">
          <a href="dashboard.html" class="kage-btn-secondary" style="padding:6px 12px; font-size:11.5px; border-color:#34d399; color:#34d399;">
            <i class="fa-solid fa-gauge-high"></i> VIP Dashboard
          </a>
          <button onclick="handleLogout()" class="kage-btn-secondary" style="padding:6px 12px; font-size:11px;">
            <i class="fa-solid fa-arrow-right-from-bracket"></i> Keluar
          </button>
        </div>
      `;
    }
    if (lockedGallery) lockedGallery.style.display = 'none';
    if (unlockedGallery) unlockedGallery.style.display = 'block';

    if (navBadge) {
      navBadge.style.background = '#064e3b';
      navBadge.style.borderColor = '#34d399';
      navBadge.innerText = 'Terbuka';
    }

    if (lockedMsgForm) lockedMsgForm.style.display = 'none';
    if (unlockedMsgForm) unlockedMsgForm.style.display = 'block';
    renderGallery();
  } else {
    if (actions) {
      actions.innerHTML = `
        <button onclick="openLoginModal()" class="kage-btn-primary" style="padding:8px 16px; font-size:12px;">
          <i class="fa-solid fa-arrow-right-to-bracket"></i> Masuk Akun
        </button>
      `;
    }
    if (lockedGallery) lockedGallery.style.display = 'block';
    if (unlockedGallery) unlockedGallery.style.display = 'none';

    if (navBadge) {
      navBadge.style.background = '#4e0710';
      navBadge.style.borderColor = 'rgba(212,175,55,0.4)';
      navBadge.innerText = 'Terkunci';
    }

    if (lockedMsgForm) lockedMsgForm.style.display = 'block';
    if (unlockedMsgForm) unlockedMsgForm.style.display = 'none';
  }
}

/* 13. React Bits - BorderGlow Component Logic */
function initBorderGlow() {
  const cards = document.querySelectorAll('.border-glow-card');
  if (!cards.length) return;

  // Initialize custom palette per card
  cards.forEach(card => {
    const rawColors = card.getAttribute('data-glow-colors');
    const colors = rawColors ? rawColors.split(',').map(c => c.trim()) : ['#d4af37', '#f472b6', '#38bdf8'];
    if (colors.length >= 1) card.style.setProperty('--glow-color-1', colors[0]);
    if (colors.length >= 2) card.style.setProperty('--glow-color-2', colors[1]);
    if (colors.length >= 3) card.style.setProperty('--glow-color-3', colors[2]);
  });

  const getCursorAngle = (rect, clientX, clientY) => {
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    if (angle < 0) angle += 360;
    return angle;
  };

  const getEdgeProximity = (rect, clientX, clientY, sensitivity = 30) => {
    const { left, top, right, bottom } = rect;
    const dx = Math.max(0, left - clientX, clientX - right);
    const dy = Math.max(0, top - clientY, clientY - bottom);
    const distOutside = Math.sqrt(dx * dx + dy * dy);

    if (distOutside > 0) {
      if (distOutside >= sensitivity) return 0;
      return 1 - distOutside / sensitivity;
    }

    const distLeft = clientX - left;
    const distRight = right - clientX;
    const distTop = clientY - top;
    const distBottom = bottom - clientY;
    const distToEdge = Math.min(distLeft, distRight, distTop, distBottom);

    const maxDist = Math.max(sensitivity * 2.5, 45);
    if (distToEdge >= maxDist) {
      return 0.35;
    }
    return Math.min(1, Math.max(0.35, 1 - (distToEdge / maxDist) * 0.65));
  };

  cards.forEach(card => {
    let ticking = false;

    const handlePointerMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const angle = getCursorAngle(rect, e.clientX, e.clientY);
          const proximity = getEdgeProximity(rect, e.clientX, e.clientY, 30);
          const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
          const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

          card.style.setProperty('--cursor-angle', `${angle.toFixed(1)}deg`);
          card.style.setProperty('--edge-proximity', proximity.toFixed(2));
          card.style.setProperty('--mouse-x', `${mouseX.toFixed(1)}%`);
          card.style.setProperty('--mouse-y', `${mouseY.toFixed(1)}%`);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handlePointerLeave = () => {
      card.style.setProperty('--edge-proximity', '0');
    };

    card.addEventListener('pointermove', handlePointerMove, { passive: true });
    card.addEventListener('pointerleave', handlePointerLeave, { passive: true });
  });
}

/* 14. React Bits - TrueFocus Component Logic */
function initTrueFocus() {
  const containers = document.querySelectorAll('.focus-container');
  if (!containers.length) return;

  containers.forEach(container => {
    const blurAmount = parseFloat(container.dataset.blur) || 4;
    const duration = parseFloat(container.dataset.duration) || 0.5;
    const pause = parseFloat(container.dataset.pause) || 1.2;
    const borderColor = container.dataset.borderColor || 'var(--gold)';
    const glowColor = container.dataset.glowColor || 'rgba(212, 175, 55, 0.65)';
    const manualMode = container.dataset.manualMode === 'true';

    container.style.setProperty('--blur-amount', `${blurAmount}px`);
    container.style.setProperty('--border-color', borderColor);
    container.style.setProperty('--glow-color', glowColor);

    let words = Array.from(container.querySelectorAll('.focus-word'));
    let frame = container.querySelector('.focus-frame');

    // If words are not in HTML, build them from data-sentence
    if (!words.length) {
      const sentence = container.dataset.sentence || 'Japanese Culinary';
      const separator = container.dataset.separator || ' ';
      const wordList = sentence.split(separator);

      words = wordList.map((w, idx) => {
        const span = document.createElement('span');
        span.className = `focus-word ${idx === 0 ? 'active' : ''}`;
        span.textContent = w;
        container.appendChild(span);
        return span;
      });
    }

    if (!frame) {
      frame = document.createElement('div');
      frame.className = 'focus-frame';
      frame.innerHTML = `
        <span class="corner top-left"></span>
        <span class="corner top-right"></span>
        <span class="corner bottom-left"></span>
        <span class="corner bottom-right"></span>
      `;
      container.appendChild(frame);
    }

    let currentIndex = 0;
    let timer = null;
    let isHovered = false;

    function updateRect(index) {
      if (index < 0 || index >= words.length || !words[index]) return;

      words.forEach((w, i) => {
        if (i === index) {
          w.classList.add('active');
        } else {
          w.classList.remove('active');
        }
      });

      const parentRect = container.getBoundingClientRect();
      const activeRect = words[index].getBoundingClientRect();

      const x = activeRect.left - parentRect.left;
      const y = activeRect.top - parentRect.top;
      const width = activeRect.width;
      const height = activeRect.height;

      frame.style.transform = `translate(${x}px, ${y}px)`;
      frame.style.width = `${width}px`;
      frame.style.height = `${height}px`;
      frame.style.opacity = '1';
    }

    function startAutoLoop() {
      if (manualMode) return;
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        if (!isHovered && words.length > 1) {
          currentIndex = (currentIndex + 1) % words.length;
          updateRect(currentIndex);
        }
      }, (duration + pause) * 1000);
    }

    words.forEach((w, idx) => {
      w.addEventListener('mouseenter', () => {
        isHovered = true;
        currentIndex = idx;
        updateRect(currentIndex);
      });

      w.addEventListener('mouseleave', () => {
        isHovered = false;
      });
    });

    // Initial position after render
    requestAnimationFrame(() => {
      updateRect(0);
      startAutoLoop();
    });

    // Handle window resize or font load
    window.addEventListener('resize', () => {
      updateRect(currentIndex);
    }, { passive: true });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => updateRect(currentIndex));
    }
  });
}

// Tutup modal jika klik di luar box dialog
window.addEventListener('click', (e) => {
  const loginModal = document.getElementById('login-modal');
  if (e.target === loginModal) closeLoginModal();
  const lbModal = document.getElementById('lightbox-modal');
  if (e.target === lbModal) closeLightbox();
});

/* 15. Initialization */
window.addEventListener('DOMContentLoaded', () => {
  initIntro3DTilt();
  initAudioEngine();
  initChibiCompanion();
  initForest3D();
  initScrollReveal();
  initBorderGlow();
  initTrueFocus();
  renderKotowaza(Math.floor(Math.random() * AppState.kotowazaList.length));
  renderMessages();
  loadMessagesFromApi();
  updateAuthUI();
  checkExistingSession();
});
