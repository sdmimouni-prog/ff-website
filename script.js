'use strict';

// A bounded intro, dismissible by keyboard, with no wait for remote assets.
(() => {
  const root = document.documentElement;
  const skip = document.querySelector('.cinema-skip');
  const shell = document.querySelector('.site-shell');
  if (!root.classList.contains('cinema-enter')) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timer;
  const finish = () => {
    const hadFocus = document.activeElement === skip;
    root.classList.remove('cinema-enter');
    shell.inert = false;
    clearTimeout(timer);
    document.removeEventListener('keydown', onKey);
    motion.removeEventListener('change', finish);
    if (hadFocus) document.querySelector('.site-header .brand').focus({ preventScroll: true });
  };
  const onKey = (event) => { if (event.key === 'Escape' || event.key === 'Tab') finish(); };
  shell.inert = true;
  skip.addEventListener('click', finish, { once: true });
  document.addEventListener('keydown', onKey);
  motion.addEventListener('change', finish);
  timer = window.setTimeout(finish, 3400);
})();

/**
 * Configuration: connect only verified profiles and your own services.
 * Empty values deliberately show an honest placeholder instead of pretending
 * to send an email, play a video or link to an official social profile.
 */
const SITE_CONFIG = {
  contactEmail: 'contact@farahelfassi.com',
  showreelVideoUrl: '', // À renseigner à réception de la vidéo.
  social: {
    instagram: 'https://www.instagram.com/farahelfassi1/',
    facebook: 'https://www.facebook.com/Farah.Elfassi.Officiel/'
  }
};

