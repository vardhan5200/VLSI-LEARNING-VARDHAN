(()=>{'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const key='vardhan-vlsi-learning-v1';
let state={ready:[],checks:{},theme:'light'},storage=true;
try {const saved=JSON.parse(localStorage.getItem(key)||'null');if(saved&&typeof saved==='object'){state.ready=Array.isArray(saved.ready)?saved.ready.filter(x=>typeof x==='string'):[];state.checks=saved.checks&&typeof saved.checks==='object'?saved.checks:{};state.theme=saved.theme==='dark'?'dark':'light';}}catch{storage=false;}
const save=()=>{try{localStorage.setItem(key,JSON.stringify(state));}catch{storage=false;$('#storage-note').hidden=false;}};
$('#storage-note').hidden=storage;
function theme(){document.body.classList.toggle('dark',state.theme==='dark');$('#theme').textContent=state.theme==='dark'?'Light mode':'Dark mode';}
function progress(){const valid=$$('.complete').map(x=>x.dataset.complete);const count=valid.filter(x=>state.ready.includes(x)).length;$('#progress-count').textContent=count+' / 13 ready';$('#progress').value=count;$$('.complete').forEach(b=>{const ready=state.ready.includes(b.dataset.complete);b.textContent=ready?'✓ Chapter ready · Undo':'Mark chapter ready';b.setAttribute('aria-pressed',String(ready));});$$('nav a').forEach(a=>a.querySelector('.nav-check').textContent=state.ready.includes(a.dataset.page)?'✓':'');}
$$('.page input[type=checkbox]').forEach((box,i)=>{box.disabled=false;box.dataset.check=String(i);box.checked=!!state.checks[i];const label=box.closest('li')?.textContent.trim()||'Readiness item';box.setAttribute('aria-label',label);box.addEventListener('change',()=>{state.checks[i]=box.checked;save();});});
$$('.complete').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.complete;state.ready=state.ready.includes(id)?state.ready.filter(x=>x!==id):[...state.ready,id];save();progress();}));
let first=true;
function navigate(){let target=location.hash.slice(1)||'chapter-00';const answers=target.endsWith('-answers');let page=document.getElementById(answers?target.replace(/-answers$/,''):target);if(!page?.classList.contains('page'))page=$('#chapter-00');$$('.page').forEach(p=>p.hidden=p!==page);$$('nav a').forEach(a=>{if(a.dataset.page===page.id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});document.title=page.querySelector('h1').textContent+' — VLSI Learning Vardhan';document.body.classList.remove('nav-open');$('#menu').setAttribute('aria-expanded','false');if(answers){const detail=document.getElementById(target);if(detail){detail.open=true;detail.scrollIntoView();}}else{window.scrollTo(0,0);if(!first)page.querySelector('h1').focus({preventScroll:true});}first=false;}
$('#search').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();let count=0;$$('nav a').forEach(a=>{const page=document.getElementById(a.dataset.page);const match=!q||page.textContent.toLowerCase().includes(q);a.hidden=!match;if(match)count++;});$('#search-status').textContent=q?(count?count+' matching lessons/resources':'No matches. Try another concept.') : '';});
$('#menu').addEventListener('click',()=>{const open=document.body.classList.toggle('nav-open');$('#menu').setAttribute('aria-expanded',String(open));});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.body.classList.remove('nav-open');$('#menu').setAttribute('aria-expanded','false');}});
$('#theme').addEventListener('click',()=>{state.theme=state.theme==='dark'?'light':'dark';theme();save();});
$('#print').addEventListener('click',()=>window.print());
window.addEventListener('hashchange',navigate);theme();progress();navigate();
})();
