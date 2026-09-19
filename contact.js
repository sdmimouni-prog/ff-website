'use strict';

// Static site: prepare an email, then let the visitor review and send it in their mail app.
const contactForm = document.querySelector('#contact-form');
const contactResult = document.querySelector('#contact-result');
const contactMailLink = document.querySelector('#contact-mail-link');
const contactCopyStatus = document.querySelector('#contact-copy-status');
let contactPreparedText = '';

function contactText(fr, ar) { return language === 'ar' ? ar : fr; }

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  // Native constraints are supplemented with a whitespace check for free-text fields.
  for (const name of ['name', 'message']) {
    const field = contactForm.elements.namedItem(name);
    field.setCustomValidity(field.value.trim() ? '' : contactText('Merci de renseigner ce champ.', 'يرجى تعبئة هذا الحقل.'));
  }
  if (!contactForm.reportValidity()) return;
  const data = new FormData(contactForm);
  const name = String(data.get('name')).trim();
  const email = String(data.get('email')).trim();
  const phone = String(data.get('phone')).trim();
  const subject = String(data.get('subject'));
  const message = String(data.get('message')).trim();
  const body = `${message}\n\n—\nNom : ${name}\nEmail : ${email}${phone ? `\nTéléphone : ${phone}` : ''}`;
  contactMailLink.href = `mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(subject + ' — ' + name)}&body=${encodeURIComponent(body)}`;
  contactPreparedText = `À : ${SITE_CONFIG.contactEmail}\nObjet : ${subject} — ${name}\n\n${body}`;
  contactCopyStatus.textContent = '';
  contactResult.hidden = false;
  contactResult.focus({ preventScroll: true });
  contactResult.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
});

contactForm.addEventListener('input', event => {
  if (event.target.setCustomValidity) event.target.setCustomValidity('');
  contactResult.hidden = true;
  contactPreparedText = '';
  contactCopyStatus.textContent = '';
});
contactForm.addEventListener('change', () => {
  contactResult.hidden = true;
  contactPreparedText = '';
});

document.querySelector('#contact-copy').addEventListener('click', async () => {
  if (!contactPreparedText) return;
  try {
    await navigator.clipboard.writeText(contactPreparedText);
    contactCopyStatus.textContent = contactText('Message copié. Collez-le dans votre messagerie pour l’envoyer.', 'تم نسخ الرسالة. ألصقوها في بريدكم الإلكتروني لإرسالها.');
  } catch {
    contactCopyStatus.textContent = contactText('La copie n’est pas disponible. Utilisez « Ouvrir ma messagerie » ou écrivez-nous directement.', 'النسخ غير متاح. افتحوا تطبيق البريد أو راسلونا مباشرة.');
  }
});

const contactSubjectPresets = { press:'Interview et presse', collaboration:'Collaboration et partenariat', cinema:'Projet cinéma ou télévision', event:'Événement' };
const contactPreset = contactSubjectPresets[new URLSearchParams(location.search).get('subject')];
if (contactPreset) contactForm.elements.namedItem('subject').value = contactPreset;

Object.assign(AR, {
 contactLabel:'تواصل', contactTitle:'لنكتب<br>الفصل القادم معاً.', contactIntro:'مشروع، حوار، تعاون، أو مجرد رسالة؟ <br>يسعد فريقي أن يجيب عن رسائلكم.', contactHeroQuote:'دائماً المزيد<br>من الحكايات لنشاركها.<span class="contact-rule"></span>',
 contactDetailsLabel:'بيانات التواصل', contactDetailsTitle:'لنبقَ على تواصل.', contactDetailsIntro:'لأي طلب، لا تترددوا في مراسلتنا <br>أو الاتصال بنا. سنرد عليكم <br>في أقرب وقت ممكن.', contactEmailLabel:'البريد الإلكتروني', contactPhoneLabel:'الهاتف', contactLocationLabel:'العنوان', contactCity:'الدار البيضاء، المغرب', contactAppointment:'(بموعد مسبق)', contactDetailsQuote:'مشاريع،<br><span>لقاءات ومشاعر.</span>',
 contactMessageLabel:'إرسال رسالة', contactFormTitle:'لنتحدث عن مشروعكم.', contactName:'اسمكم', contactEmail:'بريدكم الإلكتروني', contactPhone:'رقم الهاتف (اختياري)', contactSubject:'موضوع طلبكم', contactSubjectCinema:'مشروع سينمائي أو تلفزيوني', contactSubjectPress:'حوارات وصحافة', contactSubjectCollab:'تعاون وشراكة', contactSubjectEvent:'فعالية', contactSubjectOther:'طلب آخر', contactMessage:'رسالتكم', contactSend:'إرسال الرسالة', contactFormNote:'يتم الإرسال من تطبيق بريدكم الإلكتروني.',
 contactReady:'رسالتكم جاهزة.', contactReadyDescription:'افتحوا بريدكم الإلكتروني لمراجعة الرسالة وإرسالها إلى فريقنا.', contactOpenMail:'فتح البريد الإلكتروني', contactCopy:'نسخ الرسالة',
 contactFollowLabel:'تابعوا فرح', contactFollowTitle:'تابعوني<br>على مواقع التواصل.', contactFollowIntro:'كواليس وأخبار ولحظات من الحياة اليومية.', contactInstagram:'تابعوني على إنستغرام', contactSocialQuote:'« السينما واللقاءات<br>والمشاركة تستمر<br>هنا أيضاً. »', contactFooterTag:'ممثلة – صانعة مشاعر', contactLegal:'معلومات الموقع', contactPrivacy:'سياسة الخصوصية', contactMade:'أُنجز بشغف.'
});

document.addEventListener('site:languagechange', () => {
  const keys = { name:'contactName', email:'contactEmail', phone:'contactPhone', message:'contactMessage' };
  Object.entries(keys).forEach(([name,key]) => {
    const label = document.querySelector(`[data-i18n="${key}"]`);
    contactForm.elements.namedItem(name).placeholder = label.textContent;
  });
  contactCopyStatus.textContent = '';
});

document.querySelectorAll('[data-contact-info]').forEach(button => button.addEventListener('click', () => {
  const privacy = button.dataset.contactInfo === 'privacy';
  const title = privacy ? contactText('Confidentialité', 'الخصوصية') : contactText('Informations sur le site', 'معلومات الموقع');
  const copy = privacy
    ? contactText('Les informations saisies dans ce formulaire restent dans votre navigateur. Elles ne sont ni enregistrées sur ce site ni envoyées à un serveur. Le bouton « Ouvrir ma messagerie » transmet le contenu à votre application de courrier ; vous choisissez ensuite de l’envoyer. Les sites externes, dont Instagram, appliquent leurs propres règles de confidentialité.', 'تبقى بيانات هذا النموذج في متصفحكم ولا تُحفظ أو تُرسل إلى خادم هذا الموقع. يفتح زر البريد المحتوى في تطبيق بريدكم، وتختارون بعد ذلك إرساله. للمواقع الخارجية، ومنها إنستغرام، سياسات خصوصية خاصة بها.')
    : contactText('Site de présentation de Farah El Fassi. Pour toute question relative au contenu, aux photographies ou aux droits d’utilisation, contactez notre équipe à l’adresse ci-dessous.', 'موقع تعريفي بفرح الفاسي. لأي استفسار عن المحتوى أو الصور أو حقوق استخدامها، يرجى التواصل مع فريقنا عبر البريد أدناه.');
  openContent(titleHTML('FARAH EL FASSI', title) + '<p>' + copy + '</p><p>' + contactHTML() + '</p>');
}));
