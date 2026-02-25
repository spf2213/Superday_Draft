/* ─── INTERNSHIP TRACKER ────────────── */

import { INTERNSHIP_DATA } from './data/internships.js';

// Will be set by setInternshipsDeps() from app.js
let _saveProgress = () => {};

/** Call once from app.js so internships can reach back into shared state. */
export function setInternshipsDeps({ saveProgress }) {
  _saveProgress = saveProgress;
}

let applyFilter = 'all';
let applyTypeFilter = 'all';
let applySortField = 'deadline';
let applySortDir = 1;
let applySaved = [];

export function getApplySaved() { return applySaved; }
export function setApplySaved(arr) { applySaved = arr; }

export function setApplyFilter(f, el) {
  applyFilter = f;
  document.querySelectorAll('#apply-filters .bank-pill').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderApplyTracker();
}
export function setApplyType(t, el) {
  applyTypeFilter = t;
  document.querySelectorAll('#apply-type-filters .bank-pill').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderApplyTracker();
}
export function sortApply(field) {
  if (applySortField === field) applySortDir *= -1;
  else { applySortField = field; applySortDir = 1; }
  renderApplyTracker();
}
export function toggleApplySave(firm) {
  const idx = applySaved.indexOf(firm);
  if (idx >= 0) applySaved.splice(idx, 1);
  else applySaved.push(firm);
  try { _saveProgress(); } catch(e) {}
  renderApplyTracker();
}

export function renderApplyTracker() {
  const search = (document.getElementById('apply-search')?.value || '').toLowerCase();
  const today = new Date();

  let data = INTERNSHIP_DATA.filter(d => {
    if (search && !d.firm.toLowerCase().includes(search) && !d.division.toLowerCase().includes(search) && !d.type.toLowerCase().includes(search)) return false;
    if (applyFilter === 'open' && d.status !== 'open') return false;
    if (applyFilter === 'closed' && d.status !== 'closed') return false;
    if (applyFilter === 'upcoming' && d.status !== 'upcoming') return false;
    if (applyFilter === 'saved' && !applySaved.includes(d.firm)) return false;
    if (applyTypeFilter !== 'all' && d.type !== applyTypeFilter) return false;
    return true;
  });

  data.sort((a, b) => {
    let va, vb;
    if (applySortField === 'firm') { va = a.firm; vb = b.firm; }
    else if (applySortField === 'status') {
      const order = { open: 0, upcoming: 1, closed: 2 };
      va = order[a.status]; vb = order[b.status];
    } else { va = a.deadline; vb = b.deadline; }
    if (va < vb) return -1 * applySortDir;
    if (va > vb) return 1 * applySortDir;
    return 0;
  });

  const openCount = INTERNSHIP_DATA.filter(d => d.status === 'open').length;
  const closedCount = INTERNSHIP_DATA.filter(d => d.status === 'closed').length;
  const upcomingCount = INTERNSHIP_DATA.filter(d => d.status === 'upcoming').length;
  const closingSoon = INTERNSHIP_DATA.filter(d => {
    if (d.status !== 'open') return false;
    const diff = (new Date(d.deadline) - today) / (1000*60*60*24);
    return diff >= 0 && diff <= 14;
  }).length;

  const statsEl = document.getElementById('apply-stats');
  if (statsEl) statsEl.innerHTML = `
    <div class="apply-stat-card">
      <div class="apply-stat-label">Open Now</div>
      <div class="apply-stat-val" style="color:var(--green)">${openCount}</div>
      <div class="apply-stat-sub">Accepting applications</div>
    </div>
    <div class="apply-stat-card">
      <div class="apply-stat-label">Closing Soon</div>
      <div class="apply-stat-val" style="color:var(--red)">${closingSoon}</div>
      <div class="apply-stat-sub">Within 14 days</div>
    </div>
    <div class="apply-stat-card">
      <div class="apply-stat-label">Upcoming</div>
      <div class="apply-stat-val" style="color:var(--amber)">${upcomingCount}</div>
      <div class="apply-stat-sub">Not yet open</div>
    </div>
    <div class="apply-stat-card">
      <div class="apply-stat-label">Closed</div>
      <div class="apply-stat-val">${closedCount}</div>
      <div class="apply-stat-sub">Deadline passed</div>
    </div>
  `;

  const tbody = document.getElementById('apply-tbody');
  if (!tbody) return;
  if (!data.length) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--t-3)">No internships match your filters.</td></tr>';
  } else {
    tbody.innerHTML = data.map(d => {
      const isSaved = applySaved.includes(d.firm);
      const dl = new Date(d.deadline);
      const diff = Math.ceil((dl - today) / (1000*60*60*24));
      const deadlineStr = dl.toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
      const deadlineClass = (d.status === 'open' && diff >= 0 && diff <= 14) ? 'apply-deadline-soon' : '';
      const deadlineExtra = (d.status === 'open' && diff >= 0 && diff <= 14) ? ' · ' + diff + 'd' : '';
      const typeClass = d.type === 'BB' ? 'type-bb' : d.type === 'EB' ? 'type-eb' : d.type === 'MM' ? 'type-mm' : 'type-other';
      const typeLabel = d.type === 'BB' ? 'Bulge Bracket' : d.type === 'EB' ? 'Elite Boutique' : d.type === 'MM' ? 'Mid-Market' : d.type;
      const statusClass = 'status-' + d.status;
      const statusLabel = d.status.charAt(0).toUpperCase() + d.status.slice(1);
      const linkBtn = d.status === 'closed'
        ? '<span class="apply-link-btn disabled">Closed</span>'
        : d.status === 'upcoming'
        ? '<span class="apply-link-btn disabled">Soon</span>'
        : '<a class="apply-link-btn" href="' + d.url + '" target="_blank" rel="noopener">Apply →</a>';

      return '<tr>' +
        '<td><button class="apply-star-btn ' + (isSaved?'saved':'') + '" onclick="toggleApplySave(\'' + d.firm.replace(/'/g,"\\'") + '\')">' + (isSaved?'★':'☆') + '</button></td>' +
        '<td><div class="apply-firm"><div class="apply-firm-logo">' + d.abbr.substring(0,3) + '</div><span class="apply-firm-name">' + d.firm + '</span></div></td>' +
        '<td class="apply-division">' + d.division + '</td>' +
        '<td><span class="apply-type-badge ' + typeClass + '">' + typeLabel + '</span></td>' +
        '<td><span class="apply-status ' + statusClass + '">' + statusLabel + '</span></td>' +
        '<td><span class="apply-deadline ' + deadlineClass + '">' + deadlineStr + deadlineExtra + '</span></td>' +
        '<td class="apply-location">' + d.location + '</td>' +
        '<td>' + linkBtn + '</td>' +
        '</tr>';
    }).join('');
  }
}
