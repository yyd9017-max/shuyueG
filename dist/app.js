const paths={
  background:'assets/content/02_Background_个人背景_中英文分版.txt',
  value:'assets/content/03_What_I_Bring_我的价值_中英文分版.txt',
  insightZh:'assets/content/04-CBTC Insight中文版.txt',insightEn:'assets/content/04_CBTC_Insights_业务洞察_英文分版.txt',
  projectZh:'assets/content/05 案例模拟中文版.txt',projectEn:'assets/content/05案例英文版.txt?v=2',
  legalZh:'assets/content/06 法律资源库.txt',legalEn:'assets/content/06法律知识库英文版.txt'
};
const state={lang:sessionStorage.getItem('siteLang')==='en'?'en':'zh',texts:{},expandedEpisodes:false};
const validPages=['about','background','value','insights','projects','resources'];
const currentPage=validPages.includes(new URLSearchParams(location.search).get('page'))?new URLSearchParams(location.search).get('page'):'about';
const clean=s=>s.replace(/\f/g,'').replace(/\u2028/g,'\n').replace(/&amp;/g,'&').trim();
const lines=s=>clean(s).split(/\n+/).map(x=>x.trim()).filter(Boolean);
const esc=s=>s.replace(/’/g,"'").replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const textBetween=(s,start,end)=>{const a=s.indexOf(start);if(a<0)return'';const b=end?s.indexOf(end,a+start.length):-1;return clean(s.slice(a,b<0?s.length:b));};

const experience={
 zh:[
 ['自由职业 AI 训练与评估','2026.03 — 至今 · 远程','自由职业 AI 训练与评估','家庭创业项目支持'],
 ['家庭创业项目支持','2024 — 2026.03 · 项目制','家庭创业项目支持','独立值班与门店运营'],
 ['独立值班与门店运营','2025.04 — 2025.12 · 爱丁堡','独立值班与门店运营','法务助理实习生'],
 ['法务助理实习生','2021.10 — 2021.12 · 咸阳','法务助理实习生','法律实习生'],
 ['法律实习生','2021.07 — 2021.10 · 咸阳','法律实习生','国际经历与领导力']
 ],
 en:[
 ['Freelance AI Training & Evaluation','Mar 2026 — Present · Remote','Freelance AI Training & Evaluation','Family Startup Project Support'],
 ['Family Startup Project Support','2024 — Mar 2026 · Project-based','Family Startup Project Support','Independent Shift Operations'],
 ['Independent Shift Operations','Apr — Dec 2025 · Edinburgh','Independent Shift Operations','Legal Assistant Intern'],
 ['Legal Assistant Intern','Oct — Dec 2021 · Xianyang','Legal Assistant Intern','Legal Intern'],
 ['Legal Intern','Jul — Oct 2021 · Xianyang','Legal Intern','International & Leadership']
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
 ['China–Europe Professional Interface','Understand professional language—and make it understandable.','02 · CHINA–EUROPE PROFESSIONAL INTERFACE','03 · CROSS-FUNCTIONAL SUPPORT'],
 ['Cross-functional Support','Ready to learn, adapt and contribute wherever the project needs support.','03 · CROSS-FUNCTIONAL SUPPORT','04 · CULTURE & EVENTS'],
 ['Culture & Events','Beyond professional work, I can bring a little creativity and energy to the team.','04 · CULTURE & EVENTS','WHAT I CAN BRING']
 ]
};
const insightTitles={
 zh:['企业出海的第一步，是先想清楚“为什么”','“落地”真正解决的，是如何在新的环境里经营','“生态”的价值，最终要落到真实的连接','从“一站式服务”，继续走向科技创新','今天的“进入欧洲”，正在变成更综合的能力测试','真正的国际化，不应该止于“把产品卖出去”','有些基础设施不是建筑，而是关系','它的意义，也不止于园区本身'],
 en:['First Ask Why','Landing Means Adaptation','The Value of an Ecosystem Is Who It Connects','From One-stop Service to Innovation','A More Complex European Market','From Product to Industry to Brand','Relationship Infrastructure','Why CBTC Matters Beyond the Park']
};
const regTitles={zh:['人工智能','数据与数字监管','网络安全与韧性','绿色与可持续产品','芯片与关键技术','经济安全'],en:['Artificial Intelligence','Data & Digital Regulation','Cyber Resilience','Sustainable Products','Chips & Strategic Technology','Economic Security']};
const regCards={
 zh:[
  ['产品或服务是否涉及AI系统？','体系 · 角色 · 分类'],
  ['涉及什么数据，又如何被使用？','个人数据 · 访问 · 共享 · GDPR · Data Act'],
  ['产品是否包含数字元素？','产品安全 · 漏洞 · 生命周期'],
  ['产品可能受到哪些可持续性要求影响？','耐用性 · 可维修性 · 产品信息'],
  ['企业准备如何在欧洲开展关键技术业务？','半导体 · 技术 · 交易 · EU Chips Act · Investment Screening'],
  ['战略性政策关注，是否已经转化为适用于企业的法律规则？','政策 · 法律地位 · 适用性']
 ],
 en:[
  ['Does the product or service involve an AI system?','System · Role · Classification'],
  ['What data is involved, and how is it used?','Personal data · Access · Sharing · GDPR · Data Act'],
  ['Does the product contain digital elements?','Product security · Vulnerabilities · Lifecycle'],
  ['Which sustainability requirements may affect the product?','Durability · Repairability · Product information'],
  ['How does the company plan to develop its critical-technology business in Europe?','Semiconductors · Technology · Transactions · EU Chips Act · Investment Screening'],
  ['Has strategic policy attention translated into legal rules applicable to the company?','Policy · Legal status · Applicability']
 ]
};
const researchTitles={zh:['跨境用工与员工派驻','知识产权与研发合作','跨境商业合同','欧盟市场准入'],en:['Cross-border Employment & Employee Posting','IP & R&D Collaboration','Cross-border Commercial Contracts','EU Market Entry']};
const educationDetails={
 glasgow:{
  zh:{school:'格拉斯哥大学',degree:'国际商法法学硕士（LLM）',meta:'2022—2023 · 英国格拉斯哥',description:'围绕跨境商业活动中的法律与商业问题进行系统学习，课程涵盖国际投资、跨境交易、公司治理、金融及知识产权等领域。',courses:['国际投资法','国际销售与金融','公司治理','知识产权与市场','国际资本市场','担保融资法']},
  en:{school:'University of Glasgow',degree:'LLM in International Commercial Law',meta:'2022—2023 · Glasgow, United Kingdom',description:'Focused on the legal and commercial dimensions of cross-border business, with academic training across international investment, commercial transactions, corporate governance, finance and intellectual property.',courses:['International Investment Law','International Sales and Finance','Corporate Governance','Intellectual Property and the Market','International Capital Markets','Law of Secured Finance']}
 },
 nwafu:{
  zh:{school:'西北农林科技大学',degree:'法学学士',meta:'2018—2022 · 中国杨凌',description:'系统建立中国法律体系基础，并重点接触商事法律、争议解决、知识产权与监管相关课程，同时通过管理学和法律经济分析等跨学科课程拓展对企业与社会环境的理解。',courses:['合同法','经济法','国际法','国际私法','仲裁法','知识产权法']},
  en:{school:'Northwest A&F University',degree:'Bachelor of Law',meta:'2018—2022 · Yangling, China',description:'Built a broad foundation in Chinese law, with particular exposure to commercial law, dispute resolution, intellectual property and regulatory subjects, alongside interdisciplinary study in management and law-and-economics.',courses:['Contract Law','Economic Law','International Law','Private International Law','Arbitration Law','Intellectual Property Law']}
 }
};
const leadershipDetails={
 mun:{
  zh:{title:'模拟联合国社团成员',org:'格拉斯哥大学模拟联合国社团',meta:'2022年9月—2023年3月 · 英国格拉斯哥',intro:'研究生期间参与格拉斯哥大学模拟联合国社团活动，在国际化的学生环境中接触全球议题，并与不同文化背景的成员交流合作。',bullets:['参与国际议题讨论及国家角色模拟，围绕全球性问题进行观点表达、讨论并共同探索可能的解决方案。','参与社团组织的国际知识问答、桌游之夜及交流活动等文化与社交项目。','在多元文化环境中进一步积累与不同背景成员沟通、交换观点和参与集体讨论的经验。'],tags:['国际化环境','讨论与表达','跨文化协作','全球议题']},
  en:{title:'Model United Nations Member',org:'University of Glasgow Model United Nations',meta:'Sep 2022—Mar 2023 · Glasgow, UK',intro:'Participated in Model United Nations activities during my postgraduate studies, engaging with international issues and collaborating with students from diverse cultural backgrounds.',bullets:['Took part in international-style debates and country-role simulations, discussing global issues and working with other participants towards possible resolutions.','Participated in the society’s wider cultural and social activities, including international quizzes, board game nights and networking events.','Gained further experience communicating and exchanging perspectives in an international student environment.'],tags:['International Environment','Discussion & Communication','Cross-cultural Collaboration','Global Issues']}
 },
 choir:{
  zh:{title:'大学合唱团团长',org:'西北农林科技大学合唱团',meta:'2019年7月—2021年9月 · 中国咸阳',intro:'本科期间担任大学合唱团团长，参与管理和协调百人规模学生艺术团队，负责日常训练安排、团队协调及演出组织等工作。',bullets:['组织日常排练与训练安排，根据不同演出任务协调训练时间，并与各声部长共同推进团队训练。','与学校各学院及相关部门对接演出需求，根据不同活动协调和安排合唱团成员参与学院演出及相关活动。','组织并参与协调多场校内演出及艺术活动，包括与舞蹈团、管弦乐团及民乐团等不同艺术团队的合作演出。','带领团队进行省级大学生艺术展演的集中备赛与训练，最终获得陕西省第六届大学生艺术展演一等奖。','因学生工作与艺术团管理表现，获得校级“优秀学生干部”及“优秀艺术团干部”荣誉。'],tags:['团队领导','百人规模团队','训练协调','活动组织','跨团队合作']},
  en:{title:'Choir Leader',org:'Northwest A&F University Choir',meta:'Jul 2019—Sep 2021 · Xianyang, China',intro:'Led and coordinated a 100+ member university choir, with responsibility for training arrangements, team coordination and performance organisation across a large student arts organisation.',bullets:['Organised regular rehearsals and training schedules, coordinating section leaders and allocating training time according to upcoming performance requirements.','Coordinated with university departments and faculties on performance needs, helping assign and organise choir members for faculty-level events and performances.','Organised and supported collaborative productions with dance groups, orchestras and traditional music ensembles.','Led intensive preparation for the 6th Shaanxi Art Exhibition for College Students, culminating in a First-Class Prize.','Recognised with the Outstanding Student Leader and Outstanding Art Troupe Officer awards.'],tags:['Leadership','100+ Member Team','Training Coordination','Event Organisation','Cross-team Collaboration']}
 }
};

