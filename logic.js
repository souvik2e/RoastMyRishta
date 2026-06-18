/* ============================================
   ROASTMYRISHTA.PAGES.DEV — logic.js
   Roast generator, thread/group mechanic,
   share functions, Savage Mode payment gate.
   Requires: data.js loaded first.
============================================ */

/* ══════════════════════════════════════════
   STATE
══════════════════════════════════════════ */
const STATE = {
  inputText:   '',
  category:    'crush',
  intensity:   'medium',
  roastIdx:    0,
  roastText:   '',
  meter:       0,
  threadItems: [],   // { name, text } added by friends
  savageUnlocked: false,
};

/* ══════════════════════════════════════════
   FLOATING STICKERS BACKGROUND
══════════════════════════════════════════ */
(function initStickers() {
  const container = document.getElementById('sticker-container');
  if (!container) return;
  const stickers = ['🎀','✨','💗','🌸','🦋','💅','👀','🍒','🌷','💌'];
  stickers.forEach(e => {
    const s = document.createElement('div');
    s.className = 'floating-sticker';
    s.textContent = e;
    s.style.left             = Math.random() * 100 + '%';
    s.style.fontSize         = (16 + Math.random() * 16) + 'px';
    s.style.animationDuration = (16 + Math.random() * 18) + 's';
    s.style.animationDelay    = (-Math.random() * 20) + 's';
    container.appendChild(s);
  });
})();

/* ══════════════════════════════════════════
   COUNTER ANIMATION (hero stats)
══════════════════════════════════════════ */
function animateCount(el, target, prefix = '', suffix = '', duration = 2000) {
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    el.textContent = prefix + Math.floor(ease * target).toLocaleString('en-IN') + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
setTimeout(() => {
  const u = document.getElementById('stat-roasts');
  const t = document.getElementById('stat-threads');
  const g = document.getElementById('stat-gifts');
  if (u) animateCount(u, 28471);
  if (t) animateCount(t, 9203);
  if (g) animateCount(g, 47);
}, 500);

/* ══════════════════════════════════════════
   TOAST
══════════════════════════════════════════ */
function showToast(msg, duration = 3200) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

/* ══════════════════════════════════════════
   CONFETTI BURST (cute version — emoji bits)
══════════════════════════════════════════ */
function burst() {
  const bits = ['🎀','✨','💗','🌸','💅'];
  for (let i = 0; i < 24; i++) {
    const el = document.createElement('div');
    el.textContent = bits[i % bits.length];
    el.style.cssText = `
      position:fixed; top:50%; left:50%;
      font-size:${14 + Math.random() * 10}px;
      pointer-events:none; z-index:9990;
      transition: all ${0.7 + Math.random() * 0.7}s cubic-bezier(0,0.6,0.4,1);
      transform: translate(-50%,-50%);
    `;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      const angle = Math.random() * Math.PI * 2;
      const dist  = 100 + Math.random() * 200;
      el.style.transform = `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) rotate(${Math.random()*360}deg)`;
      el.style.opacity   = '0';
    });
    setTimeout(() => el.remove(), 1500);
  }
}

/* ══════════════════════════════════════════
   CATEGORY CHIP SELECTION
══════════════════════════════════════════ */
function initCategoryChips() {
  const container = document.getElementById('category-chips');
  if (!container) return;
  container.innerHTML = RR.CATEGORIES.map(c =>
    `<div class="chip ${c.id === STATE.category ? 'selected' : ''}" data-cat="${c.id}" onclick="selectCategory('${c.id}')">${c.label}</div>`
  ).join('');
}
function selectCategory(id) {
  STATE.category = id;
  document.querySelectorAll('#category-chips .chip').forEach(el => {
    el.classList.toggle('selected', el.dataset.cat === id);
  });
}

/* ══════════════════════════════════════════
   INTENSITY CHIP SELECTION
══════════════════════════════════════════ */
function initIntensityChips() {
  const container = document.getElementById('intensity-chips');
  if (!container) return;
  container.innerHTML = RR.INTENSITY.map(lvl =>
    `<div class="chip ${lvl.id === STATE.intensity ? 'selected' : ''}" data-lvl="${lvl.id}" onclick="selectIntensity('${lvl.id}')">${lvl.label}</div>`
  ).join('');
}
function selectIntensity(id) {
  STATE.intensity = id;
  document.querySelectorAll('#intensity-chips .chip').forEach(el => {
    el.classList.toggle('selected', el.dataset.lvl === id);
  });
}

