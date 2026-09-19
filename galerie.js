'use strict';

Object.assign(AR, {
 albumLabel:'معرض الصور', albumTitle:'المشاعر،<br>في صور.',
 albumSubtitle:'بورتريهات، كواليس وسجادة حمراء.',
 albumIntro:'لحظات من الحياة، لقاءات وكواليس تصوير ومناسبات ترسم ملامح مسيرتي.',
 albumHeroQuote:'لقاءات،<br>ومشاعر،<br>وذكريات<br>تبقى معنا.',
 albumAll:'الكل',albumPortraits:'بورتريهات',albumCarpets:'السجادة الحمراء',albumSets:'التصوير',albumMeetings:'لقاءات',
 albumFullscreen:'عرض بملء الشاشة',albumQuote:'كل صورة تحكي لقاءً، وشعوراً، وفصلاً من حياتي.',
 albumMore:'شاهدوا كل الصور',albumLess:'العودة إلى المختارات',
 albumPress:'الصحافة والتعاون',albumContactTitle:'طلب صور<br>أو مقابلة؟',
 albumContactText:'فريقنا رهن إشارتكم لطلبات الصور والمقابلات والمعلومات.',
 albumContact:'تواصلوا معنا',albumContactQuote:'صور<br>وحكايات<br>جديدة.',
 albumFooterTag:'ممثلة — صانعة المشاعر',albumFollow:'تابعوني',
 albumSearchLabel:'البحث في الصور',albumSearchClear:'مسح',albumEmptyTitle:'لا توجد صور',albumEmptyText:'جربوا كلمة أخرى أو فئة مختلفة.'
});

const albumGrid = document.querySelector('.album-grid');
const albumPhotos = [...albumGrid.querySelectorAll('.album-photo')];
const albumFilters = [...document.querySelectorAll('[data-album-filter]')];
const albumSearch = document.querySelector('#album-query');
const albumSearchPanel = document.querySelector('#album-search-panel');
const albumSearchToggle = document.querySelector('.album-search-toggle');
const albumMoreButton = document.querySelector('#album-more');
const albumStatus = document.querySelector('#album-status');
const albumQuote = document.querySelector('.album-interlude');
let albumFilter = 'all';
let albumExpanded = false;
const normalizeAlbum = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();

function updateAlbum() {
 const query = normalizeAlbum(albumSearch.value);
 const curated = albumFilter === 'all' && !query && !albumExpanded;
 albumGrid.classList.toggle('is-curated',curated);
 albumQuote.hidden = !curated;
 albumPhotos.forEach((photo) => {
  const categoryMatch = albumFilter === 'all' || photo.dataset.albumCategory === albumFilter;
  const textMatch = !query || normalizeAlbum(photo.dataset.search).includes(query);
  photo.hidden = !categoryMatch || !textMatch || (curated && photo.dataset.featured !== 'true');
 });
 const count = albumPhotos.filter((photo) => !photo.hidden).length;
 albumStatus.textContent = language === 'ar' ? count + ' صورة من ' + albumPhotos.length : count + ' photographies sur ' + albumPhotos.length;
 document.querySelector('.album-empty').hidden = count !== 0;
 document.querySelector('[data-gallery-expand]').disabled = count === 0;
 albumMoreButton.hidden = albumFilter !== 'all' || !!query;
 albumMoreButton.querySelector('span').textContent = language === 'ar' ? (albumExpanded ? AR.albumLess : AR.albumMore) : (albumExpanded ? 'REVENIR À LA SÉLECTION' : 'VOIR LES 34 PHOTOS');
 albumMoreButton.setAttribute('aria-expanded',String(albumExpanded));
 albumFilters.forEach((button) => button.setAttribute('aria-pressed',String(button.dataset.albumFilter === albumFilter)));
 currentImageIndex = 0;
}
albumFilters.forEach((button) => button.addEventListener('click',() => {
 albumFilter = button.dataset.albumFilter;
 updateAlbum();
}));
albumMoreButton.addEventListener('click',() => {
 albumExpanded = !albumExpanded;
 updateAlbum();
 document.querySelector('.album-toolbar').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});
});
albumSearchToggle.addEventListener('click',() => {
 const opening = albumSearchPanel.hidden;
 albumSearchPanel.hidden = !opening;
 albumSearchToggle.setAttribute('aria-expanded',String(opening));
 if (opening) albumSearch.focus();
 else { albumSearch.value=''; updateAlbum(); }
});
albumSearch.addEventListener('input',updateAlbum);
document.querySelector('#album-clear').addEventListener('click',() => { albumSearch.value=''; updateAlbum(); albumSearch.focus(); });
document.addEventListener('site:languagechange', () => {
 albumSearch.placeholder = language === 'ar' ? 'بورتريه، مراكش، كواليس…' : 'Un portrait, Marrakech, un tournage…';
 updateAlbum();
});

const rotatedPhotoObserver = new ResizeObserver((entries) => {
 for (const {target,contentRect} of entries) {
  const img=target.querySelector('img');
  img.style.width=contentRect.height+'px';
  img.style.height=contentRect.width+'px';
 }
});
albumPhotos.filter((photo)=>photo.dataset.rotation).forEach((photo)=>rotatedPhotoObserver.observe(photo));

document.querySelectorAll('[data-album-info]').forEach((button) => button.addEventListener('click',() => {
 const privacy=button.dataset.albumInfo==='privacy';
 openContent(titleHTML('FARAH EL FASSI',privacy?'Confidentialité':'Informations sur le site')+
  (privacy?'<p>Cette galerie se consulte sans compte. La recherche et les filtres fonctionnent dans votre navigateur, sans transmettre vos recherches à un serveur. Les liens vers les réseaux sociaux et le lien e-mail ouvrent des services externes, soumis à leurs propres règles.</p>':'<p>Site de présentation du parcours artistique de Farah El Fassi. Pour toute demande de visuel, d’interview ou d’information concernant le site, vous pouvez contacter notre équipe.</p>')+
  '<p>'+contactHTML()+'</p>');
}));
updateAlbum();
