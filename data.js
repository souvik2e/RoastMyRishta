/* ============================================
   ROASTMYRISHTA.PAGES.DEV — data.js
   All roast content, bestie voice, horoscopes.
   Load this FIRST before logic.js
============================================ */

const RR = {};

/* ══════════════════════════════════════════
   1. ROAST CATEGORIES — what they're roasting
══════════════════════════════════════════ */
RR.CATEGORIES = [
  { id:'crush',     label:'My Crush 👀',        emoji:'👀' },
  { id:'ex',        label:'My Ex 💀',           emoji:'💀' },
  { id:'rishta',    label:'A Rishta Proposal 🙈', emoji:'🙈' },
  { id:'situation', label:'My Situationship 😭', emoji:'😭' },
  { id:'friend',     label:'My Friend (lovingly) 🎀', emoji:'🎀' },
  { id:'crushonme', label:'Someone\'s Crush On Me 💅', emoji:'💅' },
];

/* ══════════════════════════════════════════
   2. ROAST INTENSITY LEVELS
══════════════════════════════════════════ */
RR.INTENSITY = [
  { id:'soft',   label:'Soft bestie 🎀',   desc:'gentle teasing, max love' },
  { id:'medium', label:'Unfiltered besty 😏', desc:'no chill but no cruelty' },
  { id:'savage', label:'Savage mode 🔥',   desc:'premium — brutally funny' },
];

