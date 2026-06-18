// Simple resume maker logic
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

function el(tag, attrs={}, children=[]) { const e=document.createElement(tag); for(let k in attrs){ if(k==='class') e.className=attrs[k]; else if(k==='text') e.textContent=attrs[k]; else e.setAttribute(k,attrs[k]); } (Array.isArray(children)?children:[children]).forEach(c=>{ if(typeof c==='string') e.appendChild(document.createTextNode(c)); else if(c) e.appendChild(c); }); return e }

const state = { skills: [], exp: [], edu: [] };

function renderPreview(){
  const p = $('#resumePreview');
  p.innerHTML = '';
  const name = $('#name').value || 'Your Name';
  const title = $('#title').value || '';
  const contact = $('#contact').value || '';
  const summary = $('#summary').value || '';

  p.appendChild(el('div',{class:'res-name',text:name}));
  if(title) p.appendChild(el('div',{class:'res-title',text:title}));
  if(contact) p.appendChild(el('div',{class:'small',text:contact}));

  if(summary){
    const sec = el('div',{class:'section'});
    sec.appendChild(el('div',{class:'sec-title',text:'Summary'}));
    sec.appendChild(el('div',{text:summary}));
    p.appendChild(sec);
  }

  if(state.skills.length){
    const sec = el('div',{class:'section'});
    sec.appendChild(el('div',{class:'sec-title',text:'Skills'}));
    const wrap = el('div',{class:'skills-list'});
    state.skills.forEach(s=>wrap.appendChild(el('div',{class:'skill-pill',text:s})))
    sec.appendChild(wrap); p.appendChild(sec);
  }

  if(state.exp.length){
    const sec = el('div',{class:'section'});
    sec.appendChild(el('div',{class:'sec-title',text:'Experience'}));
    state.exp.forEach(e=>{
      const ent = el('div',{class:'exp-entry'});
      const h = el('div',{class:'exp-header'});
      h.appendChild(el('div',{class:'exp-role',text:e.role}));
      h.appendChild(el('div',{class:'small',text:e.dates}));
      ent.appendChild(h);
      if(e.company) ent.appendChild(el('div',{class:'small',text:e.company + (e.location? ' — '+e.location : '')}));
      if(e.desc) ent.appendChild(el('div',{text:e.desc}));
      sec.appendChild(ent);
    })
    p.appendChild(sec);
  }

  if(state.edu.length){
    const sec = el('div',{class:'section'});
    sec.appendChild(el('div',{class:'sec-title',text:'Education'}));
    state.edu.forEach(e=>{
      const ent = el('div',{class:'exp-entry'});
      const h = el('div',{class:'exp-header'});
      h.appendChild(el('div',{class:'exp-role',text:e.degree}));
      h.appendChild(el('div',{class:'small',text:e.dates}));
      ent.appendChild(h);
      if(e.school) ent.appendChild(el('div',{class:'small',text:e.school + (e.city? ' — '+e.city : '')}));
      if(e.note) ent.appendChild(el('div',{text:e.note}));
      sec.appendChild(ent);
    })
    p.appendChild(sec);
  }
}

function bind() {
  ['name','title','contact','summary'].forEach(id=>{ $('#'+id).addEventListener('input', renderPreview) });

  $('#addSkill').addEventListener('click', ()=>{
    const v = $('#skillInput').value.trim(); if(!v) return; state.skills.push(v); $('#skillInput').value=''; renderSkillsEditor(); renderPreview();
  });

  $('#addExp').addEventListener('click', ()=>{ addExpEditor(); });
  $('#addEdu').addEventListener('click', ()=>{ addEduEditor(); });

  $('#saveBtn').addEventListener('click', ()=>{ localStorage.setItem('resume_data', JSON.stringify({state, form:collectForm()})); alert('Saved locally'); });
  $('#loadBtn').addEventListener('click', ()=>{ const raw = localStorage.getItem('resume_data'); if(!raw){ alert('No saved data'); return } const data=JSON.parse(raw); state.skills=data.state.skills||[]; state.exp=data.state.exp||[]; state.edu=data.state.edu||[]; setForm(data.form||{}); renderSkillsEditor(); renderEditors(); renderPreview(); });

  $('#exportPdf').addEventListener('click', ()=>{
    const el = document.getElementById('resumePreview');
    html2pdf().set({jsPDF:{unit:'mm',format:'a4',orientation:'portrait'}}).from(el).save('resume.pdf');
  });

  $('#resetBtn').addEventListener('click', ()=>{ if(!confirm('Clear all fields?')) return; localStorage.removeItem('resume_data'); state.skills=[]; state.exp=[]; state.edu=[]; document.getElementById('resumeForm').reset(); renderSkillsEditor(); renderEditors(); renderPreview(); });
}

