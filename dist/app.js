const paths={
  background:'assets/content/02_Background_个人背景_中英文分版.txt',
  value:'assets/content/03_What_I_Bring_我的价值_中英文分版.txt',
  insightZh:'assets/content/04-CBTC Insight中文版.txt',insightEn:'assets/content/04_CBTC_Insights_业务洞察_英文分版.txt',
  projectZh:'assets/content/05 案例模拟中文版.txt',projectEn:'assets/content/05案例英文版.txt',
  legalZh:'assets/content/06 法律资源库.txt',legalEn:'assets/content/06法律知识库英文版.txt'
};
const state={lang:'zh',texts:{},expandedEpisodes:false};
const clean=s=>s.replace(/\f/g,'').replace(/\u2028/g,'\n').replace(/&amp;/g,'&').trim();
const lines=s=>clean(s).split(/\n+/).map(x=>x.trim()).filter(Boolean);
const esc=s=>s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const textBetween=(s,start,end)=>{const a=s.indexOf(start);if(a<0)return'';const b=end?s.indexOf(end,a+start.length):-1;return clean(s.slice(a,b<0?s.length:b));};

const experience={
 zh:[
 ['自由职业 AI 训练与评估','2026.03 — 至今 · 远程','自由职业 AI 训练与评估','家庭创业项目支持'],
 ['家庭创业项目支持','2024 — 2026.03 · 项目制','家庭创业项目支持','独立值班与门店运营'],
 ['独立值班与门店运营','2025.04 — 2025.12 · 爱丁堡','独立值班与门店运营','法务助理实习生'],
 ['法务助理实习生','2021.10 — 2021.12 · 咸阳','法务助理实习生','法律实习生'],
 ['法律实习生','2021.07 — 2021.10 · 咸阳','法律实习生','国际经历与领导力'],
 ['模拟联合国与合唱团领导经历','2019 — 2023 · 中国 / 英国','国际经历与领导力','音乐与文化参与']
 ],
 en:[
 ['Freelance AI Training & Evaluation','Mar 2026 — Present · Remote','Freelance AI Training & Evaluation','Family Startup Project Support'],
 ['Family Startup Project Support','2024 — Mar 2026 · Project-based','Family Startup Project Support','Independent Shift Operations'],
 ['Independent Shift Operations','Apr — Dec 2025 · Edinburgh','Independent Shift Operations','Legal Assistant Intern'],
 ['Legal Assistant Intern','Oct — Dec 2021 · Xianyang','Legal Assistant Intern','Legal Intern'],
 ['Legal Intern','Jul — Oct 2021 · Xianyang','Legal Intern','International & Leadership'],
 ['MUN & Choir Leadership','2019 — 2023 · China / UK','International & Leadership','Music & Cultural Engagement']
 ]
};
const values={
 zh:[
 ['法律意识与前期支持','让法律意识从项目一开始就参与，而不是等问题出现以后再介入。','01 · 法律意识与前期支持','02 · 中欧专业资源连接与转译'],
 ['中欧专业资源连接与转译','听得懂专业语言，也能把专业语言讲清楚。','02 · 中欧专业资源连接与转译','03 · 综合项目与团队支持'],
 ['综合项目与团队支持','快速理解，灵活协作，在项目需要的地方发挥作用。','03 · 综合项目与团队支持','04 · 文化、活动与一点额外的可能'],
 ['文化、活动与一点额外的可能','专业之外，我也愿意给团队带来一点创意和活力。','04 · 文化、活动与一点额外的可能','我可以带来的价值']
 ],
 en:[
 ['Legal Awareness & Early Support','Bring legal awareness in from the beginning—not only after problems appear.','01 · LEGAL AWARENESS & EARLY SUPPORT','02 · CHINA–EUROPE PROFESSIONAL INTERFACE'],
 ['China–Europe Professional Interface','Understand professional language—and make it understandable.','02 · CHINA–EUROPE PROFESSIONAL INTERFACE','03 · PROJECT & TEAM SUPPORT'],
 ['Project & Team Support','Learn quickly, collaborate flexibly and contribute wherever the project needs support.','03 · PROJECT & TEAM SUPPORT','04 · CULTURE, EVENTS & SOMETHING EXTRA'],
 ['Culture, Events & Something Extra','Beyond professional work, I hope to bring creativity and energy to the team.','04 · CULTURE, EVENTS & SOMETHING EXTRA','THE VALUE I BRING']
 ]
};
const insightTitles={
 zh:['企业出海的第一步，是先想清楚“为什么”','“落地”真正解决的，是如何在新的环境里经营','“生态”的价值，最终要落到真实的连接','从“一站式服务”，继续走向科技创新','今天的“进入欧洲”，正在变成更综合的能力测试','真正的国际化，不应该止于“把产品卖出去”','有些基础设施不是建筑，而是关系','它的意义，也不止于园区本身'],
 en:['First Ask Why','Landing Means Adaptation','The Value of an Ecosystem Is Who It Connects','From One-stop Service to Innovation','A More Complex European Market','From Product to Industry to Brand','Relationship Infrastructure','Why CBTC Matters Beyond the Park']
};
const regTitles={zh:['人工智能','数据与数字监管','网络安全与韧性','绿色与可持续产品','芯片与关键技术','经济安全'],en:['Artificial Intelligence','Data & Digital Regulation','Cyber Resilience','Sustainable Products','Chips & Strategic Technology','Policy, Law & Business Exposure']};
const researchTitles={zh:['跨境用工与员工派驻','知识产权与联合研发','公司设立与市场进入','跨境合同与商业合作'],en:['Cross-border Employment & Employee Posting','IP & Joint R&D','Company Establishment & Market Entry','Cross-border Contracts & Business Cooperation']};

