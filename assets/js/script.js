document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const CONTACT_EMAIL = 'zhirong.ac1971@gmail.com';
const form = document.getElementById('bookingForm');
const status = document.getElementById('formStatus');

const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSfZCdRRv48ueM7Cpml_Ab05MJtBPdF5EzvLEG26KMHCQbxqKA/formResponse';
const GOOGLE_FORM_ENTRIES = {
  name: 'entry.411488989',
  phone: 'entry.1634642052',
  topic: 'entry.2030509446',
  message: 'entry.259100036',
};

function notifyLine(name, phone, topic, message) {
  const data = new FormData();
  data.append(GOOGLE_FORM_ENTRIES.name, name);
  data.append(GOOGLE_FORM_ENTRIES.phone, phone);
  data.append(GOOGLE_FORM_ENTRIES.topic, topic);
  data.append(GOOGLE_FORM_ENTRIES.message, message);
  fetch(GOOGLE_FORM_ACTION, { method: 'POST', mode: 'no-cors', body: data }).catch(() => {});
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const topic = form.topic.value;
  const message = form.message.value.trim();

  notifyLine(name, phone, topic, message);

  const subject = `【網站預約諮詢】${topic} - ${name}`;
  const body = [
    `姓名：${name}`,
    `聯絡電話：${phone}`,
    `諮詢類型：${topic}`,
    `需求說明：${message || '（未填寫）'}`,
  ].join('\n');

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;

  status.textContent = '已開啟郵件軟體，請確認並送出，我會盡快與您聯繫。';
});
