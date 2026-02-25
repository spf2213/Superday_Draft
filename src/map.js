/* ─── KNOWLEDGE MAP ─────────────────── */

import { QUESTIONS } from './data/questions.js';
import { KNOWLEDGE_NODES } from './data/knowledgeNodes.js';

/* ─── SVG ICON LIBRARY FOR MAP ──────── */
const MAP_ICONS = {
  target: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  chart: `<svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
  chat: `<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  trending: `<svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  clipboard: `<svg viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`,
  dollar: `<svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  building: `<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="2"/><line x1="15" y1="22" x2="15" y2="2"/><line x1="4" y1="12" x2="20" y2="12"/></svg>`,
  file: `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
  calculator: `<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="8" y1="18" x2="16" y2="18"/></svg>`,
  layers: `<svg viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  scale: `<svg viewBox="0 0 24 24"><line x1="12" y1="3" x2="12" y2="21"/><polyline points="4 7 12 3 20 7"/><line x1="4" y1="7" x2="4" y2="13"/><line x1="20" y1="7" x2="20" y2="13"/><path d="M4 13a4 4 0 0 0 4-4"/><path d="M20 13a4 4 0 0 1-4-4"/></svg>`,
  hash: `<svg viewBox="0 0 24 24"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>`,
  scroll: `<svg viewBox="0 0 24 24"><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/></svg>`,
  compass: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  users: `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  award: `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  globe: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  barChart: `<svg viewBox="0 0 24 24"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`,
  handshake: `<svg viewBox="0 0 24 24"><path d="M11 17l-5-5"/><path d="M20 7l-9 9-4-4"/><path d="M4 12l3-3"/><path d="M15 6l5 5"/><polyline points="2 15 7 10"/><polyline points="17 2 22 7"/></svg>`,
};

/* ─── MAP STATE ─────────────────────── */
let mapState = { x: 0, y: 0, scale: 1, dragging: false, startX: 0, startY: 0, startPanX: 0, startPanY: 0 };
const MAP_MIN_SCALE = 0.25;
const MAP_MAX_SCALE = 2.5;

// These will be set by setMapDeps() from app.js
let _getMasteryClass = () => 'new';
let _showView = () => {};

/** Call once from app.js so the map can reach back into shared helpers. */
export function setMapDeps({ getMasteryClass, showView }) {
  _getMasteryClass = getMasteryClass;
  _showView = showView;
}

export function renderKnowledgeMap() {
  const container = document.getElementById('map-container');
  const canvas = document.getElementById('map-canvas');
  const svg = document.getElementById('map-svg');
  if (!canvas || !svg) return;

  // Clear existing nodes (keep grid)
  canvas.querySelectorAll('.map-node').forEach(n => n.remove());
  svg.innerHTML = '';

  // Draw curved edges
  KNOWLEDGE_NODES.forEach(node => {
    if (!node.parent) return;
    const parent = KNOWLEDGE_NODES.find(n => n.id === node.parent);
    if (!parent) return;

    const nodeStatus = getNodeStatus(node);
    const parentStatus = getNodeStatus(parent);
    const isActive = nodeStatus !== 'new' || parentStatus !== 'new';

    // Glow layer
    const glow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = buildCurve(parent.x, parent.y, node.x, node.y);
    glow.setAttribute('d', d);
    glow.setAttribute('class', 'map-edge-glow' + (isActive ? ' active' : ''));
    svg.appendChild(glow);

    // Main edge
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('class', 'map-edge' + (isActive ? ' active' : ''));
    svg.appendChild(path);
  });

  // Draw nodes
  KNOWLEDGE_NODES.forEach(node => {
    const div = document.createElement('div');
    div.className = 'map-node';
    if (node.central) div.classList.add('central');

    const status = getNodeStatus(node);
    if (status === 'mastered') div.classList.add('mastered');
    else if (status === 'learning') div.classList.add('learning');

    const progress = getNodeProgress(node);
    const color = node.central ? 'var(--accent)' :
                  status === 'mastered' ? 'var(--green)' :
                  status === 'learning' ? 'var(--amber)' : 'var(--bg-4)';

    const iconSvg = MAP_ICONS[node.icon] || MAP_ICONS.target;

    div.innerHTML = `
      <div class="map-node-inner">
        <div class="map-node-icon-wrap">${iconSvg}</div>
        <div class="map-node-title">${node.title}</div>
        <div class="map-node-sub">${progress.done}/${progress.total}</div>
        <div class="map-node-progress">
          <div class="map-node-progress-fill" style="width:${progress.pct}%;background:${color}"></div>
        </div>
      </div>
    `;

    div.style.left = node.x + 'px';
    div.style.top = node.y + 'px';
    div.style.transform = 'translate(-50%, -50%)';

    if (!node.central) {
      div.onclick = (e) => {
        e.stopPropagation();
        if (node.sub) {
          document.getElementById('quiz-cat-select').value = 'tech';
          _showView('quiz');
        } else if (node.cat) {
          document.getElementById('quiz-cat-select').value = node.cat;
          _showView('quiz');
        }
      };
    }

    canvas.appendChild(div);
  });

  // Init pan/zoom
  mapInitView();
  mapUpdateMinimap();
}

