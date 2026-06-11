interface BlogBlock {
  type: "paragraph" | "heading" | "pullquote";
  text: string;
}

export const BLOG_CONTENT: Record<string, BlogBlock[]> = {
  "kenapa-struk-kenangan": [
    { type: "paragraph", text: "struk parkir dari tiga tahun lalu. tiket konser yang sudah pudar. struk kopi yang jadi pembatas buku. benda-benda ini tidak seharusnya masih ada — tapi mereka masih di sini, di laci, di saku, di antara halaman buku yang jarang dibuka." },
    { type: "paragraph", text: "kenapa kita menyimpan struk? bukan karena isinya penting. bukan karena kita butuh bukti pembayaran. kita menyimpannya karena struk itu adalah bukti bahwa kita pernah berada di suatu tempat, pada suatu waktu, bersama seseorang." },
    { type: "heading", text: "Objek sebagai jangkar memori" },
    { type: "paragraph", text: "psikolog menyebut ini sebagai 'memory anchoring' — otak kita lebih mudah mengakses kenangan ketika ada objek fisik yang terhubung. bukan foto di cloud yang bisa hilang saat hard drive rusak, tapi kertas yang bisa kita pegang, lipat, dan temukan lagi secara tidak sengaja." },
    { type: "pullquote", text: "kenangan tidak hidup di file digital. dia hidup di benda fisik yang tidak sengaja kita simpan." },
    { type: "paragraph", text: "struk punya kualitas yang unik: dia kecil, tipis, dan seharusnya dibuang. tapi justru karena dia seharusnya tidak ada lagi, keberadaannya jadi bermakna. struk yang masih tersimpan setelah bertahun-tahun adalah struk yang menolak untuk dilupakan." },
    { type: "heading", text: "Thermemo dan struk yang dirancang untuk dikenang" },
    { type: "paragraph", text: "thermemo lahir dari observasi sederhana ini. kami membuat struk yang memang dirancang untuk disimpan — bukan struk pembayaran, tapi struk kenangan. setiap struk punya nomor sesi, tanggal, dan satu kalimat pendek yang ditulis tangan (atau diketik, kalau kamu malu)." },
    { type: "paragraph", text: "struk thermemo bukan untuk dibingkai. dia untuk diselipkan di dompet, ditempel di cermin kamar, atau ditemukan lagi setahun nanti di buku catatan. dan ketika kamu menemukannya, momen itu kembali — utuh, tanpa filter, tanpa edit." },
    { type: "paragraph", text: "itu saja. itu cukup." },
  ],

  "behind-paper": [
    { type: "paragraph", text: "thermal printing bukan teknologi baru. dia sudah ada sejak 1960-an, dipakai di mesin fax, kasir supermarket, dan printer portable. tapi ada sesuatu yang menarik tentang cara kerjanya: panas, bukan tinta." },
    { type: "heading", text: "Bagaimana thermal printing bekerja" },
    { type: "paragraph", text: "kertas thermal dilapisi dengan bahan kimia yang berubah warna ketika dipanaskan. printer thermal punya head kecil yang memanaskan titik-titik tertentu di kertas, menciptakan gambar atau teks. tidak ada cartridge tinta, tidak ada toner — hanya panas dan kertas khusus." },
    { type: "paragraph", text: "ini sebabnya struk thermemo hitam-putih. tinta thermal hanya bisa menghasilkan dua warna: warna kertas (putih/krem) dan warna hasil reaksi kimia (hitam/gelap). tidak ada warna ketiga. dan kami menyukainya begitu." },
    { type: "heading", text: "Kenapa struk bisa pudar" },
    { type: "paragraph", text: "thermal paper sensitif terhadap panas dan cahaya. kalau kamu tinggalkan struk di dashboard mobil yang terkena matahari langsung, dia akan pudar dalam hitungan minggu. kalau disimpan di tempat sejuk dan kering, struk bisa bertahan 2-5 tahun — kadang lebih." },
    { type: "pullquote", text: "struk yang pudar bukan struk yang gagal. dia struk yang sudah menjalani hidupnya." },
    { type: "paragraph", text: "ada keindahan dalam kepudaran ini. struk yang sudah mulai pudar adalah struk yang sudah lama menemani kamu — di dompet, di laci, di saku jaket yang jarang dipakai. kepudaran adalah bukti waktu yang sudah berlalu." },
    { type: "heading", text: "Tips menyimpan struk thermemo" },
    { type: "paragraph", text: "simpan di tempat sejuk dan kering. hindari sinar matahari langsung. jangan laminasi (panas laminasi bisa merusak struk). kalau mau aman, foto struk kamu sebagai backup digital — tapi tetap simpan fisikanya. karena struk digital bukan struk. dia hanya foto dari struk." },
  ],

  "menyimpan-receipt": [
    { type: "paragraph", text: "struk thermemo bukan foto biasa. dia kecil, tipis, dan dirancang untuk dibawa pulang dalam saku. tapi kalau tidak disimpan dengan benar, dia bisa hilang, rusak, atau pudar sebelum waktunya." },
    { type: "paragraph", text: "berikut lima cara yang kami lihat dari customer kami — dan yang kami sendiri lakukan:" },
    { type: "heading", text: "1. Dompet" },
    { type: "paragraph", text: "tempat paling klasik. lipat struk jadi dua, selipkan di compartment kartu atau di lipatan dompet. struk akan ikut kemana-mana, dan kamu akan menemukannya lagi saat sedang bayar di kasir atau ambil KTP." },
    { type: "heading", text: "2. Buku catatan atau jurnal" },
    { type: "paragraph", text: "tempel dengan selotip washi tape di halaman jurnal. struk jadi bagian dari catatan harian — bukti visual bahwa hari itu benar-benar terjadi. beberapa customer kami punya koleksi struk thermemo di bullet journal mereka." },
    { type: "heading", text: "3. Cermin kamar" },
    { type: "paragraph", text: "tempel di sudut cermin dengan selotip kecil. setiap kali kamu bercermin, struk itu ada di sana — mengingatkan kamu tentang malam itu, orang itu, momen itu." },
    { type: "pullquote", text: "struk yang ditempel di cermin bukan dekorasi. dia pengingat." },
    { type: "heading", text: "4. Bingkai kayu kecil" },
    { type: "paragraph", text: "kalau kamu mau lebih serius, bingkai kayu kecil (ukuran 4R atau lebih kecil) bisa jadi tempat yang bagus. tapi ingat: struk thermemo bukan untuk dipajang di dinding. dia untuk dilihat sesekali, bukan setiap hari." },
    { type: "heading", text: "5. Amplop atau kotak kenangan" },
    { type: "paragraph", text: "kumpulkan semua struk thermemo kamu di satu tempat — amplop cokelat, kotak kayu kecil, atau pouch kain. buka setahun sekali, lihat semua momen yang sudah terkumpul. ini cara paling satisfying untuk melihat perjalanan kamu." },
    { type: "paragraph", text: "apapun cara kamu, yang penting: simpan fisikanya. digital copy bagus sebagai backup, tapi struk digital bukan struk. dia hanya gambar dari struk." },
  ],

  "ki-no-kata": [
    { type: "paragraph", text: "di pojok kanan bawah setiap struk thermemo, ada seal kecil bertuliskan 記ノ片. dibaca 'ki no kata' — fragmen kenangan." },
    { type: "heading", text: "Asal usul" },
    { type: "paragraph", text: "記 (ki) berarti 'catatan' atau 'rekaman'. ノ (no) adalah partikel kepemilikan, seperti 'of' dalam bahasa Inggris. 片 (kata) berarti 'potongan' atau 'fragmen'. gabungan ketiganya: 'potongan dari catatan' — atau lebih puitis: 'fragmen kenangan'." },
    { type: "paragraph", text: "kami meminjam kanji ini bukan karena kami ahli bahasa Jepang. kami meminjamnya karena tidak ada kata dalam bahasa Indonesia atau Inggris yang cukup tepat menggambarkan apa yang thermemo buat: bukan foto, bukan poster, bukan album. tapi potongan kecil dari sebuah momen yang layak dicatat." },
    { type: "pullquote", text: "fragmen kenangan. bukan keseluruhan cerita — hanya potongannya." },
    { type: "heading", text: "Kenapa seal, bukan logo" },
    { type: "paragraph", text: "seal (stempel) punya konotasi yang berbeda dari logo. logo adalah identitas brand — dia ada di mana-mana, di setiap touchpoint. seal adalah tanda pengesahan — dia ada di tempat tertentu, untuk menandai sesuatu yang resmi, yang selesai, yang sah." },
    { type: "paragraph", text: "setiap struk thermemo yang keluar dari printer sudah 'sah' — dia sudah selesai, sudah terjadi, sudah jadi bagian dari arsip. seal 記ノ片 adalah tanda bahwa ini bukan struk biasa. ini struk yang dirancang untuk dikenang." },
    { type: "heading", text: "記ノ片 dalam praktik" },
    { type: "paragraph", text: "kamu akan menemukan seal ini di beberapa tempat: pojok kanan bawah struk, sisi vertikal struk (kalau kamu perhatikan), dan di beberapa merchandise thermemo. dia kecil, tidak mencolok, dan tidak mengganggu. tapi dia selalu ada — seperti watermark yang menandai setiap kenangan thermemo sebagai bagian dari sesuatu yang lebih besar." },
  ],

  "event-club-ghost": [
    { type: "paragraph", text: "sabtu malam, 18 mei 2026. sebuah ruang kecil di pojok bandung. satu booth, satu printer thermal, dan 142 struk yang dicetak dalam satu malam." },
    { type: "heading", text: "Konsep" },
    { type: "paragraph", text: "club ghost adalah pop-up session yang kami adakan bersama sebuah kolektif seni lokal. konsepnya sederhana: booth thermemo di sudut ruangan, tanpa signage besar, tanpa promosi berlebihan. hanya booth kecil dengan lampu redup dan tulisan 'thermemo' di kertas kecil di depannya." },
    { type: "paragraph", text: "kami ingin melihat apa yang terjadi kalau photobooth tidak diteriaki. kalau dia hanya ada di sana, menunggu, dan orang datang karena penasaran — bukan karena FOMO." },
    { type: "heading", text: "Apa yang terjadi" },
    { type: "paragraph", text: "142 struk. dalam 5 jam. rata-rata satu struk setiap 2 menit. tapi yang menarik bukan angkanya — yang menarik adalah siapa yang datang dan kenapa." },
    { type: "pullquote", text: "ada pasangan yang baru jadian. ada teman yang sudah 10 tahun tidak ketemu. ada orang yang datang sendiri, hanya untuk punya bukti bahwa malam ini dia keluar rumah." },
    { type: "paragraph", text: "beberapa caption yang kami ingat: 'malam yang tidak ingin berakhir', 'sebelum dia pindah ke jogja', 'kami semua, sekali ini saja'. kalimat-kalimat pendek yang ditulis di struk, yang mungkin tidak akan pernah dibaca orang lain — tapi bermakna untuk yang menulisnya." },
    { type: "heading", text: "Belajar dari club ghost" },
    { type: "paragraph", text: "kami belajar bahwa photobooth tidak harus loud. dia bisa quiet, intimate, dan tetap bermakna. kami juga belajar bahwa orang tidak butuh filter atau efek khusus — mereka butuh ruang kecil, waktu 90 detik, dan bukti bahwa momen itu benar-benar terjadi." },
    { type: "paragraph", text: "club ghost mungkin bukan event terbesar yang pernah kami adakan. tapi dia adalah event yang paling jujur tentang apa yang thermemo coba lakukan: membuat kenangan kecil yang layak disimpan." },
  ],

  "quiet-magic": [
    { type: "paragraph", text: "coba ingat foto terakhir yang kamu ambil dengan smartphone. mungkin foto makanan, foto selfie, atau foto pemandangan. sekarang coba ingat: apakah kamu masih ingat momen di balik foto itu? atau hanya ingat bahwa kamu pernah mengambilnya?" },
    { type: "paragraph", text: "warna itu mengganggu. bukan dalam arti buruk — tapi warna memberikan terlalu banyak informasi. otak kita sibuk memproses warna, komposisi, detail — sampai kita lupa merasakan momennya." },
    { type: "heading", text: "Kenapa hitam-putih terasa lebih 'nyata'" },
    { type: "paragraph", text: "fotografi hitam-putih menghilangkan distraksi. tanpa warna, otak kita fokus pada hal yang lebih penting: ekspresi, gesture, cahaya, dan emosi. kita tidak terganggu oleh warna baju yang terlalu terang atau background yang terlalu ramai. kita hanya melihat intinya." },
    { type: "pullquote", text: "warna menceritakan apa yang terlihat. hitam-putih menceritakan apa yang terasa." },
    { type: "paragraph", text: "ini bukan teori baru. fotografer seperti Henri Cartier-Bresson, Dorothea Lange, dan Sebastião Salgado memilih hitam-putih bukan karena keterbatasan teknologi — tapi karena mereka tahu bahwa hitam-putih menyampaikan emosi lebih langsung daripada warna." },
    { type: "heading", text: "Thermemo dan monochrome" },
    { type: "paragraph", text: "thermemo tidak menyediakan opsi warna. bukan karena kami tidak bisa — tapi karena kami tidak mau. monochrome adalah bagian dari identitas kami, dan kami percaya bahwa struk thermemo lebih bermakna dalam hitam-putih." },
    { type: "paragraph", text: "ketika kamu melihat struk thermemo, kamu tidak melihat foto. kamu melihat kenangan. dan kenangan, pada akhirnya, tidak berwarna. dia hanya perasaan yang tersisa setelah semua detail lainnya pudar." },
    { type: "paragraph", text: "struk thermemo adalah versi fisik dari perasaan itu. kecil, hitam-putih, dan cukup untuk mengingatkan kamu bahwa momen itu pernah terjadi." },
  ],
};