const FILMS = {
  "rahma": {
    "title": "Rahma",
    "arabic": "رحمة",
    "year": 2025,
    "kind": "Série TV",
    "director": "",
    "role": "Nadia",
    "summary": "Pour échapper à un mariage destructeur, Rahma tente de reconstruire sa vie. Farah El Fassi incarne Nadia.",
    "dates": "2025 — première saison référencée par IMDb.",
    "sources": [
      {
        "label": "IMDb — fiche du projet",
        "url": "https://www.imdb.com/fr/title/tt35950179/"
      }
    ],
    "image": "assets/films/rahma.jpg",
    "meta": "2025 · Série TV",
    "writer": "Bouchra Malak",
    "duration": "45 min par épisode"
  },
  "quitte": {
    "title": "Quitte ou double",
    "arabic": "آخر اختيار",
    "year": 2024,
    "kind": "Long métrage",
    "director": "Rachida Saadi",
    "summary": "Le mariage de Noura et Mehdi est mis à l’épreuve par l’addiction de Noura au poker, entre dettes, secrets et choix difficiles.",
    "dates": "2024 — année indiquée par la production et le Festival national du film.",
    "sources": [
      {
        "label": "Janaprod — production",
        "url": "https://www.janaprod.com/quitte-ou-double.html"
      },
      {
        "label": "Festival national du film",
        "url": "https://www.fnf.ma/detail_doc?id=OTQ3"
      },
      {
        "label": "IMDb — fiche du projet",
        "url": "https://www.imdb.com/fr/title/tt35501341/"
      }
    ],
    "duration": "86 min",
    "cast": "Farah El Fassi, Mohamed Nadif, Youssef El Arabi, Rania Rabia",
    "image": "assets/films/quitte.webp",
    "meta": "2024 · Long métrage",
    "role": "Noura (Nora dans IMDb)"
  },
  "bayn": {
    "title": "Bayn Al Qosour",
    "arabic": "بين القصور",
    "year": 2024,
    "kind": "Série TV",
    "director": "Hicham El Jebbari",
    "summary": "Sakina revient vivre dans le quartier de son enfance. Son retour la confronte à son passé et bouleverse les repères de sa famille.",
    "dates": "Première diffusion : Ramadan 2024, sur MBC5 et Shahid.",
    "sources": [
      {
        "label": "Cedars Art Production",
        "url": "https://sabbah.com/ar/details/743"
      },
      {
        "label": "Entretien avec la scénariste — Le360",
        "url": "https://fr.le360.ma/culture/lidee-le-personnage-de-lqatorze-le-casting-la-scenariste-bouchra-malek-nous-dit-tout-sur-la-serie_ITAK245FDRBXHJEMLVDJFTSCXY/"
      },
      {
        "label": "IMDb — fiche du projet",
        "url": "https://www.imdb.com/fr/title/tt32125685/"
      }
    ],
    "writer": "Bouchra Malek",
    "cast": "Mohamed Khouyi, Houda Rihani, Saadia Ladib, Aziz Hattab, Farah El Fassi",
    "image": "assets/films/bayn.webp",
    "meta": "2024 · Série TV",
    "role": "Warda"
  },
  "batal": {
    "title": "L’Batal",
    "arabic": "البطل",
    "year": 2024,
    "kind": "Long métrage",
    "director": "Omar Lotfi",
    "role": "",
    "summary": "Un comédien amateur accepte de jouer un faux amant pour couvrir un ami. Une disparition transforme ce rôle improvisé en une aventure risquée.",
    "dates": "2024 — sortie marocaine le 9 octobre selon IMDb.",
    "sources": [
      {
        "label": "IMDb — fiche du projet",
        "url": "https://www.imdb.com/fr/title/tt34741810/"
      }
    ],
    "image": "assets/films/batal.jpg",
    "meta": "2024 · Long métrage",
    "duration": "102 min"
  },
  "salamate": {
    "title": "Salamate et ses filles",
    "arabic": "سلمات أبو البنات",
    "year": 2021,
    "kind": "Série TV",
    "director": "",
    "role": "",
    "summary": "Un père fraîchement retraité découvre autrement le quotidien de ses trois filles et les changements de sa famille.",
    "dates": "2021 — participation de Farah indiquée dans le crédit IMDb. La série y est datée de 2020 à 2023 ; cette période ne désigne pas nécessairement toute sa participation.",
    "sources": [
      {
        "label": "IMDb — fiche du projet",
        "url": "https://www.imdb.com/fr/title/tt13493180/"
      }
    ],
    "image": "assets/films/salamate.jpg",
    "meta": "2021 · Série TV"
  },
  "mora": {
    "title": "La Mora",
    "arabic": "لامورا",
    "year": 2020,
    "kind": "Long métrage",
    "director": "Mohamed Ismaïl",
    "role": "Maria",
    "summary": "À travers une lettre de sa mère, Rosa remonte le fil d’une histoire familiale entre l’Espagne et le Maroc, marquée par la guerre.",
    "dates": "2020 — année de l’œuvre dans IMDb et le catalogue du Festival de Salé 2022. IMDb mentionne une sortie marocaine le 24 septembre 2025.",
    "sources": [
      {
        "label": "IMDb — fiche du projet",
        "url": "https://www.imdb.com/fr/title/tt10743088/"
      }
    ],
    "image": "assets/films/mora.jpg",
    "meta": "2020 · Long métrage",
    "duration": "91 min"
  },
  "page": {
    "title": "La Première Page",
    "arabic": "الصفحة الأولى",
    "year": 2018,
    "kind": "Série TV",
    "director": "Driss Roukhe",
    "summary": "Le quotidien de journalistes à la recherche d’informations exclusives pour leur média en ligne, à travers différentes questions de société.",
    "dates": "Diffusée en 2018 sur Al Aoula.",
    "sources": [
      {
        "label": "Entretien avec Farah El Fassi — Machahid",
        "url": "https://machahid.info/166756.html"
      },
      {
        "label": "Présentation de la série — Alyaoum24",
        "url": "https://alyaoum24.com/1080977.html"
      }
    ],
    "role": "Fatiha",
    "image": "assets/films/page.webp",
    "meta": "2018 · Série TV"
  },
  "bahlawan": {
    "title": "Al-Bahlawan",
    "arabic": "البهلوان",
    "year": 2016,
    "kind": "Téléfilm",
    "director": "Mohamed Chrif Tribak",
    "role": "Sanae",
    "summary": "Marié, Soufian retrouve Sanae, son ancienne compagne. Cette rencontre inattendue bouleverse son équilibre.",
    "dates": "2016 — téléfilm référencé par IMDb.",
    "sources": [
      {
        "label": "IMDb — fiche du projet",
        "url": "https://www.imdb.com/fr/title/tt28259265/"
      }
    ],
    "image": "assets/films/bahlawan.jpg",
    "meta": "2016 · Téléfilm",
    "duration": "85 min"
  },
  "espoirs": {
    "title": "Dés… Espoirs",
    "arabic": "إحباط",
    "year": 2015,
    "kind": "Long métrage",
    "director": "Mohamed Ismail",
    "summary": "Amine, un architecte marqué par son enfance, voit ses certitudes et sa vie sentimentale bouleversées par sa rencontre avec Leïla.",
    "dates": "Production : 2015 selon le CCM. Sortie en salles au Maroc : 28 novembre 2018 selon Le Matin. IMDb retient 2016.",
    "sources": [
      {
        "label": "Centre cinématographique marocain",
        "url": "https://www.ccm.ma/en/fiche_film-673"
      },
      {
        "label": "Le Matin — sortie en salles",
        "url": "https://lematin.ma/cinema/maroc/film/des-espoirs"
      },
      {
        "label": "IMDb — fiche du projet",
        "url": "https://www.imdb.com/fr/title/tt8871138/"
      }
    ],
    "duration": "122 min (fiche CCM)",
    "cast": "Omar Lotfi, Farah El Fassi, Fehd Benchemsi, Ibtissam Moustatir",
    "image": "assets/films/espoirs.webp",
    "meta": "2015 · Long métrage",
    "role": "Leïla"
  },
  "bonheurs": {
    "title": "Petits bonheurs",
    "arabic": "أفراح صغيرة",
    "year": 2015,
    "kind": "Long métrage",
    "director": "Mohamed Chrif Tribak",
    "summary": "À Tétouan, Noufissa et sa mère sont accueillies chez Lalla Amina. Une profonde amitié naît entre Noufissa et Fetouma, bientôt fragilisée par des fiançailles tenues secrètes.",
    "dates": "2015 — année de référence du Centre cinématographique marocain. IMDb retient 2016.",
    "sources": [
      {
        "label": "Centre cinématographique marocain",
        "url": "https://www.ccm.ma/en/fiche_film.php?id=663"
      },
      {
        "label": "IMDb — fiche du projet",
        "url": "https://www.imdb.com/fr/title/tt3644024/"
      }
    ],
    "duration": "85 min",
    "cast": "Anissa Lanaya, Farah El Fassi, Maha Daoud, Fama Ferrah",
    "image": "assets/films/bonheurs.webp",
    "meta": "2015 · Long métrage",
    "role": "Chama"
  },
  "hibal": {
    "title": "Hibal Rih",
    "arabic": "حبال الريح",
    "year": 2015,
    "kind": "Série TV",
    "director": "Driss Roukhe",
    "role": "",
    "summary": "Une série marocaine qui puise ses récits dans les histoires populaires et les mythes.",
    "dates": "2015 — première diffusion indiquée au 18 juin dans IMDb. Le CCM documente le tournage et la réalisation de Driss Roukhe.",
    "sources": [
      {
        "label": "IMDb — fiche du projet",
        "url": "https://www.imdb.com/fr/title/tt37673381/"
      },
      {
        "label": "CCM — productions télévisées 2015",
        "url": "https://www.ccm.ma/download-file?filename=doc1_1157.pdf"
      }
    ],
    "image": "assets/films/hibal.jpg",
    "meta": "2015 · Série TV"
  },
  "coeur": {
    "title": "Cœur noyé",
    "arabic": "القلب الغارق",
    "year": 2014,
    "kind": "Long métrage",
    "director": "Farid Lakkimi",
    "summary": "L’inspecteur Medi interroge Souad, ancienne assistante du peintre Kamal. Son témoignage recompose les destins tragiques des personnes qu’elle a connues.",
    "dates": "Production : 2014 selon AlloCiné. Certaines filmographies mentionnent 2017 ; sortie VOD française : 23 novembre 2020. Ces dates correspondent à des références différentes. IMDb référence le film sous Drowned Heart en 2019.",
    "sources": [
      {
        "label": "AlloCiné — fiche technique",
        "url": "https://www.allocine.fr/film/fichefilm_gen_cfilm%3D223773.html"
      },
      {
        "label": "Studio Eustache — mixage en 2017",
        "url": "https://www.studio-eustache.com/references"
      },
      {
        "label": "IMDb — fiche du projet",
        "url": "https://www.imdb.com/fr/title/tt6838990/"
      }
    ],
    "duration": "100 min",
    "role": "Souad",
    "cast": "Farah El Fassi, Farid Regragui, Mohamed Badissy, Malek Akhmiss",
    "alternate": "assets/films/coeur-en.webp",
    "international": "Drowned Heart",
    "image": "assets/films/coeur.webp",
    "meta": "2014 · Long métrage"
  },
  "boughaba": {
    "title": "Boughaba",
    "arabic": "بوغابة",
    "year": 2013,
    "kind": "Téléfilm",
    "director": "Driss Roukhe",
    "role": "Yamna",
    "summary": "Bouazza, profondément attaché à la forêt où il vit, épouse Yamna. Un phénomène lumineux étrange vient troubler leur quotidien.",
    "dates": "2013 — téléfilm référencé par IMDb.",
    "sources": [
      {
        "label": "IMDb — fiche du projet",
        "url": "https://www.imdb.com/fr/title/tt3592238/"
      }
    ],
    "image": "assets/films/boughaba.jpg",
    "meta": "2013 · Téléfilm"
  },
  "enfant": {
    "title": "L’Enfant cheikh",
    "arabic": "الطفل الشيخ",
    "year": 2012,
    "kind": "Long métrage",
    "director": "Hamid Benani",
    "role": "",
    "summary": "Un jeune homme est partagé entre l’armée occupante et la résistance menée par son oncle.",
    "dates": "2012 — année de référence IMDb. La sortie en salles au Maroc est datée du 7 septembre 2016.",
    "sources": [
      {
        "label": "IMDb — fiche du projet",
        "url": "https://www.imdb.com/fr/title/tt2403407/"
      },
      {
        "label": "Le360 — sortie en salles en 2016",
        "url": "https://fr.le360.ma/culture/video-lenfant-cheikh-de-hamid-bennani-enfin-au-cinema-le-7-septembre-81917/"
      }
    ],
    "image": "assets/films/enfant.jpg",
    "meta": "2012 · Long métrage",
    "duration": "80 min"
  },
  "camarades": {
    "title": "Le Temps des camarades",
    "arabic": "زمن الرفاق",
    "year": 2009,
    "kind": "Long métrage",
    "director": "Mohamed Chrif Tribak",
    "role": "Rahil",
    "summary": "Au nord du Maroc, dans les années 1990, Rahil choisit l’université malgré l’opposition de sa famille et découvre un campus traversé de tensions politiques.",
    "dates": "Présenté dès 2008 selon le Festival de Salé ; IMDb retient 2009 et une sortie marocaine le 29 avril.",
    "sources": [
      {
        "label": "IMDb — fiche du projet",
        "url": "https://www.imdb.com/fr/title/tt1576420/"
      },
      {
        "label": "Festival de Salé — parcours de Farah",
        "url": "https://www.fiffs.ma/cineaste-detail.php?id=MTM0&type=0"
      }
    ],
    "image": "assets/films/camarades.jpg",
    "meta": "2009 · Long métrage",
    "duration": "103 min"
  }
};

