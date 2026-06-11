export interface Receipt {
  date: string;
  num: string;
  cat: string;
  cap: string;
  side: string;
  tone: string;
}

export const TONE_GRADIENTS: Record<string, string> = {
  g1: 'linear-gradient(160deg, #b0aba2, #3b3631)',
  g2: 'linear-gradient(200deg, #d4cfc6, #2a2622)',
  g3: 'linear-gradient(135deg, #9b9690, #545049)',
  g4: 'linear-gradient(180deg, #cac4ba, #6a625a)',
  g5: 'linear-gradient(220deg, #88847e, #1a1816)',
  g6: 'linear-gradient(160deg, #d8d3ca, #4a443e)',
};

export function getToneGradient(tone: string): string {
  return TONE_GRADIENTS[tone] ?? TONE_GRADIENTS.g1;
}

export interface BlogPost {
  slug: string;
  cat: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
  tone: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqGroup {
  group: string;
  items: FaqItem[];
}

export interface Frame {
  id: string;
  name: string;
  sub: string;
  cls: string;
}

export interface FrameStyle {
  id: string;
  name: string;
  sub: string;
  cls: string;
}

export interface Layout {
  id: number;
  label: string;
  hint: string;
}

export const SAMPLE_RECEIPTS: Receipt[] = [
  { date: '12.05.26', num: '0038', cat: 'portrait', cap: 'malam yang cepat berlalu.', side: '記ノ片', tone: 'g1' },
  { date: '14.05.26', num: '0039', cat: 'group', cap: 'kami semua, sekali ini saja.', side: '思ヒ出', tone: 'g2' },
  { date: '15.05.26', num: '0040', cat: 'solo', cap: 'sendiri tapi tidak kesepian.', side: '記片', tone: 'g3' },
  { date: '15.05.26', num: '0041', cat: 'event', cap: 'club ghost · pop-up.', side: '記ノ片', tone: 'g4' },
  { date: '16.05.26', num: '0042', cat: 'portrait', cap: 'kamu lagi tertawa.', side: '小サイ', tone: 'g5' },
  { date: '16.05.26', num: '0043', cat: 'group', cap: 'tiga, mungkin empat tahun.', side: '記ノ片', tone: 'g6' },
  { date: '17.05.26', num: '0044', cat: 'portrait', cap: 'sebelum semuanya berubah.', side: '保存', tone: 'g1' },
  { date: '17.05.26', num: '0045', cat: 'solo', cap: 'belajar diam sebentar.', side: '記片', tone: 'g2' },
  { date: '18.05.26', num: '0046', cat: 'event', cap: 'opening · sebuah ruang baru.', side: '記ノ片', tone: 'g3' },
  { date: '18.05.26', num: '0047', cat: 'group', cap: 'reuni kecil yang lama tertunda.', side: '集合', tone: 'g4' },
  { date: '19.05.26', num: '0048', cat: 'portrait', cap: 'cahaya jendela jam empat sore.', side: '記ノ片', tone: 'g5' },
  { date: '19.05.26', num: '0049', cat: 'event', cap: 'pasar malam · hari kedua.', side: '夜', tone: 'g6' },
  { date: '20.05.26', num: '0050', cat: 'solo', cap: 'hari ulang tahun, tidak besar.', side: '記片', tone: 'g1' },
  { date: '20.05.26', num: '0051', cat: 'group', cap: 'sebelum dia pindah ke jogja.', side: '記ノ片', tone: 'g2' },
  { date: '21.05.26', num: '0052', cat: 'portrait', cap: 'rambut baru, ekspresi sama.', side: '変化', tone: 'g3' },
];

export const TESTIMONIALS: Receipt[] = [
  { date: '08.04.26', num: '0021', cat: 'testimonial', cap: 'masih kusimpan di dompet, tujuh bulan kemudian.', side: '記ノ片', tone: 'g2' },
  { date: '22.03.26', num: '0014', cat: 'testimonial', cap: 'lebih bagus dari polaroid manapun.', side: '記片', tone: 'g4' },
  { date: '05.02.26', num: '0007', cat: 'testimonial', cap: 'kertasnya tipis. kenangannya tidak.', side: '思ヒ出', tone: 'g5' },
];

export const FRAMES: Frame[] = [
  { id: 'classic', name: 'Classic Receipt', sub: 'plain · clean', cls: '' },
  { id: 'ki', name: '記ノ片 Edition', sub: 'cedar accent', cls: 'cedar' },
  { id: 'dark', name: 'Minimal Dark', sub: 'black paper', cls: 'dark' },
  { id: 'paper', name: 'Paper Grain', sub: 'rice texture', cls: 'paper' },
  { id: 'archive', name: 'Archive', sub: 'aged stone', cls: 'archive' },
  { id: 'ghost', name: 'Ghost Club', sub: 'dark · seal', cls: 'ghost' },
];

export const FRAME_STYLES: FrameStyle[] = [
  { id: 'classic', name: 'Classic Receipt', sub: 'plain · clean', cls: '' },
  { id: 'ki', name: '記ノ片 Edition', sub: 'cedar accent', cls: 'cedar' },
  { id: 'dark', name: 'Minimal Dark', sub: 'black paper', cls: 'dark' },
  { id: 'paper', name: 'Paper Grain', sub: 'rice texture', cls: 'paper' },
  { id: 'archive', name: 'Archive', sub: 'aged stone', cls: 'archive' },
  { id: 'ghost', name: 'Ghost Club', sub: 'dark · seal', cls: 'ghost' },
];

export const LAYOUTS: Layout[] = [
  { id: 1, label: '1 photo', hint: 'single portrait' },
  { id: 2, label: '2 photos', hint: 'paired moment' },
  { id: 3, label: '3 photos', hint: 'short story' },
  { id: 4, label: '4 photos', hint: 'classic strip' },
];

export const BLOG: BlogPost[] = [
  { slug: 'kenapa-struk-kenangan', cat: 'Memory', title: 'Kenapa struk bisa jadi kenangan terbaik', excerpt: 'tidak semua kenangan butuh figur, frame, atau filter. kadang yang menempel justru kertas tipis yang tidak sengaja kamu simpan.', date: '12 MAY 26', read: '4 MIN', tone: 'g2' },
  { slug: 'behind-paper', cat: 'Tips', title: 'Behind the paper: how thermal printing works', excerpt: 'panas, bukan tinta. ini sebabnya struk kamu hitam-putih, dan kenapa dia bisa pudar kalau ditinggal di mobil panas.', date: '08 MAY 26', read: '6 MIN', tone: 'g3' },
  { slug: 'menyimpan-receipt', cat: 'Tips', title: '5 cara menyimpan receipt photobooth kamu', excerpt: 'dompet, buku catatan, atau bingkai kayu kecil — tiap struk butuh tempatnya sendiri agar tidak pudar.', date: '03 MAY 26', read: '5 MIN', tone: 'g1' },
  { slug: 'ki-no-kata', cat: 'Memory', title: '記ノ片: makna di balik simbol thermemo', excerpt: '"ki no kata" — fragmen kenangan. kanji yang kami pinjam, dan kenapa setiap struk thermemo punya seal kecil ini.', date: '28 APR 26', read: '7 MIN', tone: 'g4' },
  { slug: 'event-club-ghost', cat: 'Event', title: 'Event recap: club ghost pop-up session', excerpt: 'satu malam, 142 struk dicetak, sebuah ruang sempit di pojok bandung. terima kasih sudah datang.', date: '20 APR 26', read: '3 MIN', tone: 'g5' },
  { slug: 'quiet-magic', cat: 'Memory', title: 'The quiet magic of monochrome photography', excerpt: 'warna mengganggu memori. hitam-putih membiarkan otak mengisi sisanya — dan itulah yang kita ingat lebih lama.', date: '15 APR 26', read: '5 MIN', tone: 'g6' },
];

export const FAQS: FaqGroup[] = [
  { group: 'About the booth', items: [
    { q: 'Apa itu thermemo?', a: 'thermemo adalah receipt photobooth — booth foto yang mencetak hasil dalam bentuk struk thermal hitam-putih. setiap struk dirancang untuk disimpan, bukan dibingkai.' },
    { q: 'Di mana lokasi booth thermemo?', a: 'booth utama kami di Jl. Cigadung Selatan No. 42, Bandung. selain itu, kami sering pop-up di event, market, dan kafe — cek instagram kami untuk lokasi terbaru.' },
    { q: 'Apakah bisa walk-in atau harus booking dulu?', a: 'walk-in selalu welcome. tapi di weekend dan jam ramai (17.00–20.00), booking sangat disarankan untuk skip antrian.' },
    { q: 'Berapa lama satu sesi foto?', a: 'sekitar 90 detik — dari masuk booth sampai struk keluar. cetakan thermal itu cepat.' },
  ]},
  { group: 'About the receipt', items: [
    { q: 'Kenapa outputnya berupa struk / receipt?', a: 'karena struk adalah salah satu objek paling sentimental yang sering kita simpan tanpa sadar. kami memutuskan untuk membuat struk yang memang dirancang untuk dikenang.' },
    { q: 'Apakah foto bisa berwarna?', a: 'tidak. semua cetakan thermemo monochrome — ini bagian dari identitas kami. tinta thermal memang hanya menghasilkan hitam-abu, dan kami menyukainya begitu.' },
    { q: 'Berapa ukuran receipt yang dicetak?', a: 'lebar 58 mm, panjang menyesuaikan jumlah foto — sekitar 14–22 cm untuk strip 4 frame.' },
    { q: 'Apakah receipt tahan lama?', a: 'thermal paper bisa pudar dalam 2–5 tahun kalau terkena panas atau cahaya langsung. simpan di tempat sejuk, kering. kami juga sediakan opsi digital copy.' },
  ]},
  { group: 'Booking & payment', items: [
    { q: 'Bagaimana cara booking sesi?', a: 'lewat halaman booking di website ini, atau langsung WhatsApp kami. kami akan konfirmasi slot dalam 1×24 jam.' },
    { q: 'Metode pembayaran apa yang diterima?', a: 'tunai, transfer bank (BCA, Mandiri), QRIS, dan GoPay/OVO. pembayaran dilakukan di booth setelah sesi selesai.' },
    { q: 'Apakah ada refund jika batal?', a: 'reschedule gratis hingga 6 jam sebelum jadwal. pembatalan setelah itu tidak refund, tapi bisa di-credit untuk sesi lain dalam 30 hari.' },
  ]},
  { group: 'Events & collaboration', items: [
    { q: 'Apakah thermemo tersedia untuk event?', a: 'tentu. kami punya event package mulai 50 tamu, dengan booth operator dan desain struk custom. kontak via WhatsApp untuk diskusi detail.' },
    { q: 'Bisakah saya request desain receipt custom?', a: 'untuk event, ya — kami bisa custom logo, frame design, dan caption. untuk sesi reguler, kamu bisa pilih 1 dari 6 frame design kami.' },
    { q: 'Bagaimana cara kolaborasi dengan thermemo?', a: 'kirim email ke halo@thermemo.id atau DM instagram kami. kami terbuka untuk kolaborasi brand, artis, event, dan pop-up.' },
  ]},
];