async function load(){
  const entries=await Promise.all(Object.entries(paths).map(async([k,p])=>[k,await fetch(encodeURI(p)).then(r=>r.text())]));
  state.texts=Object.fromEntries(entries);
  applyRoute();renderAll();
}
function applyRoute(){
  document.querySelectorAll('[data-page]').forEach(el=>el.hidden=el.dataset.page!==currentPage);
  document.body.classList.toggle('inner-page',currentPage!=='about');
  document.querySelectorAll('[data-page-link]').forEach(a=>a.classList.toggle('active',a.dataset.pageLink===currentPage));
  if(currentPage!=='about')document.querySelector('.site-header').classList.add('scrolled');
}
function applyLanguage(){
  document.documentElement.lang=state.lang==='zh'?'zh-CN':'en';
  document.body.classList.toggle('en-mode',state.lang==='en');
  document.querySelectorAll('[data-zh]').forEach(el=>el.textContent=(el.dataset[state.lang]||'').replace(/’/g,"'"));
  document.querySelector('.lang-toggle').setAttribute('aria-label',state.lang==='zh'?'Switch to English':'切换为中文');
}
function renderAll(){applyLanguage();renderExperience();renderValues();renderInsights();renderProjects();renderLegal()}

function renderExperience(){
 const text=state.texts.background; const locale=state.lang==='zh'?'zh':'en';
 document.querySelector('#experience-list').innerHTML=experience[locale].map((x,i)=>{
   return `<article class="accordion-item experience-item"><button class="accordion-trigger experience-open" data-experience="${i}"><span class="num">0${i+1}</span><h4>${esc(x[0])}</h4><small>${esc(x[1])}</small><b>＋</b></button></article>`;
 }).join('');
 document.querySelectorAll('.experience-open').forEach(b=>b.onclick=()=>openExperience(Number(b.dataset.experience)));
}
function renderValues(){
 const locale=state.lang==='zh'?'zh':'en'; const text=state.texts.value;
 const headingSets=locale==='zh'?
  [['前期识别','研究与核实','文件与合同支持','及时响应 · 全程跟进','查看具体应用场景'],['把问题整理清楚','把两边准确连接起来','转译并持续跟进','查看法律桥梁如何运作'],['跨境项目支持','企业服务','研究与管理支持','商务沟通与活动支持','灵活补位'],['活动与节目','中欧文化交流','舞台与表演','也可以在幕后']]:
  [['SPOT EARLY','RESEARCH & CHECK','DOCUMENT & CONTRACT SUPPORT','RESPOND & FOLLOW','＋ Explore Where I Can Support'],['BEFORE','DURING','AFTER','＋ See How the Bridge Works'],['Cross-border Project Support','Enterprise Services','Research & Management Support','Business Communication & Events','Flexible Execution'],['Events & Programmes','Cultural Exchange','Stage & Performance','Behind the Scenes']];
 const ignored=/^(网页默认折叠|Collapsed by default on the website)$/i;
 const formatLine=line=>{const cls=/→|↔| · /.test(line)?'value-keyline':/^↓$/.test(line)?'value-arrow':/[？?]$/.test(line)?'value-question':'';return `<p class="${cls}">${esc(line)}</p>`};
 document.querySelector('#value-grid').innerHTML=values[locale].map((x,i)=>{
  const arr=lines(textBetween(text,x[2],x[3])).filter(v=>!ignored.test(v)).map(v=>v.replace(/^\[New translation\]\s*/,'').trim());const heads=headingSets[i];const intro=arr[2]||'';const groups=[];let group=null;
  arr.slice(3).forEach(line=>{if(heads.includes(line)){group={title:line,lines:[]};groups.push(group)}else if(group)group.lines.push(line)});
  const summaries=locale==='zh'?['前置介入 · 及时响应 · 全程跟随','专业意见 → 园区与企业理解 → 下一步行动','快速理解 · 清晰梳理 · 有效协调 · 持续推进','音乐 · 舞台 · 活动 · 文化交流 · 创意']:['Early · Responsive · Continuous','Professional Advice → Business Understanding → Next Step','Understand quickly · Organise clearly · Coordinate effectively · Follow through','Music · Stage · Events · Cultural Exchange · Creativity'];
  const summary=summaries[i];groups.forEach(g=>g.lines=g.lines.filter(line=>line!==summary));
  const visible=groups.filter(g=>g.lines.length);const cleanHeading=title=>title.replace(/^查看具体应用场景$/,'具体应用场景').replace(/^查看法律桥梁如何运作$/,'法律桥梁如何运作').replace(/^＋ Explore Where I Can Support$/,'Where I Can Support').replace(/^＋ See How the Bridge Works$/,'How the Bridge Works');
  const scenarioTitle=locale==='zh'?'具体应用场景':'Where I Can Support';
  const bridgeTitle=locale==='zh'?'法律桥梁如何运作':'How the Bridge Works';
  const disclosure=(content,label)=>`<details class="value-disclosure"><summary>${label}<span>＋</span></summary><div>${content}</div></details>`;
  const renderGroup=g=>{const title=cleanHeading(g.title);if(title===scenarioTitle){const pairs=[];for(let n=0;n<g.lines.length;n+=2)pairs.push(`<div class="value-scenario"><h5>${esc(g.lines[n]||'')}</h5><p>${esc(g.lines[n+1]||'')}</p></div>`);return disclosure(`<div class="value-scenarios">${pairs.join('')}</div>`,locale==='zh'?'展开细节':'Show details')}if(title===bridgeTitle){const pivot=g.lines.findIndex(line=>line===(locale==='zh'?'专业资源':'PROFESSIONAL RESOURCES'));const cut=pivot<0?g.lines.length:Math.min(g.lines.length,pivot+1);return `${g.lines.slice(0,cut).map(formatLine).join('')}${disclosure(g.lines.slice(cut).map(formatLine).join(''),locale==='zh'?'展开':'Show more')}`}return g.lines.map(formatLine).join('')};
  return `<article class="value-chapter"><header class="value-chapter-head"><span>0${i+1}</span><div><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></div></header><p class="value-intro">${esc(intro)}</p><div class="value-sections">${visible.map((g,j)=>`<section class="value-detail"><small>${String(j+1).padStart(2,'0')}</small><div><h4>${esc(cleanHeading(g.title))}</h4>${renderGroup(g)}</div></section>`).join('')}</div><div class="value-chapter-summary"><strong>${esc(summary)}</strong></div></article>`;
 }).join('');
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
 const insightText=text.replace(/\u2028/g,' ');
 const chunks=splitNumbered(insightText,8);
 const insightLines=s=>s.replace(/\f/g,'').replace(/\u2028/g,' ').replace(/&amp;/g,'&').trim().split(/\n+/).map(x=>x.trim()).filter(Boolean);
 const phases=['DISCOVER','LAND','CONNECT','INNOVATE','ADAPT','GROW','RELATE','BRIDGE'];
 const emphasisZh=['先明确企业希望通过国际化获得什么，再决定去哪里、以什么方式进入。','落地不是完成一次注册，而是逐渐建立在当地持续经营的能力。','拥有一个资源网络，并不意味着资源已经产生价值。','双方即使拥有合作意愿，也需要逐渐明确：要解决什么问题、谁的能力真正匹配，以及合作可以从哪里开始。','所以我理解的科技孵化，比单纯的“资源连接”又向前走了一步：不仅是帮助企业找到谁，更是帮助不同的创新能力找到可以一起做什么。','欧洲仍然需要全球创新，同时也越来越重视关键技术、数据、基础设施和供应链的安全性、自主性与长期韧性。','市场进入越来越需要与合规战略同时考虑。','但如果能够在企业发展的早期发现问题、帮助企业理解问题属于哪个专业领域、连接合适的专业团队，再把专业意见继续放回企业实际的项目和商业场景里，很多问题就有机会在成为真正障碍之前被看见。','实体基础设施提供工作的空间；关系基础设施提供开展业务所需要的网络。','真正困难的是，有需求并不意味着合作会自然发生。','一家企业、一个实验室、一项技术、一个合作伙伴、一个产业项目，或者一段能够长期继续推进的商业关系。'];
 const summaryZh=['所以我越来越觉得，信息本身不是目的，减少信息不对称、帮助企业找到适合自己的方向，才是前期服务真正产生价值的地方。','对我来说，这也是海外科技孵化与普通国内孵化一个很有意思的区别——除了帮助企业成长，还要帮助企业完成一次跨市场的适应。','知道企业在不同阶段需要什么，并让合适的专业能力及时进入项目，本身就是园区很重要的一种资源组织能力。','一个企业可以持续进入的服务入口，再根据不同阶段和不同需求，连接不同的专业路径。','合规不应该只是告诉企业“什么不能做”，也可以帮助企业更早理解“怎样才能继续往前走”。','对于跨境合作而言，这种持续积累的信任、熟悉度和连接能力，可能恰恰是最难快速复制的部分。','理解差异 · 连接资源 · 在规则之内寻找真正可行的合作路径。'];
 const emphasisEn=['First clarify what a company hopes to gain from internationalisation, then decide where to go and how to enter.','Landing is not simply registration. It is adaptation.','Having a network is not the same as creating value from it.','Companies may focus on products, markets and applications, while research teams may focus on technical approaches, research directions and the commercialisation of outcomes. Even when both sides want to collaborate, they still need to clarify the problem to solve, whose capabilities are the right match, and where collaboration can begin.','My understanding of technology incubation therefore goes a step beyond connecting resources: it is not only about helping companies find whom to work with, but also about helping different innovation capabilities find what they can do together.','Europe still needs global innovation, while placing growing importance on the security, autonomy and long-term resilience of critical technologies, data, infrastructure and supply chains.','Market Entry is increasingly connected with Compliance Strategy.','But if it can identify issues early in a company\'s development, help the company understand which professional field an issue belongs to, connect it with the right specialists, and bring their advice back into the company\'s actual projects and business context, many issues may be recognised before they become real obstacles.','Physical infrastructure gives companies a place to work. Relationship infrastructure gives companies a network to work with.','The real difficulty is that demand does not mean cooperation will happen naturally.','A company, a laboratory, a technology, a partner, an industrial project, or a business relationship that can continue developing over the long term.'];
 const summaryEn=['I increasingly feel that information is not an end in itself. The real value of early-stage services lies in reducing information asymmetry and helping companies find a direction that suits them.','For me, this is also an interesting distinction between overseas technology incubation and conventional domestic incubation: alongside helping companies grow, it must help them adapt across markets.','Knowing what companies need at different stages, and bringing the right expertise into a project at the right time, is itself an important part of the park\'s ability to organise resources.','A service entry point that a company can return to over time, connecting it with different professional pathways according to its stage of development and specific needs.','Compliance should not only tell a company what it cannot do. Done well, it can also help a company understand how it can move forward.','In cross-border cooperation, this gradually accumulated trust, familiarity and ability to connect may be precisely what is hardest to replicate quickly.','Understand the differences. Connect the right resources. Find workable paths for cooperation.'];
 const emphasis=new Set(locale==='zh'?emphasisZh:emphasisEn),summaries=new Set(locale==='zh'?summaryZh:summaryEn);
 const relatedZh=[['今天可能是市场信息；','下一步可能是AWEX或当地政府机构；','涉及合同、用工或监管问题时，可能需要律师、会计师和其他专业团队；','进入研发阶段以后，又可能需要大学、实验室、行业集群或技术专家。'],['一次政府代表团交流，可能建立新的机构关系；','一场行业论坛，可能让原本没有接触的企业找到彼此；','一次技术对接，可能让企业需求遇到合适的高校或科研团队；','一次企业参访，也可能变成下一条招商、投资或商业合作线索。']];
 const relatedEn=[['Today, that may be market information;','the next step may involve AWEX or a local government body;','contractual, employment or regulatory questions may require lawyers, accountants and other professional teams;','and the R&D stage may call for universities, laboratories, industry clusters or technology experts.'],['An exchange with a government delegation may establish new institutional relationships;','an industry forum may help companies that have never met discover one another;','a technology matchmaking session may connect a company\'s needs with a suitable university or research team;','and a company visit may become the next lead for investment attraction, investment or business cooperation.']];
 const related=locale==='zh'?relatedZh:relatedEn;
 const renderCopy=arr=>{let html='';for(let i=0;i<arr.length;){const line=arr[i];const sequence=related.find(group=>group[0]===line);if(sequence){html+=`<div class="insight-related">${sequence.map(v=>`<p>${esc(v)}</p>`).join('')}</div>`;i+=sequence.length;continue}if(summaries.has(line)){html+=`<p class="insight-summary">${esc(line)}</p>`;i++;continue}if(emphasis.has(line)){html+=`<p class="insight-highlight">${esc(line)}</p>`;i++;continue}if(/→|↔/.test(line)){html+=`<p class="insight-flow">${esc(line)}</p>`;i++;continue}if(/[？?]$/.test(line)){const questions=[];while(i<arr.length&&/[？?]$/.test(arr[i]))questions.push(arr[i++]);html+=`<div class="insight-questions">${questions.map(v=>`<p>${esc(v)}</p>`).join('')}</div>`;continue}const short=line.length<=32&&!/[。.!?？：:]$/.test(line);if(short){const group=[];while(i<arr.length&&arr[i].length<=32&&!/[。.!?？：:]$/.test(arr[i])&&!/→/.test(arr[i]))group.push(arr[i++]);html+=group.length>1?`<div class="insight-points">${group.map(v=>`<span>${esc(v)}</span>`).join('')}</div>`:`<p class="insight-emphasis">${esc(group[0])}</p>`;continue}html+=`<p>${esc(line)}</p>`;i++}return html};
 document.querySelector('#insight-list').innerHTML=chunks.map((body,i)=>{const sectionBody=i===7?body.split('MY UNDERSTANDING')[0]:body;const l=insightLines(sectionBody);const copy=locale==='zh'?l.slice(2):l.slice(1);return `<article class="insight-step"><div class="insight-marker"><span>0${i+1}</span><small>${phases[i]}</small></div><div class="insight-article"><h3>${esc(insightTitles[locale][i])}</h3>${renderCopy(copy)}</div></article>`}).join('');
 const ending=insightLines(textBetween(insightText,'MY UNDERSTANDING',null));const endingCopy=locale==='zh'?ending.slice(2):ending.slice(1);
 document.querySelector('#insight-understanding').innerHTML=`<small>MY UNDERSTANDING</small><h3>${locale==='zh'?'我最终形成的理解':'My Understanding'}</h3><div>${renderCopy(endingCopy)}</div>`;
}
function episodeChunks(text){
 const src=clean(text),starts=[...src.matchAll(/EP\.\s*0[1-6]\s*·/g)].map(m=>m.index);return starts.map((a,i)=>src.slice(a,starts[i+1]??src.length).trim());
}
const projectDialogueZh={
 me:new Set(["我","好的，我先看看背景。","我看了一下，他们研发属性比较强。明天介绍的时候，科研和产业资源是不是可以多带一点？","好，我先整理个背景和问题清单。","您现在选欧洲落点，最看重的是市场、研发，还是其他因素？","如果一年以后回头看，做到什么程度，您会觉得这次欧洲布局是成功的？","那欧洲公司未来只是销售窗口，还是也准备签合同、招聘、做研发？","他们希望两个月左右启动欧洲实体。公司设立、注册地址、银行和基础行政流程，麻烦您帮我看看正常需要哪些材料？哪些问题现在就要让他们确认？","他们后面会涉及欧洲实体的日常财务、VAT和工资。哪些事项需要外部会计师提前介入，我们先列一下。","他们准备先从国内来3个人，后面可能本地招聘。我把人员情况收齐以后，再跟您一起过一下。","前期3个人，商务办公为主。未来可能涉及研发，不过实验室先别急，我还没问清楚具体做什么实验。","今天3个。","老板说一年后“可能十几个”。","三个人分别准备待多久？","劳动关系怎么安排？","工资由哪边支付？","在比利时分别负责什么？","是短期派驻还是长期任职？","没关系。我们先把三个人的情况分别整理清楚，再把需要专业确认的部分单独处理。","可以先帮您把合同背景、交易结构和需要关注的问题整理出来。涉及具体当地法律判断的部分，我们再请相应的专业团队确认。","他们准备开始看欧洲市场了。但现在说的是“找客户”，范围还是太大。我想先把目标客户拆一下。","当然可以。您现在最希望通过这些机构解决哪一类问题？市场、技术合作，还是当地产业资源？","稍微分一下。","主要是希望加完联系方式以后，还有下文。","L总，他们现在研发合作意愿比较明确了。","可以。不过他们现在的需求还是“想认识教授”。","那……还是先问明白。","您现在最希望教授帮你们解决什么？","Just to make sure we're discussing the same scope — are we talking about the current product performance, or a broader experimental validation?","可以，我去和负责接待的同事确认一下。","公司运营已经稳定了，本地团队也在扩。","市场有几条合作线在跟，科研这边已经开始谈具体方案。","现在主要盯市场合作和研发项目。","……也是“先来看看欧洲”？","好的，请把资料发我吧。"]),
 other:new Set(["L总","明天有一家国内医疗科技企业过来。","想在欧洲落地，也想看看这边有没有研发合作机会。","同事","可以。不过先听听他们最看重什么。","企业负责人","我们也看了荷兰、德国这些地方。比利时这边，你们觉得最大的优势是什么？","这种时候，我不会拿出十页政策。","市场和研发都重要。政策当然也会考虑。我们其实也比较怕看到很多政策，但不知道自己到底能不能用。","最理想当然是产品能进去，有几个稳定客户。如果研发合作也能开始，就更好了。","都有可能。前期应该销售为主，研发慢慢做。","企业负责人发来消息：","我们内部基本定了。准备先在比利时设公司，3个人过去，想尽量快一点。","运营同事","所以到底几个人？","……","企业HR问：","我们三个国内员工，是不是等公司注册完，就可以直接来比利时工作？","这些我们还没具体想。","那你们可以帮我们看合同吗？","产品这边，我们是不是也可以开始做欧洲市场了？","我们也想多认识一些当地机构和企业。可以帮忙介绍吗？","还要分这么细？","这倒是。","那就对接学校吧。","科研团队问：","What exactly would you like us to validate?","我们准备招一个Belgium Business Development Manager。你们这边有没有招聘渠道？","我们准备增加研发投入。当地有没有什么补贴？","我们后面可能要买设备，现金流压力会比较大。融资这边有资源吗？","我们想在园区办一场欧洲客户交流活动，可以吗？","不好意思，我们临时又加了两位嘉宾，可以吗？","NovaMed现在怎么样了？","对了，明天下午还有一家国内新能源企业。","差不多。"])
};
const projectDialogueEn={
 me:new Set(["They’re hoping to get the European entity moving within about two months. Could you help me check what we normally need for incorporation, registered address, banking and the basic administrative process? And which questions do we need them to answer now?","They’ll eventually need support with day-to-day finance, VAT and payroll for the European entity. Let’s identify which issues should involve an external accountant early on.","They’re planning to bring three people over from China first, with possible local recruitment later. I’ll collect the employee details and then we can go through them together.","Three people initially, mainly office-based. They may need R&D facilities later, but let’s not talk about laboratories yet — I still haven’t established what kind of experiments they actually want to do.","How long is each person planning to stay?","How will their employment relationships be structured?","Which entity will pay their salaries?","What exactly will each person be doing in Belgium?","Is this a temporary assignment or a longer-term position?","A little.","Mostly because it would be nice if something happened after everyone added each other on WeChat.","Just to make sure we're discussing the same scope — are we talking about the current product performance, or a broader experimental validation?","There are several market partnerships in progress, and the R&D side has moved into discussions around concrete cooperation.","Right now, we’re mainly following the market partnerships and the R&D project.","...Are they also “just coming to have a look at Europe”?"]),
 other:new Set(["They’re looking at setting up in Europe, and they also want to explore possible R&D collaboration here.","We’ve more or less decided internally. We’d like to set up the company in Belgium first. Three people will come over initially, and we’d like to move fairly quickly.","Once the Belgian company is registered, can our three employees just come over and start working?","We’d also like to meet more local organisations and companies. Could you introduce us?","Do we really need to be that specific?","Fair point.","Then ask them what they actually need.","What exactly would you like us to validate?","Sorry, we’ve just added two more guests. Is that okay?","How’s NovaMed doing now?","More or less."])
};
function storyMarkup(body,locale){
 const arr=lines(body);let nextChat=false,nextRole='other',noteMode=false;
 const noteTitles=new Set(locale==='zh'?['NOVAMED · QUICK BRIEF','PEOPLE TRACK','LEGAL & COMPLIANCE TRACK','PARTNER MAP','TECHNOLOGY COOPERATION BRIEF','ACTION POINTS','FINANCE TRACK']:['NOVAMED · QUICK BRIEF','PEOPLE TRACK','LEGAL & COMPLIANCE TRACK','PARTNER MAP','TECHNOLOGY COOPERATION BRIEF','ACTION POINTS','FINANCE TRACK']);
 const noteSubheads=new Set(locale==='zh'?['他们是谁？','他们可能想要什么？','现在还不知道什么？','内部协同','专业支持','我的位置','NovaMed','Research Team','Professional Team','CBTC','先确认：','然后再判断：']:['Who are they?','What might they want?','What don’t we know yet?','Internal coordination','Professional support','My role','NovaMed','Research Team','Professional Team','CBTC','First, establish:','Then decide what kind of resource makes sense:']);
 const noteStops=new Set(locale==='zh'?['先问清楚，再介绍我们能做什么。','企业说的是业务语言。','我负责先做：','现在才适合开始找人。','需求清楚以后，再开始向外连接：','会议结束了。','因为融资服务也不是：']:['Understand the need first. Then explain what we can do.','Companies speak the language of business.','The company speaks the language of business.','My role is to:','My role comes first:','Now it makes sense to start making connections.','Now we can start looking for the right people.','Once the need is clear, we can start connecting externally:','The meeting is over.','Because financing support is not:']);
 const compactQuestions=new Set(locale==='zh'?['它卖什么？','客户是谁？','为什么现在出海？','欧洲已经做到哪一步？','医院？','实验室？','经销商？','医疗集团？','科研机构？','设备厂商？','WHO ARE THEY?','WHAT DO THEY DO?','WHAT DO THEY NEED?','WHY THIS CONNECTION?']:['What do they sell?','Who are their customers?','Why are they going abroad now?','How far have they already got in Europe?','Hospitals?','Laboratories?','Distributors?','Medical groups?','Research institutions?','Equipment manufacturers?','WHO ARE THEY?','WHAT DO THEY DO?','WHAT DO THEY NEED?','WHY THIS CONNECTION?']);
 const strongLines=new Set(locale==='zh'?['第一关：先把企业留下来再说。','先问清楚，再介绍我们能做什么。','政策介绍应该够用，而不是够厚。','Business + R&D','Phase 1 ≠ Phase 2','公司主体 · 人员落地 · 产品进入欧洲 · 客户与产业资源 · 未来研发合作','这才像一个真实项目了。','经典问题出现了。','各说各的。','新支线解锁。','政策与投资信息','产业与市场','商务合作','法律政策与合规','科研合作','但真正有价值的，是让对的人在对的时候进来。','哦，今天我存在的意义出现了。','但待办事项刚刚诞生。','企业真正开始经营以后，问题反而更多了。','岗位需求 · 薪资信息 · 招聘渠道 · 本地人才资源 · 是否需要外部Recruiter','高校人才网络 / 当地招聘渠道 / 专业猎头 / 行业网络','项目 → 条件 → 政策匹配 → 专业确认 → 后续支持','“这个项目可能相关，我们需要准备什么，由谁进一步确认？”','“我给你一个投资人的微信。”','计划永远赶不上企业老板的微信。','“我们想去欧洲看看。”','“下一阶段怎么继续发展？”']:['First challenge: give them a reason to stay.','Understand the need first. Then explain what we can do.','Policy information should be useful, not just plentiful.','Business + R&D','Phase 1 ≠ Phase 2','Corporate setup · People · EU market entry · Customers & industry connections · Future R&D collaboration','Now this is starting to look like a real project.','A classic question.','Speaking past one another.','New track unlocked.','Policy & Investment Information','Industry & Market','Business Cooperation','Legal, Policy & Compliance','Research Cooperation','The real value lies in bringing the right people in at the right time.','Ah. Today I have officially justified my existence.','The to-do list has only just been born.','once a company actually starts operating, the questions multiply.','Role requirements · Salary information · Recruitment channels · Local talent resources · Whether an external recruiter is needed','University talent networks / Local recruitment channels / Specialist recruiters / Industry networks','Project → Eligibility → Policy matching → Professional confirmation → Follow-up support','“This programme may be relevant to our project. What would we need to prepare, and who should confirm it further?”','“Here’s an investor’s WeChat. Good luck.”','No event plan has ever survived the founder’s messages.','“We’d like to take a look at Europe.”','“What should we do next to keep growing?”']);
 const routeLines=new Set(locale==='zh'?['我 → 企业服务','我 → 财务','我 → HR','我 → 园区运营']:['ME → ENTERPRISE SERVICES','ME → FINANCE','ME → HR','ME → PARK OPERATIONS']);
 const resourceRoutes=new Set(locale==='zh'?['政策与投资信息','产业与市场','商务合作','法律政策与合规','科研合作']:['Policy & Investment Information','Industry & Market','Business Cooperation','Legal, Policy & Compliance','Research Cooperation']);
 const partTitles=new Set(locale==='zh'?['先把“找客户”拆开','FIRST R&D MEETING','MONDAY · PEOPLE','TUESDAY · POLICY','WEDNESDAY · FINANCE','THURSDAY · EVENTS']:['FIRST, BREAK DOWN “FIND CUSTOMERS”','FIRST R&D MEETING','MONDAY · PEOPLE','TUESDAY · POLICY','WEDNESDAY · FINANCE','THURSDAY · EVENTS']);
 const minorTitles=new Set(['EVENT DAY · 14:25']);
 const denseLines=new Set(locale==='zh'?['UCLouvain','Research Centres','Laboratories','Professors / Technical Teams','✓ 欧洲实体开始运行','✓ 有了自己的办公室','✓ 中国团队逐渐落地','✓ 开始招聘当地员工','✓ 第一批客户和合作伙伴正在谈','✓ 科研合作也在继续推进','时间 · 场地 · 流程','嘉宾 · 企业 · 合作机构','场地 · 设备 · 现场','嘉宾名单更新了吗？','企业介绍需要双语吗？','技术环节谁来讲？','合作机构都确认了吗？','PPT——这次真的是最终版了吗？']:['UCLouvain','Research Centres','Laboratories','Professors / Technical Teams','✓ The European entity is operating','✓ They have their own office','✓ The Chinese team is gradually arriving','✓ Local recruitment has started','✓ The first customer and partnership discussions are underway','✓ R&D collaboration is continuing to move forward','Time · Venue · Programme','Guests · Companies · Partner organisations','Venue · Equipment · On-site arrangements','Has the guest list been updated?','Do we need a bilingual company introduction?','Who is presenting the technical session?','Have all partner organisations confirmed?','And the PowerPoint—','is this actually the final version this time?']);
 const denseSubheads=new Set(locale==='zh'?['负责活动的同事确认：','市场和招商同事协助：','运营同事处理：']:['The events colleague confirms:','Market and investment colleagues help with:','Operations handles:']);
 const flowHeads=new Set(['DISCOVER','LAND','CONNECT','INNOVATE','GROW']);
 const flowArrows=new Set(['↓']);
 const italicLines=new Set(['Interested in Europe. No clear plan yet.','Different company. Different questions. Same job: understand what it needs, bring in the right people, and keep things moving.']);
 const flowIntros=new Set(['现在，它已经走过：','Since then, it has moved through:']);
 const endingTitle=new Set(['NEXT CASE LOADING…']);
 const endingLine=new Set(['企业不同，问题也不同。理解它需要什么，找到合适的人，然后让事情继续往前走。']);
 const dividers=new Set(locale==='zh'?['第一关：先把企业留下来再说。','先问清楚，再介绍我们能做什么。','Lead终于变Project了。','这就是企业规划。','各说各的。','新支线解锁。','现在才适合开始找人。','这倒是。','这三秒非常值钱。','如果合作逐渐进入实质阶段，合同、保密、知识产权、数据和合作框架等问题，也同步交给相应专业团队确认。','哦，今天我存在的意义出现了。','企业真正开始经营以后，问题反而更多了。','高校人才网络 / 当地招聘渠道 / 专业猎头 / 行业网络','这才是政策真正开始进入企业经营的时候。','还是要匹配。','最后一个问题，我已经不太相信答案了。']:['First challenge: give them a reason to stay.','Understand the need first. Then explain what we can do.','The lead has officially become a project.','That is company planning.','Speaking past one another.','New track unlocked.','Now it makes sense to start making connections.','Fair point.','Those three seconds are extremely valuable.','As the cooperation becomes more substantive, questions around contracts, confidentiality, intellectual property, data and the broader collaboration framework can also be referred to the appropriate professional teams.','Ah. Today I have officially justified my existence.','once a company actually starts operating, the questions multiply.','University talent networks / Local recruitment channels / Specialist recruiters / Industry networks','That is when policy actually starts becoming part of business operations.','It still comes down to matching.','At this point, I have trust issues.']);
 return arr.slice(2).map((line,i)=>{
  let c='narration';
  const forcedNarrative=(locale==='zh'?new Set(['这种时候，我不会拿出十页政策。','我懂。']):new Set(['This is not the moment to pull out ten pages of policy.','I understand.','I know.'])).has(line);
  const nextLine=arr[i+3]||'';
  const nextForced=(locale==='zh'?['这种时候，我不会拿出十页政策。','我懂。']:['This is not the moment to pull out ten pages of policy.','I understand.','I know.']).includes(nextLine);
  if(noteStops.has(line))noteMode=false;
  const forcedOther=(locale==='zh'?new Set(['那…还是先问明白。','挺好。']):new Set()).has(line)||(locale==='en'&&/^EP\.\s*06\b/.test(arr[0])&&line==='Good.');
  const dialogueRoles=locale==='zh'?projectDialogueZh:projectDialogueEn;
  const markedRole=dialogueRoles.me.has(line)?'me':(dialogueRoles.other.has(line)||forcedOther)?'other':'';
  const label=/^(L总|我|同事|企业负责人|运营同事|企业负责人发来消息：|企业HR问：|科研团队问：|MR\. L|ME|COLLEAGUE|COMPANY DIRECTOR|OPERATIONS COLLEAGUE|COMPANY|HR|LEGAL|FINANCE)$/i.test(line);
  if(forcedNarrative){c='narration';nextChat=false}
  else if(locale==='en'&&line==='THEN THE COMPANY ASKS:'){c='narration';nextRole='other';nextChat=true}
  else if(/^(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY|MONTH|WEEK|THREE WEEKS|VISIT DAY|\d{1,2}:\d{2}|周[一二三四五六日天]|三周后|一个月后|两个月后)/i.test(line))c='meta';
  else if(label&&nextForced){nextChat=false;return''}
  else if(markedRole&&label){c=`speaker speaker-${markedRole}`;nextRole=markedRole;nextChat=true}
  else if(markedRole){c=`chat chat-${markedRole}`;nextChat=false}
  else if(label){nextRole=/^(我|ME)$/i.test(line)?'me':'other';c=`speaker speaker-${nextRole}`;nextChat=true}
  else if(nextChat&&line.length<260){c=`chat chat-${nextRole}`;nextChat=false}
  else if(/^(我心里|脑内|Mental note|I quietly|I look|嗯|好的|很好|Right|Good|Excellent)/i.test(line))c='thought';
  if(noteTitles.has(line)){noteMode=true;c+=' story-note-title'}
  else if(noteSubheads.has(line))c+=' story-note-subhead';
  else if(noteMode)c+=' story-note-body';
  if(compactQuestions.has(line))c+=' story-question';
  if(strongLines.has(line))c+=' story-strong';
  if(routeLines.has(line))c+=' story-route';
  if(resourceRoutes.has(line))c+=' story-resource-route';
  if(partTitles.has(line))c+=' story-part-title';
  if(minorTitles.has(line))c+=' story-minor-title';
  if(denseLines.has(line))c+=' story-dense';
  if(denseSubheads.has(line))c+=' story-dense-subhead';
  if(flowHeads.has(line))c+=' story-flow-head';
  if(flowArrows.has(line))c+=' story-flow-arrow';
  if(italicLines.has(line))c+=' story-italic';
  if(flowIntros.has(line))c+=' story-flow-intro';
  if(endingTitle.has(line))c+=' story-ending-title';
  if(endingLine.has(line))c+=' story-ending-line';
  if(dividers.has(line))c+=' story-divider';
  return `<p class="story-line ${c}">${esc(line)}</p>`;
 }).join('');
}
function renderProjects(){
 const locale=state.lang==='zh'?'zh':'en'; const chunks=episodeChunks(state.texts[locale==='zh'?'projectZh':'projectEn']);
 document.querySelector('#episode-nav').innerHTML=chunks.map((_,i)=>`<a href="#ep-${i+1}" data-episode="${i+1}">EP. ${String(i+1).padStart(2,'0')}</a>`).join('');
 document.querySelector('#episodes').innerHTML=chunks.map((body,i)=>{const l=lines(body),finale=i===5,title=finale?(locale==='zh'?'“一年之后……”':'“ONE YEAR LATER…”'):(l[1]||''),storyBody=finale?[l[0],l[0],...l.slice(1)].join('\n'):body;return `<article class="episode ${i>2&&!state.expandedEpisodes?'hidden':''}" id="ep-${i+1}"><header class="episode-header"><small>EP. ${String(i+1).padStart(2,'0')}</small><h3>${esc(title)}</h3></header>${storyMarkup(storyBody,locale)}</article>`}).join('');
 document.querySelectorAll('#episode-nav a').forEach(link=>link.onclick=e=>{e.preventDefault();const n=Number(link.dataset.episode);if(n>3&&!state.expandedEpisodes){state.expandedEpisodes=true;renderProjects()}requestAnimationFrame(()=>document.querySelector(`#ep-${n}`)?.scrollIntoView({behavior:'smooth',block:'start'}))});
 const btn=document.querySelector('#more-episodes');btn.style.display=state.expandedEpisodes?'none':'block';
}
function regulatoryChunks(text){
 const start=text.indexOf(state.lang==='zh'?'02 ·欧盟监管重点':'02 · REGULATORY FOCUS');
 const end=text.indexOf(state.lang==='zh'?'03 · 专题法律研究':'03 · FEATURED LEGAL RESEARCH',start);const src=text.slice(start,end);
 const marks=state.lang==='zh'?['01 · AI','02 · 数据与数字监管','03 ·网络安全与韧性','04 · 绿色与可持续产品','05 ·芯片与关键技术','06 · 经济安全']:['01 · AI','02 · DATA','03 · CYBERSECURITY','04 · GREEN','05 · CRITICAL TECHNOLOGY','06 · ECONOMIC SECURITY'];
 return marks.map((m,i)=>{const a=src.indexOf(m);if(a<0)return'';const b=i===marks.length-1?src.length:src.indexOf(marks[i+1],a+m.length);return clean(src.slice(a,b<0?src.length:b))});
}
function researchChunks(text){
 const start=text.indexOf(state.lang==='zh'?'03 · 专题法律研究':'03 · FEATURED LEGAL RESEARCH');const end=text.indexOf('04 · LEGAL SOURCES',start);const src=text.slice(start,end);const marks=['01 · PEOPLE','02 · IP & R&D','03 · COMMERCIAL CONTRACTS','04 · EU MARKET ENTRY'];
 return marks.map((m,i)=>{const a=src.indexOf(m);if(a<0)return'';let b=i===marks.length-1?src.length:src.indexOf(marks[i+1],a+m.length);return clean(src.slice(a,b<0?src.length:b))});
}
const officialSources=[
 {group:'EUROPEAN UNION',zh:'欧盟',items:[['EUR-Lex','欧盟法律、Official Journal及相关法律文本','EU law, the Official Journal and related legal texts','https://eur-lex.europa.eu/'],['CURIA','欧盟法院判决、意见及案件资料','Judgments, opinions and case materials of the Court of Justice of the European Union','https://curia.europa.eu/'],['European Commission','欧盟法规实施、政策及监管信息','EU law implementation, policy and regulatory information','https://commission.europa.eu/']]},
 {group:'BELGIUM',zh:'比利时',items:[['Belgian Official Gazette & Justel','比利时法律、正式文件及法规检索','Belgian legislation, official texts and legal research','https://www.ejustice.just.fgov.be/cgi/welcome.pl'],['FPS Economy','知识产权、企业及经济监管资料','Intellectual property, enterprise and economic-regulation resources','https://economie.fgov.be/en'],['FPS Employment','劳动条件、工作时间及跨境派驻资料','Employment conditions, working time and cross-border posting resources','https://employment.belgium.be/en']]},
 {group:'WALLONIA',zh:'瓦隆大区',items:[['Service public de Wallonie · SPW','地区就业、工作许可及相关行政程序','Regional employment, work authorisation and related administrative procedures','https://emploi.wallonie.be/']]},
 {group:'SPECIALIST AUTHORITIES',zh:'专业主管机关',items:[['European Data Protection Board','欧盟数据保护','EU data protection','https://www.edpb.europa.eu/'],['Belgian Data Protection Authority','比利时数据保护','Belgian data protection','https://www.dataprotectionauthority.be/'],['EUIPO','欧盟知识产权','EU intellectual property','https://www.euipo.europa.eu/'],['FAMHP','比利时医疗器械主管机关','Belgian competent authority for medical devices','https://www.famhp.be/en'],['ENISA','欧盟网络安全','EU cybersecurity','https://www.enisa.europa.eu/'],['Centre for Cybersecurity Belgium','比利时网络安全','Belgian cybersecurity','https://ccb.belgium.be/'],['European Commission Competition','欧盟竞争政策','EU competition policy','https://competition-policy.ec.europa.eu/'],['Belgian Competition Authority','比利时竞争主管机关','Belgian competition authority','https://www.belgiancompetition.be/en']]}
];
function officialUrlFor(line){
 const rules=[['Belgian Federal Employment Service · Posting Conditions','https://employment.belgium.be/en/themes/international/posting/working-conditions-be-respected-case-posting-belgium'],['Belgian Federal Employment Service · Working Time and Rest','https://employment.belgium.be/en/themes/international/posting/working-conditions-be-respected-case-posting-belgium/working-time-and'],['FPS Economy · Who holds the copyright to software?','https://economie.fgov.be/en/themes/intellectual-property/intellectual-property-rights/copyright-and-related-rights/copyright/intellectual-property-software/creation-computer-program/who-holds-copyright-software'],['FPS Economy · Who does an invention or patent belong to?','https://economie.fgov.be/en/themes/intellectual-property/intellectual-property-rights/patents/who-does-invention-or-patent'],['FPS Economy · Patents created in the context of employment','https://economie.fgov.be/en/themes/intellectual-property/intellectual-property-rights/patents/who-does-invention-or-patent'],['FPS Economy · Conditions of Patentability','https://economie.fgov.be/en/themes/intellectual-property/intellectual-property-rights/patents/conditions-patentability'],['EUR-Lex · Directive 2009/24/EC','https://eur-lex.europa.eu/eli/dir/2009/24/oj'],['EUR-Lex · Directive (EU) 2016/943','https://eur-lex.europa.eu/eli/dir/2016/943/oj'],['Artificial Intelligence Act','https://eur-lex.europa.eu/eli/reg/2024/1689/oj'],['AI Act','https://eur-lex.europa.eu/eli/reg/2024/1689/oj'],['GDPR','https://eur-lex.europa.eu/eli/reg/2016/679/oj'],['Data Act','https://eur-lex.europa.eu/eli/reg/2023/2854/oj'],['Cyber Resilience Act','https://eur-lex.europa.eu/eli/reg/2024/2847/oj'],['Ecodesign for Sustainable Products','https://eur-lex.europa.eu/eli/reg/2024/1781/oj'],['European Chips Act','https://eur-lex.europa.eu/eli/reg/2023/1781/oj'],['Regulation (EU) 2026/1386','https://eur-lex.europa.eu/eli/reg/2026/1386/oj'],['Regulation (EU) 2019/452','https://eur-lex.europa.eu/eli/reg/2019/452/oj'],['Rome I','https://eur-lex.europa.eu/eli/reg/2008/593/oj'],['Brussels I bis','https://eur-lex.europa.eu/eli/reg/2012/1215/oj'],['MDR','https://eur-lex.europa.eu/eli/reg/2017/745/oj'],['CISG','https://uncitral.un.org/en/texts/salegoods/conventions/sale_of_goods/cisg'],['Limosa','https://www.workinginbelgium.be/en/limosa.html'],['Working in Belgium','https://www.workinginbelgium.be/en/'],['Wallonia','https://emploi.wallonie.be/'],['FPS Economy','https://economie.fgov.be/en'],['FPS Employment','https://employment.belgium.be/en']];
 if(line.includes('Directive 2009/24/EC'))return 'https://eur-lex.europa.eu/eli/dir/2009/24/oj';
 if(line.includes('Directive (EU) 2016/943'))return 'https://eur-lex.europa.eu/eli/dir/2016/943/oj';
 if(line.includes('Code de droit économique — Book X')||line.includes('Belgian Code of Economic Law · Official Text'))return 'https://www.ejustice.just.fgov.be/cgi/welcome.pl';
 return (rules.find(([key])=>line.includes(key))||[])[1]||'';
}
function legalParagraph(line){const url=officialUrlFor(line);const copy=esc(line);return url?`<p class="legal-source-line"><a href="${url}" target="_blank" rel="noopener">${copy}<b>↗</b></a></p>`:`<p>${copy}</p>`}
function formatEmploymentBody(body){
 const all=lines(body),question=all[2]||'',sectionStart=all.findIndex(x=>/^A · GENERAL APPROACH/.test(x));
 const source=all.slice(sectionStart),sections=[];let current=null;
 source.forEach(line=>{if(/^(?:A · GENERAL APPROACH|B · CASE|C · LEGAL ANALYSIS|D · FINAL POSITION)/.test(line)){current={title:line,lines:[]};sections.push(current)}else if(current)current.lines.push(line)});
 const table=(headers,rows)=>`<div class="legal-table-wrap"><table class="legal-table"><thead><tr>${headers.map(x=>`<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
 const specialHeading=/^(?:NovaMed需要解决的问题|Questions NovaMed Needs to Resolve|法律依据|Legal Basis|主要法律依据|Primary Legal Sources?|官方指引|Official Guidance|官方程序|Official Procedure|本案|Application to the Case|实际执行|PRACTICAL IMPLEMENTATION|PRACTICAL REVIEW)$/;
 const renderLines=list=>{let out='',sourceMode=false;for(let i=0;i<list.length;i++){
  const line=list[i];
  if(line==='员工'&&list.slice(i+1,i+6).join('|')==='年龄|岗位|学历|工作经验|年度税前薪酬'){
   const cells=list.slice(i+6,i+24),rows=[];for(let j=0;j<cells.length;j+=6)rows.push(cells.slice(j,j+6));out+=table(['员工','年龄','岗位','学历','工作经验','年度税前薪酬'],rows);i+=23;continue;
  }
  if(line==='Employee'&&list.slice(i+1,i+6).join('|')==='Age|Position|Education|Experience|Annual Gross Salary'){
   const cells=list.slice(i+6,i+24),rows=[];for(let j=0;j<cells.length;j+=6)rows.push(cells.slice(j,j+6));out+=table(['Employee','Age','Position','Education','Experience','Annual Gross Salary'],rows);i+=23;continue;
  }
  if(line==='员工'&&list.slice(i+1,i+4).join('|')==='资质|2026年薪酬门槛|判断'){
   const cells=list.slice(i+4,i+16),rows=[];for(let j=0;j<cells.length;j+=4)rows.push(cells.slice(j,j+4));out+=table(['员工','资质','2026年薪酬门槛','判断'],rows);i+=15;continue;
  }
  if(line==='Employee'&&list.slice(i+1,i+4).join('|')==='Qualification|2026 Salary Threshold|Assessment'){
   const cells=list.slice(i+4,i+16),rows=[];for(let j=0;j<cells.length;j+=4)rows.push(cells.slice(j,j+4));out+=table(['Employee','Qualification','2026 Salary Threshold','Assessment'],rows);i+=15;continue;
  }
  if(line==='问题'&&list[i+1]==='NovaMed的处理'){
   const end=list.indexOf('实际执行',i+2),cells=list.slice(i+2,end<0?list.length:end),rows=[];for(let j=0;j<cells.length;j+=2)rows.push(cells.slice(j,j+2));out+=table(['问题','NovaMed的处理'],rows);i=(end<0?list.length:end)-1;continue;
  }
  if(line==='Issue'&&/^NovaMed/.test(list[i+1]||'')){
   const end=list.indexOf('PRACTICAL IMPLEMENTATION',i+2),cells=list.slice(i+2,end<0?list.length:end),rows=[];for(let j=0;j<cells.length;j+=2)rows.push(cells.slice(j,j+2));out+=table(['Issue',list[i+1]],rows);i=(end<0?list.length:end)-1;continue;
  }
  if(line==='成果'&&list.slice(i+1,i+3).join('|')==='法律判断|NovaMed的处理'){
   const end=list.indexOf('实际执行',i+3),cells=list.slice(i+3,end<0?list.length:end),rows=[];for(let j=0;j<cells.length;j+=3)rows.push(cells.slice(j,j+3));out+=table(['成果','法律判断','NovaMed的处理'],rows);i=(end<0?list.length:end)-1;continue;
  }
  if(line==='Result / Issue'&&list[i+1]==='Legal Assessment'&&/^NovaMed/.test(list[i+2]||'')){
   const end=list.indexOf('PRACTICAL IMPLEMENTATION',i+3),cells=list.slice(i+3,end<0?list.length:end),rows=[];for(let j=0;j<cells.length;j+=3)rows.push(cells.slice(j,j+3));out+=table(['Result / Issue','Legal Assessment',list[i+2]],rows);i=(end<0?list.length:end)-1;continue;
  }
  if(line==='核心问题'&&list[i+1]==='法律判断'&&/^NovaMed/.test(list[i+2]||'')){
   const third=list[i+2],end=list.indexOf('实际审查',i+3),cells=list.slice(i+3,end<0?list.length:end),rows=[];for(let j=0;j<cells.length;j+=3)rows.push(cells.slice(j,j+3));out+=table(['核心问题','法律判断',third],rows);i=(end<0?list.length:end)-1;continue;
  }
  if(line==='Core Issue'&&list[i+1]==='Legal Assessment'){
   const third=list[i+2]||'',end=['PRACTICAL IMPLEMENTATION','PRACTICAL REVIEW'].map(x=>list.indexOf(x,i+3)).find(x=>x>=0)??-1,cells=list.slice(i+3,end<0?list.length:end),rows=[];for(let j=0;j<cells.length;j+=3)rows.push(cells.slice(j,j+3));out+=table(['Core Issue','Legal Assessment',third],rows);i=(end<0?list.length:end)-1;continue;
  }
  const factCounts=/^(?:区域|Region) —/.test(line)?6:/^(?:制造商|Manufacturer) —/.test(line)?7:0;
  if(factCounts){const rows=list.slice(i,i+factCounts).map(x=>{const parts=x.split(/\s+—\s+/);return [parts.shift()||'',parts.join(' — ')]});out+=table(state.lang==='zh'?['项目','当前安排']:['Item','Current Arrangement'],rows);i+=factCounts-1;continue}
  if(/^Single Permit →/.test(line)&&/^Limosa →/.test(list[i+1]||'')&&/^联络人与相关文件 →/.test(list[i+2]||'')){
   out+=`<div class="compact-action-list">${list.slice(i,i+3).map(x=>`<p>${esc(x)}</p>`).join('')}</div>`;i+=2;continue;
  }
  const pairGroup=/^(?:长期经销关系|什么时候可以结束|适用法律|Long-term Distribution Relationship|When can the relationship end\?|Governing Law)$/.test(line),groupedCount=/^(?:软件代码|Software code) →/.test(line)?3:/^(?:教授提出了什么？|What did the professor contribute\?)$/.test(line)?3:/^成果A的新代码是否可以进入商业产品/.test(line)?5:pairGroup?4:/^产品运行和售后维护/.test(line)?2:0;
  if(groupedCount){const items=list.slice(i,i+groupedCount);out+=pairGroup?`<div class="compact-pair-list">${items.map((x,n)=>n%2===0?`<h5>${esc(x)}</h5>`:`<p>${esc(x)}</p>`).join('')}</div>`:`<div class="compact-insight-list">${items.map(x=>`<p>${esc(x)}</p>`).join('')}</div>`;i+=groupedCount-1;continue}
  if(/^(?:实际执行|实际审查|PRACTICAL IMPLEMENTATION|PRACTICAL REVIEW)$/.test(line)){
   const stageNames=['赴比之前','正式开始工作之前','11个月派驻期间','合作开始前','产生新成果时','公开或商业化之前','签约之前','履行过程中','合作结束或发生争议之前','产品与上市','技术与数据','Before travelling to Belgium','Before work formally begins','During the 11-month posting','Before the collaboration begins','When new results are created','Before publication or commercialisation','Before Signing','During Performance','Before Termination or a Dispute','Product & Market Access','Technology & Data'];let j=i+1,stages=[];
   while(j<list.length&&stageNames.includes(list[j])){const title=list[j++],items=[];while(j<list.length&&!stageNames.includes(list[j])&&!/^(?:中国劳动关系可以继续|成果是什么|交易是什么|产品是什么 →|软件著作权 ·|交易结构 ·|产品分类 ·|法律内容依据|The Chinese employment relationship can continue|What is the result →|What is the transaction →|What is the product →|SOFTWARE COPYRIGHT ·|TRANSACTION STRUCTURE ·|PRODUCT CLASSIFICATION ·|The legal content has been reviewed)/.test(list[j]))items.push(list[j++]);stages.push({title,items})}
   out+=`<h4 class="legal-subheading">${esc(line)}</h4><div class="execution-plan">${stages.map(s=>`<section><h5>${esc(s.title)}</h5>${s.items.map(x=>`<p>${esc(x)}</p>`).join('')}</section>`).join('')}</div>`;i=j-1;continue;
  }
  if(/^(?:法律内容依据|The legal content has been reviewed)/.test(line)){out+=`<p class="research-disclaimer">${esc(line)}</p>`;sourceMode=false}
  else if(/^(?:因此，所谓Background IP的作用|谁实际创作了代码|出资决定项目怎么开展|先确定谁完成了发明|关键不是禁止发表|拥有研发成果，不等于|先确定正在处理哪一层|销售目标真正重要的|交货地点不只是|责任限制不是一句|同时还应明确三年期满后的安排|终止条款不是一句|选择法律，决定|先确定产品和上市路径|产品分类不是一个标签|产品能不能卖|AI是否改变监管路径|数据用于产品|合规分析不仅要|The purpose of defining Background IP|The key questions are therefore|Funding determines|First determine who made|The objective is not to prevent publication|Owning an R&D result|First identify which layer|What matters about a target|The place of delivery|A limitation of liability|The agreement should also specify|A termination clause|Choosing the law determines|Product classification is not|Whether a product can be sold|Whether AI changes|Using data for a product|Good compliance analysis)/.test(line))out+=`<p class="research-emphasis">${esc(line)}</p>`
  else if(/^(?:第一层|第二层|第三层) · |Level [123] · /.test(line))out+=`<h5 class="legal-layer-heading">${esc(line)}</h5>`
  else if(/^(?:软件著作权 · 专利 · 商业秘密|交易结构 · 独家经销|产品分类 · 市场准入|SOFTWARE COPYRIGHT ·|TRANSACTION STRUCTURE ·|PRODUCT CLASSIFICATION ·)/.test(line))out+=`<p class="research-keywords">${esc(line)}</p>`
  else if(/^(?:成果[AB]|Result [AB])(?: —)?$/.test(line))out+=`<p class="research-key-fact"><strong>${esc(line)}</strong></p>`
  else if(/^[“"].*[”"]$/.test(line))out+=`<blockquote class="research-quote">${esc(line)}</blockquote>`
  else if(specialHeading.test(line)||/^(?:比利时法律框架|Belgian Legal Framework)$/.test(line)){out+=`<h4 class="legal-subheading">${esc(line)}</h4>`;sourceMode=/^(?:主要法律依据|Primary Legal Sources?|官方指引|Official Guidance|官方程序|Official Procedure|比利时法律框架|Belgian Legal Framework)$/.test(line)}
  else if(/^\d{2} · /.test(line))out+=`<p class="legal-step"><strong>${esc(line)}</strong></p>`;
  else if(sourceMode||/^(?:Regulation|Directive|Programme Law)\b.*(?: — | on | relative | concerning )/i.test(line)||(officialUrlFor(line)&&/^(?:EUR-Lex|UNCITRAL|FPS Economy|Belgian Code)/i.test(line)))out+=legalParagraph(line);
  else out+=`<p>${esc(line)}</p>`;
 }return out};
 const renderAnalysis=list=>{const qs=[];let intro=[],q=null;list.forEach(line=>{if(/^(?:Q\d+ · |SCOPE CHECK)/.test(line)){q={title:line,lines:[]};qs.push(q)}else if(q)q.lines.push(line);else intro.push(line)});return `${renderLines(intro)}<div class="legal-question-list">${qs.map(item=>`<details><summary>${esc(item.title)}</summary><div>${renderLines(item.lines)}</div></details>`).join('')}</div>`};
 return `<p class="research-dialog-lead">${esc(question)}</p><div class="legal-dialog-sections research-article-sections">${sections.map(s=>`<details><summary>${esc(s.title)}</summary><div>${/^C · /.test(s.title)?renderAnalysis(s.lines):renderLines(s.lines)}</div></details>`).join('')}</div>`;
}
function formatLegalBody(body){
 if(/^(?:01 · PEOPLE|02 · IP & R&D|03 · COMMERCIAL CONTRACTS|04 · EU MARKET ENTRY)\b/.test(lines(body)[0]||''))return formatEmploymentBody(body);
 const arr=lines(body).slice(1);let intro=[],groups=[],current=null;
 arr.forEach(line=>{const major=/^(?:0[1-3]\s*·|[A-D]\s*·|SCOPE CHECK)/i.test(line);if(major){current={title:line,lines:[]};groups.push(current)}else if(current)current.lines.push(line);else intro.push(line)});
 const regulatory=groups.length===3&&/首先识别|IDENTIFY/i.test(groups[0]?.title||'');
 if(regulatory){
  const renderIdentify=list=>{let out='';for(let i=0;i<list.length;i+=2){const label=(list[i]||'').replace(/^Classification$/,'classification');const value=list[i+1]||'';out+=`<div class="legal-field"><strong>${esc(label)}</strong><p>${esc(value)}</p></div>`}return out};
  const renderCore=list=>{let out='';for(let i=0;i<list.length;i++){const line=list[i];if(/^(?:IN FORCE|CURRENT FRAMEWORK|NEW FRAMEWORK|INDUSTRIAL FRAMEWORK|INVESTMENT SCREENING)/i.test(line)){out+=`<p class="legal-status">${esc(line)}</p>`}else if(/^(?:Article|Articles|Chapter|Annex|Application Timeline)/i.test(line)){const detail=list[i+1]||'';out+=`<div class="legal-provision"><strong>${esc(line)}</strong>${detail?`<p>${esc(detail)}</p>`:''}</div>`;if(detail)i++}else if(/^(?:Regulation|Directive)\b/i.test(line)){out+=legalParagraph(line)}else out+=`<p>${esc(line)}</p>`}return out};
  const renderMeaning=list=>{const clean=list.filter(line=>!/^VIEW OFFICIAL TEXT/i.test(line));return clean.map((line,i)=>`<p class="${i===0||i===clean.length-1?'legal-viewpoint':''}">${esc(line)}</p>`).join('')};
  return `<div class="legal-dialog-sections regulatory-sections">${groups.map((g,i)=>`<details ${i===0?'open':''}><summary>${esc(g.title)}</summary><div>${i===0?renderIdentify(g.lines):i===1?renderCore(g.lines):renderMeaning(g.lines)}</div></details>`).join('')}</div>`;
 }
 const renderLines=list=>list.map(line=>/^Q\d+\s*·/.test(line)?`<h4>${esc(line)}</h4>`:legalParagraph(line)).join('');
 return `<div class="legal-dialog-intro">${intro.map(legalParagraph).join('')}</div><div class="legal-dialog-sections">${groups.map((g,i)=>`<details ${i===0?'open':''}><summary>${esc(g.title)}</summary><div>${renderLines(g.lines)}</div></details>`).join('')}</div>`;
}
function renderLegal(){
 if(!document.querySelector('#legal-opening'))return;
 const locale=state.lang==='zh'?'zh':'en',text=state.texts[locale==='zh'?'legalZh':'legalEn'];const landscapeMarker=locale==='zh'?'01 ·法律全景':'01 · THE LEGAL LANDSCAPE',regMarker=locale==='zh'?'02 ·欧盟监管重点':'02 · REGULATORY FOCUS',researchMarker=locale==='zh'?'03 · 专题法律研究':'03 · FEATURED LEGAL RESEARCH',sourcesMarker=locale==='zh'?'04 · LEGAL SOURCES':'04 · LEGAL SOURCES';
 const opening=lines(text.slice(0,text.indexOf(landscapeMarker)));document.querySelector('#legal-opening').innerHTML=opening.slice(1).map(p=>`<p class="${/^[“\"]/.test(p)?'opening-question':/^本知识库以中国企业进入/.test(p)||/^This library follows typical scenarios/.test(p)?'opening-emphasis':''}">${esc(p)}</p>`).join('');
 const landscape=lines(textBetween(text,landscapeMarker,regMarker));document.querySelector('#landscape-intro').innerHTML=landscape.slice(2).map(p=>`<p class="${/^ENTER →/.test(p)||/企业走到哪里|Where(?:ver| the business) goes/i.test(p)?'landscape-key':''}">${esc(p)}</p>`).join('');
 const regStart=text.indexOf(regMarker),firstReg=text.indexOf(locale==='zh'?'01 · AI':'01 · AI',regStart);const regIntro=lines(text.slice(regStart,firstReg));document.querySelector('#regulatory-intro').innerHTML=regIntro.slice(2).map(p=>`<p>${esc(p)}</p>`).join('');
 const regs=regulatoryChunks(text);
 document.querySelector('#regulatory-grid').innerHTML=regs.map((body,i)=>`<article class="reg-card"><small>0${i+1}</small><h4>${esc(regTitles[locale][i])}</h4><p class="reg-question">${esc(regCards[locale][i][0])}</p><span class="reg-tag">${esc(regCards[locale][i][1])}</span><button data-legal-title="${esc(regTitles[locale][i])}" data-legal-body="${encodeURIComponent(body)}">${locale==='zh'?'探索':'Explore'} →</button></article>`).join('');
 const researchStart=text.indexOf(researchMarker),firstResearch=text.indexOf('01 · PEOPLE',researchStart);const researchIntro=lines(text.slice(researchStart,firstResearch));document.querySelector('#research-intro').innerHTML=researchIntro.slice(2).map(p=>`<p>${esc(p)}</p>`).join('');
 const research=researchChunks(text).filter(Boolean);document.querySelector('#research-list').innerHTML=research.map((body,i)=>{const l=lines(body);return `<article class="research-card"><span>0${i+1}</span><div><h4>${esc(l[1]||researchTitles[locale][i])}</h4><p>${esc(l[2]||'')}</p><small>${esc(l[3]||'')}</small></div><button data-legal-title="${esc(l[1]||researchTitles[locale][i])}" data-legal-body="${encodeURIComponent(body)}">${locale==='zh'?'阅读全文':'Read full article'} →</button></article>`}).join('');
 document.querySelector('#sources-intro').innerHTML='';
 document.querySelector('#legal-links').innerHTML=officialSources.map(group=>`<section class="source-group"><h4>${group.group}<small>${locale==='zh'?group.zh:''}</small></h4><div>${group.items.map(x=>`<a href="${x[3]}" target="_blank" rel="noopener"><span><b>${x[0]}</b><small>${locale==='zh'?x[1]:x[2]}</small></span><i>↗</i></a>`).join('')}</div></section>`).join('');
 const close=lines(textBetween(text,'CLOSING NOTE',null));document.querySelector('#closing-note').innerHTML=`<small>CLOSING NOTE</small><h3>${esc(close[1]||'')}</h3>${close.slice(2,4).map(p=>`<p>${esc(p)}</p>`).join('')}`;
 document.querySelector('#closing-tail').textContent=close[4]||'';
 document.querySelector('#legal-disclaimer').textContent=close[5]||'';
 document.querySelectorAll('[data-legal-body]').forEach(b=>b.onclick=()=>openLegalDialog(b.dataset.legalTitle,decodeURIComponent(b.dataset.legalBody)));
 bindDialogs();
}
function bindAccordions(){document.querySelectorAll('.accordion-trigger:not(.experience-open)').forEach(b=>b.onclick=()=>b.closest('.accordion-item').classList.toggle('open'))}
function bindDialogs(){document.querySelectorAll('[data-dialog-body]').forEach(b=>b.onclick=()=>openDialog(b.dataset.dialogTitle,decodeURIComponent(b.dataset.dialogBody)))}
function openDialog(title,body){const d=document.querySelector('#content-dialog');d.querySelector('.dialog-body').innerHTML=`<h2>${esc(title)}</h2><p>${esc(body)}</p>`;d.showModal()}
function openLegalDialog(title,body){const d=document.querySelector('#content-dialog'),panel=d.querySelector('.dialog-body');panel.innerHTML=`<h2>${esc(title)}</h2>${formatLegalBody(body)}`;d.scrollTop=0;panel.scrollTop=0;d.showModal()}
function openEducation(key){
 const item=educationDetails[key][state.lang];const d=document.querySelector('#content-dialog');
 d.querySelector('.dialog-body').innerHTML=`<div class="edu-detail"><p class="edu-kicker">${state.lang==='zh'?'教育经历':'EDUCATION'}</p><h2>${esc(item.school)}</h2><h3>${esc(item.degree)}</h3><p class="edu-meta">${esc(item.meta)}</p><p class="edu-description">${esc(item.description)}</p><div class="edu-modules"><small>${state.lang==='zh'?'核心课程':'SELECTED MODULES'}</small><div>${item.courses.map(c=>`<span>${esc(c)}</span>`).join('')}</div></div></div>`;d.showModal();
}
function openExperience(index){
 const locale=state.lang==='zh'?'zh':'en',x=experience[locale][index],raw=textBetween(state.texts.background,x[2],x[3]),arr=lines(raw);
 const keyLabel=locale==='zh'?'核心收获':'KEY TAKEAWAY',core=arr.findIndex(v=>v===keyLabel),tagIndex=arr.findIndex(v=>v.startsWith('🏷️'));
 const title=arr[0]||x[0],org=arr[1]||'',meta=arr[2]||x[1],intro=arr[3]||'';
 const bullets=arr.slice(4,core>0?core:(tagIndex>0?tagIndex:arr.length));const takeaway=core>0?arr[core+1]:'';const extra=core>0?arr.slice(core+2,tagIndex>0?tagIndex:arr.length):[];const tags=tagIndex>0?arr[tagIndex].replace('🏷️','').split('·').map(v=>v.trim()).filter(Boolean):[];
 const d=document.querySelector('#content-dialog');d.querySelector('.dialog-body').innerHTML=`<div class="exp-detail"><p class="edu-kicker">${locale==='zh'?'工作经历':'PROFESSIONAL EXPERIENCE'} · 0${index+1}</p><h2>${esc(title)}</h2><h3>${esc(org)}</h3><p class="edu-meta">${esc(meta)}</p><p class="edu-description">${esc(intro)}</p>${bullets.length?`<div class="detail-list"><small>${locale==='zh'?'主要经历':'RESPONSIBILITIES & EXPERIENCE'}</small><ul>${bullets.map(v=>`<li>${esc(v)}</li>`).join('')}</ul></div>`:''}${takeaway?`<div class="takeaway"><small>${keyLabel}</small><strong>${esc(takeaway)}</strong></div>`:''}${extra.length?`<p class="detail-extra">${extra.map(esc).join(' · ')}</p>`:''}<div class="detail-tags">${tags.map(v=>`<span>${esc(v)}</span>`).join('')}</div></div>`;d.showModal();
}
function openLeadership(key){
 const locale=state.lang==='zh'?'zh':'en',item=leadershipDetails[key][locale],d=document.querySelector('#content-dialog');
 d.querySelector('.dialog-body').innerHTML=`<div class="exp-detail"><p class="edu-kicker">${locale==='zh'?'跨文化协作与领导力':'CROSS-CULTURAL COLLABORATION & LEADERSHIP'}</p><h2>${esc(item.title)}</h2><h3>${esc(item.org)}</h3><p class="edu-meta">${esc(item.meta)}</p><p class="edu-description">${esc(item.intro)}</p><div class="detail-list"><small>${locale==='zh'?'经历与贡献':'EXPERIENCE & CONTRIBUTION'}</small><ul>${item.bullets.map(v=>`<li>${esc(v)}</li>`).join('')}</ul></div><div class="detail-tags">${item.tags.map(v=>`<span>${esc(v)}</span>`).join('')}</div></div>`;d.showModal();
}