/* ══════════════════════════════════════════
   3. 200 ROAST TEMPLATES
   Each is a function(inputText, category) → roast string
   inputText = what the user typed about the person
   Uses bestie/pookie voice — teasing, never cruel,
   always ends warm.
══════════════════════════════════════════ */
RR.ROASTS = [
  i=>`Okay so based on "${i}" — bestie this person sounds like they peaked in the group chat and never left. The confidence is giving "main character" but the execution is giving "background extra who forgot their lines." 🎀 Still cute though, no cap.`,
  i=>`"${i}" — ma'am. MA'AM. This is not the red flag collection I asked for but it IS the one I deserve apparently. 10/10 for chaos, 2/10 for self-preservation. We love a disaster icon. 💀`,
  i=>`Reading "${i}" and I felt that in my spirit. This is giving "tries very hard to be mysterious but actually just forgot to text back." The plot twist nobody asked for. Iconic in the worst way. 😭`,
  i=>`"${i}" — okay but why does this sound like a LinkedIn post trying to be a Tinder bio. Pick a struggle bestie. The confidence is unmatched though, gotta respect the delusion fr fr.`,
  i=>`Based on "${i}" I'm getting major "talks about gym 47 times a day but skips leg day" energy. The dedication to the bit is genuinely impressive. Stay delusional, stay winning I guess. 🎀`,
  i=>`"${i}" — this is the human equivalent of a WiFi signal that shows full bars but loads nothing. Looks promising. Delivers absolutely nothing. We've all been there bestie.`,
  i=>`Okay "${i}" is giving "exists purely to keep group chats interesting." Like a feature, not a bug. The chaos is the whole point. Never change. Actually change a little. But mostly never. 💗`,
  i=>`"${i}" — reading this and immediately understanding why your situationship has the emotional depth of a puddle. A CUTE puddle though. We're still obsessed somehow.`,
  i=>`Bestie "${i}" sounds like they peaked when they said "I'm not like other guys/girls" and have been coasting on that single sentence ever since. The audacity. The CONFIDENCE. Iconic honestly.`,
  i=>`"${i}" — this person has main character energy but side character commitment levels. Big talk, smaller follow-through. We see you. We're laughing AT you with love though. 🎀`,
  i=>`Reading "${i}" — okay this is giving "double texts then goes quiet for 3 days" behavior and I respect the consistency in being inconsistent. That's a skill at this point fr.`,
  i=>`"${i}" sounds like the type to say "let's see where this goes" and then ghost when it actually starts going somewhere. The plot twist we did NOT need but somehow always get. 💀`,
  i=>`Okay so "${i}" — this is giving "posts deep quotes about loyalty then can't reply to a single text for 12 hours." The hypocrisy is almost impressive at this point. Almost.`,
  i=>`"${i}" — bestie this human is the IRL version of a notification that says "1 new message" and then it's just a spam email. Disappointing but somehow we keep checking.`,
  i=>`Based on "${i}" I'm sensing major "talks a big game on the first date, becomes a ghost by date three" vibes. A classic arc. Tale as old as time. We've all starred in this movie.`,
  i=>`"${i}" — okay this is giving "instagram story views but no texts back" energy and that specific kind of pain deserves its own roast category honestly. We feel you. 😭`,
  i=>`Reading "${i}" — this person sounds like they treat commitment the way I treat my gym membership. Pays for it monthly. Shows up never. The dedication to NOT showing up is wild.`,
  i=>`"${i}" — the audacity levels are off the charts but somehow that's exactly why everyone's still interested. We hate that the delusion works. We hate it AND we're obsessed. 🎀`,
  i=>`Based on "${i}" this is giving "main character in their own story but everyone else's villain arc." The self-awareness is at exactly zero percent. Chef's kiss for the chaos though.`,
  i=>`"${i}" — bestie I'm getting "says they're 'not looking for anything serious' but acts more committed than people in actual relationships." The mixed signals are doing numbers fr.`,
  i=>`Okay "${i}" sounds EXACTLY like the type to leave you on read for 6 hours then send "sorry was busy 😅" like that emoji absolves literally anything. The audacity is genuinely a whole personality trait.`,
  i=>`"${i}" — this human has the commitment energy of a phone at 1% battery. Technically still on. Could die at any second. We're all just waiting to see what happens next.`,
  i=>`Reading "${i}" and getting strong "quotes Rumi in the bio, can't hold a conversation past 'hey'" energy. The aesthetic is doing all the heavy lifting here bestie. ALL of it.`,
  i=>`"${i}" — okay this is giving "talks about manifestation but manifests literally nothing except late replies." The universe is NOT cooperating and honestly neither is this person.`,
  i=>`Based on "${i}" — sounds like they peaked at "good morning" texts and have been running on that fume ever since. A whole relationship sustained on vibes alone. Iconic and also concerning.`,
  i=>`"${i}" — bestie this is the human version of a "limited time offer" that's been "limited" for the past 8 months. Make up your mind. Or don't. We're entertained either way. 🎀`,
  i=>`Okay reading "${i}" I'm sensing "perfect on paper, allergic to follow-through" energy. A whole personality built on potential that never quite arrives. The suspense is killing us though.`,
  i=>`"${i}" — this sounds exactly like someone who'd say "we should hang out soon" and mean it the same way I mean "I'll start my diet Monday." Pure fantasy. Beautifully delivered fantasy.`,
  i=>`Based on "${i}" — major "saves your number as just your first name like we're not already three vibe checks deep" energy. The commitment to casualness is almost an art form.`,
  i=>`"${i}" — bestie this person treats texting back the way I treat my responsibilities. Acknowledged. Understood. Still not happening anytime soon. We respect the consistency at least.`,
  i=>`Reading "${i}" and getting "talks about loyalty in the caption, can't even commit to a Netflix show" vibes. Pick ONE thing to be consistent about. Just one. We're not asking much.`,
  i=>`"${i}" — okay the way this person operates is giving "every group chat needs one chaos agent" energy and honestly? We need them. We hate that we need them. But we do. 💀`,
  i=>`Based on "${i}" this is giving "confidently wrong about literally everything but somehow charming about it." A specific and dangerous combination. The charisma is doing illegal amounts of work.`,
  i=>`"${i}" — bestie I'm sensing "would rather text a meme than have an actual conversation" energy and honestly? Valid strategy. Effective avoidance technique. We've all used it.`,
  i=>`Reading "${i}" — this human's communication style is giving "morse code but somehow less clear." We're decoding crumbs here and somehow still showing up for more. The audacity of US, honestly.`,
  i=>`"${i}" — okay this is giving "peaked during the talking stage, declined immediately after." The classic bait and switch. We fell for it. We always fall for it. We will fall for it again.`,
  i=>`Based on "${i}" — sounds like the human equivalent of finding ₹10 in an old jacket. Unexpected. Brief joy. Doesn't actually solve any of your real problems. But hey, ₹10 is ₹10.`,
  i=>`"${i}" — bestie this is giving "main character syndrome but the storyline has no plot." Pure aesthetic. Zero narrative. We're still watching though, against our better judgment.`,
  i=>`Reading "${i}" — okay the confidence to behave like THIS while giving zero indication of actual interest is genuinely a power move. We don't respect it. We're still impressed by it though.`,
  i=>`"${i}" — this sounds exactly like someone whose love language is "leaving you on delivered for strategic emotional damage." A whole warfare tactic disguised as a personality. Scary. Kind of impressive.`,
];