const AWARDS = [
  ['2026', 'Meilleure actrice africaine', 'Africa Golden Awards'],
  ['2025', 'Hommage', 'Festival international du film de femmes de Salé'],
  ['2024', 'Meilleure actrice', 'Festival Écrans Noirs'],
  ['2022', 'Meilleure actrice', 'Premios Lorca de Granada']
];

const AR = {
  navHome: 'الرئيسية', navAbout: 'نبذة عني', navNews: 'المستجدات',
  navFilms: 'الأعمال', navGallery: 'الصور', navPress: 'الصحافة', navContact: 'تواصل',
  heroEyebrow: 'ممثلة مغربية<br>أصنع لحظات من الإحساس', discover: 'اكتشفوا عالمي',
  heroQuote: 'السينما والتلفزيون جسور تربط الناس والثقافات والمشاعر.',
  disciplines: 'سينما<br>تلفزيون<br>التزام', aboutLabel: 'نبذة عني',
  aboutTitle: 'ممثلة شغوفة وملتزمة<br>وقريبة من جمهورها',
  aboutText: '<strong>فرح الفاسي</strong> ممثلة مغربية تتميز بتنوع أدوارها في السينما والتلفزيون. من خلال اختياراتها الفنية، تقدم قصصاً إنسانية وقوية وأصيلة تجد صداها لدى الجمهور هنا وفي كل مكان.',
  more: 'اكتشفوا المزيد', years: '20 سنة', career: 'من المسيرة الفنية',
  cinema: 'السينما', television: 'والتلفزيون', community: 'جمهور متفاعل', engaged: 'وملتزم',
  moroccan: 'مغربية', proud: 'وأفتخر', onScreen: 'على الشاشة', rahmaMeta: 'الموسم الثاني – 2026',
  series: 'مسلسل تلفزيوني', filming: 'فيلم قيد التصوير', film: 'فيلم', allFilms: 'جميع الأعمال',
  awardsLabel: 'التتويجات', awardsTitle: 'مسيرة حافلة<br>بالتتويجات',
  africanAward: 'أفضل ممثلة إفريقية', tribute: 'تكريم',
  saleFestival: 'المهرجان الدولي لفيلم المرأة بسلا', bestActress: 'أفضل ممثلة',
  blackScreens: 'مهرجان الشاشات السوداء', allAwards: 'جميع التتويجات',
  showreelQuote: 'أدوار ومشاعر،<br>وشغف واحد.', watchReel: 'شاهدوا العرض الفني',
  filmSelection: 'على الشاشة.', filmWorks: 'أعمال', galleryLabel: 'معرض الصور', galleryTitle: 'لحظات من الحياة', filterAll: 'الكل',
  filterEvents: 'فعاليات', filterSets: 'التصوير', filterPortraits: 'بورتريهات', filterPress: 'الصحافة',
  joinCommunity: 'انضموا إلى جمهوري', followers: '+5,6 مليون متابع', followInstagram: 'تابعوني على إنستغرام',
  keepInTouch: 'لنبقَ على تواصل',
  copyright: '© 2026 فرح الفاسي. جميع الحقوق محفوظة.', madeBy: 'تصميم وتطوير'
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));
const contentDialog = $('#content-dialog');
const imageDialog = $('#image-dialog');
const dialogBody = $('#dialog-body');
const nav = $('#navigation');
const menuToggle = $('.menu-toggle');
const track = $('.gallery-track') || document;
let language = 'fr';
let currentImageIndex = 0;

