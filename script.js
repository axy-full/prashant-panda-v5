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
     · ad-film genre tags researched per film (stills + campaign
       press + upload metadata) — final say stays with Prashant
     · awards list + music-video reel pending from Prashant
     · contact email: ppanda.79@gmail.com (live since 2026-08-01)
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
  /* the full COMMERCIAL showcase — 44 from the Vimeo showcase plus
     the six Prashant named in his 2026-08-25 notes (45-50, pulled
     from vimeo.com/prashantpanda). ids 1-10 are the original
     curated set (reel/directors/viz reference them).
     GENRE TAGS: Prashant's own classification, 2026-08-25 */
  const ADS = [
    { id: 2, vid: '1106434425', hash: 'd768255096', title: 'Chupa Chups — Carrom', client: 'Perfetti Van Melle', credits: 'Ogilvy · Dir. Nikhil Rao', dur: 60, tag: 'HUMOR' },
    { id: 1, vid: '1088993725', hash: 'cd85ed120d', title: 'GIC — Mary', client: 'GIC Insurance', credits: 'Jamic Films · Dir. Shirish Daiya', dur: 93, tag: 'STORYTELLING' },
    { id: 3, vid: '1031822870', hash: '34305ab15d', title: 'EVA — Yes', client: 'EVA', credits: 'Dir. Varun Gupta', dur: 64, tag: 'STYLISH' },
    { id: 4, vid: '1073818885', hash: 'd659e0694c', title: 'Snickers', client: 'Snickers', credits: 'Dir. Rishabh Dubey', dur: 35, tag: 'HUMOR' },
    { id: 5, vid: '1166613867', hash: '406b559643', title: 'ICICI Bank', client: 'ICICI Bank', credits: 'ft. Anil Kapoor', dur: 40, tag: 'HUMOR' },
    { id: 6, vid: '1015277896', hash: '25f1c9636d', title: 'Candid Dusting Powder', client: 'Candid', credits: 'BBDO India · Ducktape · Dir. Rishabh Dubey', dur: 53, tag: 'HUMOR' },
    { id: 7, vid: '867458294', hash: '74dda2c808', title: 'Har Ghar Ka Hero — Greenply E-Zero', client: 'Greenply', credits: 'Jamic Films · Dir. Nikhil Rao · ft. NTR Jr', dur: 35, tag: 'STYLISH' },
    { id: 8, vid: '1149446709', hash: '45c47a44bc', title: 'Hint — Pyaar ka Take-off', client: 'Hint', credits: 'Jamic Films · Dir. Shirish Daiya', dur: 50, tag: 'STYLISH' },
    { id: 9, vid: '1088994415', hash: '270d911f7c', title: 'GIC — Integrated', client: 'GIC Insurance', credits: 'Jamic Films · Dir. Shirish Daiya', dur: 30, tag: 'STORYTELLING' },
    { id: 10, vid: '1106435260', hash: 'ec61b93f55', title: 'ENVY', client: 'ENVY', credits: 'Dir. Vivek Daschaudhary', dur: 40, tag: 'STYLISH' },
    { id: 11, vid: '949624577', hash: '0aecd8d238', title: 'ICC T20 World Cup — Biggest Love', client: 'Star Sports', credits: 'Star Sports · Jamic Films · Dir. Nikhil Rao', dur: 70, tag: 'STORYTELLING' },
    { id: 12, vid: '1167725115', hash: '2ad055a2ad', title: 'Kotak Neo', client: 'Kotak Neo', credits: '', dur: 45, tag: 'STORYTELLING' },
    { id: 13, vid: '571746432', hash: '3ca0813643', title: 'Society Tea — Brand New Day', client: 'Society Tea', credits: '', dur: 257, tag: 'STORYTELLING' },
    { id: 14, vid: '1162055404', hash: '542ab9265a', title: 'MG Hector', client: 'MG Motor', credits: '', dur: 60, tag: 'STORYTELLING' },
    { id: 15, vid: '1135694596', hash: '4e54adecb1', title: 'It\'s Your Moment — Festive \'25', client: 'amanté', credits: '', dur: 60, tag: 'STORYTELLING' },
    { id: 16, vid: '958465600', hash: '9b8803648b', title: 'Dare Kiya Toh Darna Kya', client: 'Hint', credits: 'Jamic Films · Dir. Shirish Daiya · ft. Tiger Shroff', dur: 40, tag: 'ACTION' },
    { id: 17, vid: '1020985979', hash: '2c2597bb82', title: 'Birla Opus — Ghost', client: 'Birla Opus', credits: 'Colonial Films · Dir. Rishabh Dubey', dur: 140, tag: 'HUMOR' },
    { id: 18, vid: '1011935988', hash: '16db53c95f', title: 'Birla Opus — Kidnapper', client: 'Birla Opus', credits: '', dur: 168, tag: 'HUMOR' },
    { id: 19, vid: '709084029', hash: 'e53fc093be', title: 'Swiggy — All The Food You Love', client: 'Swiggy', credits: '', dur: 15, tag: 'HUMOR' },
    { id: 20, vid: '642944186', hash: '193722126e', title: 'Jab Haath aur Bingo! Tedhe Medhe', client: 'Bingo!', credits: 'ft. Ranveer Singh', dur: 15, tag: 'HUMOR' },
    { id: 21, vid: '634280547', hash: 'bf91cde5d0', title: 'Bingo! Mad Angles ft. Ranveer Singh', client: 'Bingo!', credits: '', dur: 30, tag: 'HUMOR' },
    { id: 22, vid: '747936616', hash: '39ddb035cb', title: 'Meesho — Electronics MegaBlockbuster', client: 'Meesho', credits: '', dur: 20, tag: 'HUMOR' },
    { id: 23, vid: '539977032', hash: 'dd66e499b8', title: 'PGIM India — Gain From Experience', client: 'PGIM India', credits: '', dur: 55, tag: 'HUMOR' },
    { id: 24, vid: '904713196', hash: 'b63d40fc61', title: 'Sunfeast', client: 'ITC Sunfeast', credits: '', dur: 43, tag: 'HUMOR' },
    { id: 25, vid: '1174664059', hash: '2c95939b18', title: 'Britannia — Dugout', client: 'Britannia', credits: '', dur: 31, tag: 'HUMOR' },
    { id: 26, vid: '763773061', hash: 'abe977a192', title: 'MPL — Pool Champs', client: 'MPL', credits: '', dur: 29, tag: 'HUMOR' },
    { id: 27, vid: '535421247', hash: '6eecab7289', title: '#DeliverTheLove — Bhai Dooj', client: 'Amazon India', credits: '', dur: 112, tag: 'STORYTELLING' },
    { id: 28, vid: '995053082', hash: '0f47f2dbab', title: 'Omnigel', client: 'Omnigel', credits: '', dur: 42, tag: 'STORYTELLING' },
    { id: 29, vid: '948625099', hash: '8bc2c8aa54', title: 'Birla Opus — Gorilla', client: 'Birla Opus', credits: 'Colonial Films · Dir. Rishabh Dubey', dur: 146, tag: 'HUMOR' },
    { id: 30, vid: '1176230484', hash: '31f3be9440', title: 'Tata IPL', client: 'Tata IPL', credits: 'Dir. Nikhil Rao', dur: 90, tag: 'HUMOR' },
    { id: 31, vid: '1174664439', hash: 'e17b297944', title: 'Hershey\'s', client: 'Hershey\'s', credits: '', dur: 61, tag: 'HUMOR' },
    { id: 32, vid: '535424849', hash: 'a1ece44b88', title: 'Hero — Halwa', client: 'Hero', credits: '', dur: 42, tag: 'STORYTELLING' },
    { id: 33, vid: '535422129', hash: '146793b802', title: 'Bajaj — Umbrella', client: 'Bajaj', credits: '', dur: 41, tag: 'STORYTELLING' },
    { id: 34, vid: '535421448', hash: 'bcd4f2c473', title: 'Bajaj — Paperboat', client: 'Bajaj', credits: '', dur: 46, tag: 'STORYTELLING' },
    { id: 35, vid: '854322510', hash: '4e43202996', title: 'MPL — Ludo', client: 'MPL', credits: '', dur: 30, tag: 'HUMOR' },
    { id: 36, vid: '747936708', hash: 'cfb4e9b082', title: 'Meesho — MegaBlockbuster Sale', client: 'Meesho', credits: '', dur: 29, tag: 'HUMOR' },
    { id: 37, vid: '1179531910', hash: 'be8e6f7f01', title: 'Gillette Guard 3-in-1', client: 'Gillette', credits: 'Keroscene Films · Dir. Rajesh Saathi', dur: 30, tag: 'STYLISH' },
    { id: 38, vid: '1179533196', hash: 'b39fd32b44', title: 'IPL — Migrant', client: 'Astral Pipes', credits: '', dur: 60, tag: 'STORYTELLING' },
    { id: 39, vid: '948622574', hash: 'cdfcad98cb', title: 'Bajaj Allianz Life — Happy Bonus', client: 'Bajaj Allianz Life', credits: '', dur: 55, tag: 'STORYTELLING' },
    { id: 40, vid: '1006193461', hash: 'b2f117028b', title: 'JK Wipeazy', client: 'JK Wipeazy', credits: '', dur: 36, tag: 'HUMOR' },
    { id: 41, vid: '1194290610', hash: '0abd367ed4', title: 'Chunky Ice Cream — Soulmate', client: 'Call Me Chunky', credits: '', dur: 15, tag: 'HUMOR' },
    { id: 42, vid: '1194256626', hash: '3fdcc1ecb0', title: 'Popeyes', client: 'Popeyes', credits: '', dur: 40, tag: 'HUMOR' },
    { id: 43, vid: '1176234899', hash: '4b3fdf00d8', title: 'Equus Asinus', client: '', credits: '', dur: 50, tag: 'HUMOR' },
    { id: 44, vid: '1202512344', hash: '2f299c22f5', title: 'Agami Realty', client: 'Agami Realty', credits: '', dur: 78, tag: 'STYLISH' },
    /* 45-50 — named in Prashant's 2026-08-25 notes, pulled from
       vimeo.com/prashantpanda (not in the curated showcase) */
    { id: 45, vid: '815585818',  hash: '3fdeb7b3e4', title: 'Asian Paints — Ace Sparc Emulsion', client: 'Asian Paints', credits: '', dur: 32, tag: 'HUMOR' },
    { id: 46, vid: '815585849',  hash: 'd0318ea5c2', title: 'Asian Paints — Tractor Sparc', client: 'Asian Paints', credits: '', dur: 47, tag: 'STORYTELLING' },
    { id: 47, vid: '886353055',  hash: 'a556f5beab', title: 'MPL — Par Nahin Katega', client: 'MPL', credits: '', dur: 20, tag: 'HUMOR' },
    { id: 48, vid: '763773007',  hash: '3b8630e258', title: 'MPL — Jignesh Bhai', client: 'MPL', credits: '', dur: 29, tag: 'HUMOR' },
    { id: 49, vid: '1149451696', hash: '94bfc6f18b', title: 'Oppo F31 Series 5G', client: 'Oppo', credits: '', dur: 30, tag: 'HUMOR' },
    { id: 50, vid: '747936664',  hash: '6ccb94a555', title: 'Lightein Parde — MegaBlockbuster', client: 'Meesho', credits: 'ft. Kapil Sharma', dur: 20, tag: 'HUMOR' },
  ];

  /* ============================================================
     MUSIC VIDEOS & FILM SONGS — his 2026-08-25 notes. Same shape
     as ADS so the player and the timeline can carry them too.
     ============================================================ */
  const MUSIC = [
    { id: 101, vid: '877026031', hash: 'a7348f4814', title: 'Tu Jaana Na Piya', client: 'KING — New Life', credits: '', dur: 246, tag: 'MUSIC' },
  ];
  const TAGS = ['HUMOR', 'STORYTELLING', 'ACTION', 'STYLISH'];
  const img = p => `assets/img/work/${p.vid}.jpg`;
  /* player order = showcase order, music videos tail it so any
     data-play id resolves and prev/next runs the whole body of work */
  const LIST = ADS.concat(MUSIC);
  const byId = id => LIST.find(p => p.id === id);

  /* ============================================================
     SERIES + FILMS (no embeddable video — rendered as slates)
     · sorted: series by IMDB desc, films by year desc
     · rating shown only when >= 7.0
     ============================================================ */
  /* art = assets/img/series/<art>.jpg — official key art; a slate
     falls back to type automatically if the file is missing */
  const SERIES = [
    { title: 'Permanent Roommates',        years: '2014–2016', eps: 5,  rating: 8.6, platform: 'TVF',                art: 'series/permanent-roommates', yt: 'tKNQMYmQjnA' },
    { title: 'Hostel Daze',                years: '2019–2022', eps: 3,  rating: 8.5, platform: 'TVF · Prime Video',  art: 'series/hostel-daze', yt: '6Xdj-Jn9_iI' },
    { title: 'Operation MBBS',             years: '2020–2021', eps: 2,  rating: 8.3, platform: '',                   art: 'series/operation-mbbs', yt: 'WL_BdNa4tEU' },
    { title: 'Cheesecake',                 years: '2019',      eps: 5,  rating: 8.2, platform: '',                   art: 'series/cheesecake', yt: '' },
    { title: 'Cartel',                     years: '2021',      eps: 14, rating: 8.0, platform: 'ALTBalaji',          art: 'series/cartel', yt: 'EQ9zXtlMRpM' },
    { title: 'Bachelors vs the World',     years: '2022',      eps: 5,  rating: 7.8, platform: '',                   art: 'series/bachelors-vs-the-world', yt: 'bdh9UmsuEGw' },
    { title: 'Ishq Next Door',             years: '2023',      eps: 7,  rating: 7.7, platform: 'JioCinema',          art: 'series/ishq-next-door', yt: 'lGTjxQavLc4' },
    { title: 'Fireflies: Parth Aur Jugnu', years: '2023',      eps: 10, rating: 7.3, platform: '',                   art: 'series/fireflies', yt: '1MbGjbyYqrI' },
    { title: 'CLASS of 2017',              years: '2017',      eps: 20, rating: 7.3, platform: 'ALTBalaji',          art: 'series/class-of-2017', yt: '' },
    { title: "TSP's Zeroes",               years: '2018',      eps: 3,  rating: 7.2, platform: 'The Screen Patti',   art: 'series/tsps-zeroes', yt: 'LwIaKhvI3r0' },
    { title: 'PA-Gals',                    years: '2017',      eps: 3,  rating: 6.6, platform: '',                   art: 'series/pa-gals', yt: 'lzI9ilVNzno' },
    { title: 'Puncch Beat',                years: '2018–2019', eps: 13, rating: 6.2, platform: 'ALTBalaji',          art: 'series/puncch-beat', yt: 'j8Sdmrb1l2Q' },
    { title: 'Ragini MMS Returns',         years: '2017–2018', eps: 11, rating: 4.1, platform: 'ALTBalaji',          art: 'series/ragini-mms-returns', yt: 'G8Xud9tnS-M' },
  ];
  const FILMS = [
    { title: 'Rabia and Olivia', year: '2023', role: 'Editor',                note: 'Feature film',    art: 'films/rabia-and-olivia', yt: 'dYTUwZAVCrk' },
    { title: 'My Name Is Khan',  year: '2010', role: 'Associate Film Editor', note: 'Dir. Karan Johar', art: 'films/my-name-is-khan',  yt: 'nqxgYT3TYzY' },
  ];
  /* ASSOCIATE FILM EDITOR — Prashant's list of 2026-08-25, in his
     order. No key art for these, so they print as typeset credits
     under the films shelf rather than as dead tiles. */
  const ASSOC = {
    lede: 'Associate Film Editor alongside Deepa Bhatia and Hemal Kothari.',
    titles: ['My Name Is Khan', 'We Are Family', 'Pyaar Ke Side Effects',
             'Ek Khiladi Ek Haseena', 'Raasta Roko', 'Anjaan', 'Just Married'],
  };
  /* FILM SONGS — the songs he cut inside features, and the
     directors he cut songs and music videos for */
  const SONGS = {
    lede: 'Film songs and music videos for Remo D’Souza, Arvind Thakur, Jayesh Pradhan and Jeet Singh.',
    titles: ['Do Knot Disturb', 'Paying Guest', 'Kal Kisne Dekha'],
  };
  /* the upcoming feature — hero of the films shelf; drops in
     assets/img/films/rotten-apple.jpg automatically when supplied */
  const UPCOMING = { title: 'Rotten Apple', note: 'Feature film', art: 'films/rotten-apple' };

  /* SELECTED STORIES — Prashant's own running order, 2026-08-25.
     note = the thought behind the story (craft copy, not fact). */
  const REEL = [
    { id: 2,   t: 'CHUPA CHUPS — CARROM',     ar: '34',
      note: 'A quiet joke built frame by frame. Comedy timing is edit timing — hold, hold, pay off.' },
    { id: 1,   t: 'MARY AUNTY',               ar: '169',
      note: 'Insurance sold as belonging — a stray who stays. The cut sits still and lets the bond do the talking.' },
    { id: 20,  t: 'JAB HAATH AUR BINGO',      ar: '11', tick: 'FT. RANVEER SINGH',
      note: 'Fifteen seconds, one running gag, no room to breathe. The shortest cuts leave the least to hide behind.' },
    { id: 42,  t: 'POPEYES',                  ar: '43',
      note: 'Appetite is a tempo problem. Cut on the crunch and the audience tastes it before they read it.' },
    { id: 37,  t: 'GILLETTE',                 ar: '45', tick: 'DIR. RAJESH SAATHI',
      note: 'Three blades, one clean line. Product films live or die on where you choose to stop looking.' },
    { id: 31,  t: "HERSHEY'S",                ar: '169',
      note: 'Sweetness without sentiment. Let the pauses carry it and the product never has to shout.' },
    { id: 8,   t: 'HINT — PYAAR KA TAKE-OFF', ar: '45',
      note: 'A love story boarding in fifty seconds. Looks traded like dialogue — the edit does the flirting.' },
    { id: 4,   t: 'SNICKERS',                 ar: '11',
      note: 'Hunger changes people — the gag only lands if the switch is invisible. Blink, and the cut already happened.' },
    { id: 10,  t: 'ENVY',                     ar: '43',
      note: 'Fragrance is pure mood — no plot, only tempo. The edit wears the perfume.' },
  ];

  /* ============================================================
     DIRECTORS — Prashant's list of 2026-08-25, his order and his
     twelve names, with Rishabh Dubey and Varun Gupta retained at
     the tail (their cuts are already playable in-site).
     works[] = ad ids playable in-site today; directors without
     works get an "in assembly" panel until he sends the titles.
     ============================================================ */
  const DIRECTORS = [
    { name: 'NIKHIL RAO',         house: 'JAMIC FILMS',                works: [2, 7, 11, 30], still: '867458294' },
    { name: 'SHIRISH DAIYA',      house: 'JAMIC FILMS',                works: [1, 9, 8, 16], still: '1088993725' },
    { name: 'RAJESH SAATHI',      house: 'KEROSCENE FILMS',            works: [37],      still: '1179531910' },
    { name: 'ABHIJIT SUDAKAR',    house: 'ZIGZAG FILM',                works: [],        still: '' },
    { name: 'SAPNA SINGH',        house: '',                           works: [],        still: '' },
    { name: 'SHAUN KOLA',         house: '',                           works: [],        still: '' },
    { name: 'RAHUL SRIVASTAVA',   house: '',                           works: [],        still: '' },
    { name: 'VIVEK DASCHAUDHARY', house: 'KARMMAN LINE',               works: [10],      still: '1106435260' },
    { name: 'RAGHAVI AGARWAL',    house: '',                           works: [],        still: '' },
    { name: 'SUYASH VADHAVKAR',   house: '',                           works: [],        still: '' },
    { name: 'SHAKTI SAGAR',       house: '',                           works: [],        still: '' },
    { name: 'MITHUN SHAW',        house: '',                           works: [],        still: '' },
    { name: 'RISHABH DUBEY',      house: 'BBDO / DUCKTAPE / COLONIAL', works: [4, 6, 17, 29], still: '1073818885' },
    { name: 'VARUN GUPTA',        house: '',                           works: [3],       still: '1031822870' },
  ];

  /* ============================================================
     01 — THE PORTFOLIO as an NLE TIMELINE (aimighty treatment)
     · clips keep their relative length, compressed on a √-ish
       curve so a four-minute brand film and a fifteen-second
       cutdown can share one strip (same optical-area logic the
       logo walls use). The caption still prints TRUE runtime.
     · checkerboarded across V2/V1 like an A/B roll — echoing
       the brand lockup's two tracks
     · fixed playhead reads the scroll; 25fps timecode; the
       active clip's story-thought prints under the strip
     ============================================================ */
  (function timeline() {
    const scroller = $('#tlScroll');
    if (!scroller) return;
    const lanes = [$('#laneV2'), $('#laneV1')];
    const ruler = $('#tlRuler'), inner = $('#tlInner'), tcOut = $('#tlTc');
    const noteT = $('#tlNoteTitle'), noteX = $('#tlNoteText');

    const CLIPS = REEL.map(r => ({ ...r, p: byId(r.id) }));
    /* display length — true seconds raised to SHAPE, then scaled so
       the whole strip runs TARGET long. Ordering and relative weight
       survive; the 17:1 spread between a 4-minute film and a 15s
       cutdown does not. */
    const SHAPE = 0.62, TARGET = 480;
    const raw = CLIPS.map(c => Math.pow(c.p.dur, SHAPE));
    const k = TARGET / raw.reduce((a, b) => a + b, 0);
    let acc = 0;
    CLIPS.forEach((c, i) => { c.d = raw[i] * k; c.start = acc; acc += c.d; });
    const TOTALS = acc;
    const PADL = 56, PADR = 72;
    let pps = 7;

    CLIPS.forEach((c, i) => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'tclip';
      el.dataset.play = c.id;
      el.setAttribute('aria-label', `Play — ${c.p.title}`);
      el.innerHTML = `
        <img src="${img(c.p)}" alt="" ${i === 0 ? '' : 'loading="lazy"'} draggable="false" />
        <span class="tclip__grade" aria-hidden="true"></span>
        <span class="tclip__face">
          <span class="tclip__no">${pad2(i + 1)}</span>
          <span class="tclip__name">${c.t}</span>
          <span class="tclip__meta">${c.p.client.toUpperCase()} — ${mmss(c.p.dur)}</span>
        </span>`;
      lanes[i % 2].appendChild(el);
      c.el = el;
    });

    function layout() {
      const frame = scroller.clientWidth || innerWidth;
      pps = Math.max((frame * (frame < 700 ? 2.1 : 1.55)) / TOTALS, 7);
      CLIPS.forEach(c => {
        c.el.style.left = Math.round(PADL + c.start * pps) + 'px';
        c.el.style.width = Math.round(c.d * pps) + 'px';
      });
      const marks = [];
      for (let s = 0; s <= TOTALS; s += 10) {
        const major = s % 30 === 0;
        marks.push(`<span class="tick${major ? ' major' : ''}" style="left:${Math.round(PADL + s * pps)}px">${major ? `<i>${mmss(s)}</i>` : ''}</span>`);
      }
      ruler.innerHTML = marks.join('');
      inner.style.width = Math.round(PADL + TOTALS * pps + PADR) + 'px';
      sync();
    }

    const headAt = () => scroller.clientWidth * 0.18;
    const fmtTC = sec => {
      const s = Math.floor(sec);
      return `${pad2(Math.floor(s / 60))}:${pad2(s % 60)}:${pad2(Math.floor((sec - s) * 25))}`;
    };
    let cur = -1;
    function sync() {
      const secs = Math.min(Math.max(0, (scroller.scrollLeft + headAt() - PADL) / pps), TOTALS - 0.04);
      if (tcOut) tcOut.textContent = fmtTC(secs);
      const i = CLIPS.findIndex(c => secs >= c.start && secs < c.start + c.d);
      if (i >= 0 && i !== cur) {
        cur = i;
        CLIPS.forEach((c, j) => c.el.classList.toggle('active', j === i));
        if (noteT) noteT.textContent = CLIPS[i].t + ' — ';
        if (noteX) noteX.textContent = CLIPS[i].note;
      }
    }
    let tick = false;
    scroller.addEventListener('scroll', () => {
      if (!tick) { tick = true; requestAnimationFrame(() => { tick = false; sync(); }); }
    }, { passive: true });
    let rt;
    addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(layout, 120); });
    layout();

    /* wheel scrubs the timeline, hands the page back at the ends */
    scroller.addEventListener('wheel', e => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const max = scroller.scrollWidth - scroller.clientWidth;
      if ((scroller.scrollLeft <= 0 && e.deltaY < 0) ||
          (scroller.scrollLeft >= max - 1 && e.deltaY > 0)) return;
      e.preventDefault();
      scroller.scrollLeft += e.deltaY;
    }, { passive: false });

    /* drag to scrub (mouse) — suppress the click that would open the player */
    let down = false, dragged = false, sx = 0, sl = 0;
    scroller.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse') return;
      down = true; dragged = false; sx = e.clientX; sl = scroller.scrollLeft;
      scroller.classList.add('dragging');
    });
    addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (!dragged && Math.abs(dx) > 6) dragged = true;
      if (dragged) scroller.scrollLeft = sl - dx;
    });
    addEventListener('pointerup', () => {
      if (!down) return;
      down = false;
      scroller.classList.remove('dragging');
      if (dragged) setTimeout(() => { dragged = false; }, 40);
    });
    scroller.addEventListener('click', e => {
      if (dragged) { e.preventDefault(); e.stopPropagation(); }
    }, true);
    scroller.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); scroller.scrollLeft -= 120; }
      if (e.key === 'ArrowRight') { e.preventDefault(); scroller.scrollLeft += 120; }
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
    const slate = (grid, no, N, tag, title, meta, rating, wide, art, yt) => {
      const el = document.createElement(yt ? 'button' : 'div');
      if (yt) {
        el.type = 'button';
        el.dataset.yt = yt;
        el.dataset.ytTitle = title.toUpperCase();
        el.setAttribute('aria-label', `Play trailer — ${title}`);
      }
      el.className = 'tile tile--slate' + (wide ? ' tile--wide' : '') + (art ? ' has-cover' : '');
      el.innerHTML = `
        ${art ? `<img class="slate__art" loading="lazy" src="assets/img/${art}.jpg" alt="${title} — key art" /><span class="slate__scrim" aria-hidden="true"></span>` : ''}
        <span class="slate__top"><b>${no ? `${pad2(no)} / ${pad2(N)} — ` : ''}${tag}</b>${rating ? `<span>IMDB ${rating.toFixed(1)}</span>` : ''}</span>
        <span class="slate__title">${title.toUpperCase()}</span>
        <span class="slate__meta">${meta}</span>
        ${yt ? '<span class="slate__chip"><i>▸</i>&nbsp;TRAILER</span>' : ''}`;
      if (art) {
        const im = el.querySelector('.slate__art');
        im.addEventListener('error', () => {
          el.classList.remove('has-cover');
          const sc = el.querySelector('.slate__scrim');
          if (sc) sc.remove();
          im.remove();
        });
      }
      grid.appendChild(el);
      return el;
    };

    /* the ad shelf is grouped into Prashant's four genres — one
       titled shelf each, no filter pills and no running total */
    const adTile = p => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'tile';
      el.dataset.play = p.id;
      el.dataset.tag = p.tag;
      el.setAttribute('aria-label', `Play — ${p.title}`);
      const capMeta = [p.client.toUpperCase(), mmss(p.dur)].filter(Boolean).join(' — ');
      el.innerHTML = `
        <img loading="lazy" src="${img(p)}" alt="${p.title} — film still" />
        <span class="tile__cap"><b>${p.title.toUpperCase()}</b><span>${capMeta}</span></span>`;
      return el;
    };
    const genres = $('#adGenres');
    if (genres) {
      TAGS.forEach((tag, gi) => {
        const films = ADS.filter(p => p.tag === tag);
        if (!films.length) return;
        const head = document.createElement('div');
        head.className = 'subhead subhead--genre reveal';
        head.id = 'genre-' + tag.toLowerCase();
        head.innerHTML =
          `<span class="kicker"><i>[●]</i> 02·A${gi + 1}</span>` +
          `<h3 class="subhead__title">${tag}</h3>`;
        genres.appendChild(head);
        const grid = document.createElement('div');
        grid.className = 'index__grid';
        genres.appendChild(grid);
        films.forEach(p => grid.appendChild(adTile(p)));
        endStrip(grid, `END OF ${tag}`);
      });
    }

    const gSeries = $('#gridSeries');
    if (gSeries) {
      SERIES.forEach((s, i) => {
        const meta = [s.years, `${pad2(s.eps)} EP`, s.platform.toUpperCase()].filter(Boolean).join(' · ');
        slate(gSeries, i + 1, SERIES.length, 'SERIES', s.title, meta, s.rating >= 7 ? s.rating : 0, false, s.art, s.yt);
      });
      endStrip(gSeries, `END OF SERIES — ${pad2(SERIES.length)} SHOWS`);
    }

    const gFilms = $('#gridFilms');
    if (gFilms) {
      /* the upcoming feature leads the shelf as its hero */
      const hero = slate(gFilms, 0, 0, 'UPCOMING — FEATURE FILM', UPCOMING.title,
        UPCOMING.note.toUpperCase() + ' · IN THE WORKS', 0, false, UPCOMING.art, '');
      hero.classList.add('tile--filmhero', 'tile--upcoming');
      FILMS.forEach((f, i) => {
        const meta = [f.year, f.role.toUpperCase(), f.note.toUpperCase()].filter(Boolean).join(' · ');
        slate(gFilms, i + 1, FILMS.length, 'FILM', f.title, meta, 0, i === 0, f.art, f.yt);
      });
      endStrip(gFilms, 'END OF REEL — CUT TO BLACK');
    }

    /* music videos & film songs — playable, same tile as the ads */
    const gMusic = $('#gridMusic');
    if (gMusic) {
      MUSIC.forEach((p, i) => {
        const el = document.createElement('button');
        el.type = 'button';
        el.className = 'tile';
        el.dataset.play = p.id;
        el.setAttribute('aria-label', `Play — ${p.title}`);
        el.innerHTML = `
          <img loading="lazy" src="${img(p)}" alt="${p.title} — film still" />
          <span class="tile__no">${pad2(i + 1)} / ${pad2(MUSIC.length)}</span>
          <span class="tile__cap"><b>${p.title.toUpperCase()}</b><span>${[p.client.toUpperCase(), mmss(p.dur)].filter(Boolean).join(' — ')}</span></span>`;
        gMusic.appendChild(el);
      });
      endStrip(gMusic, 'MORE MUSIC VIDEOS — IN ASSEMBLY');
    }

    /* typeset credit blocks — work with no key art of its own, so
       it prints as names rather than as tiles that cannot be played */
    const credits = (id, data, kicker) => {
      const wrap = $(id);
      if (!wrap) return;
      wrap.innerHTML =
        `<span class="credits__k"><i>[●]</i>&nbsp;${kicker}</span>` +
        `<p class="credits__lede">${data.lede}</p>` +
        `<ul class="credits__list">${data.titles.map(t => `<li>${t}</li>`).join('')}</ul>`;
    };
    credits('#creditsAssoc', ASSOC, 'ASSOCIATE&nbsp;FILM&nbsp;EDITOR');
    credits('#creditsSongs', SONGS, 'FILM&nbsp;SONGS&nbsp;CUT&nbsp;FOR');
  })();

  /* ============================================================
     CONTACT EMAIL — paste Prashant's address here to activate
     the EMAIL button on /contact (stays a muted "in assembly"
     row while empty — the no-invented-email rule holds)
     ============================================================ */
  /* the VP company mark is pending from Prashant — hide the slot
     until the file exists so the row never shows a broken image */
  (function vpLogo() {
    const el = $('#vpLogo');
    if (!el) return;
    el.addEventListener('error', () => el.classList.add('missing'), { once: true });
    if (el.complete && !el.naturalWidth) el.classList.add('missing');
  })();

  const EMAIL = 'ppanda.79@gmail.com';
  (function emailButton() {
    const row = $('#emailRow');
    if (!row) return;
    if (EMAIL) {
      row.href = 'mailto:' + EMAIL;
    } else {
      row.classList.add('frow--pending');
      row.removeAttribute('href');
      const k = $('#emailRowK');
      if (k) k.innerHTML = 'ADDRESS&nbsp;—&nbsp;IN&nbsp;ASSEMBLY';
    }
  })();

  /* ============================================================
     BANNERS — ad-film brands + agencies (under 02·A) and the
     platforms/banners the series & films aired on (under 02·C)
     logo: filename in assets/img/brands/ (official marks,
     recolored bone via CSS) · logo:null → typographic fallback
     ============================================================ */
  const BRANDS_ROW = [
    { name: 'GIC',                logo: 'gic-compact.svg' }, /* emblem + GIC glyphs derived from the official Council lockup */
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
    /* the agency — a separate entity from Jamic Films, Nikhil Rao's
       production house. Official wordmark, MullenLowe Group CDN. */
    { name: 'LOWE LINTAS',        logo: 'lowe-lintas.png' },
    { name: 'KEROSCENE FILMS',    logo: 'keroscene.png' },
    { name: 'ZIGZAG FILM',        logo: 'zigzag.png' },
    { name: 'KARMMAN LINE',       logo: 'karmanline.png' }, /* official double-M styling */
    /* added per Prashant, 2026-08-25 — Dharma is the house behind the
       associate-editor features; Entourage is type until a mark lands */
    { name: 'DHARMA PRODUCTIONS', logo: 'dharma.svg' },
    { name: 'ENTOURAGE',          logo: null },
  ];
  const PLATFORMS_ROW = [
    { name: 'TVF',              logo: 'tvf.png' },
    { name: 'PRIME VIDEO',      logo: 'prime-video.svg' },
    { name: 'ALTBALAJI',        logo: 'altbalaji.svg' },
    { name: 'JIOCINEMA',        logo: 'jiocinema.svg' },
    { name: 'THE SCREEN PATTI', logo: 'screen-patti.png' },
  ];
  (function renderBanners() {
    /* ?v=2 busts caches that pinned 404s from the deploy window */
    const item = b => b.logo
      ? `<img class="bmq__logo" src="assets/img/brands/${b.logo}?v=2" alt="${b.name}" />`
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

    /* thin hero ticker — every banner, logo-first, at ticker scale */
    const ticker = $('#ticker');
    if (ticker) {
      const ROW = [...BRANDS_ROW, ...PLATFORMS_ROW];
      const tItem = b => b.logo
        ? `<img class="marquee__logo" src="assets/img/brands/${b.logo}?v=2" alt="${b.name}" />`
        : `<span>${b.name.replace(/ /g, '&nbsp;')}</span>`;
      const half = ROW.map(b => `${tItem(b)}<b>●</b>`).join('');
      ticker.innerHTML = half + half;
    }

    /* equalise the strips by optical AREA, not raw height: a long
       wordmark set to the same height as a compact mark reads twice
       as loud. h = base · √(REF/aspect), held inside sane bounds. */
    const REF = 3.2;
    const size = el => {
      const w = el.naturalWidth, h = el.naturalHeight;
      if (!w || !h) return;
      /* held to ±25% so a stacked mark can't tower over the strip */
      const k = Math.min(1.25, Math.max(.82, Math.sqrt(REF / (w / h))));
      el.style.setProperty('--k', k.toFixed(3));
    };
    $$('.marquee__logo, .bmq__logo').forEach(el => {
      if (el.complete) size(el);
      else el.addEventListener('load', () => size(el), { once: true });
    });

    /* type fallbacks get the same optical-area treatment — a long
       wordmark set in 125%-stretch black otherwise outweighs every
       compact mark beside it. A text box's aspect doesn't change with
       font-size, so one measurement is enough. Floor is lower than the
       logos' because these words run much wider than a mark. */
    const sizeType = el => {
      if (el.dataset.sized) return;            /* never compound the scale */
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const k = Math.min(1.15, Math.max(.6, Math.sqrt(REF / (r.width / r.height))));
      el.style.fontSize = `calc(${getComputedStyle(el).fontSize} * ${k.toFixed(3)})`;
      el.dataset.sized = '1';
    };
    /* fonts.ready, not rAF — the measurement needs the web font's real
       metrics, and rAF is parked in a background tab so the strip would
       be left unequalised for anyone who opens the site in a new tab */
    const applyType = () => $$('.marquee__track span, .bmq__track span').forEach(sizeType);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(applyType);
    else applyType();
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
      const metaBot = [cuts.length ? `${pad2(cuts.length)} ${cuts.length === 1 ? 'CUT' : 'CUTS'}` : '', d.house].filter(Boolean).join(' — ') || '&nbsp;';
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
  (function opening() {
    const body = document.body;
    if (!loader) { body.classList.remove('opening'); body.classList.add('loaded', 'opened'); return; }

    /* the title sequence, in beats:
         playhead draws → PRASHANT pulls left → PANDA pulls right
         → the roles land → the finished mark flies up and settles
         into the nav's logo slot, and the page is revealed behind it.
       CSS owns the motion; this drops `opening`, lifts the veil, then
       measures the nav slot and hands the mark over. */
    const ASSEMBLE = reduced ? 0 : 3100;   /* scrubber + both words, per the CSS delays */
    const SETTLE   = reduced ? 0 : 1750;   /* roles + categories, then fly */
    const FLY      = reduced ? 0 : 1100;   /* matches .titleseq__mark transition */
    const fill = $('#loaderFill'), num = $('#loaderNum');

    /* fly the assembled mark from centre screen onto the nav logo.
       Both are the same artwork, so the landing is a straight swap.
       If the box measures zero (fonts/images not laid out yet) skip
       the flight rather than launching the mark to a wrong place. */
    function settleIntoNav() {
      const mark = $('#tsMark'), slot = $('#navBrandImg');
      if (!mark || !slot) return;
      const a = mark.getBoundingClientRect();
      const b = slot.getBoundingClientRect();
      if (!a.width || !b.width) return;
      const s = b.width / a.width;
      const dx = (b.left + b.width / 2) - (a.left + a.width / 2);
      const dy = (b.top + b.height / 2) - (a.top + a.height / 2);
      mark.style.transform = `translate(${dx}px, ${dy}px) scale(${s})`;
    }

    function play() {
      requestAnimationFrame(() => body.classList.remove('opening'));

      /* the bar tracks the assembly instead of running on its own clock */
      const t0 = performance.now();
      const tick = now => {
        const k = Math.min(1, (now - t0) / Math.max(ASSEMBLE, 1));
        if (fill) fill.style.width = (k * 100).toFixed(1) + '%';
        if (num) num.textContent = k < 1 ? pad2(Math.floor(k * 100)) : '100';
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);

      setTimeout(() => {
        loader.classList.add('done');
        body.classList.add('loaded');           /* veil lifts, roles land */
        setTimeout(() => {
          body.classList.add('settling');       /* meta fades, mark flies */
          settleIntoNav();
          setTimeout(() => body.classList.add('opened'), FLY);
        }, SETTLE);
      }, ASSEMBLE + (reduced ? 0 : 140));
    }

    /* Don't start the sequence in a background tab: rAF is parked and
       transitions don't advance there, so the timers would run out
       while nothing moved — the visitor would return to a logo that
       snaps together, or to a mark measured against a stale layout.
       Wait until the page is actually on screen, then play it. */
    if (document.visibilityState === 'visible') {
      play();
    } else {
      document.addEventListener('visibilitychange', function onShow() {
        if (document.visibilityState !== 'visible') return;
        document.removeEventListener('visibilitychange', onShow);
        play();
      });
    }
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
     STATS COUNT-UP
     ============================================================ */
  (function stats() {
    /* '&' in the "and counting" tail carries no count — skip it */
    const els = $$('.stat b').filter(e => e.dataset.count);
    if (!els.length) return;
    const done = e => e.textContent = e.dataset.count + (e.dataset.suffix || '');
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach(done); return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix || '';
        const t0 = performance.now(), dur = 1300;
        const tick = now => {
          const k = Math.min(1, (now - t0) / dur);
          el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + (k === 1 ? suffix : '');
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
    const ext = $('#playerVimeo');
    ext.href = `https://vimeo.com/${p.vid}/${p.hash}`;
    ext.innerHTML = 'OPEN&nbsp;ON&nbsp;VIMEO&nbsp;↗';
  }
  function openPlayer(id) {
    if (!player || !frame) return;
    const idx = LIST.findIndex(p => p.id === id);
    lastFocus = document.activeElement;
    player.classList.remove('single');
    loadFilm(idx < 0 ? 0 : idx);
    player.classList.add('open');
    document.body.style.overflow = 'hidden';
    $('#playerClose').focus();
  }
  function openTrailer(ytId, title) {
    if (!player || !frame) return;
    lastFocus = document.activeElement;
    frame.src = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`;
    frame.title = `${title} — trailer`;
    $('#playerTitle').textContent = `${title} — OFFICIAL TRAILER`;
    $('#playerCount').textContent = 'TRAILER';
    const ext = $('#playerVimeo');
    ext.href = `https://www.youtube.com/watch?v=${ytId}`;
    ext.innerHTML = 'OPEN&nbsp;ON&nbsp;YOUTUBE&nbsp;↗';
    player.classList.add('open', 'single');
    document.body.style.overflow = 'hidden';
    $('#playerClose').focus();
  }
  function closePlayer() {
    if (!player) return;
    player.classList.remove('open', 'single');
    frame.src = '';
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  (function playerInit() {
    if (!player) return;
    document.addEventListener('click', e => {
      const t = e.target.closest('[data-play]');
      if (t) { openPlayer(+t.dataset.play); return; }
      const y = e.target.closest('[data-yt]');
      if (y) openTrailer(y.dataset.yt, y.dataset.ytTitle);
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
        const ts = $('#titleseq'); if (ts) ts.remove();
        document.body.classList.remove('opening');
        document.body.classList.add('loaded', 'settling', 'opened');
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