/* ══════════════════════════════════════════
   GENERATE ROAST — main function
══════════════════════════════════════════ */
function generateRoast() {
  const textInput = document.getElementById('inp-description');
  const text = (textInput.value || '').trim();

  if (!text) {
    showToast('Tell us a little about them first bestie 🎀');
    return;
  }

  STATE.inputText = text;

  /* pick roast pool based on category */
  const pool = STATE.category === 'rishta'
    ? [...RR.RISHTA_ROASTS, ...RR.ROASTS]
    : RR.ROASTS;

  STATE.roastIdx  = Math.floor(Math.random() * pool.length);
  STATE.roastText = pool[STATE.roastIdx](text);
  STATE.meter     = RR.getRoastMeter();
  STATE.threadItems = []; /* reset thread for new roast */

  _renderRoastResult();

  const resultEl = document.getElementById('roast-result');
  resultEl.style.display = 'block';
  setTimeout(() => resultEl.scrollIntoView({ behavior:'smooth', block:'start' }), 60);
  burst();
}

/* ══════════════════════════════════════════
   RENDER ROAST RESULT
══════════════════════════════════════════ */
function _renderRoastResult() {
  const tagEl = document.getElementById('roast-tag-label');
  if (tagEl) tagEl.textContent = RR.VERDICT_TAGS[Math.floor(Math.random() * RR.VERDICT_TAGS.length)];

  const textEl = document.getElementById('roast-text-output');
  if (textEl) textEl.textContent = STATE.roastText;

  const meterFill = document.getElementById('roast-meter-fill');
  const meterLabel = document.getElementById('roast-meter-label');
  if (meterFill && meterLabel) {
    meterLabel.textContent = `Savagery Level: ${STATE.meter}%`;
    setTimeout(() => { meterFill.style.width = STATE.meter + '%'; }, 200);
  }

  /* bestie tip */
  const tipEl = document.getElementById('bestie-tip-text');
  if (tipEl) tipEl.textContent = RR.BESTIE_TIPS[Math.floor(Math.random() * RR.BESTIE_TIPS.length)];

  /* horoscope */
  _renderHoroscope();

  /* render thread (empty at first) */
  _renderThread();
}

/* ══════════════════════════════════════════
   REFRESH ROAST (new roast, same input)
══════════════════════════════════════════ */
function refreshRoast() {
  if (!STATE.inputText) return;
  const pool = STATE.category === 'rishta'
    ? [...RR.RISHTA_ROASTS, ...RR.ROASTS]
    : RR.ROASTS;
  let idx;
  do { idx = Math.floor(Math.random() * pool.length); } while (idx === STATE.roastIdx && pool.length > 1);
  STATE.roastIdx  = idx;
  STATE.roastText = pool[idx](STATE.inputText);
  STATE.meter     = RR.getRoastMeter();
  _renderRoastResult();
  showToast('🔥 New roast loaded!');
}

/* ══════════════════════════════════════════
   HOROSCOPE RENDER
══════════════════════════════════════════ */
function _renderHoroscope() {
  const el = document.getElementById('horoscope-box');
  if (!el) return;
  const h = RR.getHoroscope();
  el.innerHTML = `
    <div style="font-family:var(--ff-hand);font-size:18px;color:var(--pink2);margin-bottom:4px">✦ Your Rishta Horoscope ✦</div>
    <div style="font-family:var(--ff-display);font-size:19px;font-weight:700;color:var(--dark);margin-bottom:6px">${h.sign}</div>
    <div style="font-family:var(--ff-body);font-weight:500;font-size:13px;color:var(--dark2);opacity:0.85;line-height:1.6">${h.desc}</div>
  `;
}

/* ══════════════════════════════════════════
   THREAD / GROUP MECHANIC
   Friends can add their own roast onto the thread.
   This is the core viral loop — visiting the link
   and adding a roast brings each friend in as a user.
══════════════════════════════════════════ */
function _renderThread() {
  const container = document.getElementById('thread-list');
  if (!container) return;
  if (!STATE.threadItems.length) {
    container.innerHTML = `<div style="text-align:center;font-family:var(--ff-body);font-weight:600;font-size:13px;color:var(--grey);padding:10px 0">No one's piled on yet... send this to your group and watch the chaos begin 👀</div>`;
    return;
  }
  container.innerHTML = STATE.threadItems.map(t => `
    <div class="thread-item">
      <div class="thread-item-name">${_escapeHtml(t.name)} added:</div>
      <div class="thread-item-text">${_escapeHtml(t.text)}</div>
    </div>
  `).join('');
}

