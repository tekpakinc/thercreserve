import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const data = JSON.parse(await readFile(new URL('../data/vehicles.json', import.meta.url), 'utf8'));

test('vehicle library records are valid and unique', () => {
  assert.ok(Array.isArray(data.vehicles));
  assert.ok(data.vehicles.length >= 10);
  const ids = new Set();
  for (const vehicle of data.vehicles) {
    for (const field of ['id', 'brand', 'model', 'platform', 'scale', 'category', 'drive', 'power', 'officialUrl']) assert.ok(vehicle[field], `${vehicle.id || 'record'} is missing ${field}`);
    assert.match(vehicle.officialUrl, /^https:\/\//);
    assert.ok(!ids.has(vehicle.id), `duplicate id: ${vehicle.id}`);
    ids.add(vehicle.id);
  }
});
