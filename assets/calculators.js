(() => {
 'use strict';
 const root=document.querySelector('[data-calculator]'); if(!root)return;
 const model=window.MSPricing, en=document.documentElement.lang==='en';
 const t=(th,english)=>en?english:th;
 const fmt=n=>n.toLocaleString(en?'en-US':'th-TH',{minimumFractionDigits:0,maximumFractionDigits:2});
 const set=(id,value)=>{document.getElementById(id).textContent=value;};
 const quoteUrl=service=>new URL('request-quotation.html?service='+service+(en?'&lang=en':''),location.href);
 function readState(){try{return JSON.parse(sessionStorage.getItem('msCalculatorInputs')||'{}');}catch{return {};}}
 function saveState(value){try{sessionStorage.setItem('msCalculatorInputs',JSON.stringify({...readState(),...value}));}catch{/* Input still works without browser storage. */}}
 function writeDraft(draft){try{sessionStorage.setItem('msCalculatorDraft',JSON.stringify(draft));}catch{/* Quote can still be prepared manually. */}}
 const makeRow=(label,value)=>{const row=document.createElement('div');const dt=document.createElement('dt');const dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;row.append(dt,dd);return row;};
 if(root.dataset.calculator==='payroll'){
  const input=document.getElementById('pax'),radios=[...document.querySelectorAll('[name=payroll-plan]')],quote=document.getElementById('payroll-quote');
  const state=readState().payroll,query=new URLSearchParams(location.search);
  if(state){input.value=state.count;const r=radios.find(x=>x.value===state.plan);if(r)r.checked=true;}
  if(query.has('employees'))input.value=query.get('employees');if(query.has('package')){const r=radios.find(x=>x.value===query.get('package'));if(r)r.checked=true;}
  function render(){
   const key=radios.find(r=>r.checked).value,result=model.payroll(key,input.value);
   document.getElementById('pax-error').hidden=Boolean(result);input.setAttribute('aria-invalid',String(!result));quote.hidden=!result;
   set('selected-payroll-plan',model.payrollPlans.find(p=>p.key===key).name);
   model.payrollPlans.forEach(p=>{const r=model.payroll(p.key,input.value);document.querySelector(`[data-plan-price="${p.key}"]`).textContent=r?fmt(r.monthly)+' '+t('บาท/เดือน','THB/month'):'—';});
   document.querySelectorAll('[data-headcount]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.headcount===input.value)));
   saveState({payroll:{count:input.value,plan:key}});
   if(!result){['payroll-total','payroll-base','payroll-extra','payroll-annual','payroll-extra-label'].forEach(id=>set(id,'—'));set('payroll-formula',t('กรอกจำนวนพนักงานเพื่อดูราคา','Enter headcount to see an estimate.'));set('payroll-announcement',t('จำนวนพนักงานไม่ถูกต้อง','Invalid headcount.'));return;}
   set('payroll-total',fmt(result.monthly));set('payroll-base',fmt(result.base));set('payroll-extra-label',t('ส่วนเพิ่ม ','Additional ')+fmt(result.extra)+t(' คน × ',' employees × ')+fmt(result.rate));set('payroll-extra',fmt(result.extra*result.rate));set('payroll-annual',fmt(result.annual));
   set('payroll-formula',result.extra?t('ราคาเหมา + (จำนวนที่เกิน 30 × อัตราช่วงนี้)','Base fee + (employees above 30 × this band’s rate)'):t('ครอบคลุมจำนวนพนักงานไม่เกิน 30 คนด้วยราคาเหมา','The flat fee covers up to 30 employees.'));
   const url=quoteUrl('payroll-outsourcing');url.searchParams.set('employees',result.employees);url.searchParams.set('package',key);quote.href=url.href;
   set('payroll-announcement',`${fmt(result.employees)} ${t('คน','employees')}, ${key}: ${fmt(result.monthly)} ${t('บาทต่อเดือน','THB per month')}`);
  }
  input.addEventListener('input',render);radios.forEach(r=>r.addEventListener('change',render));document.querySelectorAll('[data-headcount]').forEach(b=>b.addEventListener('click',()=>{input.value=b.dataset.headcount;render();}));
  render();return;
 }
 const modes=[...document.querySelectorAll('[name=recruitment-mode]')],plans=[...document.querySelectorAll('[name=retainer-plan]')];
 const level=document.getElementById('role-level'),salary=document.getElementById('hire-salary'),other=document.getElementById('hire-other'),count=document.getElementById('hire-count'),quote=document.getElementById('recruitment-quote');
 const state=readState().recruitment;
 if(state){const r=modes.find(x=>x.value===state.mode);if(r)r.checked=true;const p=plans.find(x=>x.value===state.plan);if(p)p.checked=true;if(model.successRates[state.level])level.value=state.level;salary.value=state.salary;other.value=state.other;count.value=state.count;}
 const query=new URLSearchParams(location.search);if(query.get('mode')==='success')modes.find(r=>r.value==='success').checked=true;
 let draft=null;
 function render(){
  const mode=modes.find(r=>r.checked).value,key=plans.find(r=>r.checked).value;
  document.getElementById('retainer-inputs').hidden=mode!=='retainer';document.getElementById('success-inputs').hidden=mode!=='success';
  const breakdown=document.getElementById('recruitment-breakdown');breakdown.replaceChildren();
  saveState({recruitment:{mode,plan:key,level:level.value,salary:salary.value,other:other.value,count:count.value}});
  const url=quoteUrl('recruitment');url.searchParams.set('calculator',mode);quote.href=url.href;
  if(mode==='retainer'){
   const r=model.retainer(key);draft={service:'recruitment',mode,plan:key};quote.hidden=false;
   set('recruitment-plan',r.name);set('recruitment-heading',t('ค่าบริการรายเดือน','Monthly service fee'));set('recruitment-total',fmt(r.monthly));set('recruitment-unit',t('บาท / เดือน','THB / month'));
   breakdown.append(makeRow(t('ตำแหน่งที่เปิดพร้อมกัน','Concurrent active roles'),t('สูงสุด ','Up to ')+r.positions),makeRow(t('ผู้ผ่านคัดกรองต่อเดือน','Qualified candidates/month'),t('สูงสุด ','Up to ')+r.candidates),makeRow(t('ระยะทดแทนตามเงื่อนไข','Conditional replacement period'),r.replacementDays+' '+t('วัน','days')));
   set('recruitment-formula',t('ใช้ราคาปกติของแพ็กเกจ โปรโมชันและตำแหน่งเกินแพ็กเกจให้ทีมงานประเมินแยก','Uses standard package pricing. Promotions and extra roles are assessed separately.'));
   set('recruitment-announcement',r.name+': '+fmt(r.monthly)+' '+t('บาทต่อเดือน','THB per month'));return;
  }
  const r=model.success(level.value,salary.value,other.value,count.value);draft=r?{service:'recruitment',mode,level:r.level,salary:r.salary,otherAnnual:r.otherAnnual,hires:r.hires}:null;
  quote.hidden=!r;document.getElementById('recruitment-error').hidden=Boolean(r);
  set('recruitment-plan','Success Fee');set('recruitment-heading',t('ค่าบริการรวมเมื่อเริ่มงาน','Total fee when hires start'));set('recruitment-unit',t('บาท / จำนวนคนที่ระบุ','THB / specified hires'));
  if(!r){set('recruitment-total','—');set('recruitment-formula',t('กรอกข้อมูลให้ครบถ้วนเพื่อคำนวณราคา','Complete the fields to calculate a fee.'));set('recruitment-announcement',t('ข้อมูลสำหรับคำนวณไม่ถูกต้อง','Invalid calculation inputs.'));return;}
  set('recruitment-total',fmt(r.total));breakdown.append(makeRow(t('รายได้รวมต่อปี / คน','Annual income / person'),fmt(r.annualIncome)),makeRow(t('อัตราค่าบริการ','Fee rate'),r.percent+'%'),makeRow(t('ค่าบริการ / คน','Fee / hire'),fmt(r.perHire)),makeRow(t('จำนวนผู้เริ่มงาน','Number of hires'),fmt(r.hires)));
  set('recruitment-formula',`${fmt(r.annualIncome)} × ${r.percent}% × ${r.hires} = ${fmt(r.total)} ${t('บาท','THB')}`);set('recruitment-announcement',fmt(r.total)+' '+t('บาท สำหรับ ','THB for ')+r.hires+' '+t('คน','hires'));
 }
 quote.addEventListener('click',()=>{if(draft)writeDraft(draft);});[...modes,...plans].forEach(r=>r.addEventListener('change',render));[level,salary,other,count].forEach(input=>input.addEventListener('input',render));render();
})();
