// script.js
// Handles theme toggle, small UI behaviors, and simple form action.
// Keep this file next to index.html

(() => {
  // Elements
  const themeToggle = document.getElementById('themeToggle');
  const resumeBtn = document.getElementById('resumeBtn');
  const yearEl = document.getElementById('year');
  const sendBtn = document.getElementById('sendBtn');

  // Initialize year
  yearEl.textContent = new Date().getFullYear();

  // THEME: persistent in localStorage
  const root = document.documentElement;
  const THEME_KEY = 'vkt-theme';
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light') root.classList.add('light');

  function toggleTheme() {
    root.classList.toggle('light');
    const now = root.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, now);
  }
  themeToggle.addEventListener('click', toggleTheme);

  // Resume button placeholder behaviour: you can replace with actual resume link
  resumeBtn.addEventListener('click', () => {
    // Replace with real resume file or URL
    window.open('https://example.com/resume.pdf', '_blank');
  });

  // Simple "send" UX: open mail client with prefilled info
  sendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const form = sendBtn.closest('form');
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const msg = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !msg) {
      alert('Please fill all fields.');
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
    window.location.href = `mailto:venkatesan@example.com?subject=${subject}&body=${body}`;
  });

  // Smooth reveal on scroll
  function reveal() {
    document.querySelectorAll('.hero-card, .section-inner').forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) el.classList.add('revealed');
    });
  }
  window.addEventListener('scroll', reveal);
  window.addEventListener('resize', reveal);
  // initial
  setTimeout(reveal, 80);

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        ev.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();