function buildCurve(x1, y1, x2, y2) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const offset = dist * 0.15;
  // Perpendicular offset for a gentle curve
  const nx = -dy / dist * offset;
  const ny = dx / dist * offset;
  return `M${x1},${y1} Q${mx + nx},${my + ny} ${x2},${y2}`;
}

function mapInitView() {
  const container = document.getElementById('map-container');
  if (!container) return;
  const cw = container.offsetWidth;
  const ch = container.offsetHeight;
  // Center on the main node
  mapState.scale = 0.55;
  mapState.x = cw / 2 - 1500 * mapState.scale;
  mapState.y = ch / 2 - 1000 * mapState.scale;
  mapApplyTransform();
}

function mapApplyTransform() {
  const canvas = document.getElementById('map-canvas');
  if (!canvas) return;
  canvas.style.transform = `translate(${mapState.x}px, ${mapState.y}px) scale(${mapState.scale})`;
  const label = document.getElementById('map-zoom-label');
  if (label) label.textContent = Math.round(mapState.scale * 100) + '%';
  mapUpdateMinimap();
}

export function mapZoom(delta, cx, cy) {
  const container = document.getElementById('map-container');
  if (!container) return;
  const oldScale = mapState.scale;
  mapState.scale = Math.min(MAP_MAX_SCALE, Math.max(MAP_MIN_SCALE, mapState.scale + delta));

  // Zoom toward point (or center)
  if (cx === undefined) {
    cx = container.offsetWidth / 2;
    cy = container.offsetHeight / 2;
  }
  const ratio = mapState.scale / oldScale;
  mapState.x = cx - ratio * (cx - mapState.x);
  mapState.y = cy - ratio * (cy - mapState.y);
  mapApplyTransform();
}

export function mapFitAll() {
  const container = document.getElementById('map-container');
  if (!container) return;
  const cw = container.offsetWidth;
  const ch = container.offsetHeight;
  // Bounding box of all nodes
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  KNOWLEDGE_NODES.forEach(n => {
    if (n.x < minX) minX = n.x;
    if (n.y < minY) minY = n.y;
    if (n.x > maxX) maxX = n.x;
    if (n.y > maxY) maxY = n.y;
  });
  const pad = 120;
  minX -= pad; minY -= pad; maxX += pad; maxY += pad;
  const bw = maxX - minX;
  const bh = maxY - minY;
  mapState.scale = Math.min(cw / bw, ch / bh, 1.2);
  mapState.x = (cw - bw * mapState.scale) / 2 - minX * mapState.scale;
  mapState.y = (ch - bh * mapState.scale) / 2 - minY * mapState.scale;
  mapApplyTransform();
}

export function mapResetView() { mapInitView(); }

