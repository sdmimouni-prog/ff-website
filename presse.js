'use strict';

const pressFilters = [...document.querySelectorAll('[data-press-filter]')];
const pressCards = [...document.querySelectorAll('[data-press-category]')];
const pressFilterStatus = document.querySelector('#press-filter-status');
const pressLoadMore = document.querySelector('#press-load-more');
const pressPageSize = 6;
let pressCurrentFilter = 'all';
let pressVisibleLimit = pressPageSize;

function renderPress() {
  const matches = pressCards.filter(card => pressCurrentFilter === 'all' || card.dataset.pressCategory.split(' ').includes(pressCurrentFilter));
  const visible = matches.slice(0, pressVisibleLimit);
  pressCards.forEach(card => { card.hidden = !visible.includes(card); });
  pressFilters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.pressFilter === pressCurrentFilter)));
  pressLoadMore.hidden = visible.length === matches.length;
  pressFilterStatus.textContent = language === 'ar'
    ? `${visible.length} من ${matches.length} مواد إعلامية`
    : `${visible.length} sur ${matches.length} publications`;
}
pressFilters.forEach(button => button.addEventListener('click', () => {
  pressCurrentFilter = button.dataset.pressFilter;
  pressVisibleLimit = pressPageSize;
  renderPress();
}));
pressLoadMore.addEventListener('click', () => {
  const firstNewCard = pressCards.filter(card => card.hidden && (pressCurrentFilter === 'all' || card.dataset.pressCategory.split(' ').includes(pressCurrentFilter)))[0];
  pressVisibleLimit += pressPageSize;
  renderPress();
  // Continue keyboard reading at the first newly revealed publication.
  firstNewCard?.querySelector('a')?.focus({ preventScroll: true });
});
function updatePressDates() {
  const formatter = new Intl.DateTimeFormat(language === 'ar' ? 'ar-MA' : 'fr-FR', { day:'numeric', month:'long', year:'numeric', timeZone:'UTC' });
  document.querySelectorAll('[data-press-date]').forEach(time => {
    time.textContent = formatter.format(new Date(time.dateTime + 'T12:00:00Z'));
  });
  document.querySelector('.press-filters').setAttribute('aria-label', language === 'ar' ? 'تصفية المواد الإعلامية' : 'Filtrer la revue de presse');
}
Object.assign(AR, {
  pressLabel:'الصحافة والإعلام', pressTitle:'أمام الكاميرات.<br>في وسائل الإعلام.',
  pressSubtitle:'حوارات ولقاءات ونظرات إلى مسيرتي.', pressFormats:'مقالات · حوارات · فيديوهات',
  pressIntroQuote:'حكايات نتشاركها<br>وتتردد أصداؤها<br>بعيداً عن الشاشات.', pressFeatured:'في الواجهة',
  pressFeatureTitle:'حياة عادية،<br>مغامرة سينمائية جديدة',
  pressFeatureDescription:'تقدم فرح الفاسي لهسبريس هذا الإنتاج المغربي القطري المشترك، وتتحدث عن التصوير الذي جرى بين البلدين.',
  pressRead:'قراءة المقال', pressReadInterview:'قراءة الحوار', pressSource:'المقال الأصلي: هسبريس · بالعربية',
  pressInterviewsLabel:'حوارات وفيديوهات', pressInterviewsTitle:'للمشاهدة والاستماع.',
  pressInterviewsQuote:'حوارات صادقة<br>حول السينما والحياة والمشاريع.',
  pressWatch:'مشاهدة الحوار', pressWatchUpper:'مشاهدة الحوار', pressReviewTitle:'في الصحافة',
  pressAll:'الكل', pressArticles:'مقالات', pressInterviews:'حوارات', pressVideos:'فيديوهات',
  pressMore:'عرض المزيد', pressLanguage_fr:'بالفرنسية', pressLanguage_ar:'بالعربية', pressNewTab:' — نافذة جديدة',
  pressNote:'عناوين تقديمية مختصرة ومترجمة. يمكن قراءة كل مادة أصلية على موقع الوسيلة الإعلامية المذكورة.',
  pressSpace:'الفضاء الصحفي', pressEssentials:'كل ما تحتاجونه<br>للحديث عن فرح.',
  pressFilmography:'الأعمال الفنية', pressBio:'السيرة الذاتية', pressPhotos:'الصور', pressExplore:'اكتشف',
  pressContactTitle:'حوار، بورتريه،<br>أم لقاء؟', pressContactDescription:'لحوار أو بورتريه<br>أو دعوة، تواصلوا معنا.',
  pressContact:'التواصل مع الفريق', pressContactQuote:'حكايات<br>نشاركها معاً.'
});

/* PRESS_TRANSLATIONS_START */
Object.assign(AR, {
  "press_golden": "أفضل ممثلة إفريقية في Africa Golden Awards",
  "pressCredit_golden": "صورة منشورة لدى GHALIA · LE SITE INFO",
  "press_agadir": "البطل وتكريم أكادير ومشاريع جديدة",
  "pressCredit_agadir": "صورة منشورة لدى FEBRAYER",
  "press_vie": "حياة عادية، بين المغرب وقطر",
  "pressCredit_vie": "صورة منشورة لدى HESPRESS",
  "press_sale": "تكريم في مهرجان سلا لفيلم المرأة",
  "pressCredit_sale": "صورة منشورة لدى Maroc.ma",
  "press_graduate": "أول تجربة إخراجية مع فيلم التخرج",
  "pressCredit_graduate": "صورة منشورة لدى HESPRESS",
  "press_rahma": "رحمة: شخصية جديدة على الشاشة",
  "pressCredit_rahma": "صورة: K. Essebar / Le360",
  "press_marrakech": "أدوار وطموحات في مهرجان مراكش",
  "pressCredit_marrakech": "صورة منشورة لدى SAFIRCOM",
  "press_ecrans": "آخر اختيار: تتويج في ياوندي",
  "pressCredit_ecrans": "صورة منشورة لدى FAMILLE ACTUELLE",
  "press_batal": "الدراسة السينمائية ومغامرة البطل",
  "pressCredit_batal": "صورة منشورة لدى HESPRESS",
  "press_warda": "وردة في مسلسل بين القصور",
  "pressCredit_warda": "صورة منشورة لدى AKHBARONA",
  "press_lamora": "لامورا: جائزة التشخيص في غرناطة",
  "pressCredit_lamora": "مواقع التواصل الاجتماعي / هسبريس",
  "press_dakhla": "في لجنة تحكيم مهرجان الداخلة",
  "pressCredit_dakhla": "صورة منشورة لدى LE360",
  "press_studies": "العودة إلى الدراسة من أجل السينما",
  "pressCredit_studies": "صورة: D.R. / Le360",
  "press_page": "فتيحة، شخصيتها في الصفحة الأولى",
  "pressCredit_page": "صورة منشورة لدى MACHAHID",
  "press_roles": "من الأدوار الأولى إلى شخصيات التاريخ",
  "pressCredit_roles": "صورة: D.R. / Aujourd’hui le Maroc"
});
/* PRESS_TRANSLATIONS_END */

document.addEventListener('site:languagechange', () => { renderPress(); updatePressDates(); });
renderPress();
updatePressDates();