function collectForm(){ return { name:$('#name').value, title:$('#title').value, contact:$('#contact').value, summary:$('#summary').value } }
function setForm(f){ if(!f) return; $('#name').value=f.name||''; $('#title').value=f.title||''; $('#contact').value=f.contact||''; $('#summary').value=f.summary||'' }

function renderSkillsEditor(){
  const ul = $('#skillsList'); ul.innerHTML=''; state.skills.forEach((s,i)=>{
    const li = el('li',{class:'item'});
    const input = el('input',{value:s}); input.addEventListener('input', e=>{ state.skills[i]=e.target.value; renderPreview() });
    const del = el('button',{},['✕']); del.addEventListener('click', ()=>{ state.skills.splice(i,1); renderSkillsEditor(); renderPreview(); });
    li.appendChild(input); li.appendChild(del); ul.appendChild(li);
  })
}

function addExpEditor(data={role:'',company:'',location:'',dates:'',desc:''}){
  state.exp.push(data); renderEditors(); renderPreview(); }
function addEduEditor(data={degree:'',school:'',city:'',dates:'',note:''}){ state.edu.push(data); renderEditors(); renderPreview(); }

function renderEditors(){
  const cont = $('#expList'); cont.innerHTML=''; state.exp.forEach((e,i)=>{
    const box = el('div',{class:'item'});
    box.appendChild(el('input',{value:e.role,placeholder:'Role / Job title'}));
    box.appendChild(el('input',{value:e.company,placeholder:'Company'}));
    box.appendChild(el('input',{value:e.location,placeholder:'Location'}));
    box.appendChild(el('input',{value:e.dates,placeholder:'Dates (e.g. 2022-2023)'}));
    const desc = el('textarea',{},[e.desc]); box.appendChild(desc);
    const del = el('button',{},['Remove']); del.addEventListener('click', ()=>{ state.exp.splice(i,1); renderEditors(); renderPreview(); });
    box.appendChild(del);
    // bind changes
    const inputs = box.querySelectorAll('input,textarea'); inputs.forEach((inp,idx)=> inp.addEventListener('input', ()=>{ const keys=['role','company','location','dates','desc']; state.exp[i][keys[idx]]=inp.value; renderPreview(); }));
    cont.appendChild(box);
  })

  const contEdu = $('#eduList'); contEdu.innerHTML=''; state.edu.forEach((e,i)=>{
    const box = el('div',{class:'item'});
    box.appendChild(el('input',{value:e.degree,placeholder:'Degree (e.g. B.Tech)'}));
    box.appendChild(el('input',{value:e.school,placeholder:'School / College'}));
    box.appendChild(el('input',{value:e.city,placeholder:'City'}));
    box.appendChild(el('input',{value:e.dates,placeholder:'Dates / Year'}));
    const note = el('input',{value:e.note,placeholder:'Note / CGPA'}); box.appendChild(note);
    const del = el('button',{},['Remove']); del.addEventListener('click', ()=>{ state.edu.splice(i,1); renderEditors(); renderPreview(); });
    box.appendChild(del);
    const inputs = box.querySelectorAll('input'); inputs.forEach((inp,idx)=> inp.addEventListener('input', ()=>{ const keys=['degree','school','city','dates','note']; state.edu[i][keys[idx]]=inp.value; renderPreview(); }));
    contEdu.appendChild(box);
  })
}

// init
bind(); renderSkillsEditor(); renderEditors(); renderPreview();
