/* ========= CONFIGURATION — edit these ========= */
const HER_NAME   = "Paro";
const YOUR_NAME  = "Yours Sweet Heart 💖";
const START_DATE = "2026-09-18T00:00:00";   // when your story began
const MUSIC_FILE = "Apna Bana Le - Full Audio Bhediya Varun Dhawan, Kriti Sanon Sachin-Jigar,Arijit Singh,Amitabh B.mp3";                       // e.g. "music.mp3" (leave empty for none)
const REASONS = [
  "My silly jokes. Yes, even the bad ones. 🧡",
  "You make even boring days feel like a celebration.",
  "The way your eyes light up over tiny things.",
  "You make me want to become a better version of myself. 💕",
  "Your hugs somehow make everything feel okay. 🫶",
  "I love how you turn ordinary moments into favourite memories.",
  "You are my favourite notification. 📱💕",
  "Because life is simply sweeter with you in it. 🍓",
  "You make my heart feel at home. 🏡💗"
];
const LETTER_TEXT = `My dearest,

I tried to write you a perfect letter, but my heart kept getting in the way. So I built you a website instead. Thank you for laughing at my jokes, for your hugs, and for making every little moment feel special.

Wherever we go, I hope you're always right there with me, holding my hand.

Forever yours,
${YOUR_NAME}`;
const PROPOSAL_TEXT = { title:"Will you be mine, always? 🥺", sub:"Think carefully, cutie 🧡",
  final:"You just made me the happiest person alive. I love you to the moon and back! 💕" };
/* ============================================== */

const $ = id => document.getElementById(id);
$('hello').textContent = "hello, my favourite person 🌷";
$('her').textContent = HER_NAME;
$('intro').textContent = "I can't sing or dance, so I built you a website instead. Every little thing here is made with love.";
$('letter').textContent = LETTER_TEXT;
$('q').textContent = PROPOSAL_TEXT.title;
$('qsub').textContent = PROPOSAL_TEXT.sub;
$('final').textContent = PROPOSAL_TEXT.final;
$('foot').textContent = `Made with love by ${YOUR_NAME} 💕`;
document.title = `For ${HER_NAME} 💕`;

/* counter */
const start = new Date(START_DATE).getTime();
function tick(){
  let t = Math.max(0, Math.floor((Date.now()-start)/1000));
  $('d').textContent = Math.floor(t/86400);
  $('h').textContent = Math.floor(t%86400/3600);
  $('m').textContent = Math.floor(t%3600/60);
  $('s').textContent = t%60;
}
tick(); setInterval(tick,1000);

/* hearts: x%, y%, size px, emoji */
const P="💗", O="🧡", PK="💖";
const HEARTS = [
 [8,12,20,O],[22,8,28,PK],[40,4,18,O],[58,10,22,O],[78,6,20,O],[90,16,24,PK],
 [14,34,18,O],[34,28,22,PK],[55,30,26,P],[72,38,20,O],[88,46,22,PK],
 [6,56,22,PK],[26,50,18,O],[46,52,20,O],[64,60,28,PK],[84,66,18,O],
 [14,78,20,O],[34,82,24,P],[52,76,18,O],[70,86,22,O],[90,84,20,O],[24,66,20,PK]
];
const sky = $('sky'), reason = $('reason');
HEARTS.forEach(([x,y,s,e],i)=>{
  const b = document.createElement('button');
  b.className='heart'; b.setAttribute('aria-label','Heart '+(i+1));
  b.style.cssText=`left:${x}%;top:${y}%;font-size:${s}px;--d:${5+(i%5)}s;--dl:${-(i*.7)}s`;
  b.innerHTML=`<i>${e}</i>`;
  b.onclick=()=>{
    b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
    const r=document.createElement('span'); r.className='ring';
    r.style.cssText=`left:calc(${x}% - 22px);top:calc(${y}% - 22px);width:${s+30}px;height:${s+30}px;margin:-4px`;
    sky.appendChild(r); setTimeout(()=>r.remove(),700);
    reason.style.opacity=0;
    setTimeout(()=>{reason.textContent=REASONS[i%REASONS.length];reason.classList.remove('dim');reason.style.opacity=1},150);
  };
  sky.appendChild(b);
});

/* music */
const audio=$('audio'), mbtn=$('music'); let started=false;
if(MUSIC_FILE) audio.src=MUSIC_FILE;
function setUI(){mbtn.textContent=(MUSIC_FILE&&!audio.paused)?'🔊':'🔇';mbtn.classList.toggle('on',MUSIC_FILE&&!audio.paused)}
function startMusic(){ if(started||!MUSIC_FILE) return; started=true; audio.play().then(setUI).catch(()=>{started=false}); }
document.addEventListener('pointerdown',startMusic,{once:false});
mbtn.onclick=e=>{ e.stopPropagation(); if(!MUSIC_FILE) return;
  if(audio.paused){audio.play().then(setUI).catch(()=>{})} else {audio.pause();setUI()} };

/* no button: playful dodge, stays inside the button row */
const no=$('no'), btns=$('btns');
function dodge(e){
  if(e) e.preventDefault();
  const w=btns.clientWidth, nb=no.getBoundingClientRect(), bb=btns.getBoundingClientRect();
  const maxX=Math.max(0,w/2-nb.width/2-4), maxY=btns.clientHeight-nb.height;
  const nx=(Math.random()*2-1)*maxX;
  const ny=Math.random()*maxY;
  no.style.transform=`translate(${nx}px,${ny}px)`;
}
no.addEventListener('mouseenter',dodge);
no.addEventListener('touchstart',dodge,{passive:false});
no.addEventListener('click',dodge);

/* celebration */
const cele=$('cele');
const EMO=["💗","💖","❤️","🧡","💛","🌷","🌸","💕","✨","💝","🩷"];
function burst(n,fromBottom){
  const W=innerWidth,H=innerHeight;
  for(let i=0;i<n;i++){
    const el=document.createElement('span'); el.className='p';
    el.textContent=EMO[Math.floor(Math.random()*EMO.length)];
    const size=14+Math.random()*44;
    const x0=Math.random()*W;
    const up=fromBottom;
    el.style.left=x0+'px';
    el.style.top=(up?H-10:-40)+'px';
    el.style.fontSize=size+'px';
    el.style.setProperty('--x',((Math.random()-.5)*160)+'px');
    el.style.setProperty('--y',(up?-(H*(.35+Math.random()*.75)):(H*(.35+Math.random()*.75)))+'px');
    el.style.setProperty('--r',((Math.random()-.5)*540)+'deg');
    el.style.setProperty('--t',(2.4+Math.random()*3)+'s');
    el.style.setProperty('--dl',(Math.random()*1.6)+'s');
    el.style.setProperty('--end',Math.random()<.5?'.9':'0');
    cele.appendChild(el);
    setTimeout(()=>el.remove(),7500);
  }
}
let said=false;
$('yes').onclick=()=>{
  burst(90,true); burst(60,false);
  if(!said){ said=true; $('final').classList.add('show'); $('hint').style.display='block';
    $('btns').style.height='auto'; no.style.display='none';
    setTimeout(()=>$('final').scrollIntoView({behavior:'smooth',block:'center'}),150); }
};
document.addEventListener('pointerdown',e=>{
  if(said && !e.target.closest('#music')){ burst(30,true); }
});
