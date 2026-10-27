// Renders the deed preview into any [data-deed] element.

function deedMarkup() {
  return `
    <div class="deed-frame"></div>
    <div class="deed-inner">
      <div class="deed-logo">${LOGO_SVG}</div>
      <div class="deed-registry">GALACTIC LAND REGISTRY</div>
      <div class="deed-title">LUNAR LAND<small>DEED</small></div>
      <div class="deed-glow"></div>
      <div class="deed-fields">
        <div class="deed-value name" data-deed-name>. . .</div>
        <div class="deed-label">NAME</div>
        <div class="deed-value" data-deed-location>. . .</div>
        <div class="deed-label">LOCATION</div>
        <div class="deed-value" data-deed-date></div>
        <div class="deed-label">DATE</div>
      </div>
      <p class="deed-text">This novelty deed is recorded in the Galactic Land Registry mock database for fun only.
        It is not a legal document and grants no ownership of land on the Moon.</p>
      <div class="deed-slashes">/ / / / / / / / / /</div>
    </div>`;
}

function formatDeedDate(d) {
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    .toUpperCase().replace(/ /g, '-');
}

function renderDeeds() {
  document.querySelectorAll('[data-deed]').forEach(el => {
    el.classList.add('deed-card');
    el.innerHTML = deedMarkup();
    const { name, location } = el.dataset;
    if (name) el.querySelector('[data-deed-name]').textContent = name;
    if (location) el.querySelector('[data-deed-location]').textContent = location;
    el.querySelector('[data-deed-date]').textContent = formatDeedDate(new Date());
  });
}

renderDeeds();
