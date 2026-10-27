// Shared header, footer, artwork and small UI helpers for every page.

const LOGO_SVG = `
<svg viewBox="0 0 64 64" aria-hidden="true">
  <defs>
    <radialGradient id="logoMoon" cx="38%" cy="35%" r="70%">
      <stop offset="0" stop-color="#eef3fa"/>
      <stop offset=".6" stop-color="#9fb2c9"/>
      <stop offset="1" stop-color="#4d6079"/>
    </radialGradient>
  </defs>
  <circle cx="32" cy="32" r="30" fill="none" stroke="#308cd1" stroke-width="1.5" stroke-dasharray="3 4"/>
  <circle cx="32" cy="32" r="21" fill="url(#logoMoon)"/>
  <circle cx="25" cy="26" r="4" fill="#7c8ea6" opacity=".7"/>
  <circle cx="38" cy="38" r="5.5" fill="#7c8ea6" opacity=".6"/>
  <circle cx="37" cy="24" r="2.2" fill="#7c8ea6" opacity=".7"/>
  <path d="M30 40 l0 -9 l6 3 l-6 3" fill="none" stroke="#308cd1" stroke-width="1.6" stroke-linejoin="round"/>
</svg>`;

const ASTRONAUT_SVG = `
<svg viewBox="0 0 92 120" aria-hidden="true">
  <g stroke="#1b1b1b" stroke-width="1.2">
    <rect x="18" y="40" width="20" height="34" rx="6" fill="#c9ced6"/>
    <rect x="26" y="44" width="40" height="44" rx="12" fill="#f2f4f7"/>
    <rect x="34" y="56" width="22" height="14" rx="3" fill="#d7dce3"/>
    <circle cx="40" cy="63" r="2" fill="#308cd1" stroke="none"/>
    <circle cx="47" cy="63" r="2" fill="#d94b4b" stroke="none"/>
    <rect x="12" y="50" width="16" height="10" rx="5" fill="#f2f4f7" transform="rotate(-35 20 55)"/>
    <rect x="62" y="48" width="18" height="10" rx="5" fill="#f2f4f7" transform="rotate(30 70 53)"/>
    <rect x="30" y="84" width="13" height="26" rx="5" fill="#f2f4f7"/>
    <rect x="50" y="84" width="13" height="26" rx="5" fill="#f2f4f7"/>
    <rect x="28" y="106" width="17" height="8" rx="3" fill="#8a94a3"/>
    <rect x="48" y="106" width="17" height="8" rx="3" fill="#8a94a3"/>
    <circle cx="46" cy="26" r="20" fill="#f2f4f7"/>
    <ellipse cx="48" cy="26" rx="13" ry="11" fill="#2a3d57"/>
  </g>
  <ellipse cx="43" cy="22" rx="5" ry="3" fill="#8fb6e6" opacity=".7"/>
</svg>`;

const CHECK_SVG = `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function renderHeader() {
  const el = document.querySelector('[data-header]');
  if (!el) return;
  const active = el.dataset.active || '';
  const user = typeof currentUser === 'function' ? currentUser() : null;
  const link = (href, label, key) =>
    `<a href="${href}"${active === key ? ' class="active"' : ''}>${label}</a>`;
  const cta = user
    ? `<a class="btn header-cta" href="my-land.html">My Land</a>`
    : `<a class="btn header-cta" href="signup.html">Register</a>`;

  el.outerHTML = `
    <header class="site-header${el.hasAttribute('data-overlay') ? ' overlay' : ''}">
      <a class="brand" href="index.html">
        ${LOGO_SVG}
        <span class="brand-name">GALACTIC<small>LAND REGISTRY</small></span>
      </a>
      <button class="nav-toggle" type="button" aria-label="Menu">☰</button>
      <nav class="nav">
        ${link('index.html', 'Home', 'home')}
        ${link('order.html', 'Order Now', 'order')}
        ${link('index.html#how', 'About', 'about')}
        ${link('index.html#search', 'Deed Search', 'search')}
        ${user ? link('my-land.html', 'My Land', 'land') : link('signin.html', 'Login', 'signin')}
      </nav>
      ${cta}
    </header>`;

  const header = document.querySelector('.site-header');
  header.querySelector('.nav-toggle').addEventListener('click', () => header.classList.toggle('open'));
}

function renderFooter() {
  const el = document.querySelector('[data-footer]');
  if (!el) return;
  el.outerHTML = `
    <footer class="site-footer">
      <nav class="footer-links">
        <a href="index.html">Home</a>
        <a href="order.html">Order</a>
        <a href="index.html#how">About</a>
        <a href="signin.html">Login</a>
      </nav>
      <div class="footer-logo">
        <a class="brand" href="index.html">${LOGO_SVG}<span class="brand-name">GALACTIC<small>LAND REGISTRY</small></span></a>
      </div>
      <div class="footer-sub">
        <span>Contact</span><span>Privacy Policy</span><span>Terms and Services</span>
      </div>
      <p class="footer-note">Mock demo site. Novelty item for fun only. Not a legal document. Nobody can own land on the Moon.<br>
        Moon images: NASA/GSFC/Arizona State University (LRO).</p>
    </footer>`;
}

function renderMockBar() {
  if (document.querySelector('.mock-bar')) return;
  const bar = document.createElement('div');
  bar.className = 'mock-bar';
  bar.textContent = 'Mock demo site · Novelty only · Not a real registry or purchase';
  document.body.prepend(bar);
}

function renderArt() {
  document.querySelectorAll('[data-astronaut]').forEach(el => { el.innerHTML = ASTRONAUT_SVG; });
  document.querySelectorAll('[data-check]').forEach(el => { el.innerHTML = CHECK_SVG; });
}

function startReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: .15 });
  items.forEach(el => io.observe(el));
}

function showPopup({ title, text, button = 'OK', info = false, onClose }) {
  let popup = document.querySelector('.popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.className = 'popup';
    document.body.appendChild(popup);
  }
  popup.innerHTML = `
    <div class="popup-card" role="dialog" aria-modal="true">
      <div class="icon${info ? ' info' : ''}">${info ? 'i' : '✓'}</div>
      <h3></h3>
      <p></p>
      <button class="btn btn-blue" type="button"></button>
    </div>`;
  popup.querySelector('h3').textContent = title;
  popup.querySelector('p').textContent = text;
  const btn = popup.querySelector('button');
  btn.textContent = button;
  btn.onclick = () => {
    popup.classList.remove('show');
    if (onClose) onClose();
  };
  popup.classList.add('show');
  btn.focus();
}

renderMockBar();
renderHeader();
renderFooter();
renderArt();
startReveal();