document.querySelector('.lang-toggle').onclick=()=>{state.lang=state.lang==='zh'?'en':'zh';sessionStorage.setItem('siteLang',state.lang);state.expandedEpisodes=false;renderAll()};
document.querySelector('.menu-toggle').onclick=e=>{const n=document.querySelector('.main-nav');n.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',n.classList.contains('open'))};
document.querySelectorAll('.main-nav a').forEach(a=>a.onclick=()=>document.querySelector('.main-nav').classList.remove('open'));
document.querySelector('#more-episodes').onclick=()=>{state.expandedEpisodes=true;renderProjects();document.querySelector('#ep-4')?.scrollIntoView({behavior:'smooth'})};
document.querySelector('.dialog-close').onclick=()=>document.querySelector('#content-dialog').close();
document.querySelector('#content-dialog').onclick=e=>{if(e.target.id==='content-dialog')e.target.close()};
document.querySelector('.copy-wechat').onclick=async()=>{await navigator.clipboard.writeText('YYD9017');const t=document.querySelector('.toast');t.textContent=state.lang==='zh'?'微信号已复制':'WeChat ID copied';t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)};
document.querySelectorAll('.education-open').forEach(card=>{card.addEventListener('click',()=>openEducation(card.dataset.edu));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openEducation(card.dataset.edu)}})});
document.querySelectorAll('.leadership-card').forEach(card=>{card.addEventListener('click',()=>openLeadership(card.dataset.leadership));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLeadership(card.dataset.leadership)}})});
document.querySelectorAll('.work-card').forEach(card=>{const toggle=()=>{const open=card.classList.toggle('open');card.setAttribute('aria-expanded',String(open))};card.addEventListener('click',toggle);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}})});
function initGalleryAutoplay(){
 const gallery=document.querySelector('.culture-block .gallery');if(!gallery||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 let paused=false,timer;
 const schedule=delay=>{clearTimeout(timer);if(!paused)timer=setTimeout(advance,delay)};
 const advance=()=>{if(paused||document.hidden)return;const first=gallery.querySelector('figure');const gap=parseFloat(getComputedStyle(gallery).gap)||12;const step=(first?.getBoundingClientRect().width||280)+gap;const end=gallery.scrollWidth-gallery.clientWidth;const restarting=gallery.scrollLeft>=end-8;gallery.scrollTo({left:restarting?0:Math.min(gallery.scrollLeft+step,end),behavior:'smooth'});schedule(restarting?10000:3200)};
 const pause=()=>{paused=true;clearTimeout(timer)},resume=()=>{paused=false;schedule(gallery.scrollLeft<8?10000:3200)};
 gallery.addEventListener('mouseenter',pause);gallery.addEventListener('mouseleave',resume);gallery.addEventListener('focusin',pause);gallery.addEventListener('focusout',resume);gallery.addEventListener('touchstart',pause,{passive:true});gallery.addEventListener('touchend',()=>setTimeout(resume,1800),{passive:true});
 document.addEventListener('visibilitychange',()=>document.hidden?pause():resume());
 schedule(10000);
}
window.addEventListener('scroll',()=>document.querySelector('.site-header').classList.toggle('scrolled',currentPage!=='about'||scrollY>40));
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const sio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('.main-nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-40% 0px -50%'});document.querySelectorAll('main>section[id]').forEach(s=>sio.observe(s));
initGalleryAutoplay();
load().catch(err=>{console.error(err);document.querySelector('.toast').textContent='Content loading error'});
