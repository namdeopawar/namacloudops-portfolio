// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== TERMINAL TYPING ANIMATION =====
const lines = [
  { id: 'line1', text: '$ whoami',                         color: 'green',  delay: 300  },
  { id: 'line2', text: '> namdeo-pawar',                   color: 'cyan',   delay: 900  },
  { id: 'line3', text: '$ cat role.txt',                   color: 'green',  delay: 1600 },
  { id: 'line4', text: '> Senior DevOps Engineer',         color: 'output', delay: 2200 },
  { id: 'line5', text: '> AWS | K8s | Terraform | GitOps', color: 'output', delay: 2800 },
];

function typeText(el, text, color, speed = 38) {
  return new Promise(resolve => {
    let i = 0;
    const colorMap = {
      green:  'var(--green)',
      cyan:   'var(--cyan)',
      output: 'var(--text-muted)',
    };
    el.style.color = colorMap[color] || 'var(--text-muted)';
    const interval = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) { clearInterval(interval); resolve(); }
    }, speed);
  });
}

async function runTerminal() {
  const cursor = document.getElementById('term-cursor');
  for (const line of lines) {
    await new Promise(r => setTimeout(r, line.delay - (lines[0].delay)));
    const el = document.getElementById(line.id);
    if (cursor && el) el.parentNode.insertBefore(cursor, el.nextSibling);
    await typeText(el, line.text, line.color);
  }
  if (cursor) cursor.style.display = 'none';
}

// Start terminal after short pause
setTimeout(runTerminal, 400);

// ===== INTERSECTION OBSERVER (fade-in) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings by index
      const siblings = entry.target.parentElement.querySelectorAll('.fade-in');
      let delay = 0;
      siblings.forEach((el, idx) => {
        if (el === entry.target) delay = idx * 80;
      });
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--green)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ===== SMOOTH SCROLL for anchor clicks =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
