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

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const topic = form.topic.value;
  const message = form.message.value.trim();

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