async function load(){
  const entries=await Promise.all(Object.entries(paths).map(async([k,p])=>[k,await fetch(encodeURI(p)).then(r=>r.text())]));
  state.texts=Object.fromEntries(entries);
  renderAll();
}
function applyLanguage(){
  document.documentElement.lang=state.lang==='zh'?'zh-CN':'en';
  document.body.classList.toggle('en-mode',state.lang==='en');
  document.querySelectorAll('[data-zh]').forEach(el=>el.textContent=el.dataset[state.lang]);
  document.querySelector('.lang-toggle').setAttribute('aria-label',state.lang==='zh'?'Switch to English':'切换为中文');
}
function renderAll(){applyLanguage();renderExperience();renderValues();renderInsights();renderProjects();renderLegal()}

function renderExperience(){
 const text=state.texts.background; const locale=state.lang==='zh'?'zh':'en';
 document.querySelector('#experience-list').innerHTML=experience[locale].map((x,i)=>{
   const body=textBetween(text,x[2],x[3]).split('\n').slice(1).join('\n');
   return `<article class="accordion-item"><button class="accordion-trigger"><span class="num">0${i+1}</span><h4>${esc(x[0])}</h4><small>${esc(x[1])}</small><b>+</b></button><div class="accordion-content"><div class="accordion-copy">${esc(body)}</div></div></article>`;
 }).join(''); bindAccordions();
}
function renderValues(){
 const locale=state.lang==='zh'?'zh':'en'; const text=state.texts.value;
 document.querySelector('#value-grid').innerHTML=values[locale].map((x,i)=>{
  const body=textBetween(text,x[2],x[3]);
  return `<article class="value-card"><small>0${i+1}</small><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p><button data-dialog-title="${esc(x[0])}" data-dialog-body="${encodeURIComponent(body)}">${locale==='zh'?'查看具体应用场景':'Explore practical applications'} ＋</button></article>`
 }).join('');bindDialogs();
}
function splitNumbered(text,count,offset=1){
 const src=clean(text); const out=[];
 for(let i=offset;i<offset+count;i++){
  const marker=String(i).padStart(2,'0')+' ·';const next=String(i+1).padStart(2,'0')+' ·';
  const a=src.indexOf(marker);if(a<0){out.push('');continue}let b=src.indexOf(next,a+marker.length);if(b<0)b=src.length;out.push(clean(src.slice(a,b)));
 }return out;
}
function renderInsights(){
 const locale=state.lang==='zh'?'zh':'en'; const text=state.texts[locale==='zh'?'insightZh':'insightEn'];
 const chunks=splitNumbered(text,8);
 document.querySelector('#insight-list').innerHTML=chunks.map((body,i)=>{
  const l=lines(body);const summary=l.slice(2,5).join(' ').slice(0,190)+'…';
  return `<article class="insight-card"><small>0${i+1}</small><h3>${esc(insightTitles[locale][i])}</h3><p>${esc(summary)}</p><button data-dialog-title="${esc(insightTitles[locale][i])}" data-dialog-body="${encodeURIComponent(body)}">${locale==='zh'?'阅读全文':'Read insight'} →</button></article>`;
 }).join('');bindDialogs();
}
function episodeChunks(text){
 const src=clean(text),starts=[...src.matchAll(/EP\.\s*0[1-6]\s*·/g)].map(m=>m.index);return starts.map((a,i)=>src.slice(a,starts[i+1]??src.length).trim());
}
function storyMarkup(body){
 const arr=lines(body);let nextChat=false;
 return arr.slice(2).map((line,i)=>{
  let c='narration';
  if(/^(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY|MONTH|WEEK|THREE|VISIT DAY|\d{1,2}:\d{2}|周[一二三四五六日天]|三周后|一个月后|两个月后)/i.test(line))c='meta';
  else if(/^(L总|我|企业负责人|同事|运营同事|企业HR|MR\. L|ME|COLLEAGUE|COMPANY DIRECTOR|OPERATIONS COLLEAGUE|COMPANY|HR|LEGAL|FINANCE)/i.test(line)&&line.length<65){c='speaker';nextChat=true}
  else if(nextChat&&line.length<230){c='chat';nextChat=false}
  else if(/^(我心里|脑内|Mental note|I quietly|I look|嗯|好的|很好|Right|Good|Excellent)/i.test(line))c='thought';
  return `<p class="story-line ${c}">${esc(line)}</p>`;
 }).join('');
}
function renderProjects(){
 const locale=state.lang==='zh'?'zh':'en'; const chunks=episodeChunks(state.texts[locale==='zh'?'projectZh':'projectEn']);
 document.querySelector('#episode-nav').innerHTML=chunks.map((_,i)=>`<a href="#ep-${i+1}">EP. ${String(i+1).padStart(2,'0')}</a>`).join('');
 document.querySelector('#episodes').innerHTML=chunks.map((body,i)=>{const l=lines(body),title=l[1]||'';return `<article class="episode ${i>2&&!state.expandedEpisodes?'hidden':''}" id="ep-${i+1}"><header class="episode-header"><small>EP. ${String(i+1).padStart(2,'0')}</small><h3>${esc(title)}</h3></header>${storyMarkup(body)}</article>`}).join('');
 const btn=document.querySelector('#more-episodes');btn.style.display=state.expandedEpisodes?'none':'block';
}
function regulatoryChunks(text){
 const start=text.indexOf(state.lang==='zh'?'02 ·欧盟监管重点':'02 · REGULATORY FOCUS');
 const end=text.indexOf(state.lang==='zh'?'03 · 专题法律研究':'03 · FEATURED LEGAL RESEARCH',start);const src=text.slice(start,end);
 const marks=state.lang==='zh'?['01 · AI','02 · 数据与数字监管','03 ·网络安全与韧性','04 · 绿色与可持续产品','05 ·芯片与关键技术','06 · 经济安全']:['01 · AI','02 · DATA','03 · CYBERSECURITY','04 · GREEN','05 · CRITICAL TECHNOLOGY','06 · ECONOMIC SECURITY'];
 return marks.map((m,i)=>{const a=src.indexOf(m);if(a<0)return'';const b=i===marks.length-1?src.length:src.indexOf(marks[i+1],a+m.length);return clean(src.slice(a,b<0?src.length:b))});
}
function researchChunks(text){
 const start=text.indexOf(state.lang==='zh'?'03 · 专题法律研究':'03 · FEATURED LEGAL RESEARCH');const end=text.indexOf(state.lang==='zh'?'04 · 法律资源':'04 · LEGAL SOURCES',start);const src=text.slice(start,end);const marks=['01 · PEOPLE','02 · INNOVATION','03 · COMMERCIAL CONTRACTS','04 · EU MARKET ENTRY'];
 return marks.map((m,i)=>{const a=src.indexOf(m);if(a<0)return'';let b=i===marks.length-1?src.length:src.indexOf(marks[i+1],a+m.length);return clean(src.slice(a,b<0?src.length:b))});
}
function renderLegal(){
 const locale=state.lang==='zh'?'zh':'en',text=state.texts[locale==='zh'?'legalZh':'legalEn'];const regs=regulatoryChunks(text);
 document.querySelector('#regulatory-grid').innerHTML=regs.map((body,i)=>{const l=lines(body);return `<article class="reg-card"><small>0${i+1}</small><h4>${esc(regTitles[locale][i])}</h4><p>${esc(l.slice(2,6).join(' ').slice(0,180))}</p><button data-dialog-title="${esc(regTitles[locale][i])}" data-dialog-body="${encodeURIComponent(body)}">${locale==='zh'?'探索':'Explore'} →</button></article>`}).join('');
 const research=researchChunks(text).filter(Boolean);document.querySelector('#research-list').innerHTML=research.map((body,i)=>`<article class="accordion-item"><button class="accordion-trigger"><span class="num">0${i+1}</span><h4>${esc(researchTitles[locale][i]||lines(body)[1]||'Legal research')}</h4><small>${esc(lines(body).slice(2,4).join(' · ').slice(0,80))}</small><b>+</b></button><div class="accordion-content"><div class="accordion-copy">${esc(body)}</div></div></article>`).join('');bindAccordions();
 const links=[['AI Act','https://eur-lex.europa.eu/eli/reg/2024/1689/oj'],['GDPR','https://eur-lex.europa.eu/eli/reg/2016/679/oj'],['Data Act','https://eur-lex.europa.eu/eli/reg/2023/2854/oj'],['Cyber Resilience Act','https://eur-lex.europa.eu/eli/reg/2024/2847/oj'],['ESPR','https://eur-lex.europa.eu/eli/reg/2024/1781/oj'],['EU Chips Act','https://eur-lex.europa.eu/eli/reg/2023/1781/oj']];document.querySelector('#legal-links').innerHTML=links.map(x=>`<a href="${x[1]}" target="_blank" rel="noopener"><span>${x[0]}</span><b>↗</b></a>`).join('');
 const closeMarker='CLOSING NOTE';const close=textBetween(text,closeMarker,null);const display=close|| (locale==='zh'?'这个知识库不是结论，而是一个持续更新的起点。':'This library is not a final answer, but a starting point for continued research.');document.querySelector('#closing-note').innerHTML=`<small>CLOSING NOTE</small><h3>${locale==='zh'?'规则很重要，理解企业为什么需要它们也同样重要。':'Rules matter. So does understanding why a business needs them.'}</h3><p>${esc(lines(display).slice(1,5).join(' '))}</p><button data-dialog-title="CLOSING NOTE" data-dialog-body="${encodeURIComponent(display)}">${locale==='zh'?'阅读全文':'Read full note'} →</button>`;
 bindDialogs();
}
function bindAccordions(){document.querySelectorAll('.accordion-trigger').forEach(b=>b.onclick=()=>b.closest('.accordion-item').classList.toggle('open'))}
function bindDialogs(){document.querySelectorAll('[data-dialog-body]').forEach(b=>b.onclick=()=>openDialog(b.dataset.dialogTitle,decodeURIComponent(b.dataset.dialogBody)))}
function openDialog(title,body){const d=document.querySelector('#content-dialog');d.querySelector('.dialog-body').innerHTML=`<h2>${esc(title)}</h2><p>${esc(body)}</p>`;d.showModal()}

