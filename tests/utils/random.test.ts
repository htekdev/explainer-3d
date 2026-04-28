import { describe, it, expect } from 'vitest';
import { createSeededRandom, seededRange, seededPosition } from '../../src/utils/random';

describe('createSeededRandom', () => {
  it('returns numbers between 0 and 1', () => {
    const rng = createSeededRandom(42);
    for (let i = 0; i < 100; i++) {
      const val = rng();
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThanOrEqual(1);
    }
  });
  it('is deterministic', () => {
    const rng1 = createSeededRandom(42);
    const rng2 = createSeededRandom(42);
    for (let i = 0; i < 50; i++) {
      expect(rng1()).toBe(rng2());
    }
  });
  it('different seeds produce different sequences', () => {
    const rng1 = createSeededRandom(1);
    const rng2 = createSeededRandom(2);
    let allSame = true;
    for (let i = 0; i < 10; i++) {
      if (rng1() !== rng2()) allSame = false;
    }
    expect(allSame).toBe(false);
  });
});

describe('seededRange', () => {
  it('stays within range', () => {
    const rng = createSeededRandom(42);
    for (let i = 0; i < 100; i++) {
      const val = seededRange(rng, -5, 5);
      expect(val).toBeGreaterThanOrEqual(-5);
      expect(val).toBeLessThanOrEqual(5);
    }
  });
});

describe('seededPosition', () => {
  it('returns 3-element tuple', () => {
    const rng = createSeededRandom(42);
    const pos = seededPosition(rng, 10);
    expect(pos).toHaveLength(3);
    pos.forEach(v => {
      expect(v).toBeGreaterThanOrEqual(-10);
      expect(v).toBeLessThanOrEqual(10);
    });
  });
});
