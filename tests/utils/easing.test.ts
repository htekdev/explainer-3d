import { describe, it, expect } from 'vitest';
import {
  easeInOutCubic, easeOutExpo, easeInOutQuart, easeOutBack, easeOutElastic,
  clamp, lerp, inverseLerp, remap,
} from '../../src/utils/easing';

describe('easeInOutCubic', () => {
  it('returns 0 at start', () => expect(easeInOutCubic(0)).toBe(0));
  it('returns 0.5 at midpoint', () => expect(easeInOutCubic(0.5)).toBe(0.5));
  it('returns 1 at end', () => expect(easeInOutCubic(1)).toBe(1));
  it('is below 0.5 before midpoint', () => expect(easeInOutCubic(0.3)).toBeLessThan(0.5));
  it('is above 0.5 after midpoint', () => expect(easeInOutCubic(0.7)).toBeGreaterThan(0.5));
});

describe('easeOutExpo', () => {
  it('returns 0 at start', () => expect(easeOutExpo(0)).toBeCloseTo(0, 1));
  it('returns 1 at end', () => expect(easeOutExpo(1)).toBe(1));
  it('approaches 1 quickly', () => expect(easeOutExpo(0.5)).toBeGreaterThan(0.95));
});

describe('easeInOutQuart', () => {
  it('returns 0 at start', () => expect(easeInOutQuart(0)).toBe(0));
  it('returns 1 at end', () => expect(easeInOutQuart(1)).toBe(1));
});

describe('easeOutBack', () => {
  it('overshoots then returns to 1', () => {
    expect(easeOutBack(0.5)).toBeGreaterThan(0.5);
    expect(easeOutBack(1)).toBeCloseTo(1, 5);
  });
});

describe('easeOutElastic', () => {
  it('returns 0 at 0', () => expect(easeOutElastic(0)).toBe(0));
  it('returns 1 at 1', () => expect(easeOutElastic(1)).toBe(1));
});

describe('clamp', () => {
  it('clamps below min', () => expect(clamp(-1, 0, 1)).toBe(0));
  it('clamps above max', () => expect(clamp(2, 0, 1)).toBe(1));
  it('passes through in range', () => expect(clamp(0.5, 0, 1)).toBe(0.5));
});

describe('lerp', () => {
  it('returns start at t=0', () => expect(lerp(0, 10, 0)).toBe(0));
  it('returns end at t=1', () => expect(lerp(0, 10, 1)).toBe(10));
  it('returns midpoint at t=0.5', () => expect(lerp(0, 10, 0.5)).toBe(5));
  it('clamps t below 0', () => expect(lerp(0, 10, -1)).toBe(0));
  it('clamps t above 1', () => expect(lerp(0, 10, 2)).toBe(10));
});

describe('inverseLerp', () => {
  it('returns 0 at start', () => expect(inverseLerp(0, 10, 0)).toBe(0));
  it('returns 1 at end', () => expect(inverseLerp(0, 10, 10)).toBe(1));
  it('returns 0.5 at midpoint', () => expect(inverseLerp(0, 10, 5)).toBe(0.5));
  it('clamps below range', () => expect(inverseLerp(0, 10, -5)).toBe(0));
  it('handles equal start/end', () => expect(inverseLerp(5, 5, 5)).toBe(0));
});

describe('remap', () => {
  it('remaps correctly', () => expect(remap(5, 0, 10, 0, 100)).toBe(50));
  it('remaps with different ranges', () => expect(remap(0.5, 0, 1, 100, 200)).toBe(150));
});