// Preserve the original French markup for shared UI updates.
$$('[data-i18n]').forEach((element) => { element.dataset.fr = element.innerHTML; });
function setLanguage(nextLanguage) {
  language = nextLanguage === 'ar' ? 'ar' : 'fr';
  document.documentElement.lang = language;
  $$('[data-i18n]').forEach((element) => {
    element.innerHTML = language === 'ar' ? (AR[element.dataset.i18n] || element.dataset.fr) : element.dataset.fr;
  });
  menuToggle.setAttribute('aria-label', nav.classList.contains('is-open')
    ? (language === 'ar' ? 'إغلاق القائمة' : 'Fermer le menu')
    : (language === 'ar' ? 'فتح القائمة' : 'Ouvrir le menu'));
  try { sessionStorage.setItem('farah-language', language); } catch { /* Optional preference storage. */ }
  document.dispatchEvent(new CustomEvent('site:languagechange', { detail: { language } }));
}
// The public site is French-only; ignore a previous Arabic session preference.
// Wait for deferred page scripts to register their shared UI listeners.
document.addEventListener('DOMContentLoaded', () => setLanguage('fr'));


// Mobile menu: closes after a selection or Escape, and resets on desktop.
function closeMenu() {
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', language === 'ar' ? 'فتح القائمة' : 'Ouvrir le menu');
}
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', language === 'ar' ? (isOpen ? 'إغلاق القائمة' : 'فتح القائمة') : (isOpen ? 'Fermer le menu' : 'Ouvrir le menu'));
});
nav.addEventListener('click', (event) => { if (event.target.closest('a, button')) closeMenu(); });
window.matchMedia('(min-width: 861px)').addEventListener('change', (event) => { if (event.matches) closeMenu(); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
  if (!imageDialog.open) return;
  if (event.key === 'ArrowRight') { event.preventDefault(); changeImage(1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); changeImage(-1); }
});

