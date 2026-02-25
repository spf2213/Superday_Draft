/* ─── THEME ──────────────────────────── */

export function setNavActive(el) {
  document.querySelectorAll('#nav-links .nav-link').forEach(l => l.classList.remove('nav-active'));
  el.classList.add('nav-active');
}

export function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  const icon = document.getElementById('theme-icon');
  const label = document.getElementById('theme-label-app');
  if (icon) icon.textContent = isDark ? '☀' : '☽';
  if (label) label.textContent = isDark ? 'LIGHT' : 'DARK';
}
