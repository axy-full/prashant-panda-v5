/* ============================================================
   PRASHANT PANDA - V5 · THE SCREENING ROOM
   one shared script for all pages - every module guards on the
   presence of its DOM ( / · /work · /directors · /process · /contact )
   Sources: vimeo.com/prashantpanda (verified embeds) and
   imdb.com/name/nm8079333 (filmography).
   Fidelity rules (revised per Prashant's notes of 2026-08-25):
     · My Name Is Khan etc. listed as ASSOCIATE FILM EDITOR (his own
       credit correction); other editorial-department titles excluded
     · genre tags are Prashant's own classification
     · contact email: ppanda.79@gmail.com (live since 2026-08-01)
   ============================================================ */
(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const pad2 = n => String(n).padStart(2, '0');

  /* ============================================================
     COMMERCIALS (playable - vimeo, unlisted hashes)
     44 from the Vimeo showcase plus the six Prashant named in his
     2026-08-25 notes (45-50). GENRE TAGS: his own classification.
     ============================================================ */
  /* the COMMERCIAL showcase in Prashant's own running order
     (vimeo.com/showcase/8346821, refreshed 2026-10-05 - 49 films incl.
     ids 51-55, added there 2026-08), then the six he named in his
     2026-08-25 notes that live only on his profile (45-50).
     GENRE TAGS: his own classification; 51-55 tagged by us, his to confirm */
  const ADS = [
    { id: 2, vid: '1106434425', hash: 'd768255096', title: 'Chupa Chups - Carrom', client: 'Perfetti Van Melle', credits: 'Ogilvy · Dir. Nikhil Rao', dur: 60, tag: 'HUMOR' },
    { id: 1, vid: '1088993725', hash: 'cd85ed120d', title: 'GIC - Mary', client: 'GIC Insurance', credits: 'Jamic Films · Dir. Shirish Daiya', dur: 93, tag: 'STORYTELLING' },
    { id: 4, vid: '1073818885', hash: 'd659e0694c', title: 'Snickers', client: 'Snickers', credits: 'Dir. Rishabh Dubey', dur: 35, tag: 'HUMOR' },
    { id: 3, vid: '1031822870', hash: '34305ab15d', title: 'EVA - Yes', client: 'EVA', credits: 'Dir. Varun Gupta', dur: 64, tag: 'STYLISED' },
    { id: 37, vid: '1179531910', hash: 'be8e6f7f01', title: 'Gillette Guard 3-in-1', client: 'Gillette', credits: 'Keroscene Films · Dir. Rajesh Saathi', dur: 30, tag: 'STYLISED' },
    { id: 10, vid: '1106435260', hash: 'ec61b93f55', title: 'ENVY', client: 'ENVY', credits: 'Dir. Vivek Daschaudhary', dur: 40, tag: 'STYLISED' },
    { id: 51, vid: '1220727717', hash: 'ca6ef28682', title: 'Healthians', client: 'Healthians', credits: 'ft. Janhvi Kapoor', dur: 30, tag: 'HUMOR' },
    { id: 52, vid: '1222621598', hash: '4655d539cd', title: 'Hershey\'s - Life Is Hard', client: 'Hershey\'s', credits: 'TBWA\\Lintas · Jamic Films · Dir. Shirish Daiya', dur: 62, tag: 'HUMOR' },
    { id: 5, vid: '1166613867', hash: '406b559643', title: 'ICICI Bank', client: 'ICICI Bank', credits: 'ft. Anil Kapoor', dur: 40, tag: 'HUMOR' },
    { id: 6, vid: '1015277896', hash: '25f1c9636d', title: 'Candid Dusting Powder', client: 'Candid', credits: 'BBDO India · Ducktape · Dir. Rishabh Dubey', dur: 53, tag: 'HUMOR' },
    { id: 7, vid: '867458294', hash: '74dda2c808', title: 'Har Ghar Ka Hero - Greenply E-Zero', client: 'Greenply', credits: 'Jamic Films · Dir. Nikhil Rao · ft. NTR Jr', dur: 35, tag: 'STYLISED' },
    { id: 8, vid: '1149446709', hash: '45c47a44bc', title: 'Hint - Pyaar ka Take-off', client: 'Hint', credits: 'Jamic Films · Dir. Shirish Daiya', dur: 50, tag: 'STYLISED' },
    { id: 9, vid: '1088994415', hash: '270d911f7c', title: 'GIC - Integrated', client: 'GIC Insurance', credits: 'Jamic Films · Dir. Shirish Daiya', dur: 30, tag: 'STORYTELLING' },
    { id: 11, vid: '949624577', hash: '0aecd8d238', title: 'ICC T20 World Cup - Biggest Love', client: 'Star Sports', credits: 'Star Sports · Jamic Films · Dir. Nikhil Rao', dur: 70, tag: 'STORYTELLING' },
    { id: 12, vid: '1167725115', hash: '2ad055a2ad', title: 'Kotak Neo', client: 'Kotak Neo', credits: '', dur: 45, tag: 'STORYTELLING' },
    { id: 13, vid: '571746432', hash: '3ca0813643', title: 'Society Tea - Brand New Day', client: 'Society Tea', credits: '', dur: 257, tag: 'STORYTELLING' },
    { id: 14, vid: '1162055404', hash: '542ab9265a', title: 'MG Hector', client: 'MG Motor', credits: '', dur: 60, tag: 'STORYTELLING' },
    { id: 15, vid: '1135694596', hash: '4e54adecb1', title: 'It\'s Your Moment - Festive \'25', client: 'amanté', credits: 'Dir. Raghavi Agarwal', dur: 60, tag: 'STORYTELLING' },
    { id: 16, vid: '958465600', hash: '9b8803648b', title: 'Dare Kiya Toh Darna Kya', client: 'Hint', credits: 'Jamic Films · Dir. Shirish Daiya · ft. Tiger Shroff', dur: 40, tag: 'STYLISED' },
    { id: 17, vid: '1020985979', hash: '2c2597bb82', title: 'Birla Opus - Ghost', client: 'Birla Opus', credits: 'Colonial Films · Dir. Rishabh Dubey', dur: 140, tag: 'HUMOR' },
    { id: 18, vid: '1011935988', hash: '16db53c95f', title: 'Birla Opus - Kidnapper', client: 'Birla Opus', credits: '', dur: 168, tag: 'HUMOR' },
    { id: 19, vid: '709084029', hash: 'e53fc093be', title: 'Swiggy - All The Food You Love', client: 'Swiggy', credits: '', dur: 15, tag: 'HUMOR' },
    { id: 20, vid: '642944186', hash: '193722126e', title: 'Jab Haath aur Bingo! Tedhe Medhe', client: 'Bingo!', credits: 'ft. Ranveer Singh', dur: 15, tag: 'HUMOR' },
    { id: 21, vid: '634280547', hash: 'bf91cde5d0', title: 'Bingo! Mad Angles ft. Ranveer Singh', client: 'Bingo!', credits: '', dur: 30, tag: 'HUMOR' },
    { id: 22, vid: '747936616', hash: '39ddb035cb', title: 'Meesho - Electronics MegaBlockbuster', client: 'Meesho', credits: '', dur: 20, tag: 'HUMOR' },
    { id: 23, vid: '539977032', hash: 'dd66e499b8', title: 'PGIM India - Gain From Experience', client: 'PGIM India', credits: '', dur: 55, tag: 'HUMOR' },
    { id: 24, vid: '904713196', hash: 'b63d40fc61', title: 'Sunfeast', client: 'ITC Sunfeast', credits: 'FCB Ulka · Dir. Subodh Menon', dur: 43, tag: 'HUMOR' },
    { id: 25, vid: '1174664059', hash: '2c95939b18', title: 'Britannia - Dugout', client: 'Britannia', credits: 'Dir. Shirish Daiya', dur: 31, tag: 'HUMOR' },
    { id: 26, vid: '763773061', hash: 'abe977a192', title: 'MPL - Pool Champs', client: 'MPL', credits: '', dur: 29, tag: 'HUMOR' },
    { id: 27, vid: '535421247', hash: '6eecab7289', title: '#DeliverTheLove - Bhai Dooj', client: 'Amazon India', credits: '', dur: 112, tag: 'STORYTELLING' },
    { id: 28, vid: '995053082', hash: '0f47f2dbab', title: 'Omnigel', client: 'Omnigel', credits: 'Dir. Nikhil Rao', dur: 42, tag: 'STORYTELLING' },
    { id: 29, vid: '948625099', hash: '8bc2c8aa54', title: 'Birla Opus - Gorilla', client: 'Birla Opus', credits: 'Colonial Films · Dir. Rishabh Dubey', dur: 146, tag: 'HUMOR' },
    { id: 30, vid: '1176230484', hash: '31f3be9440', title: 'Tata IPL', client: 'Tata IPL', credits: 'Dir. Nikhil Rao', dur: 90, tag: 'HUMOR' },
    { id: 31, vid: '1174664439', hash: 'e17b297944', title: 'Hershey\'s', client: 'Hershey\'s', credits: 'Dir. Shirish Daiya', dur: 61, tag: 'HUMOR' },
    { id: 32, vid: '535424849', hash: 'a1ece44b88', title: 'Hero - Halwa', client: 'Hero', credits: '', dur: 42, tag: 'STORYTELLING' },
    { id: 33, vid: '535422129', hash: '146793b802', title: 'Bajaj - Umbrella', client: 'Bajaj', credits: '', dur: 41, tag: 'STORYTELLING' },
    { id: 34, vid: '535421448', hash: 'bcd4f2c473', title: 'Bajaj - Paperboat', client: 'Bajaj', credits: '', dur: 46, tag: 'STORYTELLING' },
    { id: 35, vid: '854322510', hash: '4e43202996', title: 'MPL - Ludo', client: 'MPL', credits: 'Overdose Films · Dir. Rahul Dadda', dur: 30, tag: 'HUMOR' },
    { id: 36, vid: '747936708', hash: 'cfb4e9b082', title: 'Meesho - MegaBlockbuster Sale', client: 'Meesho', credits: '', dur: 29, tag: 'HUMOR' },
    { id: 38, vid: '1179533196', hash: 'b39fd32b44', title: 'IPL - Migrant', client: 'Astral Pipes', credits: '', dur: 60, tag: 'STORYTELLING' },
    { id: 44, vid: '1202512344', hash: '2f299c22f5', title: 'Agami Realty', client: 'Agami Realty', credits: '', dur: 78, tag: 'STYLISED' },
    { id: 39, vid: '948622574', hash: 'cdfcad98cb', title: 'Bajaj Allianz Life - Happy Bonus', client: 'Bajaj Allianz Life', credits: 'Minikin Works · Dir. Mithun Shaw', dur: 55, tag: 'STORYTELLING' },
    { id: 40, vid: '1006193461', hash: 'b2f117028b', title: 'JK Wipeazy', client: 'JK Wipeazy', credits: 'Dir. Rahul Dadda', dur: 36, tag: 'HUMOR' },
    { id: 41, vid: '1194290610', hash: '0abd367ed4', title: 'Chunky Ice Cream - Soulmate', client: 'Call Me Chunky', credits: '', dur: 15, tag: 'HUMOR' },
    { id: 42, vid: '1194256626', hash: '3fdcc1ecb0', title: 'Popeyes', client: 'Popeyes', credits: '', dur: 40, tag: 'HUMOR' },
    { id: 43, vid: '1176234899', hash: '4b3fdf00d8', title: 'Equus Asinus', client: '', credits: 'Dir. Nikhil Rao', dur: 50, tag: 'HUMOR' },
    { id: 53, vid: '1220191622', hash: '374b050074', title: 'Flipkart Live', client: 'Flipkart', credits: '', dur: 45, tag: 'HUMOR' },
    { id: 54, vid: '1148404451', hash: 'd10f73a326', title: 'It\'s Your Moment - Amanté India', client: 'amanté', credits: 'Dir. Raghavi Agarwal', dur: 46, tag: 'STORYTELLING' },
    { id: 55, vid: '1221037860', hash: '4ee2920fb6', title: 'Flipkart Minutes - Rakhi', client: 'Flipkart', credits: 'Minikin Works · Dir. Mithun Shaw', dur: 72, tag: 'STORYTELLING' },
    /* 45-50 - named in Prashant's 2026-08-25 notes, pulled from
       vimeo.com/prashantpanda (not in the curated showcase) */
    { id: 45, vid: '815585818',  hash: '3fdeb7b3e4', title: 'Asian Paints - Ace Sparc Emulsion', client: 'Asian Paints', credits: '', dur: 32, tag: 'HUMOR' },
    { id: 46, vid: '815585849',  hash: 'd0318ea5c2', title: 'Asian Paints - Tractor Sparc', client: 'Asian Paints', credits: '', dur: 47, tag: 'STORYTELLING' },
    { id: 47, vid: '886353055',  hash: 'a556f5beab', title: 'MPL - Par Nahin Katega', client: 'MPL', credits: 'Overdose Films · Dir. Rahul Dadda', dur: 20, tag: 'HUMOR' },
    { id: 48, vid: '763773007',  hash: '3b8630e258', title: 'MPL - Jignesh Bhai', client: 'MPL', credits: '', dur: 29, tag: 'HUMOR' },
    { id: 49, vid: '1149451696', hash: '94bfc6f18b', title: 'Oppo F31 Series 5G', client: 'Oppo', credits: '', dur: 30, tag: 'HUMOR' },
    { id: 50, vid: '747936664',  hash: '6ccb94a555', title: 'Lightein Parde - MegaBlockbuster', client: 'Meesho', credits: 'ft. Kapil Sharma', dur: 20, tag: 'HUMOR' },
  ];

  /* MUSIC VIDEOS & FILM SONGS - same shape as ADS so the player and
     the timeline carry them too */
  const MUSIC = [
    { id: 101, vid: '877026031', hash: 'a7348f4814', title: 'Tu Jaana Na Piya', client: 'KING - New Life', credits: '', dur: 246, tag: 'MUSIC' },
  ];
  const TAGS = ['HUMOR', 'STORYTELLING', 'STYLISED'];
  const img = p => `assets/img/work/${p.vid}.jpg`;
  /* player order = showcase order, music videos tail it so any
     data-play id resolves and prev/next runs the whole body of work */
  const LIST = ADS.concat(MUSIC);
  const byId = id => LIST.find(p => p.id === id);

  /* ============================================================
     SERIES + FILMS - key art + channel-verified trailers
     ============================================================ */
  const SERIES = [
    { title: 'Permanent Roommates',        art: 'series/permanent-roommates', yt: 'tKNQMYmQjnA' },
    { title: 'Hostel Daze',                art: 'series/hostel-daze', yt: '6Xdj-Jn9_iI' },
    { title: 'Operation MBBS',             art: 'series/operation-mbbs', yt: 'WL_BdNa4tEU' },
    { title: 'Cheesecake',                 art: 'series/cheesecake', yt: '' },
    { title: 'Cartel',                     art: 'series/cartel', yt: 'EQ9zXtlMRpM' },
    { title: 'Bachelors vs the World',     art: 'series/bachelors-vs-the-world', yt: 'bdh9UmsuEGw' },
    { title: 'Ishq Next Door',             art: 'series/ishq-next-door', yt: 'lGTjxQavLc4' },
    { title: 'Fireflies: Parth Aur Jugnu', art: 'series/fireflies', yt: '1MbGjbyYqrI' },
    { title: 'CLASS of 2017',              art: 'series/class-of-2017', yt: '' },
    { title: "TSP's Zeroes",               art: 'series/tsps-zeroes', yt: 'LwIaKhvI3r0' },
    { title: 'PA-Gals',                    art: 'series/pa-gals', yt: 'lzI9ilVNzno' },
    { title: 'Puncch Beat',                art: 'series/puncch-beat', yt: 'j8Sdmrb1l2Q' },
    { title: 'Ragini MMS Returns',         art: 'series/ragini-mms-returns', yt: 'G8Xud9tnS-M' },
  ];
  /* the features he cut as editor; the associate credits live in ASSOC */
  const FILMS = [
    { title: 'Rabia and Olivia', year: '2023', role: 'Editor', art: 'films/rabia-and-olivia', yt: 'dYTUwZAVCrk' },
  ];
  /* the upcoming feature - its "poster" is the generated Avid timeline */
  const UPCOMING = { title: 'Rotten Apple', house: 'Sagar Motion Pictures', art: 'films/rotten-apple' };
  /* ASSOCIATE FILM EDITOR - Prashant's list of 2026-08-25, in his
     order. Posters are the Wikipedia infobox artwork; trailers are
     channel-verified official uploads (Dharma / Pritish Nandy, the
     films' own producers). Raasta Roko has no Wikipedia article and
     "Anjaan" matches no Hindi film of the right period - both are
     listed without artwork rather than given the wrong film's. */
  const ASSOC = {
    lede: 'Associate Film Editor alongside Deepa Bhatia and Hemal Kothari.',
    films: [
      { title: 'My Name Is Khan',      year: '2010', art: 'films/my-name-is-khan-poster', yt: 'nqxgYT3TYzY' },
      { title: 'We Are Family',        year: '2010', art: 'films/we-are-family',          yt: 'OmlnWf6lm8o' },
      { title: 'Pyaar Ke Side Effects',year: '2006', art: 'films/pyaar-ke-side-effects',  yt: 'f4uv-recvRQ' },
      { title: 'Ek Khiladi Ek Haseena',year: '2005', art: 'films/ek-khiladi-ek-haseena',  yt: 'b-nwxjHTfRk' },
      { title: 'Just Married',         year: '2007', art: 'films/just-married',           yt: '1PJ1Y-tMDEA' },
      { title: 'Raasta Roko',          year: '',     art: '',                             yt: '' },
      { title: 'Anjaan',               year: '',     art: '',                             yt: '' },
    ],
  };
  /* FILM SONGS - the songs he cut inside features. The linked video is
     the official label upload of a song his own Vimeo confirms he cut;
     Paying Guests has a poster only, since no song is confirmed. */
  const SONGS = {
    lede: 'Film songs and music videos for Remo D’Souza, Arvind Thakur, Jayesh Pradhan and Jeet Singh.',
    films: [
      { title: 'Do Knot Disturb', year: '2009', art: 'films/do-knot-disturb',  yt: 'p2GuQW8A93k', song: 'Mere Naal' },
      { title: 'Kal Kissne Dekha',year: '2009', art: 'films/kal-kissne-dekha', yt: 'Up9XrXVnxe0', song: 'Soniye Billori' },
      { title: 'Paying Guests',   year: '2009', art: 'films/paying-guest',     yt: '',            song: '' },
    ],
  };

  /* SELECTED STORIES - Prashant's own running order, 2026-08-25.
     note = the thought behind the story (craft copy, not fact).
     ar = the film's true aspect; only '34' is pillarboxed in its still. */
  const REEL = [
    { id: 2,   t: 'Chupa Chups - Carrom',     ar: '34',
      note: 'A quiet joke built frame by frame. Comedy timing is edit timing - hold, hold, pay off.' },
    { id: 1,   t: 'Mary Aunty',               ar: '169',
      note: 'Insurance sold as belonging - a stray who stays. The cut sits still and lets the bond do the talking.' },
    { id: 20,  t: 'Jab Haath aur Bingo',      ar: '11',
      note: 'Fifteen seconds, one running gag, no room to breathe. The shortest cuts leave the least to hide behind.' },
    { id: 42,  t: 'Popeyes',                  ar: '43',
      note: 'Appetite is a tempo problem. Cut on the crunch and the audience tastes it before they read it.' },
    { id: 37,  t: 'Gillette',                 ar: '45',
      note: 'Three blades, one clean line. Product films live or die on where you choose to stop looking.' },
    { id: 31,  t: "Hershey's",                ar: '169',
      note: 'Sweetness without sentiment. Let the pauses carry it and the product never has to shout.' },
    { id: 8,   t: 'Hint - Pyaar ka Take-off', ar: '45',
      note: 'A love story boarding in fifty seconds. Looks traded like dialogue - the edit does the flirting.' },
    { id: 4,   t: 'Snickers',                 ar: '11',
      note: 'Hunger changes people - the gag only lands if the switch is invisible. Blink, and the cut already happened.' },
    { id: 10,  t: 'Envy',                     ar: '43',
      note: 'Fragrance is pure mood, no plot, only tempo. The edit wears the perfume.' },
    { id: 101, t: 'Tu Jaana Na Piya',         ar: '169',
      note: 'A song cut to the voice, not the beat. Music video editing is listening with your hands.' },
  ];

  /* ============================================================
     DIRECTORS - Prashant's twelve of 2026-08-25 in his order, then
     Rishabh Dubey and Varun Gupta, then the directors credited on
     the films already on the site (refreshed 2026-10-05 from the
     credits in his own Vimeo descriptions). works[] = ids playable
     in-site. Flipkart Rakhi is credited to Mithun Shaw from the
     Minikin Works end card; Healthians and Flipkart Live carry no
     credit yet, so they sit under no one.
     ============================================================ */
  const DIRECTORS = [
    { name: 'NIKHIL RAO',         house: 'JAMIC FILMS',                works: [2, 7, 11, 30, 28, 43], still: '867458294' },
    { name: 'SHIRISH DAIYA',      house: 'JAMIC FILMS',                works: [1, 9, 8, 16, 52, 31, 25], still: '1088993725' },
    { name: 'RAJESH SAATHI',      house: 'KEROSCENE FILMS',            works: [37],      still: '1179531910' },
    { name: 'ABHIJIT SUDHAKAR',   house: 'ZIGZAG FILM',                works: [],        still: '' },
    { name: 'SAPNA SINGH',        house: '',                           works: [],        still: '' },
    { name: 'SHAUN KOLA',         house: '',                           works: [],        still: '' },
    { name: 'RAHUL SRIVASTAVA',   house: '',                           works: [],        still: '' },
    { name: 'VIVEK DASCHAUDHARY', house: 'KARMMAN LINE',               works: [10],      still: '1106435260' },
    { name: 'RAGHAVI AGARWAL',    house: 'CINERA',                     works: [54, 15],  still: '1148404451' },
    { name: 'SUYASH VADHAVKAR',   house: '',                           works: [],        still: '' },
    { name: 'SHAKTI SAGAR',       house: '',                           works: [],        still: '' },
    { name: 'MITHUN SHAW',        house: 'MINIKIN WORKS',              works: [55, 39],  still: '1221037860' },
    { name: 'RISHABH DUBEY',      house: 'BBDO / DUCKTAPE / COLONIAL', works: [4, 6, 17, 29], still: '1073818885' },
    { name: 'VARUN GUPTA',        house: '',                           works: [3],       still: '1031822870' },
    { name: 'RAHUL DADDA',        house: 'OVERDOSE FILMS',             works: [35, 47, 40], still: '854322510' },
    { name: 'SUBODH MENON',       house: 'FCB ULKA',                   works: [24],      still: '904713196' },
    { name: 'AKHILESH VATS',      house: 'KING - NEW LIFE',            works: [101],     still: '877026031' },
  ];

  /* ============================================================
     01 - SELECTED STORIES as an NLE TIMELINE
     · one video track of uniform clips, no numbers, no durations
     · two audio tracks under it (decorative waveforms, seeded per
       clip so they are stable), the active clip's audio runs red
     · fixed playhead reads the scroll; the clip under it prints
       its story-thought below the strip
     ============================================================ */
  (function timeline() {
    const scroller = $('#tlScroll');
    if (!scroller) return;
    const laneV = $('#laneV1');
    const lanesA = [$('#laneA1'), $('#laneA2')].filter(Boolean);
    const ruler = $('#tlRuler'), inner = $('#tlInner');
    const noteT = $('#tlNoteTitle'), noteX = $('#tlNoteText');
    const CLIPS = REEL.map(r => ({ ...r, p: byId(r.id) })).filter(c => c.p);
    const N = CLIPS.length;
    const PADL = 52;

    /* a deterministic waveform per clip - a fixed seed so it never
       flickers between loads; reads as a mixed track, not as data */
    const wave = (seed, bars, soft) => {
      let s = (seed % 2147483646) + 1;
      const rnd = () => (s = (s * 48271) % 2147483647) / 2147483647;
      let d = '';
      for (let i = 0; i < bars; i++) {
        const env = .3 + .7 * Math.abs(Math.sin((i / bars) * Math.PI * (soft ? 1.7 : 3.1) + rnd() * .4));
        const h = Math.max(.05, Math.min(1, env * (.4 + rnd() * .8))) * 47;
        d += `M${i + .2} ${(50 - h).toFixed(1)}h.6v${(h * 2).toFixed(1)}h-.6z`;
      }
      return `<svg viewBox="0 0 ${bars} 100" preserveAspectRatio="none" aria-hidden="true"><path d="${d}"/></svg>`;
    };

    CLIPS.forEach((c, i) => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'tclip';
      el.dataset.play = c.id;
      el.dataset.ar = c.ar || '169';
      el.setAttribute('aria-label', `Play ${c.p.title}`);
      el.innerHTML = `
        <img src="${img(c.p)}" alt="" width="1600" height="900" decoding="async" ${i < 4 ? '' : 'loading="lazy"'} draggable="false" />
        <span class="tclip__grade" aria-hidden="true"></span>
        <span class="tclip__name">${c.t}</span>`;
      laneV.appendChild(el);
      c.el = el;
      c.a = lanesA.map((lane, k) => {
        const a = document.createElement('span');
        a.className = 'aclip';
        a.innerHTML = wave(+c.p.vid + k * 7919, 110, k === 1);
        lane.appendChild(a);
        return a;
      });
    });

    let w = 0;
    function layout() {
      const h = laneV.clientHeight - 12;            /* clip inset 6px top + bottom */
      w = Math.round(h * 16 / 9);                    /* every clip the same 16:9 width */
      const cw = scroller.clientWidth || innerWidth;
      /* the right pad lets the LAST clip reach the playhead at full scroll */
      const PADR = Math.max(24, Math.round(cw * .82 - w * .5));
      CLIPS.forEach((c, i) => {
        const x = PADL + i * w;
        c.el.style.left = x + 'px'; c.el.style.width = w + 'px';
        c.a.forEach(a => { a.style.left = x + 'px'; a.style.width = w + 'px'; });
      });
      inner.style.width = (PADL + N * w + PADR) + 'px';
      /* a major tick on every cut, minor ticks at the quarters */
      const marks = [];
      for (let i = 0; i <= N * 4; i++) {
        marks.push(`<span class="tick${i % 4 === 0 ? ' major' : ''}" style="left:${Math.round(PADL + i * w / 4)}px"></span>`);
      }
      ruler.innerHTML = marks.join('');
      sync();
    }

    const headAt = () => scroller.clientWidth * 0.18;
    let cur = -1;
    function sync() {
      if (!w) return;
      const x = scroller.scrollLeft + headAt() - PADL;
      const i = Math.min(N - 1, Math.max(0, Math.floor(x / w)));
      if (i === cur) return;
      cur = i;
      CLIPS.forEach((c, j) => {
        const on = j === i;
        c.el.classList.toggle('active', on);
        c.a.forEach(a => a.classList.toggle('active', on));
      });
      /* the descriptor sets the name in mono - hyphens read as noise there */
      if (noteT) noteT.textContent = CLIPS[i].t.replace(/\s*-\s*/g, ' ');
      if (noteX) noteX.textContent = CLIPS[i].note;
    }
    let tick = false;
    scroller.addEventListener('scroll', () => {
      if (!tick) { tick = true; requestAnimationFrame(() => { tick = false; sync(); }); }
    }, { passive: true });
    let rt;
    addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(layout, 120); });
    layout();
    /* fonts and images can change the lane height after first paint */
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);

    /* wheel scrubs the strip, and hands the page back at either end */
    scroller.addEventListener('wheel', e => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const max = scroller.scrollWidth - scroller.clientWidth;
      if ((scroller.scrollLeft <= 0 && e.deltaY < 0) ||
          (scroller.scrollLeft >= max - 1 && e.deltaY > 0)) return;
      e.preventDefault();
      scroller.scrollLeft += e.deltaY;
    }, { passive: false });

    /* drag to scrub (mouse) - suppress the click that would open the player */
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
      if (e.key === 'ArrowLeft') { e.preventDefault(); scroller.scrollLeft -= w || 120; }
      if (e.key === 'ArrowRight') { e.preventDefault(); scroller.scrollLeft += w || 120; }
    });
  })();

  /* ============================================================
     RENDER - WORK. One card for every body of work: a framed still
     with the title beneath it, the same board Why Prashant uses.
     ============================================================ */
  (function renderIndex() {
    /* brand under the title only when the title doesn't already carry it */
    const capOf = p => {
      const t = p.title.toUpperCase(), c = (p.client || '').toUpperCase();
      return (c && !t.includes(c)) ? c : '';
    };
    const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

    const card = o => {
      const clickable = o.play || o.yt;
      const el = document.createElement(clickable ? 'button' : 'div');
      if (clickable) el.type = 'button';
      el.className = 'board__panel' + (o.upcoming ? ' board__panel--upcoming' : '');
      if (o.play) { el.dataset.play = o.play; el.setAttribute('aria-label', `Play ${o.title}`); }
      if (o.yt) { el.dataset.yt = o.yt; el.dataset.ytTitle = o.title.toUpperCase(); el.setAttribute('aria-label', `Play trailer - ${o.title}`); }
      el.innerHTML = `
        <span class="board__frame">
          <img loading="lazy" decoding="async" width="1600" height="900" src="${o.art}" alt="${esc(o.title)}${o.alt ? ' - ' + o.alt : ''}" />
          ${o.yt ? '<span class="chip"><i>&#9656;</i>&nbsp;TRAILER</span>' : ''}
        </span>
        <span class="board__cap">
          <b class="board__title">${esc(o.title)}</b>
          ${o.brand ? `<span class="board__brand">${esc(o.brand)}</span>` : ''}
        </span>`;
      const im = el.querySelector('img');
      im.addEventListener('error', () => im.remove(), { once: true });
      return el;
    };
    const fill = (grid, items) => { if (grid) items.forEach(o => grid.appendChild(card(o))); };

    /* commercials, grouped into Prashant's three genres - one shelf each */
    const genres = $('#adGenres');
    if (genres) {
      TAGS.forEach(tag => {
        const films = ADS.filter(p => p.tag === tag);
        if (!films.length) return;
        const head = document.createElement('div');
        head.className = 'subhead reveal';
        head.id = 'genre-' + tag.toLowerCase();
        head.innerHTML = `<h3 class="subhead__title">${tag}</h3>`;
        genres.appendChild(head);
        const grid = document.createElement('div');
        grid.className = 'board board--work reveal';
        genres.appendChild(grid);
        fill(grid, films.map(p => ({ title: p.title, art: img(p), brand: capOf(p), play: p.id, alt: 'film still' })));
      });
    }
    fill($('#gridSeries'), SERIES.map(s => ({ title: s.title, art: `assets/img/${s.art}.jpg`, yt: s.yt, alt: 'key art' })));
    fill($('#gridFilms'), [
      { title: UPCOMING.title, art: `assets/img/${UPCOMING.art}.jpg`, brand: `UPCOMING · ${UPCOMING.house.toUpperCase()}`, upcoming: true, alt: 'edit timeline' },
      ...FILMS.map(f => ({ title: f.title, art: `assets/img/${f.art}.jpg`, brand: f.role.toUpperCase(), yt: f.yt, alt: 'key art' })),
    ]);
    fill($('#gridMusic'), MUSIC.map(p => ({ title: p.title, art: img(p), brand: capOf(p), play: p.id, alt: 'film still' })));

    /* poster wall - a card per film, a trailer chip where an official
       upload exists. Films with no verified artwork set their title
       inside the frame like a slate rather than borrowing a poster. */
    const credits = (id, data) => {
      const wrap = $(id);
      if (!wrap) return;
      const poster = f => {
        const tag = f.yt ? 'button' : 'div';
        const attrs = f.yt
          ? ` type="button" data-yt="${f.yt}" data-yt-title="${esc(f.title.toUpperCase())}"` +
            ` aria-label="Play ${f.song ? f.song + ' from ' : 'the trailer for '}${esc(f.title)}"`
          : '';
        const chip = f.yt
          ? `<span class="chip"><i>&#9656;</i>&nbsp;${esc(f.song ? f.song.toUpperCase() : 'TRAILER')}</span>`
          : '';
        return `<${tag} class="poster${f.art ? '' : ' poster--noart'}"${attrs}>
          <span class="poster__frame">
            ${f.art
              ? `<img loading="lazy" decoding="async" src="assets/img/${f.art}.jpg" alt="${esc(f.title)} poster" />`
              : `<span>${esc(f.title)}</span>`}
            ${chip}
          </span>
          <span class="poster__cap">
            <b>${esc(f.title)}</b>${f.year ? `<span class="poster__year">${f.year}</span>` : ''}
          </span>
        </${tag}>`;
      };
      wrap.innerHTML =
        `<p class="credits__lede">${data.lede}</p>` +
        `<div class="posters">${data.films.map(poster).join('')}</div>`;
    };
    credits('#creditsAssoc', ASSOC);
    credits('#creditsSongs', SONGS);
  })();

  /* the VP company mark is pending from Prashant - hide the slot until
     the file exists so the row never shows a broken image */
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
      if (k) k.textContent = 'ADDRESS - IN ASSEMBLY';
    }
  })();

  /* ============================================================
     BANNERS - brands + agencies under COMMERCIALS, the platforms
     under SERIES. logo: filename in assets/img/brands/ (official
     marks, recolored bone via CSS) · logo:null → typographic fallback
     ============================================================ */
  const BRANDS_ROW = [
    { name: 'GIC',                logo: 'gic-compact.svg' },
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
    /* the agency - a separate entity from Jamic Films, Nikhil Rao's
       production house. Official wordmark, MullenLowe Group CDN. */
    { name: 'LOWE LINTAS',        logo: 'lowe-lintas.png' },
    { name: 'KEROSCENE FILMS',    logo: 'keroscene.png' },
    { name: 'ZIGZAG FILM',        logo: 'zigzag.png' },
    { name: 'KARMMAN LINE',       logo: 'karmanline.png' },
    { name: 'DHARMA PRODUCTIONS', logo: 'dharma.svg' },
    { name: 'ENTOURAGE FILMS',    logo: 'entourage-films.png' },
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
      ? `<img class="bmq__logo" src="assets/img/brands/${b.logo}?v=2" alt="${b.name}" loading="lazy" decoding="async" />`
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

    /* equalise the strip by optical AREA, not raw height: a long wordmark
       set to the same height as a compact mark reads twice as loud.
       h = base · √(REF/aspect), held to ±25% */
    const REF = 3.2;
    const size = el => {
      const w = el.naturalWidth, h = el.naturalHeight;
      if (!w || !h) return;
      const k = Math.min(1.25, Math.max(.82, Math.sqrt(REF / (w / h))));
      el.style.setProperty('--k', k.toFixed(3));
    };
    $$('.bmq__logo').forEach(el => {
      if (el.complete) size(el);
      else el.addEventListener('load', () => size(el), { once: true });
    });
    /* type fallbacks get the same treatment, measured once the web font is in */
    const sizeType = el => {
      if (el.dataset.sized) return;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const k = Math.min(1.15, Math.max(.6, Math.sqrt(REF / (r.width / r.height))));
      el.style.fontSize = `calc(${getComputedStyle(el).fontSize} * ${k.toFixed(3)})`;
      el.dataset.sized = '1';
    };
    const applyType = () => $$('.bmq__track span').forEach(sizeType);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(applyType);
    else applyType();
  })();

  /* ============================================================
     DIRECTORS DRAWER (home) - a handle bottom-left opens the list
     ============================================================ */
  (function dirDrawer() {
    const tab = $('#dirTab'), panel = $('#dirPanel'), list = $('#dirPanelList'), close = $('#dirPanelClose');
    if (!tab || !panel || !list || !close) return;
    list.innerHTML = DIRECTORS.map(d =>
      `<li>${d.name}${d.house ? `<span>${d.house}</span>` : ''}</li>`).join('');
    const set = open => {
      panel.classList.toggle('open', open);
      panel.setAttribute('aria-hidden', String(!open));
      tab.setAttribute('aria-expanded', String(open));
      tab.classList.toggle('hidden', open);
      (open ? close : tab).focus({ preventScroll: true });
    };
    tab.addEventListener('click', () => set(true));
    close.addEventListener('click', () => set(false));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && panel.classList.contains('open')) set(false);
    });
  })();

  /* ============================================================
     RENDER - DIRECTORS (rows + cursor-follow still)
     ============================================================ */
  (function renderDirectors() {
    const wrap = $('#dirRows');
    if (!wrap) return;
    DIRECTORS.forEach(d => {
      const cuts = d.works.map(byId).filter(Boolean);
      const chips = cuts.length
        ? cuts.map(w => `<button type="button" class="dirchip" data-play="${w.id}">${w.title.toUpperCase()}&nbsp;▸</button>`).join('')
        : '<span class="dirchip dirchip--tbc">MORE SOON</span>';
      const el = document.createElement('div');
      el.className = 'dir reveal';
      el.dataset.still = d.still;
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-expanded', 'false');
      el.innerHTML = `<span class="dir__name">${d.name}</span><div class="dir__works">${chips}</div>`;
      wrap.appendChild(el);
    });

    const toggle = row => {
      const open = row.classList.toggle('open');
      row.setAttribute('aria-expanded', String(open));
    };
    wrap.addEventListener('click', e => {
      if (e.target.closest('[data-play]')) return;
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
     THE OPENING (home only)
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
    const ASSEMBLE = reduced ? 0 : 4400;   /* scrubber + both words, per the CSS delays */
    const SETTLE   = reduced ? 0 : 3400;   /* roles, categories, tagline - held long enough to read */
    const FLY      = reduced ? 0 : 1400;   /* matches .titleseq__mark transition */
    const fill = $('#loaderFill'), num = $('#loaderNum');

    /* fly the assembled mark from centre screen onto the nav logo. Both
       are the same artwork, so the landing is a straight swap. If a box
       measures zero, skip the flight rather than land the mark wrong. */
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

    /* the sequence runs ~9s so the subtext can be read - but nobody
       should be trapped in it. Any click or key jumps to the end. */
    let done = false;
    const timers = [];
    function finish() {
      if (done) return;
      done = true;
      timers.forEach(clearTimeout);
      loader.classList.add('done');
      body.classList.remove('opening');
      body.classList.add('loaded', 'settling', 'opened');
    }
    document.addEventListener('pointerdown', finish, { once: true });
    document.addEventListener('keydown', finish, { once: true });

    function play() {
      requestAnimationFrame(() => body.classList.remove('opening'));
      const t0 = performance.now();
      const tick = now => {
        const k = Math.min(1, (now - t0) / Math.max(ASSEMBLE, 1));
        if (fill) fill.style.width = (k * 100).toFixed(1) + '%';
        if (num) num.textContent = k < 1 ? pad2(Math.floor(k * 100)) : '100';
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);

      timers.push(setTimeout(() => {
        if (done) return;
        loader.classList.add('done');
        body.classList.add('loaded');
        timers.push(setTimeout(() => {
          if (done) return;
          body.classList.add('settling');
          settleIntoNav();
          timers.push(setTimeout(() => {
            done = true;
            body.classList.add('opened');
          }, FLY));
        }, SETTLE));
      }, ASSEMBLE + (reduced ? 0 : 140)));
    }

    /* Don't start in a background tab: rAF is parked there and the
       timers would run out while nothing moved. Wait for the page to be
       on screen, with a failsafe so the site can never sit blank. */
    if (document.visibilityState === 'visible') {
      play();
    } else {
      document.addEventListener('visibilitychange', function onShow() {
        if (document.visibilityState !== 'visible') return;
        document.removeEventListener('visibilitychange', onShow);
        play();
      });
      setTimeout(finish, 12000);
    }
  })();

  /* ============================================================
     NAV + FULLSCREEN MENU (hover = still preview)
     ============================================================ */
  const menu = $('#menu'), burger = $('#burger'), burgerLabel = $('#burgerLabel');
  const menuOpen = () => menu && menu.classList.contains('open');
  let menuStillsLoaded = false;
  function toggleMenu(open) {
    if (!menu || !burger) return;
    if (open && !menuStillsLoaded) {
      /* the five stills only load the first time the menu opens */
      $$('.menu__bg img[data-src]', menu).forEach(im => { im.src = im.dataset.src; });
      menuStillsLoaded = true;
    }
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
    const onScroll = () => nav && nav.classList.toggle('solid', scrollY > 40);
    onScroll(); addEventListener('scroll', onScroll, { passive: true });
    if (burger && menu) {
      burger.addEventListener('click', () => toggleMenu(!menuOpen()));
      $$('a', menu).forEach(a => a.addEventListener('click', () => toggleMenu(false)));
    }
    const bgs = $$('.menu__bg img');
    const show = key => bgs.forEach(b => b.classList.toggle('show', b.dataset.menubg === key));
    $$('.menu__links a').forEach(a => {
      a.addEventListener('mouseenter', () => show(a.dataset.bg));
      a.addEventListener('focus', () => show(a.dataset.bg));
    });
  })();

  /* ============================================================
     SCROLL REVEALS - whatever is already on screen shows at once;
     the rest waits for the observer
     ============================================================ */
  (function reveals() {
    const els = $$('.reveal');
    const show = e => e.classList.add('in');
    if (reduced || !('IntersectionObserver' in window)) { els.forEach(show); return; }
    const io = new IntersectionObserver(ents => {
      ents.forEach(en => { if (en.isIntersecting) { show(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.08 });
    const pending = new Set(els);
    const firstScreen = () => {
      const vh = innerHeight;
      pending.forEach(e => {
        if (e.getBoundingClientRect().top < vh * 1.05) { show(e); io.unobserve(e); pending.delete(e); }
      });
    };
    els.forEach(e => io.observe(e));
    firstScreen();
    /* a tab opened in the background gets the same treatment when it is shown */
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') firstScreen(); });
  })();

  /* ============================================================
     PLAYER - in-site Vimeo screening (unlisted → h= hash)
     ============================================================ */
  const player = $('#player');
  const frame = $('#playerFrame');
  let cur = 0, lastFocus = null;

  function loadFilm(idx) {
    cur = (idx + LIST.length) % LIST.length;
    const p = LIST[cur];
    frame.src = `https://player.vimeo.com/video/${p.vid}?h=${p.hash}&autoplay=1&title=0&byline=0&portrait=0&dnt=1`;
    frame.title = `${p.title} - Prashant Panda`;
    $('#playerTitle').textContent = `${p.title.toUpperCase()} - ${p.client.toUpperCase()}${p.credits ? ' / ' + p.credits.toUpperCase() : ''}`;
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
    frame.title = `${title} - trailer`;
    $('#playerTitle').textContent = `${title} - OFFICIAL TRAILER`;
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
    $('#playerClose').addEventListener('click', closePlayer);
    $('#playerPrev').addEventListener('click', () => loadFilm(cur - 1));
    $('#playerNext').addEventListener('click', () => loadFilm(cur + 1));
    document.addEventListener('keydown', e => {
      if (player.classList.contains('open')) {
        if (e.key === 'Escape') closePlayer();
        if (e.key === 'ArrowLeft' && !player.classList.contains('single')) loadFilm(cur - 1);
        if (e.key === 'ArrowRight' && !player.classList.contains('single')) loadFilm(cur + 1);
      } else if (e.key === 'Escape' && menuOpen()) {
        toggleMenu(false);
      }
    });
  })();

  /* ============================================================
     dev screenshot helper - inert unless the storage flag is set
     usage: v4-jump = 'SHOT' | 'MENU' | 'PLAYER' | 'TOP:#sel' (combinable 'TOP:#sel|SHOT')
     ============================================================ */
  try {
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
          else if (part.indexOf('TOP:') === 0) {
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