function openContent(html) {
  if (imageDialog.open) imageDialog.close();
  dialogBody.innerHTML = html;
  document.body.classList.add('modal-open');
  contentDialog.showModal();
}
function contactHTML() {
  return `<a href="mailto:${escapeHTML(SITE_CONFIG.contactEmail)}">${escapeHTML(SITE_CONFIG.contactEmail)}</a>`;
}
function titleHTML(label, title) {
  return `<p class="eyebrow">${label}</p><h2 id="dialog-title">${title}</h2>`;
}
function placeholderHTML(title, frenchText, arabicText) {
  return titleHTML('FARAH EL FASSI', title) + `<p>${language === 'ar' ? arabicText : frenchText}</p>`;
}

const modalBuilders = {
  biographie: () => titleHTML(language === 'ar' ? 'نبذة عني' : 'À PROPOS', language === 'ar' ? 'فرح الفاسي' : 'Une passion, plusieurs univers.') +
    `<div class="modal-film"><img src="assets/gallery/img_1605.webp" alt="Portrait de Farah El Fassi"><div><p>${language === 'ar' ? AR.aboutText : $('.about-description').dataset.fr}</p><p>${language === 'ar' ? 'لأي مشروع سينمائي أو تعاون أو طلب إعلامي:' : 'Pour un projet artistique, une collaboration ou une demande média :'}</p><p>${contactHTML()}</p></div></div>`,
  filmographie: () => titleHTML('CINÉMA & TÉLÉVISION', 'Une sélection de rôles') +
    `<div class="modal-films">${Object.entries(FILMS).map(([key, film]) => `<button type="button" class="film-card" data-film="${key}"><img src="${film.image}" alt="Affiche de ${escapeHTML(film.title)}"><h3>${escapeHTML(film.title)}</h3><p>${film.meta}</p></button>`).join('')}</div>`,
  distinctions: () => titleHTML(language === 'ar' ? 'التتويجات' : 'DISTINCTIONS', language === 'ar' ? 'مسيرة حافلة بالتتويجات' : 'Un parcours récompensé') +
    `<ol class="modal-timeline">${AWARDS.map(([year, title, event]) => `<li><time>${year}</time><div><strong>${title}</strong><span>${event}</span></div></li>`).join('')}</ol>`,
  actualites: () => placeholderHTML(language === 'ar' ? 'آخر المستجدات' : 'Les dernières actualités',
    'Projets, tournages et rendez-vous : les actualités seront publiées ici prochainement.',
    'مشاريع وتصوير ومواعيد: ترقبوا آخر المستجدات قريباً.') +
    `<p><a href="${SITE_CONFIG.social.instagram}" target="_blank" rel="noopener noreferrer">${language === 'ar' ? 'تابعوني على إنستغرام' : 'Retrouvez les actualités sur Instagram'} →</a></p>`,
  presse: () => placeholderHTML(language === 'ar' ? 'الصحافة والإعلام' : 'Presse & médias',
    'Pour une interview, un portrait, une invitation ou toute demande média, prenez contact avec l’équipe.',
    'لإجراء مقابلة أو تقديم دعوة أو لأي طلب إعلامي، يرجى التواصل مع الفريق.') + `<p>${contactHTML()}</p>`,
  video: () => {
    const title = titleHTML(language === 'ar' ? 'العرض الفني' : 'BANDE DÉMO', language === 'ar' ? 'أدوار، مشاعر، شغف.' : 'Des rôles, des émotions, une même passion.');
    if (!SITE_CONFIG.showreelVideoUrl) return title + `<p>${language === 'ar' ? 'سيكون العرض الفني متاحاً قريباً. لأي طلب مهني، تواصلوا معنا.' : 'La bande démo sera disponible prochainement. Pour toute demande professionnelle, contactez-nous.'}</p><p>${contactHTML()}</p>`;
    return title + `<video controls playsinline preload="metadata" src="${escapeHTML(SITE_CONFIG.showreelVideoUrl)}">Votre navigateur ne prend pas en charge la lecture vidéo.</video>`;
  }
};

