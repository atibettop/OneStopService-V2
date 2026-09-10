(() => {
 const grid=document.getElementById('articles-grid');if(!grid)return;
 const en=document.documentElement.lang==='en',search=document.getElementById('article-search'),cards=[...grid.querySelectorAll('[data-article-category]')],buttons=[...document.querySelectorAll('[data-category]')];let category='all';
 function render(){const query=search.value.trim().toLocaleLowerCase();let count=0;cards.forEach(card=>{const matches=(category==='all'||card.dataset.articleCategory===category)&&(!query||card.textContent.toLocaleLowerCase().includes(query));card.hidden=!matches;if(matches)count++;});document.getElementById('article-count').textContent=en?`Showing ${count} of ${cards.length} articles`:`แสดง ${count} จาก ${cards.length} บทความ`;document.getElementById('article-empty').hidden=count>0;buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===category)));}
 buttons.forEach(b=>b.addEventListener('click',()=>{category=b.dataset.category;render();}));search.addEventListener('input',render);document.getElementById('article-reset').addEventListener('click',()=>{category='all';search.value='';render();search.focus();});render();
})();
