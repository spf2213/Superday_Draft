/* ─── MINI-CASES ─────────────────────── */

import { MINI_CASES } from './data/miniCases.js';

// These will be set by setCasesDeps() from app.js
let _progress = { completedCases: [] };
let _saveProgress = () => {};

/** Call once from app.js so cases can reach back into shared state. */
export function setCasesDeps({ progress, saveProgress }) {
  _progress = progress;
  _saveProgress = saveProgress;
}

let currentCase = null;
let caseStartTime = null;
let caseTimerInterval = null;

export function renderCasesGrid() {
  const grid = document.getElementById('cases-grid');
  if (!grid) return;

  grid.innerHTML = MINI_CASES.map(c => {
    const completed = _progress.completedCases?.includes(c.id);
    const diffClass = c.difficulty === 1 ? 'easy' : c.difficulty === 3 ? 'hard' : '';

    return `
      <div class="case-card ${completed ? '' : ''}" onclick="startCase('${c.id}')">
        <div class="case-header">
          <div class="case-type">${c.type}</div>
          <div class="case-title">${c.title}</div>
        </div>
        <div class="case-body">
          <div class="case-desc">${c.desc}</div>
          <div class="case-meta">
            <div class="case-meta-item">⏱ ${c.time}</div>
            <div class="case-meta-item">
              <div class="case-difficulty ${diffClass}">
                <span class="${c.difficulty >= 1 ? 'active' : ''}"></span>
                <span class="${c.difficulty >= 2 ? 'active' : ''}"></span>
                <span class="${c.difficulty >= 3 ? 'active' : ''}"></span>
              </div>
            </div>
            ${completed ? '<div class="case-meta-item" style="color:var(--green)">✓ Done</div>' : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('cases-list').style.display = 'block';
  document.getElementById('case-exercise').classList.remove('active');
}

export function startCase(caseId) {
  const c = MINI_CASES.find(x => x.id === caseId);
  if (!c) return;

  currentCase = c;
  caseStartTime = Date.now();

  document.getElementById('cases-list').style.display = 'none';
  const exercise = document.getElementById('case-exercise');
  exercise.classList.add('active');

  exercise.innerHTML = `
    <div class="learn-back" onclick="closeCase()">← Back to cases</div>

    <div class="case-scenario">
      <div class="case-scenario-title">
        <span>${c.type}</span> — ${c.title}
        <span class="case-timer" id="case-timer" style="margin-left:auto">⏱ 0:00</span>
      </div>
      <div class="case-scenario-text">${c.scenario}</div>

      <table class="case-data-table">
        <tr><th>Given Data</th><th>Value</th></tr>
        ${c.data.map(d => `<tr><td>${d.label}</td><td>${d.value}</td></tr>`).join('')}
      </table>
    </div>

    <div class="learn-section">
      <div class="learn-section-title">Your Calculations</div>
      ${c.inputs.map(inp => `
        <div class="case-input-row">
          <span class="case-input-label">${inp.label}</span>
          <input type="number" class="case-input" id="case-${inp.id}" step="0.01" placeholder="?">
          <span class="case-unit">${inp.unit}</span>
        </div>
        <div class="case-hint" id="hint-${inp.id}" style="display:none">💡 ${inp.hint}</div>
      `).join('')}

      <div class="case-actions">
        <button class="quiz-btn ghost" onclick="showCaseHints()">Show Hints</button>
        <button class="quiz-btn primary" onclick="checkCaseAnswers()">Check Answers →</button>
      </div>

      <div id="case-result"></div>
    </div>
  `;

  // Start timer
  caseTimerInterval = setInterval(updateCaseTimer, 1000);
}

function updateCaseTimer() {
  const elapsed = Math.floor((Date.now() - caseStartTime) / 1000);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const timerEl = document.getElementById('case-timer');
  if (timerEl) timerEl.textContent = `⏱ ${mins}:${secs.toString().padStart(2, '0')}`;
}

export function showCaseHints() {
  currentCase.inputs.forEach(inp => {
    document.getElementById(`hint-${inp.id}`).style.display = 'block';
  });
}

export function checkCaseAnswers() {
  if (!currentCase) return;

  clearInterval(caseTimerInterval);
  let correct = 0;

  currentCase.inputs.forEach(inp => {
    const inputEl = document.getElementById(`case-${inp.id}`);
    const userVal = parseFloat(inputEl.value);
    const tolerance = inp.tolerance || 0.5;

    if (Math.abs(userVal - inp.answer) <= tolerance) {
      inputEl.classList.add('correct');
      inputEl.classList.remove('incorrect');
      correct++;
    } else {
      inputEl.classList.add('incorrect');
      inputEl.classList.remove('correct');
    }
  });

  const total = currentCase.inputs.length;
  const pct = Math.round((correct / total) * 100);
  const success = pct >= 80;

  if (success) {
    if (!_progress.completedCases) _progress.completedCases = [];
    if (!_progress.completedCases.includes(currentCase.id)) {
      _progress.completedCases.push(currentCase.id);
      _saveProgress();
    }
  }

  document.getElementById('case-result').innerHTML = `
    <div class="case-result ${success ? 'success' : 'fail'}">
      <div class="case-result-icon">${success ? '🎉' : '📚'}</div>
      <div class="case-result-title">${success ? 'Great job!' : 'Keep practicing'}</div>
      <div class="case-result-sub">${correct}/${total} correct (${pct}%)</div>
      <button class="quiz-btn ${success ? 'primary' : 'ghost'}" style="margin-top:16px" onclick="closeCase()">
        ${success ? 'Next Case →' : 'Try Again'}
      </button>
    </div>
  `;
}

export function closeCase() {
  clearInterval(caseTimerInterval);
  currentCase = null;
  renderCasesGrid();
}
