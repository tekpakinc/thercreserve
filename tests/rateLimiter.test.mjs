import test from 'node:test';
import assert from 'node:assert/strict';
import { createRateLimiter } from '../src/utils/rateLimiter.js';

test('rate limiter blocks after threshold', () => {
  const limiter = createRateLimiter({ windowMs: 1000, limit: 2 });
  assert.equal(limiter.hit('ip').allowed, true);
  assert.equal(limiter.hit('ip').allowed, true);
  assert.equal(limiter.hit('ip').allowed, false);
});