document.querySelector('.lang-toggle').onclick=()=>{state.lang=state.lang==='zh'?'en':'zh';state.expandedEpisodes=false;renderAll()};
document.querySelector('.menu-toggle').onclick=e=>{const n=document.querySelector('.main-nav');n.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',n.classList.contains('open'))};
document.querySelectorAll('.main-nav a').forEach(a=>a.onclick=()=>document.querySelector('.main-nav').classList.remove('open'));
document.querySelector('#more-episodes').onclick=()=>{state.expandedEpisodes=true;renderProjects();document.querySelector('#ep-4')?.scrollIntoView({behavior:'smooth'})};
document.querySelector('.dialog-close').onclick=()=>document.querySelector('#content-dialog').close();
document.querySelector('#content-dialog').onclick=e=>{if(e.target.id==='content-dialog')e.target.close()};
document.querySelector('.copy-wechat').onclick=async()=>{await navigator.clipboard.writeText('YYD9017');const t=document.querySelector('.toast');t.textContent=state.lang==='zh'?'微信号已复制':'WeChat ID copied';t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)};
document.querySelector('.image-open').onclick=()=>openDialog(state.lang==='zh'?'法律全景图':'Legal Landscape','');
document.querySelector('.image-open').onclick=()=>{const d=document.querySelector('#content-dialog');d.querySelector('.dialog-body').innerHTML=`<h2>${state.lang==='zh'?'法律全景图':'Legal Landscape'}</h2><img src="assets/legal-map.png" alt="Legal landscape" style="width:100%;height:auto;border-radius:10px">`;d.showModal()};
window.addEventListener('scroll',()=>document.querySelector('.site-header').classList.toggle('scrolled',scrollY>40));
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const sio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('.main-nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-40% 0px -50%'});document.querySelectorAll('main>section[id]').forEach(s=>sio.observe(s));
load().catch(err=>{console.error(err);document.querySelector('.toast').textContent='Content loading error'});