$$('[data-dialog]').forEach((button) => button.addEventListener('click', () => {
  const builder = modalBuilders[button.dataset.dialog];
  if (builder) openContent(builder());
}));
document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-film]');
  if (!button) return;
  const film = FILMS[button.dataset.film];
  if (!film) return;
  const facts = [['Réalisation', film.director], ['Scénario', film.writer], ['Durée', film.duration], ['Rôle', film.role], ['Distribution', film.cast]].filter(([, value]) => value);
  openContent(`<div class="modal-film film-detail"><div><img class="film-detail-poster" src="${film.image}" alt="Affiche de ${escapeHTML(film.title)}">${film.alternate ? `<details class="film-alternate"><summary>Affiche internationale — ${escapeHTML(film.international)}</summary><img src="${film.alternate}" alt="Affiche Drowned Heart" loading="lazy"></details>` : ''}</div><div>${titleHTML(film.meta, escapeHTML(film.title))}<p lang="ar" dir="rtl" class="film-arabic">${film.arabic}</p><p>${escapeHTML(film.summary)}</p><dl class="film-facts">${facts.map(([label, value]) => `<div><dt>${label}</dt><dd>${escapeHTML(value)}</dd></div>`).join('')}</dl><p class="film-date-note">${escapeHTML(film.dates)}</p><div class="film-sources"><strong>En savoir plus</strong>${film.sources.map((source) => `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.label)} ↗</a>`).join('')}</div></div></div>`);
});

// Native dialogs provide focus trapping and Escape handling without a library.
$$('dialog').forEach((dialog) => {
  $('.dialog-close', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (!contentDialog.open && !imageDialog.open) document.body.classList.remove('modal-open');
    $$('video', dialog).forEach((video) => video.pause());
  });
});

