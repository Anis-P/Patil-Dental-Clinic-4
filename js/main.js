/* Patil Dental Clinic — interactions */

// Header scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header && header.classList.toggle('scrolled', window.scrollY > 30);
});

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn) menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks?.classList.remove('open')));

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Counters
const counters = document.querySelectorAll('.counter .n');
const cio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target; const target = +el.dataset.count; const suf = el.dataset.suffix || '';
    let cur = 0; const step = Math.max(1, Math.floor(target / 60));
    const t = setInterval(() => { cur += step; if (cur >= target) { cur = target; clearInterval(t); } el.textContent = cur + suf; }, 24);
    cio.unobserve(el);
  });
}, { threshold: .4 });
counters.forEach(c => cio.observe(c));

// FAQ
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => item.classList.toggle('open'));
});

// Lightbox
const lb = document.querySelector('.lb');
if (lb) {
  const lbImg = lb.querySelector('img');
  document.querySelectorAll('.gallery-item').forEach(g => g.addEventListener('click', () => {
    lbImg.src = g.querySelector('img').src; lb.classList.add('open');
  }));
  lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('lb-close')) lb.classList.remove('open'); });
}

// Forms — connect to Formspree later by changing the form action attribute
document.querySelectorAll('form[data-form]').forEach(f => {
  f.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you! Your request has been received. We will contact you shortly.');
    f.reset();
  });
});

// Disable right click + dev shortcuts
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key)) || (e.ctrlKey && e.key === 'U')) e.preventDefault();
});

// Parallax for hero image
const heroImg = document.querySelector('.hero-image img');
if (heroImg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < 800) heroImg.style.transform = `translateY(${y * 0.08}px)`;
  });
}
