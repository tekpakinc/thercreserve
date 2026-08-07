import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('manifest.webmanifest', root), 'utf8'));
const index = await readFile(new URL('index.html', root), 'utf8');
const worker = await readFile(new URL('service-worker.js', root), 'utf8');

test('web app manifest is installable and its icons exist', async () => {
  assert.equal(manifest.display, 'standalone');
  assert.equal(manifest.start_url, '/?source=pwa');
  assert.ok(manifest.icons.some((icon) => icon.sizes === '192x192'));
  assert.ok(manifest.icons.some((icon) => icon.sizes === '512x512' && icon.purpose === 'maskable'));
  for (const icon of manifest.icons) await access(new URL(icon.src.replace(/^\//, ''), root));
});

test('page exposes PWA metadata and offline service worker shell', () => {
  assert.match(index, /rel="manifest"/);
  assert.match(index, /apple-touch-icon/);
  assert.match(index, /viewport-fit=cover/);
  assert.match(worker, /offline\.html/);
  assert.match(worker, /data\/vehicles\.json/);
});