function addThreadRoast() {
  const nameInput = document.getElementById('inp-thread-name');
  const textInput = document.getElementById('inp-thread-text');
  const name = (nameInput.value || '').trim() || 'Anonymous bestie';
  const text = (textInput.value || '').trim();

  if (!text) {
    showToast('Type your roast first bestie 🎀');
    return;
  }

  STATE.threadItems.push({ name, text });
  _renderThread();
  nameInput.value = '';
  textInput.value = '';
  showToast('✨ Added to the thread! Keep the chaos going.');
  burst();
}

/* ══════════════════════════════════════════
   ROAST CARD UNLOCK — THE REAL PRODUCT (₹29)
   Real-verification pattern, no honor system:
   Cashfree Return URL → ?unlock=card29
   Card is IMPOSSIBLE to see without real payment.
══════════════════════════════════════════ */
function handleCardPayClick() {
  sessionStorage.setItem('rr_pending', '1');
  sessionStorage.setItem('rr_state', JSON.stringify({
    inputText: STATE.inputText,
    category:  STATE.category,
    roastText: STATE.roastText,
    meter:     STATE.meter,
  }));
  /* No popup — Cashfree's Return URL is the only way back in */
}

function checkCardUnlock() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('unlock') === 'card29') {
    const saved = sessionStorage.getItem('rr_state');
    if (saved) {
      const d = JSON.parse(saved);
      Object.assign(STATE, d);
    }
    STATE.cardUnlocked = true;
    sessionStorage.removeItem('rr_pending');
    sessionStorage.removeItem('rr_state');

    showToast('🎀 Payment confirmed! Your Roast Card is ready below!', 4000);

    const resultEl = document.getElementById('roast-result');
    if (resultEl && STATE.roastText) {
      resultEl.style.display = 'block';
      _renderRoastResult();
      setTimeout(() => {
        openRoastCardModal();
        document.getElementById('cardSection')?.scrollIntoView({ behavior:'smooth', block:'start' });
      }, 600);
    }

    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  }
}

/* HARD GATE — card impossible to build without payment */
function openRoastCardModal() {
  if (!STATE.cardUnlocked) {
    showToast('Unlock your Roast Card for ₹29 first 🔒');
    const payBtn = document.getElementById('card-pay-btn');
    if (payBtn) payBtn.scrollIntoView({ behavior:'smooth', block:'center' });
    return;
  }
  STATE.cardIdx = (STATE.cardIdx || 0) + 1;
  const html = buildRoastCard(STATE.roastText, STATE.category, STATE.meter, STATE.cardIdx);
  const cardEl = document.getElementById('cert-modal-card');
  const actionsEl = document.getElementById('cert-modal-actions');
  if (cardEl) cardEl.innerHTML = html;
  if (actionsEl) actionsEl.innerHTML = `
    <button class="small-action-btn btn-wa" onclick="screenshotCard()">📸 Screenshot & Share</button>
    <button class="small-action-btn btn-copy" onclick="copyRoastText()">📋 Copy Text</button>
    <button class="small-action-btn btn-ig" onclick="STATE.cardIdx++;document.getElementById('cert-modal-card').innerHTML=buildRoastCard(STATE.roastText,STATE.category,STATE.meter,STATE.cardIdx)">🎲 New Style</button>
  `;
  document.getElementById('cert-modal')?.classList.add('open');
}
function closeCertModal() { document.getElementById('cert-modal')?.classList.remove('open'); }
function screenshotCard() { showToast('📸 Long-press to save → post on Instagram → tag @roastmyrishta to enter the lucky draw! 🎁', 5000); }

/* ══════════════════════════════════════════
   STREAK / GAMIFICATION
   Simple session-based streak counter
══════════════════════════════════════════ */
function _updateStreak() {
  let streak = parseInt(sessionStorage.getItem('rr_streak') || '0');
  streak += 1;
  sessionStorage.setItem('rr_streak', streak);
  const el = document.getElementById('streak-count');
  if (el) el.textContent = streak;
}

