/* ============================================
   ROASTMYRISHTA.PAGES.DEV — cert.js
   Builds the shareable "Roast Card" — the
   screenshot-worthy visual people post.
   Requires: data.js loaded first.
============================================ */

RR.CARD_STYLES = [
  { bg:'#FFD9C2', border:'#2D2438', accent:'#FF6FA0', tag:'Peach Fizz' },
  { bg:'#E8D9F5', border:'#2D2438', accent:'#9B59B6', tag:'Lavender Haze' },
  { bg:'#FFE8A3', border:'#2D2438', accent:'#E8862E', tag:'Butter Pop' },
  { bg:'#FFC9DB', border:'#2D2438', accent:'#D6336C', tag:'Bubblegum' },
  { bg:'#B8F2D4', border:'#2D2438', accent:'#0F9D6B', tag:'Mint Bestie' },
  { bg:'#FFDDD2', border:'#2D2438', accent:'#FF6FA0', tag:'Soft Coral' },
  { bg:'#E0E7FF', border:'#2D2438', accent:'#6366F1', tag:'Cloud Dream' },
  { bg:'#FFF0B8', border:'#2D2438', accent:'#D4A017', tag:'Golden Hour' },
];

function buildRoastCard(roastText, category, meter, cardIdx) {
  const s = RR.CARD_STYLES[cardIdx % RR.CARD_STYLES.length];
  const cat = RR.CATEGORIES.find(c => c.id === category) || RR.CATEGORIES[0];
  const tag = RR.VERDICT_TAGS[cardIdx % RR.VERDICT_TAGS.length];
  const shortRoast = roastText.length > 180 ? roastText.slice(0, 177) + '...' : roastText;

  return `
  <div style="background:${s.bg}; border:3px solid ${s.border}; border-radius:28px; padding:28px 24px; text-align:center; position:relative; box-shadow:6px 6px 0 ${s.border}; font-family:'Quicksand',sans-serif;">

    <div style="font-family:'Caveat',cursive; font-size:22px; font-weight:700; color:${s.accent}; transform:rotate(-2deg); margin-bottom:4px;">
      RoastMyRishta ✦ ${s.tag}
    </div>

    <div style="display:inline-block; background:${s.border}; color:white; font-family:'Baloo 2',sans-serif; font-weight:700; font-size:11px; padding:5px 14px; border-radius:100px; margin-bottom:16px;">
      ${cat.emoji} ${cat.label} · ${tag}
    </div>

    <div style="font-family:'Baloo 2',sans-serif; font-size:18px; font-weight:600; color:${s.border}; line-height:1.5; margin-bottom:18px; padding:0 6px;">
      "${_escapeHtml(shortRoast)}"
    </div>

    <div style="background:rgba(255,255,255,0.5); border-radius:14px; padding:10px 16px; margin-bottom:16px;">
      <div style="font-family:'Quicksand',sans-serif; font-weight:700; font-size:11px; color:${s.border}; opacity:0.7; margin-bottom:6px;">SAVAGERY LEVEL: ${meter}%</div>
      <div style="height:10px; background:white; border:2px solid ${s.border}; border-radius:100px; overflow:hidden;">
        <div style="height:100%; width:${meter}%; background:linear-gradient(90deg, ${s.accent}, ${s.border}); border-radius:100px;"></div>
      </div>
    </div>

    <div style="font-size:26px; margin-bottom:8px;">🎀</div>

    <div style="font-family:'Quicksand',sans-serif; font-weight:700; font-size:10px; color:${s.border}; opacity:0.4; letter-spacing:0.05em;">
      ROASTMYRISHTA.PAGES.DEV · TAG @ROASTMYRISHTA
    </div>
  </div>`;
}

function _escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

console.log('✅ RR cert.js loaded — card styles:', RR.CARD_STYLES.length);