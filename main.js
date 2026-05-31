/* ── Theme ── */
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeBtn?.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ── Filter ── */
let activeFilter = 'all';
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderCards();
  });
});

/* ── Render cards ── */
function renderCards() {
  const grid = document.getElementById('projectGrid');
  if (!grid) return;
  const filtered = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.type === activeFilter);

  grid.innerHTML = filtered.map(p => `
    <article class="card" onclick="location.href='project.html#${p.id}'">
      <div class="card-thumb">
        <div class="card-thumb-bg">
          <img src="images/${p.id}.png" alt="${p.title}" loading="lazy" />
          <span class="thumb-label">${p.thumbLabel}</span>
        </div>
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="card-type">${p.typeLabel}</span>
          <span class="card-dot"></span>
          <span class="card-date">${p.date}</span>
        </div>
        <h2 class="card-title">${p.title}</h2>
        <p class="card-desc">${p.desc}</p>
        <div class="card-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
      <div class="card-footer">
        <div class="card-tags" style="margin:0">${
          p.links.demo ? `<span class="tag">Live Demo</span>` : ''
        }${
          p.links.blog ? `<span class="tag">Blog Post</span>` : ''
        }${
          p.links.github ? `<span class="tag">GitHub</span>` : ''
        }</div>
        <span class="card-arrow">→</span>
      </div>
    </article>
  `).join('');

  // update count
  const cnt = document.getElementById('projectCount');
  if (cnt) cnt.textContent = String(filtered.length).padStart(2, '0');
}

renderCards();
