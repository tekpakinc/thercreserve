const attempts = new Map();

export function createRateLimiter({ windowMs = 60_000, limit = 10 } = {}) {
  return {
    hit(key) {
      const now = Date.now();
      const entries = attempts.get(key) ?? [];
      const valid = entries.filter((t) => now - t < windowMs);

      if (valid.length >= limit) {
        attempts.set(key, valid);
        return { allowed: false, retryAfterMs: windowMs - (now - valid[0]) };
      }

      valid.push(now);
      attempts.set(key, valid);
      return { allowed: true, retryAfterMs: 0 };
    }
  };
}
