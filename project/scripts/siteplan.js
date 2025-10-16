// js/app.js
// Uses: multiple functions, DOM selection, events, conditionals,
// objects and arrays, array methods, template literals, localStorage.

// Short DOM helpers
const qs = (s) => document.querySelector(s);
const qsa = (s) => Array.from(document.querySelectorAll(s));

// NAV toggle for mobile
function initNavToggle() {
  const btn = qs('#nav-toggle');
  const menu = qs('#primary-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
  });
}

// Hero message depending on time of day (conditional branching)
function setHeroMessage() {
  const el = qs('.hero-sub');
  if (!el) return;
  const h = new Date().getHours();
  const msg = (h < 12) ? 'Good morning — plan a sunrise hike!'
            : (h < 18) ? 'Good afternoon — consider an afternoon trek!'
            : 'Good evening — check night-safety tips!';
  el.textContent = msg;
}

// ----- Saved trails: uses objects, arrays, localStorage, template literals -----
function loadSavedTrails() {
  const raw = localStorage.getItem('savedTrails') || '[]';
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveSavedTrails(trails) {
  localStorage.setItem('savedTrails', JSON.stringify(trails));
}

function renderSavedTrails() {
  const container = qs('#savedTrails');
  if (!container) return;
  const trails = loadSavedTrails();
  if (trails.length === 0) {
    container.innerHTML = `<p>No saved trails yet. Use "Save Trail" on any trail to keep it here.</p>`;
    return;
  }
  container.innerHTML = trails.map(t => `
    <div class="trail-card" data-id="${t.id}">
      <div>
        <strong>${t.name}</strong> <div class="muted">(${t.difficulty})</div>
      </div>
      <div>
        <button class="remove-btn" data-id="${t.id}">Remove</button>
      </div>
    </div>`).join('');

  // attach remove listeners
  qsa('.remove-btn').forEach(b => b.addEventListener('click', (e) => {
    const id = e.currentTarget.dataset.id;
    const filtered = loadSavedTrails().filter(x => x.id !== id);
    saveSavedTrails(filtered);
    renderSavedTrails();
  }));
}

// attach Save buttons on pages
function attachSaveButtons() {
  qsa('.save-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const name = e.currentTarget.dataset.name;
      const difficulty = e.currentTarget.dataset.difficulty;
      const trails = loadSavedTrails();
      // avoid duplicates
      if (!trails.some(t => t.id === id)) {
        trails.push({ id, name, difficulty });
        saveSavedTrails(trails);
        renderSavedTrails();
      }
    });
  });
}

// Contact form: validation, localStorage of last contact
function initForm() {
  const form = qs('#contactForm');
  if (!form) return;
  const msgBox = qs('#formMsg');

  // Pre-fill if last contact exists
  const last = localStorage.getItem('lastContact');
  if (last) {
    try {
      const obj = JSON.parse(last);
      if (obj.name) qs('#name').value = obj.name;
      if (obj.email) qs('#email').value = obj.email;
      if (obj.message) qs('#message').value = obj.message;
    } catch {}
  }

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const name = qs('#name').value.trim();
    const email = qs('#email').value.trim();
    const message = qs('#message').value.trim();

    if (!name || !email || !message) {
      msgBox.textContent = 'Please fill all required fields.';
      msgBox.className = 'form-msg error';
      return;
    }

    // simple email regex check
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      msgBox.textContent = 'Please enter a valid email address.';
      msgBox.className = 'form-msg error';
      return;
    }

    // success path — store last contact
    localStorage.setItem('lastContact', JSON.stringify({ name, email, message }));
    msgBox.textContent = `Thanks ${name}! We'll contact you at ${email}.`;
    msgBox.className = 'form-msg success';
    form.reset();
  });
}

// Init function to wire everything up
function init() {
  initNavToggle();
  setHeroMessage();
  attachSaveButtons();
  renderSavedTrails();
  initForm();
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', init);
