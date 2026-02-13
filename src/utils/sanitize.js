export function sanitizeInput(value) {
  const str = String(value ?? '');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .trim();
}

export function safeText(value, fallback = '') {
  const clean = sanitizeInput(value);
  return clean.length ? clean : fallback;
}
