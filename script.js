/* ============================================================
   PRASHANT PANDA — V4 · THE SCREENING ROOM
   one shared script for all pages — every module guards on the
   presence of its DOM ( / · /work · /directors · /storyteller ·
   /contact ); clean URLs via vercel cleanUrls + serve.py locally
   Sources: vimeo.com/showcase/8346821 (verified embeds + real
   durations) and imdb.com/name/nm8079333 (filmography).
   Fidelity rules (carried from V1–V3, revised per Prashant's
   notes of 2026-07-26):
     · IMDB ratings rendered ONLY when >= 7.0
     · My Name Is Khan + Paying Guest listed as ASSOCIATE FILM
       EDITOR (Prashant's own credit correction); the remaining
       editorial-department titles stay excluded
     · ad-film genre tags (humor/storytelling/action/stylish)
       are DRAFT assignments — awaiting Prashant's corrections
     · awards list + music-video reel pending from Prashant
     · no email anywhere until Prashant supplies his address
   ============================================================ */
(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const pad2 = n => String(n).padStart(2, '0');
  const mmss = s => `${pad2(Math.floor(s / 60))}:${pad2(s % 60)}`;

  /* ============================================================
     AD FILMS (playable — vimeo showcase, unlisted hashes)
     ============================================================ */
  const ADS = [
    { id: 1,  vid: '1088993725', hash: 'cd85ed120d', title: 'GIC — Mary',               client: 'GIC Insurance',   credits: 'Jamic Films · Dir. Shirish Daiya',                dur: 93, tag: 'STORYTELLING' },
    { id: 2,  vid: '1106434425', hash: 'd768255096', title: 'Chupa Chup',               client: 'Perfetti Van Melle', credits: 'Ogilvy · Dir. Nikhil Rao',                     dur: 60, tag: 'HUMOR' },
    { id: 3,  vid: '1031822870', hash: '34305ab15d', title: 'EVA — Yes',                client: 'EVA',             credits: 'Dir. Varun Gupta',                                dur: 64, tag: 'STYLISH' },
    { id: 4,  vid: '1073818885', hash: 'd659e0694c', title: 'Snickers',                 client: 'Snickers',        credits: 'Dir. Rishabh Dubey',                              dur: 35, tag: 'HUMOR' },
    { id: 5,  vid: '1166613867', hash: '406b559643', title: 'ICICI Bank',               client: 'ICICI Bank',      credits: '',                                                dur: 40, tag: 'HUMOR' },
    { id: 6,  vid: '1015277896', hash: '25f1c9636d', title: 'Candid Dusting Powder',    client: 'Candid',          credits: 'BBDO India · Ducktape · Dir. Rishabh Dubey',      dur: 53, tag: 'HUMOR' },
    { id: 7,  vid: '867458294',  hash: '74dda2c808', title: 'Greenply E-Zero',          client: 'Greenply',        credits: 'Jamic Films · Dir. Nikhil Rao · ft. NTR Jr',      dur: 35, tag: 'ACTION' },
    { id: 8,  vid: '1149446709', hash: '45c47a44bc', title: 'Hint — Pyaar ka Take-off', client: 'Hint',            credits: 'Jamic Films · Dir. Shirish Daiya',                dur: 50, tag: 'STORYTELLING' },
    { id: 9,  vid: '1088994415', hash: '270d911f7c', title: 'GIC — Integrated',         client: 'GIC Insurance',   credits: 'Jamic Films · Dir. Shirish Daiya',                dur: 30, tag: 'STORYTELLING' },
    { id: 10, vid: '1106435260', hash: 'ec61b93f55', title: 'ENVY',                     client: 'ENVY',            credits: 'Dir. Vivek Daschaudhary',                         dur: 40, tag: 'STYLISH' },
  ];
  const TAGS = ['HUMOR', 'STORYTELLING', 'ACTION', 'STYLISH'];
  const img = p => `assets/img/work/${p.vid}.jpg`;
  const byId = id => ADS.find(p => p.id === id);
  const LIST = ADS; /* player order = showcase order */

  /* ============================================================
     SERIES + FILMS (no embeddable video — rendered as slates)
     · sorted: series by IMDB desc, films by year desc
     · rating shown only when >= 7.0
     ============================================================ */
  const SERIES = [
    { title: 'Permanent Roommates',        years: '2014–2016', eps: 5,  rating: 8.6, platform: 'TVF' },
    { title: 'Hostel Daze',                years: '2019–2022', eps: 3,  rating: 8.5, platform: 'TVF · Prime Video' },
    { title: 'Operation MBBS',             years: '2020–2021', eps: 2,  rating: 8.3, platform: '' },
    { title: 'Cheesecake',                 years: '2019',      eps: 5,  rating: 8.2, platform: '' },
    { title: 'Cartel',                     years: '2021',      eps: 14, rating: 8.0, platform: 'ALTBalaji' },
    { title: 'Bachelors vs the World',     years: '2022',      eps: 5,  rating: 7.8, platform: '' },
    { title: 'Ishq Next Door',             years: '2023',      eps: 7,  rating: 7.7, platform: 'JioCinema' },
    { title: 'Fireflies: Parth Aur Jugnu', years: '2023',      eps: 10, rating: 7.3, platform: '' },
    { title: 'CLASS of 2017',              years: '2017',      eps: 20, rating: 7.3, platform: 'ALTBalaji' },
    { title: "TSP's Zeroes",               years: '2018',      eps: 3,  rating: 7.2, platform: 'The Screen Patti' },
    { title: 'PA-Gals',                    years: '2017',      eps: 3,  rating: 6.6, platform: '' },
    { title: 'Puncch Beat',                years: '2018–2019', eps: 13, rating: 6.2, platform: 'ALTBalaji' },
    { title: 'Ragini MMS Returns',         years: '2017–2018', eps: 11, rating: 4.1, platform: 'ALTBalaji' },
  ];
  const FILMS = [
    { title: 'Rabia and Olivia', year: '2023', role: 'Editor',                note: 'Feature film' },
    { title: 'My Name Is Khan',  year: '2010', role: 'Associate Film Editor', note: 'Dir. Karan Johar' },
    { title: 'Paying Guest',     year: '',     role: 'Associate Film Editor', note: '' },
  ];
  const UPCOMING = { title: 'Rotten Apple', note: 'Feature film' };

  /* the reel — seven stories, one shared height, cinema widths.
     note = the thought behind the story (craft copy, not fact) */
  const REEL = [
    { id: 1,  t: 'GIC — MARY',                ar: '169',
      note: 'Insurance sold as belonging — a stray who stays. The cut sits still and lets the bond do the talking.' },
    { id: 2,  t: 'CHUPA CHUP',                ar: '34',
      note: 'A quiet joke built frame by frame. Comedy timing is edit timing — hold, hold, pay off.' },
    { id: 7,  t: 'GREENPLY E-ZERO',           ar: '239', tick: 'FT. NTR JR — DIR. NIKHIL RAO',
      note: 'A star walks into a carpenter’s world. Scale meets craft, and the edit keeps both honest.' },
    { id: 4,  t: 'SNICKERS',                  ar: '11',
      note: 'Hunger changes people — the gag only lands if the switch is invisible. Blink, and the cut already happened.' },
    { id: 8,  t: 'HINT — PYAAR KA TAKE-OFF',  ar: '45',
      note: 'A love story boarding in fifty seconds. Looks traded like dialogue — the edit does the flirting.' },
    { id: 6,  t: 'CANDID',                    ar: '169',
      note: 'Discomfort has a rhythm: squirm, beat, relief. A remedy told as situational comedy.' },
    { id: 10, t: 'ENVY',                      ar: '43',
      note: 'Fragrance is pure mood — no plot, only tempo. The edit wears the perfume.' },
  ];

  /* ============================================================
     DIRECTORS — Prashant's list of 2026-07-26, his order.
     works[] = ad ids playable in-site today; directors without
     works get an "in assembly" panel until he sends the titles.
     ============================================================ */
  const DIRECTORS = [
    { name: 'NIKHIL RAO',         house: 'JAMIC FILMS / CARROM FILMS', works: [2, 7],    still: '867458294' },
    { name: 'SHIRISH DAIYA',      house: 'JAMIC FILMS',                works: [1, 9, 8], still: '1088993725' },
    { name: 'RAJESH SAATHI',      house: 'KEROSCENE FILMS',            works: [],        still: '' },
    { name: 'SAPNA SINGH',        house: '',                           works: [],        still: '' },
    { name: 'RISHABH DUBEY',      house: 'BBDO / DUCKTAPE',            works: [4, 6],    still: '1073818885' },
    { name: 'RAHUL SRIVASTAVA',   house: '',                           works: [],        still: '' },
    { name: 'ABHIJIT SUDAKAR',    house: 'ZIGZAG FILM',                works: [],        still: '' },
    { name: 'VIVEK DASCHAUDHARY', house: 'KARMANLINE',                 works: [10],      still: '1106435260' },
    { name: 'VARUN GUPTA',        house: '',                           works: [3],       still: '1031822870' },
    { name: 'RAGHAVI AGARWAL',    house: '',                           works: [],        still: '' },
  ];

  /* ============================================================
     RENDER — REEL (filmstrip cards)
     ============================================================ */
  (function renderReel() {
    const strip = $('#reelStrip');
    if (!strip) return;
    REEL.forEach((r, i) => {
      const p = byId(r.id);
      const el = document.createElement('article');
      el.className = `piece piece--ar${r.ar} reveal`;
      el.innerHTML = `
        <button type="button" class="piece__media" data-play="${p.id}" aria-label="Play — ${p.title}">
          <img src="${img(p)}" alt="${p.title} — film still" ${i === 0 ? '' : 'loading="lazy"'} draggable="false" />
          ${r.tick ? `<span class="piece__tick">${r.tick}</span>` : ''}
        </button>
        <div class="piece__cap">
          <span class="piece__no">${pad2(i + 1)}</span>
          <span class="piece__title">${r.t}</span>
          <span class="piece__meta">${p.client.toUpperCase()} — ${mmss(p.dur)}</span>
        </div>
        <p class="piece__note">${r.note}</p>`;
      strip.appendChild(el);
    });
  })();

  /* ============================================================
     RENDER — INDEX (three shelves: ads / series / films)
     each shelf numbers its own titles; an end strip stretches
     to the last grid column (grid-column:auto/-1) so no shelf
     leaves bare cells
     ============================================================ */
  (function renderIndex() {
    const endStrip = (grid, text) => {
      const end = document.createElement('div');
      end.className = 'tile tile--end';
      end.innerHTML = `<span>[<i>●</i>]&nbsp;&nbsp;${text}</span>`;
      grid.appendChild(end);
    };
    const slate = (grid, no, N, tag, title, meta, rating, wide) => {
      const el = document.createElement('div');
      el.className = 'tile tile--slate' + (wide ? ' tile--wide' : '');
      el.innerHTML = `
        <span class="slate__top"><b>${pad2(no)} / ${pad2(N)} — ${tag}</b>${rating ? `<span>IMDB ${rating.toFixed(1)}</span>` : ''}</span>
        <span class="slate__title">${title.toUpperCase()}</span>
        <span class="slate__meta">${meta}</span>`;
      grid.appendChild(el);
    };

    const gAds = $('#gridAds');
    if (gAds) {
      ADS.forEach((p, i) => {
        const el = document.createElement('button');
        el.type = 'button';
        el.className = 'tile';
        el.dataset.play = p.id;
        el.dataset.tag = p.tag;
        el.setAttribute('aria-label', `Play — ${p.title}`);
        el.innerHTML = `
          <img loading="lazy" src="${img(p)}" alt="${p.title} — film still" />
          <span class="tile__no">${pad2(i + 1)} / ${pad2(ADS.length)}</span>
          <span class="tile__tag">${p.tag}</span>
          <span class="tile__cap"><b>${p.title.toUpperCase()}</b><span>${p.client.toUpperCase()} — ${mmss(p.dur)}</span></span>`;
        gAds.appendChild(el);
      });
      endStrip(gAds, `END OF AD FILMS — ${pad2(ADS.length)} CUTS`);
    }

    /* genre filter pills — Prashant's four lenses on the ad shelf */
    const filters = $('#adFilters');
    if (filters && gAds) {
      const counts = t => ADS.filter(p => p.tag === t).length;
      filters.innerHTML =
        `<button type="button" class="pill on" data-filter="ALL">ALL — ${pad2(ADS.length)}</button>` +
        TAGS.map(t => `<button type="button" class="pill" data-filter="${t}">${t} — ${pad2(counts(t))}</button>`).join('');
      filters.addEventListener('click', e => {
        const pill = e.target.closest('.pill');
        if (!pill) return;
        $$('.pill', filters).forEach(p => p.classList.toggle('on', p === pill));
        const f = pill.dataset.filter;
        $$('.tile[data-play]', gAds).forEach(t => {
          t.style.display = (f === 'ALL' || t.dataset.tag === f) ? '' : 'none';
        });
      });
    }

    const gSeries = $('#gridSeries');
    if (gSeries) {
      SERIES.forEach((s, i) => {
        const meta = [s.years, `${pad2(s.eps)} EP`, s.platform.toUpperCase()].filter(Boolean).join(' · ');
        slate(gSeries, i + 1, SERIES.length, 'SERIES', s.title, meta, s.rating >= 7 ? s.rating : 0, false);
      });
      endStrip(gSeries, `END OF SERIES — ${pad2(SERIES.length)} SHOWS`);
    }

    const gFilms = $('#gridFilms');
    if (gFilms) {
      FILMS.forEach((f, i) => {
        const meta = [f.year, f.role.toUpperCase(), f.note.toUpperCase()].filter(Boolean).join(' · ');
        slate(gFilms, i + 1, FILMS.length, 'FILM', f.title, meta, 0, i === 0);
      });
      /* upcoming — unnumbered, announced */
      const up = document.createElement('div');
      up.className = 'tile tile--slate tile--upcoming';
      up.innerHTML = `
        <span class="slate__top"><b>UPCOMING — FILM</b></span>
        <span class="slate__title">${UPCOMING.title.toUpperCase()}</span>
        <span class="slate__meta">${UPCOMING.note.toUpperCase()} · IN THE WORKS</span>`;
      gFilms.appendChild(up);
      endStrip(gFilms, 'END OF REEL — CUT TO BLACK');
    }
  })();

  /* ============================================================
     BANNERS — ad-film brands + agencies (under 02·A) and the
     platforms/banners the series & films aired on (under 02·C)
     logo: filename in assets/img/brands/ (official marks,
     recolored bone via CSS) · logo:null → typographic fallback
     ============================================================ */
  const BRANDS_ROW = [
    { name: 'GIC',                logo: null }, /* Council lockup too fine-printed for marquee scale */
    { name: 'SNICKERS',           logo: 'snickers.svg' },
    { name: 'ICICI BANK',         logo: 'icici-bank.svg' },
    { name: 'PERFETTI VAN MELLE', logo: 'perfetti.svg' },
    { name: 'CANDID',             logo: 'candid.svg' },
    { name: 'GREENPLY',           logo: 'greenply.svg' },
    { name: 'HINT',               logo: 'hint.svg' },
    { name: 'EVA',                logo: 'eva.svg' },
    { name: 'ENVY',               logo: 'envy.png' },
    { name: 'OGILVY',             logo: 'ogilvy.svg' },
    { name: 'BBDO INDIA',         logo: 'bbdo.svg' },
    { name: 'JAMIC FILMS',        logo: 'jamic-films.png' },
    { name: 'DUCKTAPE',           logo: 'ducktape.png' },
    { name: 'CARROM FILMS',       logo: null },
    { name: 'KEROSCENE FILMS',    logo: null },
    { name: 'ZIGZAG FILM',        logo: null },
    { name: 'KARMANLINE',         logo: null },
  ];
  const PLATFORMS_ROW = [
    { name: 'TVF',              logo: 'tvf.png' },
    { name: 'PRIME VIDEO',      logo: 'prime-video.svg' },
    { name: 'ALTBALAJI',        logo: 'altbalaji.svg' },
    { name: 'JIOCINEMA',        logo: 'jiocinema.svg' },
    { name: 'THE SCREEN PATTI', logo: 'screen-patti.png' },
  ];
  (function renderBanners() {
    const item = b => b.logo
      ? `<img class="bmq__logo" src="assets/img/brands/${b.logo}" alt="${b.name}" loading="lazy" />`
      : `<span>${b.name.replace(/ /g, '&nbsp;')}</span>`;
    const fill = (id, row) => {
      const track = $(id);
      if (!track) return;
      /* short rows repeat within each half so one half always outspans the viewport */
      const reps = row.length < 7 ? 2 : 1;
      const half = Array.from({ length: reps }, () => row.map(b => `${item(b)}<b>●</b>`).join('')).join('');
      track.innerHTML = half + half; /* ×2 for the -50% loop */
    };
    fill('#bmqBrands', BRANDS_ROW);
    fill('#bmqPlatforms', PLATFORMS_ROW);
  })();

  /* ============================================================
     RENDER — DIRECTORS (rows + cursor-follow still)
     ============================================================ */
  (function renderDirectors() {
    const wrap = $('#dirRows');
    if (!wrap) return;
    DIRECTORS.forEach((d, i) => {
      const cuts = d.works.map(byId);
      const metaTop = cuts.length ? cuts.map(w => w.title.toUpperCase()).join(' · ') : 'CUTS — LIST IN ASSEMBLY';
      const metaBot = [cuts.length ? `${pad2(cuts.length)} CUTS` : '', d.house].filter(Boolean).join(' — ') || '&nbsp;';
      const chips = cuts.length
        ? cuts.map(w => `<button type="button" class="dirchip" data-play="${w.id}">${w.title.toUpperCase()}&nbsp;▸</button>`).join('')
        : '<span class="dirchip dirchip--tbc">FULL LIST IN ASSEMBLY — SOON</span>';
      const el = document.createElement('div');
      el.className = 'dir reveal';
      el.dataset.still = d.still;
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-expanded', 'false');
      el.innerHTML = `
        <span class="dir__no">D.${pad2(i + 1)}</span>
        <span class="dir__name">${d.name}</span>
        <span class="dir__meta">${metaTop}<br/>${metaBot}</span>
        <div class="dir__works">${chips}</div>`;
      wrap.appendChild(el);
    });

    /* tap a name → its cuts unfold (and play in-site) */
    const toggle = row => {
      const open = row.classList.toggle('open');
      row.setAttribute('aria-expanded', String(open));
    };
    wrap.addEventListener('click', e => {
      if (e.target.closest('[data-play]')) return; /* chip → player */
      const row = e.target.closest('.dir');
      if (row) toggle(row);
    });
    wrap.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const row = e.target.closest('.dir');
      if (row && !e.target.closest('[data-play]')) { e.preventDefault(); toggle(row); }
    });

    const float = $('#dirFloat'), fimg = $('#dirFloatImg');
    if (!float || !fimg || window.matchMedia('(max-width:900px)').matches || reduced) return;
    let fx = 0, fy = 0, tx = 0, ty = 0, raf = null;
    const loop = () => {
      fx += (tx - fx) * 0.16; fy += (ty - fy) * 0.16;
      float.style.transform = `translate(${fx}px,${fy}px)`;
      raf = requestAnimationFrame(loop);
    };
    wrap.addEventListener('mousemove', e => { tx = e.clientX + 28; ty = e.clientY - 90; });
    $$('.dir', wrap).forEach(row => {
      row.addEventListener('mouseenter', e => {
        const still = row.dataset.still;
        if (!still) { float.classList.remove('on'); return; }
        fimg.src = `assets/img/work/${still}.jpg`;
        fx = tx = e.clientX + 28; fy = ty = e.clientY - 90;
        float.classList.add('on');
        if (!raf) loop();
      });
      row.addEventListener('mouseleave', () => float.classList.remove('on'));
    });
    wrap.addEventListener('mouseleave', () => {
      float.classList.remove('on');
      if (raf) { cancelAnimationFrame(raf); raf = null; }
    });
  })();

  /* ============================================================
     PRELOADER
     ============================================================ */
  const loader = $('#loader');
  (function preload() {
    if (!loader) return;
    const fill = $('#loaderFill'), num = $('#loaderNum');
    let p = 0;
    const tick = () => {
      p += Math.random() * 22 + 9;
      if (p >= 100) p = 100;
      if (fill) fill.style.width = p + '%';
      if (num) num.textContent = pad2(Math.floor(p) === 100 ? 99 : Math.floor(p));
      if (p < 100) setTimeout(tick, 70 + Math.random() * 90);
      else setTimeout(() => {
        if (num) num.textContent = '100';
        loader.classList.add('done');
        document.body.classList.add('loaded');
      }, 260);
    };
    setTimeout(tick, 200);
  })();

  /* ============================================================
     CUSTOM CURSOR — ring becomes PLAY over film media
     ============================================================ */
  (function cursor() {
    const el = $('#cursor');
    if (!el || window.matchMedia('(max-width:900px)').matches) return;
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
    addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; });
    const loop = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      el.style.transform = `translate(${cx}px,${cy}px)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener('mouseover', e => {
      const play = e.target.closest('[data-play], .hero__play');
      const hot = e.target.closest('a, button');
      el.classList.toggle('is-play', !!play);
      el.classList.toggle('is-hot', !!hot && !play);
    });
    document.addEventListener('mouseout', () => {
      el.classList.remove('is-play', 'is-hot');
    });
  })();

  /* ============================================================
     NAV + FULLSCREEN MENU (hover = still preview)
     ============================================================ */
  const menu = $('#menu'), burger = $('#burger'), burgerLabel = $('#burgerLabel');
  const menuOpen = () => menu && menu.classList.contains('open');
  function toggleMenu(open) {
    if (!menu || !burger) return;
    burger.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    burger.setAttribute('aria-expanded', String(open));
    if (burgerLabel) burgerLabel.textContent = open ? 'CLOSE' : 'MENU';
    document.body.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  (function nav() {
    const nav = $('#nav');
    /* bone-opening pages (storyteller) force a solid nav from the top */
    const forceSolid = document.body.dataset.nav === 'solid';
    const onScroll = () => nav && nav.classList.toggle('solid', forceSolid || scrollY > 40);
    onScroll(); addEventListener('scroll', onScroll, { passive: true });
    if (burger && menu) {
      burger.addEventListener('click', () => toggleMenu(!menuOpen()));
      $$('a', menu).forEach(a => a.addEventListener('click', () => toggleMenu(false)));
    }
    /* menu link hover → background still */
    const bgs = $$('.menu__bg img');
    const show = key => bgs.forEach(b => b.classList.toggle('show', b.dataset.menubg === key));
    $$('.menu__links a').forEach(a => {
      a.addEventListener('mouseenter', () => show(a.dataset.bg));
      a.addEventListener('focus', () => show(a.dataset.bg));
    });
  })();

  /* ============================================================
     HERO — crossfading stills (no hero video asset; the slides
     stand in for it and read identically under the scrim)
     ============================================================ */
  (function heroSlides() {
    const a = $('#heroA'), b = $('#heroB');
    if (!a || !b || reduced) return;
    const STILLS = ['1088993725', '867458294', '1106434425', '1015277896'];
    let i = 0, front = a, back = b;
    setInterval(() => {
      i = (i + 1) % STILLS.length;
      back.src = `assets/img/work/${STILLS[i]}.jpg`;
      back.classList.add('on');
      front.classList.remove('on');
      [front, back] = [back, front];
    }, 4600);
  })();

  /* ============================================================
     HUD TIMECODE — scroll as 25fps timecode
     ============================================================ */
  (function timecode() {
    const el = $('#tc');
    if (!el) return;
    /* per-page runtimes via <body data-tc> — full scroll = full reel */
    const TOTAL = +document.body.dataset.tc || 1465; // default 24:25
    const fmt = s => {
      const f = Math.floor((s % 1) * 25);
      const sec = Math.floor(s);
      return `${pad2(Math.floor(sec / 3600))}:${pad2(Math.floor(sec / 60) % 60)}:${pad2(sec % 60)}:${pad2(f)}`;
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      el.textContent = fmt(pct * TOTAL);
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  /* ============================================================
     SCROLL REVEALS
     ============================================================ */
  (function reveals() {
    const els = $$('.reveal');
    if (reduced || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver((ents) => {
      ents.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(e => io.observe(e));
  })();

  /* ============================================================
     REEL CAROUSEL — progress · arrows · drag · parallax
     ============================================================ */
  (function carousel() {
    const strip = $('#reelStrip');
    if (!strip) return;
    const prev = $('#reelPrev'), next = $('#reelNext'), bar = $('#reelBar');
    const cards = $$('.piece', strip);
    const desktop = () => innerWidth > 900;

    const update = () => {
      const max = strip.scrollWidth - strip.clientWidth;
      if (bar) bar.style.width = (max > 0 ? (strip.scrollLeft / max) * 100 : 0) + '%';
      if (prev) prev.disabled = strip.scrollLeft < 8;
      if (next) next.disabled = strip.scrollLeft > max - 8;
      if (!reduced && desktop()) {
        cards.forEach(c => {
          const r = c.getBoundingClientRect();
          if (r.right < -60 || r.left > innerWidth + 60) return;
          const prog = ((r.left + r.width / 2) - innerWidth / 2) / (innerWidth / 2 + r.width / 2);
          const im = c.querySelector('img');
          if (im) im.style.setProperty('--px', (prog * 22).toFixed(1) + 'px');
        });
      }
    };
    let tick = false;
    const onScroll = () => { if (!tick) { tick = true; requestAnimationFrame(() => { tick = false; update(); }); } };
    strip.addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    update();

    /* arrows — step to next / previous card edge */
    const pad = () => parseFloat(getComputedStyle(strip).paddingLeft) || 0;
    const step = dir => {
      const offs = cards.map(c => c.offsetLeft - pad());
      const x = strip.scrollLeft;
      const target = dir > 0
        ? offs.find(o => o > x + 8)
        : [...offs].reverse().find(o => o < x - 8);
      strip.scrollTo({
        left: target !== undefined ? target : (dir > 0 ? strip.scrollWidth : 0),
        behavior: reduced ? 'auto' : 'smooth',
      });
    };
    if (prev) prev.addEventListener('click', () => step(-1));
    if (next) next.addEventListener('click', () => step(1));
    strip.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    });

    /* drag-to-scroll (mouse) — suppress the click that would open the player */
    let down = false, dragged = false, sx = 0, sl = 0;
    strip.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse') return;
      down = true; dragged = false; sx = e.clientX; sl = strip.scrollLeft;
    });
    addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (!dragged && Math.abs(dx) > 6) { dragged = true; strip.classList.add('dragging'); }
      if (dragged) strip.scrollLeft = sl - dx;
    });
    addEventListener('pointerup', () => {
      if (!down) return;
      down = false;
      if (dragged) setTimeout(() => { dragged = false; strip.classList.remove('dragging'); }, 40);
    });
    strip.addEventListener('click', e => {
      if (dragged) { e.preventDefault(); e.stopPropagation(); }
    }, true);
  })();

  /* ============================================================
     STATS COUNT-UP
     ============================================================ */
  (function stats() {
    const els = $$('.stat b');
    if (!els.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach(e => e.textContent = e.dataset.count); return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const target = +e.target.dataset.count;
        const t0 = performance.now(), dur = 1300;
        const tick = now => {
          const k = Math.min(1, (now - t0) / dur);
          e.target.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    els.forEach(s => io.observe(s));
  })();

  /* ============================================================
     EDITOR VIZ — crossfading stills
     ============================================================ */
  (function viz() {
    const a = $('#vizA'), b = $('#vizB'), cap = $('#vizCap'), bar = $('#vizBar');
    if (!a || !b) return;
    const IDS = [1, 7, 2, 4, 6, 10];
    const STILLS = IDS.map(byId);
    const HOLD = 3400;
    let i = 0, front = a, back = b;
    front.src = img(STILLS[0]);
    const caption = p => `STILL ${pad2(STILLS.indexOf(p) + 1)} — ${p.title.toUpperCase()} / ${p.client.toUpperCase()}`;
    if (cap) cap.textContent = caption(STILLS[0]);
    if (reduced) return;
    if (bar) {
      bar.style.transition = `width ${HOLD}ms linear`;
      requestAnimationFrame(() => { bar.style.width = '100%'; });
    }
    setInterval(() => {
      i = (i + 1) % STILLS.length;
      back.src = img(STILLS[i]);
      back.classList.add('on');
      front.classList.remove('on');
      [front, back] = [back, front];
      if (cap) cap.textContent = caption(STILLS[i]);
      if (bar) {
        bar.style.transition = 'none';
        bar.style.width = '0%';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          bar.style.transition = `width ${HOLD}ms linear`;
          bar.style.width = '100%';
        }));
      }
    }, HOLD);
  })();

  /* ============================================================
     PLAYER — in-site Vimeo screening (unlisted → h= hash)
     ============================================================ */
  const player = $('#player');
  const frame = $('#playerFrame');
  let cur = 0, lastFocus = null;

  function loadFilm(idx) {
    cur = (idx + LIST.length) % LIST.length;
    const p = LIST[cur];
    frame.src = `https://player.vimeo.com/video/${p.vid}?h=${p.hash}&autoplay=1&title=0&byline=0&portrait=0&dnt=1`;
    frame.title = `${p.title} — Prashant Panda`;
    $('#playerTitle').textContent = `${p.title.toUpperCase()} — ${p.client.toUpperCase()}${p.credits ? ' / ' + p.credits.toUpperCase() : ''}`;
    $('#playerCount').textContent = `${pad2(cur + 1)} / ${pad2(LIST.length)}`;
    $('#playerVimeo').href = `https://vimeo.com/${p.vid}/${p.hash}`;
  }
  function openPlayer(id) {
    if (!player || !frame) return;
    const idx = LIST.findIndex(p => p.id === id);
    lastFocus = document.activeElement;
    loadFilm(idx < 0 ? 0 : idx);
    player.classList.add('open');
    document.body.style.overflow = 'hidden';
    $('#playerClose').focus();
  }
  function closePlayer() {
    if (!player) return;
    player.classList.remove('open');
    frame.src = '';
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  (function playerInit() {
    if (!player) return;
    document.addEventListener('click', e => {
      const t = e.target.closest('[data-play]');
      if (t) openPlayer(+t.dataset.play);
    });
    const reelBtn = $('#playReel');
    if (reelBtn) reelBtn.addEventListener('click', () => openPlayer(LIST[0].id));
    $('#playerClose').addEventListener('click', closePlayer);
    $('#playerPrev').addEventListener('click', () => loadFilm(cur - 1));
    $('#playerNext').addEventListener('click', () => loadFilm(cur + 1));
    document.addEventListener('keydown', e => {
      if (player.classList.contains('open')) {
        if (e.key === 'Escape') closePlayer();
        if (e.key === 'ArrowLeft') loadFilm(cur - 1);
        if (e.key === 'ArrowRight') loadFilm(cur + 1);
      } else if (e.key === 'Escape' && menuOpen()) {
        toggleMenu(false);
      }
    });
  })();

  /* ============================================================
     dev screenshot helper — inert unless localStorage flag set
     usage: v4-jump = 'SHOT' | 'MENU' | 'PLAYER' | 'TOP:#sel' (combinable 'TOP:#sel|SHOT')
     ============================================================ */
  try {
    /* preview harness reloads the tab once — stash flag in sessionStorage so it survives */
    const jump = localStorage.getItem('v4-jump') || sessionStorage.getItem('v4-jump');
    if (jump) {
      localStorage.removeItem('v4-jump');
      try { sessionStorage.setItem('v4-jump', jump); } catch (e) {}
      setTimeout(() => {
        const parts = jump.split('|');
        const l = $('#loader'); if (l) l.remove();
        document.body.classList.add('loaded');
        $$('.reveal').forEach(e => e.classList.add('in'));
        parts.forEach(part => {
          if (part === 'SHOT') document.documentElement.classList.add('shot');
          else if (part === 'MENU') toggleMenu(true);
          else if (part === 'PLAYER') openPlayer(LIST[0].id);
          else if (part.indexOf('TOP:') === 0) { // headless captures only work unscrolled — hoist section
            const el = document.querySelector(part.slice(4));
            const m = document.querySelector('main');
            if (el && m) {
              m.style.display = 'flex'; m.style.flexDirection = 'column';
              el.style.order = '-1';
              const foot = $('.foot'); if (foot && el !== foot) foot.style.order = '1';
            }
          }
        });
      }, 500);
    }
  } catch (e) {}
})();