// Pan/zoom event wiring
(function() {
  let raf;
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('map-container');
    if (!container) return;

    // Mouse drag to pan
    container.addEventListener('mousedown', e => {
      if (e.target.closest('.map-node') || e.target.closest('.map-hud') || e.target.closest('.map-legend') || e.target.closest('.map-minimap')) return;
      mapState.dragging = true;
      mapState.startX = e.clientX;
      mapState.startY = e.clientY;
      mapState.startPanX = mapState.x;
      mapState.startPanY = mapState.y;
      container.style.cursor = 'grabbing';
    });
    window.addEventListener('mousemove', e => {
      if (!mapState.dragging) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        mapState.x = mapState.startPanX + (e.clientX - mapState.startX);
        mapState.y = mapState.startPanY + (e.clientY - mapState.startY);
        mapApplyTransform();
      });
    });
    window.addEventListener('mouseup', () => {
      mapState.dragging = false;
      const container = document.getElementById('map-container');
      if (container) container.style.cursor = '';
    });

    // Scroll to zoom
    container.addEventListener('wheel', e => {
      e.preventDefault();
      const rect = container.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const delta = -e.deltaY * 0.001 * mapState.scale;
      mapZoom(delta, cx, cy);
    }, { passive: false });

    // Touch support
    let lastTouchDist = 0;
    let lastTouchCenter = null;
    container.addEventListener('touchstart', e => {
      if (e.target.closest('.map-node') || e.target.closest('.map-hud')) return;
      if (e.touches.length === 1) {
        mapState.dragging = true;
        mapState.startX = e.touches[0].clientX;
        mapState.startY = e.touches[0].clientY;
        mapState.startPanX = mapState.x;
        mapState.startPanY = mapState.y;
      } else if (e.touches.length === 2) {
        mapState.dragging = false;
        lastTouchDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        lastTouchCenter = { x: (e.touches[0].clientX + e.touches[1].clientX) / 2, y: (e.touches[0].clientY + e.touches[1].clientY) / 2 };
      }
    }, { passive: false });
    container.addEventListener('touchmove', e => {
      e.preventDefault();
      if (e.touches.length === 1 && mapState.dragging) {
        mapState.x = mapState.startPanX + (e.touches[0].clientX - mapState.startX);
        mapState.y = mapState.startPanY + (e.touches[0].clientY - mapState.startY);
        mapApplyTransform();
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        const delta = (dist - lastTouchDist) * 0.003;
        const rect = container.getBoundingClientRect();
        const cx = lastTouchCenter.x - rect.left;
        const cy = lastTouchCenter.y - rect.top;
        mapZoom(delta, cx, cy);
        lastTouchDist = dist;
      }
    }, { passive: false });
    container.addEventListener('touchend', () => { mapState.dragging = false; });
  });
})();

function mapUpdateMinimap() {
  const minimapCanvas = document.getElementById('minimap-canvas');
  const viewport = document.getElementById('minimap-viewport');
  const container = document.getElementById('map-container');
  if (!minimapCanvas || !viewport || !container) return;

  const ctx = minimapCanvas.getContext('2d');
  const mw = 160, mh = 100;
  const worldW = 3000, worldH = 2000;
  const sx = mw / worldW, sy = mh / worldH;

  ctx.clearRect(0, 0, mw, mh);

  // Draw edges
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--line-2').trim() || 'rgba(255,255,255,0.1)';
  ctx.lineWidth = 0.5;
  KNOWLEDGE_NODES.forEach(node => {
    if (!node.parent) return;
    const parent = KNOWLEDGE_NODES.find(n => n.id === node.parent);
    if (!parent) return;
    ctx.beginPath();
    ctx.moveTo(parent.x * sx, parent.y * sy);
    ctx.lineTo(node.x * sx, node.y * sy);
    ctx.stroke();
  });

  // Draw dots
  KNOWLEDGE_NODES.forEach(node => {
    const status = getNodeStatus(node);
    ctx.fillStyle = node.central ? '#5E6AD2' : status === 'mastered' ? '#2CB67D' : status === 'learning' ? '#E09A3B' : 'rgba(255,255,255,0.2)';
    ctx.beginPath();
    ctx.arc(node.x * sx, node.y * sy, node.central ? 3 : 2, 0, Math.PI * 2);
    ctx.fill();
  });

  // Viewport rect
  const cw = container.offsetWidth;
  const ch = container.offsetHeight;
  const vx = (-mapState.x / mapState.scale) * sx;
  const vy = (-mapState.y / mapState.scale) * sy;
  const vw = (cw / mapState.scale) * sx;
  const vh = (ch / mapState.scale) * sy;
  viewport.style.left = Math.max(0, vx) + 'px';
  viewport.style.top = Math.max(0, vy) + 'px';
  viewport.style.width = Math.min(mw, vw) + 'px';
  viewport.style.height = Math.min(mh, vh) + 'px';
}

function getNodeStatus(node) {
  const questions = getNodeQuestions(node);
  if (!questions.length) return 'new';

  const mastered = questions.filter(q => _getMasteryClass(q.id) === 'mastered').length;
  const learning = questions.filter(q => _getMasteryClass(q.id) === 'learning').length;

  if (mastered === questions.length) return 'mastered';
  if (mastered > 0 || learning > 0) return 'learning';
  return 'new';
}

function getNodeProgress(node) {
  const questions = getNodeQuestions(node);
  if (!questions.length) return { done: 0, total: 0, pct: 0 };

  const mastered = questions.filter(q => _getMasteryClass(q.id) === 'mastered').length;
  return {
    done: mastered,
    total: questions.length,
    pct: Math.round((mastered / questions.length) * 100)
  };
}

function getNodeQuestions(node) {
  if (node.central) return QUESTIONS;
  if (node.sub) return QUESTIONS.filter(q => q.sub === node.sub);
  if (node.cat) return QUESTIONS.filter(q => q.cat === node.cat);
  return [];
}
