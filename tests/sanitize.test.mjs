import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeInput } from '../src/utils/sanitize.js';

test('sanitizeInput escapes HTML', () => {
  assert.equal(sanitizeInput('<script>alert(1)</script>'), '&lt;script&gt;alert(1)&lt;/script&gt;');
});