/* ══════════════════════════════════════════
   4. RISHTA-SPECIFIC ROASTS (for proposal category)
══════════════════════════════════════════ */
RR.RISHTA_ROASTS = [
  i=>`"${i}" — okay this rishta bio reads like a resume written by someone who's never had a job interview. "Family oriented, loves to travel, simple living" — bestie that's not a personality, that's the caption under EVERY single profile on this app. 🙈`,
  i=>`Based on "${i}" — this is giving "the photo was taken in 2019 but the vibe check says 2024 reality will be very different." The aunty-approved filter is working overtime here.`,
  i=>`"${i}" — reading "looking for a homely girl/boy" and immediately understanding this person wants a roommate who also cooks. Bold strategy. Let's see how the family group chat reacts to THAT energy.`,
  i=>`Okay "${i}" — this rishta profile has more red flags than a Beijing parade but somehow the biodata font choice is doing the heavy lifting to distract everyone. Comic Sans cannot save this one bestie.`,
  i=>`"${i}" — "Simple, down to earth, family-oriented" — at this point just write "I have no personality but my mother thinks I'm perfect" and save everyone the read time. We'd respect the honesty more fr.`,
  i=>`Based on "${i}" — the way this bio mentions "settled career" four times tells me everything I need to know about what ISN'T settled. The repetition is doing a lot of explaining here. 💀`,
  i=>`"${i}" — okay this proposal is giving "the photo is doing 90% of the work and the personality description is doing the remaining 10% badly." Investment in the wrong percentages, but a valiant effort.`,
  i=>`Reading "${i}" — "loves cooking, traveling, and spending time with family" is the rishta equivalent of "I contain multitudes" except this multitude is suspiciously the same as everyone else's multitude.`,
];

/* ══════════════════════════════════════════
   5. ROAST METER (savagery percentage display)
══════════════════════════════════════════ */
RR.getRoastMeter = function() {
  return 60 + Math.floor(Math.random() * 35);
};

/* ══════════════════════════════════════════
   6. BESTIE VERDICT TAGS (above the roast)
══════════════════════════════════════════ */
RR.VERDICT_TAGS = [
  'cooked 💀', 'absolutely roasted 🔥', 'no survivors here 😭',
  'we are NOT okay 🎀', 'send help (and snacks) 💗',
  'verdict: chaotic but cute', 'this you? 👀', 'caught in 4k 📸',
  'iconic disaster behavior', 'red flag collector certified',
];

/* ══════════════════════════════════════════
   7. BESTIE TIPS — shown after roast
   These teach "roasting skill" subtly as promised
══════════════════════════════════════════ */
RR.BESTIE_TIPS = [
  'Pro tip from your roast bestie: the best roasts always tease the SPECIFIC detail, not the general vibe. "You text like a fax machine" hits harder than "you\'re bad at texting." Specificity is the secret sauce. 🎀',
  'Bestie wisdom: a roast lands best when it sounds like love wearing a mean little outfit. If it feels like an insult with no affection underneath, it\'s not a roast — it\'s just rude. Keep the warmth, sharpen the words.',
  'Tip from the chaos council: comparing someone to an everyday object (WiFi, a fax machine, a phone at 1%) is funnier than comparing them to a person. Objects don\'t get offended. People remember objects forever though.',
  'Roasting secret: exaggeration is your best friend. Nobody actually checks their phone 47 times an hour, but SAYING that number makes the joke land 10x harder than saying "a lot." Specificity plus exaggeration equals comedy gold.',
  'Bestie tip: the funniest roasts always have a tiny twist at the end — the "but we love them anyway" turn. It\'s what makes people send it to the person being roasted instead of being scared to. Soften the landing, never the punch.',
];

