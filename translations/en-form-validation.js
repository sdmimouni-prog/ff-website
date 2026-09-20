// Keep validation messages in English even when the browser uses another language.
const englishRequiredFields = {
  name: 'Please enter your name.',
  email: 'Please enter your email address.',
  subject: 'Please choose a subject.',
  message: 'Please write your message.'
};
contactForm.addEventListener('invalid', event => {
  const field = event.target;
  field.setCustomValidity('');
  if (field.required && !field.value.trim()) {
    field.setCustomValidity(englishRequiredFields[field.name] || 'Please complete this field.');
  } else if (field.type === 'email' && field.validity.typeMismatch) {
    field.setCustomValidity('Please enter a valid email address, such as name@example.com.');
  } else if (field.validity.tooLong) {
    field.setCustomValidity(`Please use no more than ${field.maxLength} characters.`);
  }
}, true);
// A corrected selection must not retain an earlier custom validation message.
contactForm.addEventListener('change', event => {
  if (event.target.setCustomValidity) event.target.setCustomValidity('');
});