// Film row: native touch/trackpad scrolling, arrows and keyboard navigation.
const filmTrack = $('#film-track');
const filmMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function syncFilmNavigation() {
  const max = Math.max(0, filmTrack.scrollWidth - filmTrack.clientWidth);
  $('[data-film-direction="-1"]').disabled = filmTrack.scrollLeft <= 2;
  $('[data-film-direction="1"]').disabled = filmTrack.scrollLeft >= max - 2;
  $('.film-progress > span').style.width = `${100 * Math.min(1, (filmTrack.scrollLeft + filmTrack.clientWidth) / filmTrack.scrollWidth)}%`;
}
function moveFilms(direction) {
  const card = $('.film-card', filmTrack);
  const stride = card.offsetWidth + parseFloat(getComputedStyle(filmTrack).gap);
  const count = Math.max(1, Math.floor((filmTrack.clientWidth - 50) / stride));
  filmTrack.scrollBy({ left: direction * count * stride, behavior: filmMotion.matches ? 'instant' : 'smooth' });
}
$$('[data-film-direction]').forEach((button) => button.addEventListener('click', () => moveFilms(Number(button.dataset.filmDirection))));
filmTrack?.addEventListener('scroll', syncFilmNavigation, { passive: true });
filmTrack?.addEventListener('keydown', (event) => {
  if (event.target !== filmTrack || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  if (event.key === 'Home' || event.key === 'End') filmTrack.scrollTo({ left: event.key === 'Home' ? 0 : filmTrack.scrollWidth, behavior: filmMotion.matches ? 'instant' : 'smooth' });
  else moveFilms(event.key === 'ArrowRight' ? 1 : -1);
});
if (filmTrack) {
  new ResizeObserver(syncFilmNavigation).observe(filmTrack);
  syncFilmNavigation();
}

// Cinematic gallery: shared selection for the stage, thumbnails and lightbox.
function visibleGallery() { return $$('.gallery-item', track).filter((item) => !item.hidden); }
const gallery = $('#galerie');
const galleryMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const categoryNames = { portraits: 'Portraits', events: 'Événements', sets: 'Tournages', life: 'Au naturel', press: 'Presse' };
let galleryPlaying = !galleryMotion.matches;
let galleryInView = false;
let galleryHover = false;
let galleryTimer;
let galleryRequest = 0;
function syncGalleryPlayback() {
  clearTimeout(galleryTimer);
  if (!$('#cinema-play')) return;
  const playing = galleryPlaying && !galleryMotion.matches;
  $('#cinema-play img').src = `assets/icons/${playing ? 'pause' : 'play'}.svg`;
  $('#cinema-play').setAttribute('aria-pressed', String(playing));
  $('#cinema-play').setAttribute('aria-label', playing ? 'Mettre le diaporama en pause' : 'Lancer le diaporama');
  if (playing && galleryInView && !galleryHover && !document.hidden && !imageDialog.open && !gallery.contains(document.activeElement) && visibleGallery().length > 1) {
    galleryTimer = window.setTimeout(() => selectGallery(currentImageIndex + 1), 6500);
  }
}
async function selectGallery(index, manual = false) {
  if (!$('#cinema-photo')) return;
  const items = visibleGallery();
  if (!items.length) return;
  currentImageIndex = (index + items.length) % items.length;
  const item = items[currentImageIndex];
  const request = ++galleryRequest;
  $$('.gallery-item', track).forEach((thumb) => {
    thumb.classList.toggle('is-current', thumb === item);
    thumb.setAttribute('aria-pressed', String(thumb === item));
  });
  $('#cinema-caption').textContent = item.dataset.caption;
  $('#cinema-caption').dataset.length = item.dataset.caption.length > 28 ? 'long' : 'normal';
  $('#cinema-category').textContent = categoryNames[item.dataset.category];
  $('#cinema-counter').innerHTML = `${String(currentImageIndex + 1).padStart(2, '0')} <span>/ ${String(items.length).padStart(2, '0')}</span>`;
  $('.cinema-progress span').style.width = `${100 * (currentImageIndex + 1) / items.length}%`;
  const left = item.offsetLeft - (track.clientWidth - item.clientWidth) / 2;
  track.scrollTo({ left, behavior: manual && !galleryMotion.matches ? 'smooth' : 'auto' });
  $$('[data-gallery-direction]').forEach((button) => { button.disabled = items.length < 2; });
  if (manual) $('#cinema-status').textContent = `${item.dataset.caption}, photo ${currentImageIndex + 1} sur ${items.length}`;
  const preload = new Image();
  preload.src = item.dataset.image;
  try { await preload.decode(); } catch { /* Keep navigation usable if an image fails. */ }
  if (request !== galleryRequest) return;
  const photo = $('#cinema-photo');
  $('.cinema-stage').classList.toggle('is-landscape', preload.naturalWidth > preload.naturalHeight);
  $('.cinema-stage').classList.toggle('is-rotated', item.dataset.rotation === '-90');
  photo.style.objectPosition = item.dataset.rotation ? '50% 50%' : (item.dataset.position || '50% 18%');
  photo.src = item.dataset.image;
  photo.alt = item.dataset.caption;
  $('.cinema-backdrop').src = $('img', item).src;
  if (!galleryMotion.matches) {
    photo.getAnimations().forEach((animation) => animation.cancel());
    photo.animate([{ opacity: .25, transform: 'scale(1.025)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 900, easing: 'cubic-bezier(.2,.6,.2,1)' });
  }
  syncGalleryPlayback();
}
$$('[data-filter]').forEach((button) => button.addEventListener('click', () => {
  $$('[data-filter]').forEach((other) => {
    other.classList.toggle('is-active', other === button);
    other.setAttribute('aria-pressed', String(other === button));
  });
  $$('.gallery-item', track).forEach((item) => { item.hidden = button.dataset.filter !== 'all' && item.dataset.category !== button.dataset.filter; });
  selectGallery(0, true);
}));
$$('[data-gallery-direction]').forEach((button) => button.addEventListener('click', () => selectGallery(currentImageIndex + Number(button.dataset.galleryDirection), true)));
$$('.gallery-item', track).forEach((item) => item.addEventListener('click', () => {
  const index = visibleGallery().indexOf(item);
  if ($('#cinema-photo')) selectGallery(index, true);
  else {
    currentImageIndex = index;
    renderLightbox();
    document.body.classList.add('modal-open');
    imageDialog.showModal();
  }
}));
$('#cinema-play')?.addEventListener('click', () => { galleryPlaying = !galleryPlaying; syncGalleryPlayback(); });
function renderLightbox() {
  const items = visibleGallery();
  currentImageIndex = (currentImageIndex + items.length) % items.length;
  const item = items[currentImageIndex];
  $('#lightbox-image').classList.toggle('is-rotated', item.dataset.rotation === '-90');
  $('#lightbox-image').src = item.dataset.image;
  $('#lightbox-image').alt = item.dataset.caption;
  $('#image-caption').textContent = `${item.dataset.caption} · ${currentImageIndex + 1} / ${items.length}`;
  $$('[data-lightbox-direction]').forEach((button) => { button.hidden = items.length < 2; });
}
function changeImage(direction) { currentImageIndex += direction; renderLightbox(); selectGallery(currentImageIndex); }
$$('[data-gallery-expand]').forEach((button) => button.addEventListener('click', () => {
  renderLightbox();
  document.body.classList.add('modal-open');
  imageDialog.showModal();
  syncGalleryPlayback();
}));
$$('[data-lightbox-direction]').forEach((button) => button.addEventListener('click', () => changeImage(Number(button.dataset.lightboxDirection))));
imageDialog.addEventListener('close', syncGalleryPlayback);
gallery?.addEventListener('keydown', (event) => {
  if (!$('#cinema-photo')) return;
  if (imageDialog.open || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  selectGallery(event.key === 'Home' ? 0 : event.key === 'End' ? visibleGallery().length - 1 : currentImageIndex + (event.key === 'ArrowRight' ? 1 : -1), true);
});
let touchStart;
$('.cinema-stage')?.addEventListener('touchstart', (event) => { touchStart = [event.touches[0].clientX, event.touches[0].clientY]; }, { passive: true });
$('.cinema-stage')?.addEventListener('touchend', (event) => {
  if (!touchStart) return;
  const dx = event.changedTouches[0].clientX - touchStart[0];
  const dy = event.changedTouches[0].clientY - touchStart[1];
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) selectGallery(currentImageIndex + (dx < 0 ? 1 : -1), true);
  touchStart = null;
}, { passive: true });
gallery?.addEventListener('mouseenter', () => { galleryHover = true; syncGalleryPlayback(); });
gallery?.addEventListener('mouseleave', () => { galleryHover = false; syncGalleryPlayback(); });
gallery?.addEventListener('focusin', syncGalleryPlayback);
gallery?.addEventListener('focusout', () => window.setTimeout(syncGalleryPlayback, 0));
document.addEventListener('visibilitychange', syncGalleryPlayback);
galleryMotion.addEventListener('change', () => { galleryPlaying = !galleryMotion.matches; syncGalleryPlayback(); });
if (gallery) new IntersectionObserver(([entry]) => { galleryInView = entry.isIntersecting; syncGalleryPlayback(); }, { threshold: .15 }).observe(gallery);
selectGallery(Math.max(0, visibleGallery().findIndex((item) => item.dataset.image.endsWith('img_2830.webp'))));

// Underline the visible section without overriding the user’s hash history.
const sections = ['accueil', 'a-propos', 'filmographie', 'galerie', 'contact'].map((id) => document.getElementById(id)).filter(Boolean);
let scrollQueued = false;
function updateNavigation() {
  if (document.body.dataset.page) { scrollQueued = false; return; }
  const threshold = window.innerHeight * .25;
  let active = 'accueil';
  for (const section of sections) if (section.getBoundingClientRect().top <= threshold) active = section.id;
  $$('.main-nav a[href^="#"]').forEach((link) => {
    const current = link.getAttribute('href') === `#${active}`;
    link.classList.toggle('is-active', current);
    if (current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
  scrollQueued = false;
}
window.addEventListener('scroll', () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateNavigation); } }, { passive: true });
updateNavigation();
