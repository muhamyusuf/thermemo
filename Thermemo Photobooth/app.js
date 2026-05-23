/* ===========================================
   thermemo — app.js
   Routing + interactive features
   =========================================== */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- DATA ---------- */
  const SAMPLE_RECEIPTS = [
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

  const TESTIMONIALS = [
    { date: '08.04.26', num: '0021', cat: 'testimonial', cap: 'masih kusimpan di dompet, tujuh bulan kemudian.', side: '記ノ片', tone: 'g2' },
    { date: '22.03.26', num: '0014', cat: 'testimonial', cap: 'lebih bagus dari polaroid manapun.', side: '記片', tone: 'g4' },
    { date: '05.02.26', num: '0007', cat: 'testimonial', cap: 'kertasnya tipis. kenangannya tidak.', side: '思ヒ出', tone: 'g5' },
  ];

  const FRAMES = [
    { id: 'classic',  name: 'Classic Receipt', sub: 'plain · clean', cls: '' },
    { id: 'ki',       name: '記ノ片 Edition',    sub: 'cedar accent', cls: 'cedar' },
    { id: 'dark',     name: 'Minimal Dark',    sub: 'black paper',  cls: 'dark' },
    { id: 'paper',    name: 'Paper Grain',     sub: 'rice texture', cls: 'paper' },
    { id: 'archive',  name: 'Archive',         sub: 'aged stone',   cls: 'archive' },
    { id: 'ghost',    name: 'Ghost Club',      sub: 'dark · seal',  cls: 'ghost' },
  ];

  const LAYOUTS = [
    { id: 1, label: '1 photo', hint: 'single portrait' },
    { id: 2, label: '2 photos', hint: 'paired moment' },
    { id: 3, label: '3 photos', hint: 'short story' },
    { id: 4, label: '4 photos', hint: 'classic strip' },
  ];

  const BLOG = [
    { slug: 'kenapa-struk-kenangan', cat: 'Memory', title: 'Kenapa struk bisa jadi kenangan terbaik', excerpt: 'tidak semua kenangan butuh figur, frame, atau filter. kadang yang menempel justru kertas tipis yang tidak sengaja kamu simpan.', date: '12 MAY 26', read: '4 MIN', tone: 'g2' },
    { slug: 'behind-paper', cat: 'Tips', title: 'Behind the paper: how thermal printing works', excerpt: 'panas, bukan tinta. ini sebabnya struk kamu hitam-putih, dan kenapa dia bisa pudar kalau ditinggal di mobil panas.', date: '08 MAY 26', read: '6 MIN', tone: 'g3' },
    { slug: 'menyimpan-receipt', cat: 'Tips', title: '5 cara menyimpan receipt photobooth kamu', excerpt: 'dompet, buku catatan, atau bingkai kayu kecil — tiap struk butuh tempatnya sendiri agar tidak pudar.', date: '03 MAY 26', read: '5 MIN', tone: 'g1' },
    { slug: 'ki-no-kata', cat: 'Memory', title: '記ノ片: makna di balik simbol thermemo', excerpt: '"ki no kata" — fragmen kenangan. kanji yang kami pinjam, dan kenapa setiap struk thermemo punya seal kecil ini.', date: '28 APR 26', read: '7 MIN', tone: 'g4' },
    { slug: 'event-club-ghost', cat: 'Event', title: 'Event recap: club ghost pop-up session', excerpt: 'satu malam, 142 struk dicetak, sebuah ruang sempit di pojok bandung. terima kasih sudah datang.', date: '20 APR 26', read: '3 MIN', tone: 'g5' },
    { slug: 'quiet-magic', cat: 'Memory', title: 'The quiet magic of monochrome photography', excerpt: 'warna mengganggu memori. hitam-putih membiarkan otak mengisi sisanya — dan itulah yang kita ingat lebih lama.', date: '15 APR 26', read: '5 MIN', tone: 'g6' },
  ];

  const FAQS = [
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

  /* ===========================================
     ROUTING (hash)
     =========================================== */
  function setActivePage(route) {
    const pages = $$('.page');
    let matched = false;
    pages.forEach(p => {
      const pr = p.dataset.page;
      const isMatch = (pr === route) || (route.startsWith('/blog/') && pr === '/blog/post');
      p.classList.toggle('is-active', isMatch);
      if (isMatch) matched = true;
    });
    if (!matched) {
      // fallback home
      $('.page[data-page="/"]').classList.add('is-active');
    }
    // nav active state
    $$('.nav__link').forEach(l => l.classList.toggle('is-active', l.dataset.route === route || (route.startsWith('/blog/') && l.dataset.route === '/blog')));
    // nav dark/light per page
    const darkRoutes = ['/'];  // hero is dark — let scroll handle. for now keep light
    // scroll-based dark/light handled in scroll listener
    window.scrollTo({ top: 0, behavior: 'instant' });
    updateNavTheme();

    // page-specific init
    if (route === '/blog' || route === '/blog/') buildBlogIndex();
    if (route.startsWith('/blog/')) {
      const slug = route.replace('/blog/', '');
      if (slug && slug !== 'post') buildBlogPost(slug);
    }
    if (route === '/photobooth') initPhotobooth();
    if (route === '/contact') stampContactDate();
    if (route === '/booking') stampBookingDate();

    revealOnView();
  }

  function getRoute() {
    const h = location.hash || '#/';
    return h.replace(/^#/, '');
  }

  window.addEventListener('hashchange', () => setActivePage(getRoute()));

  /* ---------- nav theme based on scroll/page ---------- */
  function updateNavTheme() {
    const nav = $('#nav');
    const route = getRoute();
    let darkUnder = false;
    if (route === '/' && window.scrollY < window.innerHeight - 100) darkUnder = true;
    if (route === '/pricing' && window.scrollY < 200) darkUnder = true;
    if (route === '/faq' && window.scrollY < 200) darkUnder = true;
    nav.classList.toggle('is-dark', darkUnder);
  }
  window.addEventListener('scroll', updateNavTheme);

  /* ---------- mobile menu ---------- */
  $('#navBurger').addEventListener('click', () => $('#navOverlay').classList.add('is-open'));
  $('#navClose').addEventListener('click', () => $('#navOverlay').classList.remove('is-open'));
  $$('#navOverlay a').forEach(a => a.addEventListener('click', () => $('#navOverlay').classList.remove('is-open')));

  /* ===========================================
     RECEIPT CARD BUILDER
     =========================================== */
  function makeReceiptCard(r) {
    const el = document.createElement('div');
    el.className = 'receipt-card';
    el.dataset.cat = r.cat;
    el.innerHTML = `
      <div class="receipt-card__head"><span>thermemo</span><span>${r.date}</span></div>
      <div class="receipt-card__photo receipt-card__photo--${r.tone}"></div>
      <div class="receipt-card__caption">${r.cap}</div>
      <div class="receipt-card__meta"><span>NO. ${r.num}</span><span>SESI</span></div>
      <div class="receipt-card__side">${r.side}</div>
    `;
    return el;
  }

  /* ---------- populate sample scroll on home ---------- */
  function populateHome() {
    const sample = $('#sampleScroll');
    SAMPLE_RECEIPTS.slice(0, 6).forEach(r => sample.appendChild(makeReceiptCard(r)));
    const test = $('#testimonialRow');
    TESTIMONIALS.forEach(r => test.appendChild(makeReceiptCard(r)));
  }

  /* ---------- gallery ---------- */
  function populateGallery() {
    const grid = $('#galleryGrid');
    grid.innerHTML = '';
    SAMPLE_RECEIPTS.forEach((r, i) => {
      const c = makeReceiptCard(r);
      c.dataset.idx = i;
      c.addEventListener('click', () => openLightbox(i));
      grid.appendChild(c);
    });

    $$('.filter-pill').forEach(p => {
      p.addEventListener('click', () => {
        $$('.filter-pill').forEach(x => x.classList.remove('is-active'));
        p.classList.add('is-active');
        const f = p.dataset.filter;
        $$('#galleryGrid .receipt-card').forEach(c => {
          c.style.display = (f === 'all' || c.dataset.cat === f) ? '' : 'none';
        });
      });
    });
  }

  let lbIdx = 0;
  function openLightbox(i) {
    lbIdx = i;
    const inner = $('#lightboxInner');
    inner.innerHTML = '';
    inner.appendChild(makeReceiptCard(SAMPLE_RECEIPTS[i]));
    $('#lightbox').classList.add('is-open');
  }
  $('#lightboxClose').addEventListener('click', () => $('#lightbox').classList.remove('is-open'));
  $('#lightboxPrev').addEventListener('click', () => openLightbox((lbIdx - 1 + SAMPLE_RECEIPTS.length) % SAMPLE_RECEIPTS.length));
  $('#lightboxNext').addEventListener('click', () => openLightbox((lbIdx + 1) % SAMPLE_RECEIPTS.length));
  document.addEventListener('keydown', (e) => {
    if (!$('#lightbox').classList.contains('is-open')) return;
    if (e.key === 'Escape') $('#lightbox').classList.remove('is-open');
    if (e.key === 'ArrowLeft') $('#lightboxPrev').click();
    if (e.key === 'ArrowRight') $('#lightboxNext').click();
  });

  /* ===========================================
     PHOTOBOOTH WIZARD
     =========================================== */
  const booth = {
    step: 1,
    layout: 0,    // # of photos
    frame: null,  // frame id
    photos: [],   // dataURLs
    caption: '',
    showDate: true,
    showNum: true,
    square: false,
    timer: false,
    facingMode: 'user',
    stream: null,
    session: '',
    date: '',
    time: '',
    initialized: false,
  };

  function initPhotobooth() {
    if (booth.initialized) return;
    booth.initialized = true;

    // Layout cards
    const lg = $('#layoutGrid');
    LAYOUTS.forEach(L => {
      const c = document.createElement('div');
      c.className = 'layout-card';
      c.dataset.id = L.id;
      const frames = Array.from({length: L.id}, () => '<div class="layout-card__frame"></div>').join('');
      c.innerHTML = `
        <div class="layout-card__preview">${frames}</div>
        <div class="layout-card__name">${L.label}</div>
        <div class="layout-card__hint">${L.hint}</div>
      `;
      c.addEventListener('click', () => {
        $$('.layout-card').forEach(x => x.classList.remove('is-selected'));
        c.classList.add('is-selected');
        booth.layout = L.id;
        $('#step1Next').disabled = false;
      });
      lg.appendChild(c);
    });

    // Frames
    const fs = $('#framesScroll');
    FRAMES.forEach(F => {
      const c = document.createElement('div');
      c.className = 'frame-card';
      c.dataset.id = F.id;
      const cls = F.cls ? `frame-card__preview--${F.cls}` : '';
      c.innerHTML = `
        <div class="frame-card__preview ${cls}">
          <div style="display:flex; justify-content:space-between; font-size:7px;"><span>thermemo</span><span>·</span></div>
          <div class="frame-card__photos"></div>
          <div style="display:flex; justify-content:space-between; font-size:7px;"><span>NO.0042</span><span>記</span></div>
        </div>
        <div class="frame-card__name">${F.name}</div>
        <div class="frame-card__sub">${F.sub}</div>
      `;
      c.addEventListener('click', () => {
        $$('.frame-card').forEach(x => x.classList.remove('is-selected'));
        c.classList.add('is-selected');
        booth.frame = F.id;
        $('#step2Next').disabled = false;
      });
      fs.appendChild(c);
    });

    // Step navigation
    $('#step1Next').addEventListener('click', () => goStep(2));
    $('#step2Next').addEventListener('click', () => goStep(3));
    $('#step3Next').addEventListener('click', () => goStep(4));
    $('#step4Next').addEventListener('click', () => goStep(5));
    $$('[data-back]').forEach(b => b.addEventListener('click', () => goStep(parseInt(b.dataset.back, 10))));

    // Camera controls
    $('#takePhotoBtn').addEventListener('click', () => onCapture());
    $('#flipBtn').addEventListener('click', () => flipCamera());
    $('#timerBtn').addEventListener('click', () => {
      booth.timer = !booth.timer;
      $('#timerBtn').classList.toggle('is-on', booth.timer);
    });
    $('#uploadInput').addEventListener('change', onUpload);

    // Customization
    $('#captionInput').addEventListener('input', (e) => { booth.caption = e.target.value; renderPreview(); });
    $$('.cust-toggle').forEach(t => t.addEventListener('click', () => {
      t.classList.toggle('is-on');
      booth[t.dataset.toggle] = t.classList.contains('is-on');
      renderPreview();
    }));

    // Step 5 actions
    $('#downloadBtn').addEventListener('click', downloadReceipt);
    $('#shareBtn').addEventListener('click', () => {
      downloadReceipt(true);
      alert('struk tersimpan. open instagram → stories → upload from camera roll.');
    });
    $('#resetBtn').addEventListener('click', resetBooth);
  }

  function goStep(n) {
    booth.step = n;
    for (let i = 1; i <= 5; i++) {
      const p = $('#boothPanel' + i);
      if (p) p.style.display = (i === n) ? 'block' : 'none';
      const dot = $(`.booth__step[data-step="${i}"]`);
      if (dot) {
        dot.classList.toggle('is-active', i === n);
        dot.classList.toggle('is-done', i < n);
        const dotEl = dot.querySelector('.booth__step-dot');
        if (i < n) dotEl.innerHTML = '✓';
        else dotEl.innerHTML = String(i);
      }
    }
    if (n === 3) initCamera();
    if (n === 3) buildSlots();
    if (n === 4) {
      stampMeta();
      renderPreview();
    }
    if (n === 5) {
      mountFinalReceipt();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function buildSlots() {
    const wrap = $('#slotsStrip');
    wrap.innerHTML = '';
    $('#step3Sub').textContent = `${booth.layout} shot${booth.layout > 1 ? 's' : ''} required`;
    $('#shotsPlural').textContent = booth.layout > 1 ? 's' : '';
    for (let i = 0; i < booth.layout; i++) {
      const s = document.createElement('div');
      s.className = 'slot';
      s.dataset.idx = i;
      s.textContent = `slot 0${i + 1}`;
      if (booth.photos[i]) fillSlot(s, i);
      wrap.appendChild(s);
    }
    updateStep3Next();
  }
  function fillSlot(s, i) {
    s.classList.add('is-filled');
    s.innerHTML = `
      <img class="slot__img" src="${booth.photos[i]}" alt="photo ${i+1}" />
      <button class="slot__retake" data-idx="${i}">×</button>
    `;
    s.querySelector('.slot__retake').addEventListener('click', (e) => {
      e.stopPropagation();
      booth.photos[i] = null;
      buildSlots();
    });
  }
  function updateStep3Next() {
    const filled = booth.photos.filter(Boolean).length;
    $('#step3Next').disabled = filled < booth.layout;
  }

  async function initCamera() {
    if (booth.stream) return;
    const video = $('#cameraVideo');
    const placeholder = $('#cameraPlaceholder');
    const errBox = $('#cameraError');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: booth.facingMode },
        audio: false
      });
      booth.stream = stream;
      video.srcObject = stream;
      video.style.display = 'block';
      placeholder.style.display = 'none';
      errBox.style.display = 'none';
    } catch (err) {
      video.style.display = 'none';
      placeholder.style.display = 'flex';
      errBox.style.display = 'block';
    }
  }

  async function flipCamera() {
    booth.facingMode = booth.facingMode === 'user' ? 'environment' : 'user';
    if (booth.stream) {
      booth.stream.getTracks().forEach(t => t.stop());
      booth.stream = null;
    }
    await initCamera();
  }

  async function onCapture() {
    const nextEmpty = findEmptySlot();
    if (nextEmpty === -1) return;
    if (booth.timer) {
      await runCountdown();
    }
    flashShutter();
    const data = grabFrame();
    if (data) {
      booth.photos[nextEmpty] = data;
      buildSlots();
    }
  }
  function findEmptySlot() {
    for (let i = 0; i < booth.layout; i++) if (!booth.photos[i]) return i;
    return -1;
  }
  function runCountdown() {
    return new Promise(res => {
      const c = $('#countdown');
      c.classList.add('is-active');
      let n = 3;
      c.textContent = n;
      const tick = setInterval(() => {
        n -= 1;
        if (n <= 0) {
          clearInterval(tick);
          c.classList.remove('is-active');
          res();
        } else c.textContent = n;
      }, 700);
    });
  }
  function flashShutter() {
    const f = $('#flash');
    f.classList.remove('is-flash');
    void f.offsetWidth;
    f.classList.add('is-flash');
  }
  function grabFrame() {
    const video = $('#cameraVideo');
    if (!video.videoWidth) return null;
    const cv = document.createElement('canvas');
    cv.width = video.videoWidth;
    cv.height = video.videoHeight;
    const ctx = cv.getContext('2d');
    ctx.filter = 'grayscale(100%) contrast(1.05)';
    ctx.drawImage(video, 0, 0);
    return cv.toDataURL('image/jpeg', 0.92);
  }
  function onUpload(e) {
    const files = Array.from(e.target.files).slice(0, booth.layout);
    files.forEach((file, i) => {
      const fr = new FileReader();
      fr.onload = (ev) => {
        // need to convert to grayscale via canvas
        const img = new Image();
        img.onload = () => {
          const cv = document.createElement('canvas');
          cv.width = img.naturalWidth;
          cv.height = img.naturalHeight;
          const ctx = cv.getContext('2d');
          ctx.filter = 'grayscale(100%) contrast(1.05)';
          ctx.drawImage(img, 0, 0);
          const slot = findEmptySlot();
          if (slot !== -1) {
            booth.photos[slot] = cv.toDataURL('image/jpeg', 0.92);
            buildSlots();
          }
        };
        img.src = ev.target.result;
      };
      fr.readAsDataURL(file);
    });
  }

  function stampMeta() {
    const now = new Date();
    const d = now.toLocaleDateString('en-GB').replace(/\//g, '.');
    const t = now.toTimeString().slice(0, 5);
    booth.date = d;
    booth.time = t;
    if (!booth.session) booth.session = String(Math.floor(1000 + Math.random() * 9000));
    $('#metaDate').textContent = d;
    $('#metaTime').textContent = t;
    $('#metaSession').textContent = 'MEM-' + d.replace(/\./g, '') + '-' + booth.session;
  }

  function renderPreview(targetSel = '#receiptPreview') {
    const el = $(targetSel);
    if (!el) return;
    const F = FRAMES.find(f => f.id === booth.frame) || FRAMES[0];
    const cls = F.cls ? `receipt-preview--${F.cls}` : '';
    el.className = `receipt-preview ${cls}`;
    const photoTags = booth.photos.slice(0, booth.layout).map(p => {
      if (p) return `<div class="receipt-preview__photo" ${booth.square ? 'style="aspect-ratio:1/1;"' : ''}><img src="${p}" /></div>`;
      return `<div class="receipt-preview__photo receipt-preview__photo--empty" ${booth.square ? 'style="aspect-ratio:1/1;"' : ''}></div>`;
    }).join('');
    const cap = (booth.caption || 'a small moment.').slice(0, 24);
    el.innerHTML = `
      <div class="receipt-preview__brand">thermemo</div>
      <div class="receipt-preview__brand-sub">記ノ片 · ki no kata</div>
      <div class="receipt-preview__meta-row">
        ${booth.showDate ? `<span>DATE · ${booth.date}</span><span>TIME · ${booth.time}</span>` : '<span></span><span></span>'}
      </div>
      <div class="receipt-preview__photos">${photoTags}</div>
      <div class="receipt-preview__caption">${cap}</div>
      <div class="receipt-preview__divider"></div>
      <div class="receipt-preview__foot">
        <span>${booth.showNum ? 'NO. ' + booth.session : ''}</span>
        <div class="receipt-preview__seal">記片</div>
      </div>
      <div class="receipt-preview__tagline">proof that this moment happened.</div>
      <div class="receipt-preview__side">記ノ片 · KI NO KATA</div>
    `;
  }

  function mountFinalReceipt() {
    const mount = $('#finalReceiptMount');
    mount.innerHTML = '<div class="receipt-preview" id="finalReceipt"></div>';
    renderPreview('#finalReceipt');
  }

  async function downloadReceipt() {
    const el = $('#finalReceipt') || $('#receiptPreview');
    if (!el) return;
    try {
      const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: null });
      const link = document.createElement('a');
      link.download = `thermemo_${booth.date.replace(/\./g, '')}_${booth.session}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error(e);
    }
  }

  function resetBooth() {
    booth.layout = 0;
    booth.frame = null;
    booth.photos = [];
    booth.caption = '';
    booth.session = '';
    $('#captionInput').value = '';
    $$('.layout-card, .frame-card').forEach(x => x.classList.remove('is-selected'));
    $('#step1Next').disabled = true;
    $('#step2Next').disabled = true;
    goStep(1);
  }

  /* ===========================================
     BLOG
     =========================================== */
  function buildBlogIndex() {
    const g = $('#blogGrid');
    if (g.children.length) return;
    BLOG.forEach(p => {
      const c = document.createElement('a');
      c.className = 'post-card';
      c.href = `#/blog/${p.slug}`;
      c.innerHTML = `
        <div class="post-card__cover receipt-card__photo--${p.tone}"></div>
        <div class="post-card__cat">${p.cat}</div>
        <h3 class="post-card__title">${p.title}</h3>
        <p class="post-card__excerpt">${p.excerpt}</p>
        <div class="post-card__meta"><span>${p.date}</span><span>${p.read}</span></div>
      `;
      g.appendChild(c);
    });
  }
  function buildBlogPost(slug) {
    const p = BLOG.find(x => x.slug === slug);
    if (!p) return;
    const body = `
      <p>kertasnya kuning sedikit. tinta cedar di pojok kanan. tanggal 14 mei. nomor 0039. kalimat yang dicetak kaushan: <em>"kami semua, sekali ini saja."</em></p>
      <p>aku menemukan struk itu di kantong jaket — yang aku pakai bulan lalu, lupa kapan terakhir. ada potongan film grain yang sudah memudar, dan empat wajah yang terlalu kecil untuk dikenali kalau bukan aku yang ada di sana.</p>
      <p>tapi aku ingat. dengan jelas. seolah kertas itu menyimpan sesuatu yang lebih dari foto.</p>
      <div class="post__pull">"kenangan tidak hidup di file digital. dia hidup di benda fisik yang tidak sengaja kita simpan."</div>
      <p>ini bukan klaim sentimental. ini cara otak kita bekerja. memori terjepit lebih kuat ke benda — tactile, terbatas, tidak bisa di-undo. struk parkir di laci. tiket konser di buku tahunan. struk kopi yang dilipat jadi pembatas buku. semua itu berfungsi sebagai jangkar.</p>
      <p>thermemo mencoba membuat jangkar yang dirancang sejak awal untuk itu. struk yang tidak menuduh kamu telah membayar sesuatu, tapi mengakui bahwa kamu pernah berada di tempat dan waktu tertentu, bersama orang-orang tertentu.</p>
      <p>itu saja. itu cukup.</p>
    `;
    $('#postArticle').innerHTML = `
      <div class="post__cat">${p.cat} · field notes</div>
      <h1 class="post__title">${p.title}</h1>
      <div class="post__meta"><span>${p.date}</span><span>${p.read} READ</span><span>BY THERMEMO</span></div>
      <div class="post__cover receipt-card__photo--${p.tone}"></div>
      <div class="post__body">${body}</div>
      <div class="post__tags">
        <span class="post__tag">${p.cat}</span>
        <span class="post__tag">memory</span>
        <span class="post__tag">記ノ片</span>
      </div>
      <a class="post__back link-arrow" href="#/blog">← Back to field notes</a>
    `;
  }

  /* ===========================================
     FAQ
     =========================================== */
  function buildFaq(target, groups) {
    const wrap = $(target);
    wrap.innerHTML = '';
    groups.forEach(g => {
      const gWrap = document.createElement('div');
      gWrap.className = 'faq-group';
      gWrap.innerHTML = `<h3>${g.group}</h3>`;
      g.items.forEach(item => {
        const f = document.createElement('div');
        f.className = 'faq';
        f.innerHTML = `
          <button class="faq__q" type="button">
            <span>${item.q}</span>
            <span class="faq__icon">+</span>
          </button>
          <div class="faq__a"><div class="faq__a-inner">${item.a}</div></div>
        `;
        const q = f.querySelector('.faq__q');
        const a = f.querySelector('.faq__a');
        q.addEventListener('click', () => {
          const open = f.classList.toggle('is-open');
          a.style.maxHeight = open ? a.firstElementChild.scrollHeight + 'px' : '0';
        });
        gWrap.appendChild(f);
      });
      wrap.appendChild(gWrap);
    });
  }

  function populatePricingFaq() {
    const wrap = $('#pricingFaq');
    if (!wrap || wrap.children.length) return;
    const subset = [
      FAQS[1].items[0], // why receipt
      FAQS[2].items[0], // how to book
      FAQS[2].items[2], // refund
    ];
    buildFaq('#pricingFaq', [{ group: '', items: subset }]);
    const h = $('#pricingFaq h3'); if (h) h.style.display = 'none';
  }

  /* ===========================================
     CONTACT
     =========================================== */
  function stampContactDate() {
    const now = new Date();
    const d = now.toLocaleDateString('en-GB').replace(/\//g, '.');
    $('#contactDate').textContent = d;
  }
  $('#contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const num = 'MEM-' + (new Date().toLocaleDateString('en-GB').replace(/\//g, '')) + '-' + Math.floor(1000 + Math.random() * 9000);
    $('#contactRecNum').textContent = 'REF · ' + num;
    $('#contactForm').style.display = 'none';
    $('#contactSuccess').classList.add('is-on');
  });

  /* ===========================================
     BOOKING wizard
     =========================================== */
  const booking = { step: 1, time: '', data: {} };
  function stampBookingDate() {
    const now = new Date();
    $('#bookingDate').textContent = now.toLocaleDateString('en-GB').replace(/\//g, '.');
  }
  function setBookingStep(n) {
    booking.step = n;
    for (let i = 1; i <= 3; i++) {
      const p = $('#bookingPanel' + i);
      if (p) p.style.display = (i === n) ? 'block' : 'none';
      const dot = $(`[data-bstep="${i}"]`);
      if (dot) {
        dot.classList.toggle('is-active', i === n);
        dot.classList.toggle('is-done', i < n);
        const d = dot.querySelector('.booth__step-dot');
        if (i < n) d.innerHTML = '✓';
        else d.innerHTML = String(i);
      }
    }
    if (n === 3) buildBookingSummary();
  }
  document.addEventListener('click', (e) => {
    const next = e.target.closest('[data-bnext]');
    const back = e.target.closest('[data-bback]');
    if (next) setBookingStep(parseInt(next.dataset.bnext, 10));
    if (back) setBookingStep(parseInt(back.dataset.bback, 10));
    const tp = e.target.closest('.time-pill');
    if (tp) {
      $$('.time-pill').forEach(x => x.classList.remove('is-active'));
      tp.classList.add('is-active');
      booking.time = tp.dataset.time;
    }
  });

  function getBookingData() {
    const f = $('#bookingForm');
    return {
      name: f.name.value || '—',
      wa: f.wa.value || '—',
      email: f.email.value || '—',
      people: f.people.value,
      date: f.date.value || '—',
      time: booking.time || '—',
      pkg: f.package.value,
      layout: f.layout.value,
      frame: f.frame.value,
      request: f.request.value || '',
    };
  }
  function buildBookingSummary() {
    const d = getBookingData();
    const num = 'MEM-' + (new Date().toLocaleDateString('en-GB').replace(/\//g, '')) + '-' + Math.floor(1000 + Math.random() * 9000);
    booking.recNum = num;
    const rows = [
      ['Ref', num],
      ['Name', d.name],
      ['WhatsApp', d.wa],
      ['People', d.people],
      ['Date', d.date],
      ['Time', d.time],
      ['Package', d.pkg],
      ['Layout', d.layout],
      ['Frame', d.frame],
    ];
    if (d.request) rows.push(['Request', d.request]);
    const html = rows.map(([l, v]) => `
      <div class="booking-summary__row">
        <span class="booking-summary__label">${l}</span>
        <span class="booking-summary__dots"></span>
        <span class="booking-summary__value">${v}</span>
      </div>
    `).join('');
    $('#bookingSummary').innerHTML = html;
    const price = d.pkg.includes('35K') ? 'Rp 35.000' : d.pkg.includes('55K') ? 'Rp 55.000' : 'Custom';
    $('#bookingTotal').textContent = price;

    // WA link
    const msg = `Halo thermemo!\nSaya ingin booking sesi foto:\n\nNama: ${d.name}\nTanggal: ${d.date}\nWaktu: ${d.time}\nPackage: ${d.pkg}\nLayout: ${d.layout}\nFrame: ${d.frame}\nJumlah orang: ${d.people}\n${d.request ? 'Catatan: ' + d.request + '\n' : ''}\nRef: ${num}\n\nMohon konfirmasi ketersediaan ya, terima kasih!`;
    $('#bookingWA').href = `https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`;
  }
  $('#bookingSend').addEventListener('click', () => {
    const d = getBookingData();
    $('#bookingForm').style.display = 'none';
    $('#bookingConfirm').classList.add('is-on');
    $('#bookingRecCard').innerHTML = `
      <div class="cust-meta__row"><span>REF</span><span>${booking.recNum}</span></div>
      <div class="cust-meta__row"><span>DATE</span><span>${d.date}</span></div>
      <div class="cust-meta__row"><span>TIME</span><span>${d.time}</span></div>
    `;
  });

  /* ===========================================
     REVEAL animation
     =========================================== */
  let revealObserver = null;
  function revealOnView() {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            revealObserver.unobserve(e.target);
          }
        });
      }, { threshold: 0.15 });
    }
    $$('.reveal:not(.is-in)').forEach(el => {
      // only observe in currently visible page
      if (el.closest('.page.is-active')) revealObserver.observe(el);
      else el.classList.add('is-in');
    });
  }

  /* ===========================================
     INIT
     =========================================== */
  function init() {
    populateHome();
    populateGallery();
    buildFaq('#faqWrap', FAQS);
    populatePricingFaq();
    setActivePage(getRoute());
  }
  init();

})();
