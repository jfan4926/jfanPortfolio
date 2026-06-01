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

/* ── Render detail ── */
const id = location.hash.slice(1);
const project = PROJECTS.find(p => p.id === id);
const container = document.getElementById('projectDetail');

if (!project) {
  container.innerHTML = `
    <div style="padding:80px 24px;text-align:center">
      <p style="font-family:var(--mono);color:var(--text-3)">// 404 — project not found</p>
      <a href="index.html" class="btn btn-ghost" style="display:inline-flex;margin-top:24px">← Back to portfolio</a>
    </div>`;
} else {
  document.title = `${project.title} — Portfolio`;

  const linksHtml = [
    project.links.demo   ? `<a href="${project.links.demo}"   class="btn btn-primary" target="_blank">↗ Live Demo</a>` : '',
    project.links.blog   ? `<a href="${project.links.blog}"   class="btn btn-primary" target="_blank">↗ Blog Post</a>` : '',
    project.links.github ? `<a href="${project.links.github}" class="btn btn-ghost"   target="_blank">⌥ GitHub</a>` : '',
  ].filter(Boolean).join('');

  const metricsHtml = (project.metrics || []).map(m => `
    <div class="metric-row">
      <span class="metric-key">${m.key}</span>
      <span class="metric-val">${m.val}</span>
    </div>`).join('');

  const highlightsHtml = (project.detail.highlights || [])
    .map(h => `<li>${h}</li>`).join('');

  container.innerHTML = `
    <section class="detail-hero">
      <div class="detail-hero-inner">
        <a href="index.html" class="back-link">← portfolio</a>
        <p class="detail-type">${project.typeLabel}</p>
        <h1 class="detail-title">${project.title}</h1>
        <p class="detail-desc">${project.desc}</p>
        <div class="detail-actions">${linksHtml}</div>
      </div>
    </section>

    <section class="detail-content">
      <div class="detail-content-inner">
        <div class="detail-main">
          <h2>Overview</h2>
          <p>${project.detail.overview}</p>
          <h2>Key Highlights</h2>
          <ul>${highlightsHtml}</ul>
          <h2>Technical Notes</h2>
          <p>${project.detail.techDetail}</p>
          ${project.detail.extraImage ? `
          <figure class="detail-figure">
            <img src="${project.detail.extraImage.src}" alt="${project.detail.extraImage.caption}" loading="lazy" />
            <figcaption>${project.detail.extraImage.caption}</figcaption>
          </figure>` : ''}
        </div>
        <aside class="detail-sidebar">
          <div class="sidebar-card">
            <h3>Metrics</h3>
            ${metricsHtml}
          </div>
          <div class="sidebar-card">
            <h3>Stack</h3>
            <div class="tech-list">
              ${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
          </div>
          <div class="sidebar-card">
            <h3>Details</h3>
            <div class="metric-row">
              <span class="metric-key">Type</span>
              <span class="metric-val">${project.typeLabel}</span>
            </div>
            <div class="metric-row">
              <span class="metric-key">Year</span>
              <span class="metric-val">${project.date}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  `;
}
