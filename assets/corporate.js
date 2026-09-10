/* GitHub Pages: prepare a draft, never claim server receipt. */
(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  let saved;
  try { saved = localStorage.getItem('oneStopHrLanguage'); } catch (_) {}
  const en = (params.get('lang') || saved || 'th') === 'en';
  document.documentElement.lang = en ? 'en' : 'th';
  const tr = (th, english) => en ? english : th;
  document.querySelectorAll('[data-en]').forEach(el => { if (en) el.innerHTML = el.dataset.en; });
  document.querySelectorAll('[data-lang]').forEach(a => {
    const url = new URL(location.href); url.searchParams.set('lang', a.dataset.lang);
    a.href = url.pathname + url.search + url.hash;
    if (a.dataset.lang === (en ? 'en' : 'th')) a.setAttribute('aria-current', 'true');
    a.addEventListener('click', () => { try { localStorage.setItem('oneStopHrLanguage', a.dataset.lang); } catch (_) {} });
  });
  if (en) document.querySelectorAll('a[href]').forEach(a => {
    const raw = a.getAttribute('href');
    if (a.dataset.lang || raw.startsWith('#') || !/\.html(?:[?#]|$)/.test(raw)) return;
    const url = new URL(raw, location.href); if (url.origin !== location.origin) return;
    url.searchParams.set('lang', 'en'); a.href = url.pathname + url.search + url.hash;
  });
  const header = document.querySelector('.ms-header');
  const toggle = header?.querySelector('.ms-menu-toggle');
  const menu = header?.querySelector('.ms-menu');
  const closeMenu = (restore = false) => {
    menu?.classList.remove('open'); toggle?.setAttribute('aria-expanded', 'false');
    if (toggle) toggle.textContent = '☰';
    menu?.querySelectorAll('details[open]').forEach(d => { d.open = false; });
    if (restore) toggle?.focus();
  };
  toggle?.addEventListener('click', () => {
    const open = menu.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); toggle.textContent = open ? '×' : '☰';
    toggle.setAttribute('aria-label', tr(open ? 'ปิดเมนู' : 'เปิดเมนู', open ? 'Close navigation' : 'Open navigation'));
    if (open) menu.querySelector('a')?.focus();
  });
  menu?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const wasOpen = menu?.classList.contains('open'); const detail = menu?.querySelector('details[open]');
      closeMenu(Boolean(wasOpen)); if (!wasOpen) detail?.querySelector('summary')?.focus();
    }
  });
  document.addEventListener('click', e => { if (header && !header.contains(e.target)) closeMenu(); });
  const scrollHeader = () => header?.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', scrollHeader, { passive: true }); scrollHeader();
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  const form = document.getElementById('quote-form'); if (!form) return;
  const selected = params.get('service'); const serviceInputs = [...form.querySelectorAll('input[name=services]')];
  serviceInputs.forEach(input => { input.checked = input.value === selected; });
  const employeeInput = form.elements.namedItem('employees');
  const updatePayroll = () => { employeeInput.required = serviceInputs.some(i => i.checked && i.value === 'payroll-outsourcing'); };
  serviceInputs.forEach(input => input.addEventListener('change', updatePayroll)); updatePayroll();
  const count = Number(params.get('employees')); if (Number.isSafeInteger(count) && count > 0 && count <= 1000000) employeeInput.value = count;
  const status = document.getElementById('form-status'), preview = document.getElementById('quote-preview'), prepared = document.getElementById('prepared-message');
  form.addEventListener('input', () => { preview.hidden = true; status.textContent = ''; });
  form.addEventListener('submit', e => {
    e.preventDefault(); if (!form.reportValidity()) return;
    const selectedInputs = serviceInputs.filter(input => input.checked);
    if (!selectedInputs.length) { status.textContent = tr('กรุณาเลือกบริการอย่างน้อย 1 รายการ', 'Please select at least one service.'); serviceInputs[0].focus(); return; }
    const data = new FormData(form);
    for (const name of ['company','name','phone','requirement']) {
      if (!String(data.get(name) || '').trim()) { status.textContent = tr('กรุณากรอกข้อมูลให้ครบถ้วน','Please complete the required information.'); form.elements.namedItem(name).focus(); return; }
    }
    const fields = [['company',tr('บริษัท','Company')],['name',tr('ผู้ติดต่อ','Contact')],['phone',tr('โทร','Phone')],['email','Email'],['employees',tr('จำนวนพนักงาน','Employees')],['position',tr('ตำแหน่ง / ประเภทงาน','Role / project')],['requirement',tr('รายละเอียด','Requirements')]];
    const body = fields.map(([key,label]) => `${label}: ${String(data.get(key) || '').trim() || '—'}`);
    const packageKey = params.get('package');
    if (['lite','pro','premium'].includes(packageKey) && selectedInputs.some(i => i.value === 'payroll-outsourcing')) body.push(`Payroll package: ${packageKey}`);
    body.splice(4,0,`${tr('บริการ','Services')}: ${selectedInputs.map(i => i.nextElementSibling.textContent).join(', ')}`);
    prepared.value = body.join('\n\n');
    const subject = tr('ขอใบเสนอราคา — ','Quotation request — ') + String(data.get('company')).trim();
    document.getElementById('email-draft').href = 'mailto:Thanannaphat.m@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(prepared.value);
    preview.hidden = false; status.textContent = tr('เตรียมข้อความแล้ว กรุณาตรวจสอบและส่งทางช่องทางที่เลือก ข้อมูลยังไม่ถูกส่งถึงทีมงาน', 'Message prepared. Review it and send through your chosen channel. It has not been sent to the team.'); preview.focus();
  });
  document.getElementById('copy-message').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(prepared.value); status.textContent = tr('คัดลอกแล้ว เปิด LINE แล้ววางข้อความเพื่อส่งให้ทีมงาน', 'Copied. Open LINE and paste your message to send it.'); }
    catch (_) { prepared.focus(); prepared.select(); status.textContent = tr('เลือกข้อความให้แล้ว กรุณาคัดลอกด้วยตนเอง', 'Message selected. Please copy it manually.'); }
  });
})();