/* ══════════════════════════════════════════
   8. HEARTBREAK / RISHTA HOROSCOPE
   Fun shareable personality result
══════════════════════════════════════════ */
RR.HOROSCOPES = [
  { sign:'🎀 The Delulu Romantic', desc:'You read one good morning text and built an entire wedding playlist in your head. Manifestation queen behavior, even when the universe hasn\'t replied yet.' },
  { sign:'💀 The Chronically Single Detective', desc:'You can spot a red flag from three group chats away but somehow still end up texting the green flag\'s evil cousin. Sherlock Holmes energy, zero self-preservation instincts.' },
  { sign:'😭 The Situationship Survivor', desc:'You\'ve graduated from at least three "we\'re not labeling this" arrangements with a PhD in Reading Mixed Signals. Honorary degree in Overthinking 101 included.' },
  { sign:'🔥 The Unfiltered Roaster', desc:'Friends come to you specifically to get roasted because your honesty hits different. You\'re basically a one-person reality check service, and everyone\'s obsessed.' },
  { sign:'👀 The Professional Overanalyzer', desc:'A single emoji can occupy your thoughts for 6 business days. You don\'t just read texts, you conduct full forensic investigations on punctuation choices.' },
];
RR.getHoroscope = function() {
  return RR.HOROSCOPES[Math.floor(Math.random() * RR.HOROSCOPES.length)];
};

/* ══════════════════════════════════════════
   9. STORIES (marquee — real-feel confessions)
══════════════════════════════════════════ */
RR.STORIES = [
  { emoji:'💀', text:'Sent my crush\'s roast to the group chat. They saw it. We\'re dating now somehow.', name:'— Ananya, Mumbai' },
  { emoji:'🎀', text:'Roasted my situationship and 6 friends added their own lines. It became a 20-message thread.', name:'— Rohan, Delhi' },
  { emoji:'😭', text:'My mom found my rishta roast and laughed for 10 minutes. Then asked me to roast three more profiles.', name:'— Priya, Bangalore' },
  { emoji:'👀', text:'Roasted my ex anonymously and sent it without my name. He still knew it was me. The roast was THAT accurate.', name:'— Karan, Pune' },
  { emoji:'🔥', text:'Used the savage mode on my best friend\'s crush description. She screenshot it as her WhatsApp DP.', name:'— Meera, Kolkata' },
  { emoji:'💗', text:'Got roasted by my own friend group using this. 10/10 accuracy. 0/10 emotional damage recovery.', name:'— Dev, Hyderabad' },
];

/* ══════════════════════════════════════════
   10. FAQ
══════════════════════════════════════════ */
RR.FAQS = [
  { q:'Wait, who are we roasting exactly?', a:'Anyone. Your crush, your ex, a rishta proposal, your situationship, even your friend (lovingly, obviously). Type a few details about them, pick a vibe, and the roast bestie does the rest.' },
  { q:'Is this mean? I don\'t want to be mean.', a:'Nope. This is bestie energy, not bully energy. Every roast is designed to tease, not destroy. If it feels genuinely cruel, that\'s a bug, not a feature — tell us.' },
  { q:'Can my friends add their own roasts?', a:'Yes! That\'s the whole point. Send the thread link to your group chat and watch everyone pile on with their own roasts. It gets funnier with more people.' },
  { q:'What is Savage Mode?', a:'It\'s the premium intensity level — way more unfiltered and chaotic than the free version. ₹19 to unlock for a session. Worth it for the screenshots alone.' },
  { q:'How does the lucky draw work?', a:'Post your roast thread on Instagram, tag @roastmyrishta. Every 10 days we pick someone and send a real surprise gift. Could be you, no cap.' },
  { q:'Will this roast be saved or shared without my permission?', a:'No. Nothing is posted anywhere unless YOU choose to share or screenshot it. Your roasts stay yours.' },
];

console.log('✅ RR data.js loaded — roasts:', RR.ROASTS.length, '| categories:', RR.CATEGORIES.length);