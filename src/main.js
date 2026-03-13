// ============================================================
// MAIN.JS — Router, rendering, navigation, progress tracking
// ============================================================

const App = (() => {

  // ── state ─────────────────────────────────────────────────
  let currentView = 'home'; // 'home' | 'group' | 'chapter'
  let currentGroup = null;
  let currentChapterId = null;

  // ── progress (localStorage) ───────────────────────────────
  function getVisited() {
    try { return JSON.parse(localStorage.getItem('la_visited') || '[]'); } catch { return []; }
  }
  function markVisited(id) {
    const v = getVisited();
    if (!v.includes(id)) { v.push(id); localStorage.setItem('la_visited', JSON.stringify(v)); }
  }
  function clearProgress() {
    localStorage.removeItem('la_visited');
    renderHome();
  }

  // ── group meta ────────────────────────────────────────────
  const GROUP_META = {
    'Matrix Algebra':          { icon: '🔢', color: 'var(--color-matrix)',   chapters: [1,2,3,4,5,6] },
    'Analytic Geometry':       { icon: '📐', color: 'var(--color-geometry)', chapters: [7,8,9,10,11] },
    'Abstract Linear Algebra': { icon: '🧮', color: 'var(--color-abstract)', chapters: [12,13,14,15,16,17,18,19,20,21] },
    'Conics & Quadrics':       { icon: '🌀', color: 'var(--color-conics)',   chapters: [22,23,24] },
  };

  // ── render helpers ────────────────────────────────────────
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  }

  function setHeader(showBack, backLabel = 'Back', onBack) {
    const nav = document.querySelector('.header-nav');
    nav.innerHTML = '';
    if (showBack) {
      const btn = el('button', 'btn-back', `← ${backLabel}`);
      btn.addEventListener('click', onBack);
      nav.appendChild(btn);
    }
  }

  // ── HOME VIEW ─────────────────────────────────────────────
  function renderHome() {
    currentView = 'home';
    setHeader(false);

    const visited = getVisited();
    const total = Content.chapters.length;
    const pct = Math.round((visited.length / total) * 100);

    const main = document.getElementById('main-content');
    main.innerHTML = '';

    // hero
    const hero = el('div', 'home-hero');
    hero.innerHTML = `
      <h1>Linear Algebra</h1>
      <p>Interactive study guide based on <em>Linear Algebra and Geometry</em> lecture notes (24 chapters)</p>
      <div class="progress-bar-wrap">
        <div class="progress-bar"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
        <span class="progress-label">${visited.length} / ${total} chapters visited (${pct}%)</span>
      </div>
      ${visited.length > 0 ? `<button id="clear-progress" style="font-size:0.75rem;background:none;border:none;color:var(--text-dim);cursor:pointer;margin-top:0.25rem">Reset progress</button>` : ''}
    `;
    main.appendChild(hero);

    if (visited.length > 0) {
      hero.querySelector('#clear-progress').addEventListener('click', clearProgress);
    }

    // groups grid
    const grid = el('div', 'groups-grid');

    Object.entries(GROUP_META).forEach(([groupName, meta]) => {
      const groupChapters = Content.chapters.filter(c => c.group === groupName);
      const doneCount = groupChapters.filter(c => visited.includes(c.id)).length;

      const card = el('div', 'group-card');
      card.style.setProperty('--group-color', meta.color);

      card.innerHTML = `
        <div class="group-card-icon">${meta.icon}</div>
        <h2>${groupName}</h2>
        <div class="chapter-range">Chapters ${meta.chapters[0]}–${meta.chapters[meta.chapters.length-1]} · ${doneCount}/${groupChapters.length} done</div>
        <ul class="chapter-list">
          ${groupChapters.map(c => `
            <li>
              <span class="chapter-dot${visited.includes(c.id)?' done':''}"></span>
              Ch${c.id}. ${c.title}
            </li>
          `).join('')}
        </ul>
        <button class="btn-explore">Explore →</button>
      `;

      card.querySelector('.btn-explore').addEventListener('click', () => renderGroupView(groupName));
      grid.appendChild(card);
    });

    main.appendChild(grid);
  }

  // ── GROUP VIEW ────────────────────────────────────────────
  function renderGroupView(groupName) {
    currentView = 'group';
    currentGroup = groupName;
    const meta = GROUP_META[groupName];
    const visited = getVisited();

    setHeader(true, 'Home', renderHome);

    const main = document.getElementById('main-content');
    main.innerHTML = '';

    const page = el('div', 'chapter-list-page');
    page.innerHTML = `
      <h2 style="color:${meta.color}">${meta.icon} ${groupName}</h2>
      <p class="subtitle">Chapters ${meta.chapters[0]}–${meta.chapters[meta.chapters.length-1]} — select a chapter to study</p>
    `;

    const grid = el('div', 'chapters-grid');
    const groupChapters = Content.chapters.filter(c => c.group === groupName);

    groupChapters.forEach(chapter => {
      const done = visited.includes(chapter.id);
      const card = el('div', `chapter-card${done?' visited':''}`);
      card.innerHTML = `
        <div class="chapter-number">${chapter.id}</div>
        <div class="chapter-info">
          <h3>${chapter.title}</h3>
          <p>${chapter.subsections.slice(0,2).join(' · ')}${chapter.subsections.length > 2 ? '…' : ''}</p>
        </div>
        ${done ? '<span class="chapter-badge">✓ done</span>' : ''}
      `;
      card.addEventListener('click', () => renderChapterView(chapter.id));
      grid.appendChild(card);
    });

    page.appendChild(grid);
    main.appendChild(page);
  }

  // ── CHAPTER VIEW ──────────────────────────────────────────
  function renderChapterView(chapterId) {
    currentView = 'chapter';
    currentChapterId = chapterId;
    markVisited(chapterId);

    const chapter = Content.chapters.find(c => c.id === chapterId);
    const meta = GROUP_META[chapter.group];
    const allGroupChapters = Content.chapters.filter(c => c.group === chapter.group);
    const idx = allGroupChapters.findIndex(c => c.id === chapterId);
    const prevChapter = idx > 0 ? allGroupChapters[idx - 1] : null;
    const nextChapter = idx < allGroupChapters.length - 1 ? allGroupChapters[idx + 1] : null;

    setHeader(true, chapter.group, () => renderGroupView(chapter.group));

    const main = document.getElementById('main-content');
    main.innerHTML = '';

    const layout = el('div', 'study-layout');

    // sidebar
    const sidebar = el('aside', 'study-sidebar');
    sidebar.innerHTML = `
      <h4>In this chapter</h4>
      <ul class="sidebar-nav">
        <li class="active" data-section="concepts">📖 Concepts</li>
        <li data-section="visual">🎨 Visual</li>
        <li data-section="examples">✏️ Examples</li>
      </ul>
      <div class="sidebar-progress" style="margin-top:1.5rem">
        <div class="label">Group progress</div>
        ${allGroupChapters.map(c => {
          const done = getVisited().includes(c.id);
          return `<div style="display:flex;align-items:center;gap:0.5rem;padding:0.2rem 0;cursor:pointer;font-size:0.78rem;color:${c.id===chapterId?meta.color:'var(--text-dim)'}" data-ch="${c.id}">
            <span style="width:6px;height:6px;border-radius:50%;background:${done?meta.color:'var(--border)'};display:inline-block;flex-shrink:0"></span>
            Ch${c.id}
          </div>`;
        }).join('')}
      </div>
    `;
    sidebar.querySelectorAll('[data-section]').forEach(item => {
      item.addEventListener('click', () => {
        document.getElementById('section-' + item.dataset.section)?.scrollIntoView({behavior:'smooth', block:'start'});
        sidebar.querySelectorAll('[data-section]').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
    sidebar.querySelectorAll('[data-ch]').forEach(item => {
      item.addEventListener('click', () => renderChapterView(+item.dataset.ch));
    });

    // content
    const content = el('div', 'study-content');

    // header
    const header = el('div', 'study-header');
    header.innerHTML = `
      <div class="chapter-tag" style="color:${meta.color}">${meta.icon} ${chapter.group} · Chapter ${chapter.id}</div>
      <h1>${chapter.title}</h1>
      <div class="subsections">
        ${chapter.subsections.map(s => `<span class="subsection-tag">${s}</span>`).join('')}
      </div>
    `;
    content.appendChild(header);

    // concepts block
    const conceptsBlock = el('div', 'section-block');
    conceptsBlock.id = 'section-concepts';
    conceptsBlock.innerHTML = `
      <div class="section-block-header">
        <span class="section-icon">📖</span>
        <h2>Key Concepts</h2>
      </div>
      <div class="section-block-body">
        <div class="concept-grid">
          ${chapter.concepts.map(c => `
            <div class="concept-card">
              <div class="term">${c.term}</div>
              <div class="definition">${c.definition}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    content.appendChild(conceptsBlock);

    // visual block
    const visualBlock = el('div', 'section-block');
    visualBlock.id = 'section-visual';
    const visualHeader = el('div', 'section-block-header');
    visualHeader.innerHTML = '<span class="section-icon">🎨</span><h2>Interactive Visual</h2>';
    const visualBody = el('div', 'section-block-body');
    const visualContainer = el('div', 'visual-container');
    visualBody.appendChild(visualContainer);
    visualBlock.appendChild(visualHeader);
    visualBlock.appendChild(visualBody);
    content.appendChild(visualBlock);

    // examples block
    const examplesBlock = el('div', 'section-block');
    examplesBlock.id = 'section-examples';
    examplesBlock.innerHTML = `
      <div class="section-block-header">
        <span class="section-icon">✏️</span>
        <h2>Worked Examples</h2>
      </div>
      <div class="section-block-body">
        <div class="examples-list">
          ${chapter.examples.map((ex, i) => `
            <div class="example-item">
              <div class="example-header" data-idx="${i}">
                <span class="example-num">Example ${i+1}</span>
                <span class="example-problem">${ex.problem}</span>
                <span class="example-toggle">▼</span>
              </div>
              <div class="example-body" id="ex-body-${chapterId}-${i}">
                <ul class="step-list">
                  ${ex.steps.map((s, si) => `<li><span class="step-num">${si+1}.</span><span>${s}</span></li>`).join('')}
                </ul>
                <div class="answer-box">
                  <strong>Answer</strong>
                  ${ex.answer}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    examplesBlock.querySelectorAll('.example-header').forEach(hdr => {
      hdr.addEventListener('click', () => {
        const body = document.getElementById(`ex-body-${chapterId}-${hdr.dataset.idx}`);
        const toggle = hdr.querySelector('.example-toggle');
        body.classList.toggle('open');
        toggle.textContent = body.classList.contains('open') ? '▲' : '▼';
      });
    });

    content.appendChild(examplesBlock);

    // prev/next nav
    const nav = el('div', 'chapter-nav');
    if (prevChapter) {
      const btn = el('button', 'btn-chapter-nav', `<span class="nav-dir">← Previous</span><span class="nav-title">Ch${prevChapter.id}. ${prevChapter.title}</span>`);
      btn.addEventListener('click', () => renderChapterView(prevChapter.id));
      nav.appendChild(btn);
    } else {
      nav.appendChild(el('div'));
    }
    if (nextChapter) {
      const btn = el('button', 'btn-chapter-nav next', `<span class="nav-dir">Next →</span><span class="nav-title">Ch${nextChapter.id}. ${nextChapter.title}</span>`);
      btn.addEventListener('click', () => renderChapterView(nextChapter.id));
      nav.appendChild(btn);
    }
    content.appendChild(nav);

    layout.appendChild(sidebar);
    layout.appendChild(content);
    main.appendChild(layout);

    // render visual after DOM is ready
    requestAnimationFrame(() => {
      Visuals.render(chapterId, visualContainer);
    });

    window.scrollTo(0, 0);
  }

  // ── init ──────────────────────────────────────────────────
  function init() {
    document.querySelector('.logo').addEventListener('click', renderHome);
    renderHome();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
