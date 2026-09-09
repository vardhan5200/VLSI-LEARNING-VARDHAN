import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let marked;
try { ({marked} = await import('marked')); }
catch { ({marked} = await import('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/marked/lib/marked.esm.js')); }
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const chapterFiles = fs.readdirSync(path.join(root,'chapters')).filter(x=>x.endsWith('.md')).sort();
const extraFiles=['labs/README.md','projects/README.md','resources/GLOSSARY.md','resources/TOOLS.md','resources/COURSE-MAP.md','templates/EXERCISE-REVIEW.md','templates/LECTURE-NOTE.md','PUBLISH.md','PROGRESS.md'];
const sources=[...chapterFiles.map(x=>'chapters/'+x),...extraFiles];
const ids=Object.fromEntries(sources.map((f,i)=>[f,i<13?'chapter-'+String(i).padStart(2,'0'):'resource-'+(i-13)]));
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function render(source,file){
 let html=marked.parse(source,{gfm:true});
 html=html.replace(/href="([^"]+)"/g,(all,href)=>{
  if (/^(https?:|mailto:|#)/.test(href)) return all;
  const dest=path.posix.normalize(path.posix.join(path.posix.dirname(file),href));
  if(ids[dest])return 'href="#'+ids[dest]+'"';
  if(dest.startsWith('solutions/'))return 'href="#chapter-'+path.basename(dest,'.md')+'-answers"';
  if(dest==='README.md')return 'href="#chapter-00"';
  return 'href="https://github.com/vardhan5200/VLSI-LEARNING-VARDHAN/blob/main/'+esc(dest)+'" target="_blank" rel="noopener"';
 });
 return html.replace(/<table>/g,'<div class="table-scroll" tabindex="0"><table>').replace(/<\/table>/g,'</table></div>');
}
const docs=sources.map((file,i)=>{
 let source=fs.readFileSync(path.join(root,file),'utf8');
 const title=source.split('\n')[0].replace(/^# /,'').replace(/^Chapter \d+ — /,'');
 source=source.replace(/^# .+\n/,'').replace(/^\[Course home\].+\n/m,'').replace(/^> Original course companion.+\n/m,'').replace(/^\[Home\].+\n/m,'');
 let content=render(source,file);
 if(i<13){
  let sol=fs.readFileSync(path.join(root,'solutions',String(i).padStart(2,'0')+'.md'),'utf8').replace(/^# .+\n/,'').replace(/^\[Return to the exercises\].+\n/m,'');
  content+='<details class="answers" id="'+ids[file]+'-answers"><summary>Check your answers <span>Open after your attempt</span></summary><div>'+render(sol,'solutions/'+String(i).padStart(2,'0')+'.md')+'</div></details>';
 } else if(file==='labs/README.md'){
  for(const code of ['rtl/counter.v','tb/counter_tb.v','synth.ys'])content+='<details class="answers"><summary>'+esc(code)+'</summary><pre><code>'+esc(fs.readFileSync(path.join(root,'labs',code),'utf8'))+'</code></pre></details>';
 }
 return {id:ids[file],title,file,content,chapter:i<13,index:i,words:source.split(/\s+/).length};
});
const nav=docs.map(d=>`<a href="#${d.id}" data-page="${d.id}"><span class="number">${d.chapter?String(d.index).padStart(2,'0'):'↳'}</span><span>${esc(d.title)}</span><span class="nav-check" aria-hidden="true"></span></a>`).join('');
const pages=docs.map(d=>`<article id="${d.id}" class="page" ${d.index?'hidden':''}><div class="eyebrow">${d.chapter?'CHAPTER '+String(d.index).padStart(2,'0')+' / 12':'LEARNING RESOURCES'} <span>• ${Math.max(2,Math.ceil(d.words/180))} min read + practice</span></div><h1 tabindex="-1">${esc(d.title)}</h1>${d.chapter?'<div class="learning-path"><span>Understand</span><b>→</b><span>Work it out</span><b>→</b><span>Explain why</span></div>':''}<div class="prose">${d.content}</div>${d.chapter?`<div class="finish"><div><strong>Can you explain this without your notes?</strong><p>Complete the exercises before marking this chapter ready.</p></div><button class="complete" data-complete="${d.id}">Mark chapter ready</button></div>`:''}<div class="page-nav">${d.index>0?`<a href="#${docs[d.index-1].id}">← Previous</a>`:'<span></span>'}${d.index<docs.length-1?`<a href="#${docs[d.index+1].id}">Next: ${esc(docs[d.index+1].title)} →</a>`:''}</div></article>`).join('');
const css=fs.readFileSync(path.join(root,'tools/learning.css'),'utf8');
const js=fs.readFileSync(path.join(root,'tools/learning.js'),'utf8');
fs.writeFileSync(path.join(root,'index.html'),`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Vardhan's VLSI learning notebook: 13 chapters from digital foundations to RTL, verification, timing and physical design, with exercises and solutions."><title>VLSI Learning — Vardhan</title><style>${css}</style></head><body>
<a class="skip" href="#main">Skip to lesson</a>
<header class="topbar"><button id="menu" aria-label="Toggle chapter navigation" aria-expanded="false" aria-controls="sidebar">☰</button><a class="brand" href="#chapter-00"><span class="brand-icon">V</span><span>VLSI LEARNING <small>VARDHAN</small></span></a><div class="top-actions"><button id="theme" aria-label="Switch color theme">Dark mode</button><button id="print">Print lesson</button></div></header>
<aside id="sidebar"><div class="sidebar-intro"><span class="eyebrow">YOUR LEARNING PATH</span><h2>From logic to layout.</h2><label for="search">Find a chapter or concept</label><input id="search" type="search" placeholder="Try setup, Verilog, power…" autocomplete="off"><p id="search-status" aria-live="polite"></p><div class="progress-label"><strong id="progress-count">0 / 13 ready</strong><span>At your pace</span></div><progress id="progress" max="13" value="0">0 of 13</progress></div><nav aria-label="Chapters and resources">${nav}</nav><div class="sidebar-note"><strong>Read → solve → review</strong><p>Progress stays in this browser. It does not sync to GitHub.</p><a href="https://www.youtube.com/playlist?list=PL4PtpyzWn6WbpzsiququkQV8Wqa_LzaqR" target="_blank" rel="noopener">Watch the NPTEL playlist ↗</a></div></aside>
<main id="main"><div class="course-note">COURSE COMPANION <span>Original explanations aligned with NPTEL's RTL-to-GDS syllabus; not lecture transcripts.</span></div><div id="storage-note" hidden role="status">Browser storage is unavailable. Your progress will last for this session only.</div>${pages}<footer>VLSI LEARNING VARDHAN · Understand the circuit. Show your reasoning.<br><a href="https://github.com/vardhan5200/VLSI-LEARNING-VARDHAN">Repository & source notes ↗</a></footer></main><noscript><style>.page[hidden]{display:block}#sidebar{position:static;width:auto}main{margin-left:0}.topbar{position:static}</style><p>JavaScript is off: all lessons are shown below. Progress tracking requires JavaScript.</p></noscript><script>${js}</script></body></html>`);
console.log('Built standalone index.html with '+docs.length+' learning views and 13 solution panels.');
