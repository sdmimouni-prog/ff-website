'use strict';

Object.assign(AR, {
  screenTitle: 'أدوار،<br>حكايات،<br>ومشاعر<span>.</span>',
  screenIntro: 'من السينما إلى التلفزيون، تمنح فرح الفاسي الحياة لشخصيات تلامسنا وتجمعنا. حكايات من هنا ومن هناك يحملها الشغف نفسه.',
  screenWatch: 'شاهدوا العرض الفني', screenExplore: 'اكتشفوا الأعمال',
  screenFeatured: 'في الواجهة', screenAll: 'جميع الأعمال',
  screenBackstage: 'خلف الكواليس', screenGallery: 'معرض الصور',
  screenNext: 'قريباً', screenNewStories: 'للحكاية بقية.',
  screenNextText: 'مشاريع ولقاءات ولحظات من التصوير: تابعوا آخر مستجداتي.',
  screenNews: 'تابعوا أخباري', screenSpotlight: 'على الشاشة',
  screenSpotlightText: 'يواجه زواج نورا ومهدي اختباراً صعباً بسبب إدمان نورا على البوكر، بين الديون والأسرار والخيارات الصعبة.',
  screenDiscover: 'اكتشفوا العمل', screenAuthenticity: 'عوالم متنوعة،<br>وطموح واحد:<br>الصدق.',
  screenAlways: 'دائماً حكايات جديدة<br>لنرويها…', screenJourney: 'مساري'
});

const screenStrip = document.querySelector('.screen-strip');
const screenDirections = [...document.querySelectorAll('[data-screen-direction]')];
function updateScreenStrip() {
  const max = screenStrip.scrollWidth - screenStrip.clientWidth;
  screenDirections.forEach(button => {
    button.disabled = Number(button.dataset.screenDirection) < 0 ? screenStrip.scrollLeft <= 2 : screenStrip.scrollLeft >= max - 2;
  });
}
function moveScreenStrip(direction) {
  screenStrip.scrollBy({left: direction * screenStrip.clientWidth * .8, behavior: filmMotion.matches ? 'instant' : 'smooth'});
}
screenDirections.forEach(button => button.addEventListener('click', () => moveScreenStrip(Number(button.dataset.screenDirection))));
screenStrip.addEventListener('scroll', updateScreenStrip, {passive:true});
screenStrip.addEventListener('keydown', event => {
  if (event.target !== screenStrip || !['ArrowLeft','ArrowRight'].includes(event.key)) return;
  event.preventDefault(); moveScreenStrip(event.key === 'ArrowRight' ? 1 : -1);
});
new ResizeObserver(updateScreenStrip).observe(screenStrip);
updateScreenStrip();

let catalogueKind = 'all';
const normalizeSearch = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase();
function renderCatalogueResults() {
  const results = document.querySelector('.catalogue-results');
  const input = document.querySelector('#project-search');
  if (!results || !input) return;
  const term = normalizeSearch(input.value.trim());
  const projects = Object.entries(FILMS).filter(([, film]) =>
    (catalogueKind === 'all' || film.kind === ({cinema:'Long métrage',series:'Série TV',telefilms:'Téléfilm'}[catalogueKind])) &&
    normalizeSearch(`${film.title} ${film.international || ''} ${film.arabic} ${film.director} ${film.year}`).includes(term)
  );
  results.innerHTML = projects.length ? projects.map(([key,film]) => `<button type="button" class="screen-card catalogue-card" data-film="${key}"><span class="screen-art ${key}"><img class="poster-original" src="${film.image}" alt="Affiche de ${escapeHTML(film.title)}"></span><strong>${escapeHTML(film.title)}</strong><time>${film.year} · ${film.kind}</time></button>`).join('') : `<p class="catalogue-empty">${language === 'ar' ? 'لا توجد نتائج. جرّبوا عنواناً آخر.' : 'Aucun projet trouvé. Essayez un autre titre.'}</p>`;
  document.querySelector('#catalogue-count').textContent = language === 'ar' ? `${projects.length} أعمال` : `${projects.length} projet${projects.length > 1 ? 's' : ''}`;
}
function openCatalogue(kind) {
  catalogueKind = kind;
  const labels = language === 'ar' ? ['الكل','سينما','مسلسلات','أفلام تلفزيونية'] : ['Tous','Cinéma','Séries TV','Téléfilms'];
  openContent(titleHTML(language === 'ar' ? 'الأعمال' : 'FILMOGRAPHIE', language === 'ar' ? 'كل حكاية، عالم.' : 'Chaque histoire, un univers.') + `<div class="catalogue-tools"><label class="sr-only" for="project-search">${language === 'ar' ? 'البحث عن عمل' : 'Rechercher un projet'}</label><input id="project-search" type="search" placeholder="${language === 'ar' ? 'العنوان، المخرج، السنة…' : 'Titre, réalisation, année…'}"><div class="catalogue-filters" aria-label="Type de projet">${['all','cinema','series','telefilms'].map((value,index)=>`<button type="button" data-catalogue-filter="${value}" aria-pressed="${kind === value}">${labels[index]}</button>`).join('')}</div><small id="catalogue-count" role="status"></small></div><div class="catalogue-results"></div>`);
  renderCatalogueResults();
  document.querySelector('#project-search').focus({preventScroll:true});
}
document.querySelectorAll('[data-catalogue]').forEach(button => button.addEventListener('click',()=>openCatalogue(button.dataset.catalogue)));
document.addEventListener('input', event => { if (event.target.id === 'project-search') renderCatalogueResults(); });
document.addEventListener('click', event => {
  const button = event.target.closest('[data-catalogue-filter]');
  if (!button) return;
  catalogueKind = button.dataset.catalogueFilter;
  document.querySelectorAll('[data-catalogue-filter]').forEach(item => item.setAttribute('aria-pressed',String(item === button)));
  renderCatalogueResults();
});