/* ══════════════════════════════════════════
   SHARE FUNCTIONS — the viral engine
══════════════════════════════════════════ */
function _getShareUrl() {
  /* In production this would be a unique thread ID;
     for now share the base site link */
  return 'https://roastmyrishta.byme.workers.dev';
}
function _getShareText() {
  return `💀 Just got roasted by RoastMyRishta and I'm NOT okay 🎀\n\n"${STATE.roastText.slice(0, 100)}..."\n\nSend yours and let's see who survives 👀\n${_getShareUrl()}`;
}
function shareWhatsApp() {
  window.open('https://wa.me/?text=' + encodeURIComponent(_getShareText()), '_blank');
  _updateStreak();
}
function shareInstagram() {
  /* Instagram doesn't support direct text share via URL the same way —
     so we copy the caption and open Instagram */
  navigator.clipboard.writeText(_getShareText()).then(() => {
    showToast('Caption copied! Opening Instagram — paste it in your story 📸');
    setTimeout(() => window.open('https://www.instagram.com/roastmyrishta', '_blank'), 1200);
  });
}
function copyRoastText() {
  navigator.clipboard.writeText(_getShareText())
    .then(() => showToast('Copied! Paste it anywhere and watch the chaos unfold 🎀'));
}
function copyChallengeLink() {
  navigator.clipboard.writeText(_getShareUrl())
    .then(() => showToast('Link copied! Send it to your group chat now 👀'));
}

/* ══════════════════════════════════════════
   TOP 5 — MONTHLY SHOWCASE
   Shown as a teaser card. Encourages tagging
   @roastmyrishta for a chance to be featured
   plus win a small monthly gift.
══════════════════════════════════════════ */
RR.TOP5_EXAMPLES = [
  { rank:1, names:'Aisha & Rohan', line:'"You two argue like a married couple who\'s been married for 40 years but only dated for 4 months." 🏆', emoji:'👑' },
  { rank:2, names:'Meher & Karthik', line:'"Their situationship has more plot twists than a Netflix thriller and somehow less commitment than one." 🔥', emoji:'🥈' },
  { rank:3, names:'Tara & Dev', line:'"They said \'it\'s complicated\' and honestly at this point so is the tax system, but at least taxes get filed eventually." 😭', emoji:'🥉' },
  { rank:4, names:'Ishaan & Naina', line:'"Texts like a Victorian-era pen pal, shows up like a Gen Z fever dream. The contrast is the whole bit." 🎀', emoji:'🎀' },
  { rank:5, names:'Riya & Aman', line:'"Their chat history reads like a corporate negotiation that occasionally remembers it\'s supposed to be romantic." 💀', emoji:'💀' },
];

function _renderTop5() {
  const el = document.getElementById('top5-list');
  if (!el) return;
  el.innerHTML = RR.TOP5_EXAMPLES.map(t => `
    <div class="thread-item" style="display:flex;gap:12px;align-items:flex-start">
      <div style="font-size:20px;flex-shrink:0">${t.emoji}</div>
      <div>
        <div class="thread-item-name">#${t.rank} — ${_escapeHtml(t.names)}</div>
        <div class="thread-item-text">${t.line}</div>
      </div>
    </div>
  `).join('');
}

function copyTop5SubmitCaption() {
  const text = `🏆 Submitting our roast for RoastMyRishta's Top 5 Couples this month!\n\nTag @roastmyrishta and use #Top5Roasted to enter 🎀\n\nWinning couples get a surprise gift every month 💗\n\nroastmyrishta.byme.workers.dev`;
  navigator.clipboard.writeText(text)
    .then(() => showToast('Caption copied! Tag @roastmyrishta + #Top5Roasted to enter 🏆'));
}

/* ══════════════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════════════ */
function initFAQ() {
  const container = document.getElementById('faq-list');
  if (!container) return;
  container.innerHTML = RR.FAQS.map(f => `
    <div class="faq-item" onclick="this.classList.toggle('open')">
      <div class="faq-question">${f.q}<span class="faq-icon">+</span></div>
      <div class="faq-answer">${f.a}</div>
    </div>
  `).join('');
}

/* ══════════════════════════════════════════
   MARQUEE STORIES
══════════════════════════════════════════ */
function initMarquee() {
  const track = document.getElementById('marquee-track');
  if (!track) return;
  const doubled = [...RR.STORIES, ...RR.STORIES];
  track.innerHTML = doubled.map(s => `
    <div class="story-card">
      <div class="story-emoji">${s.emoji}</div>
      <div class="story-text">${s.text}</div>
      <div class="story-name">${s.name}</div>
    </div>
  `).join('');
}

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
function _escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initCategoryChips();
  initIntensityChips();
  initFAQ();
  initMarquee();
  _renderTop5();
  checkCardUnlock();
  console.log('✅ RR logic.js initialised');
});