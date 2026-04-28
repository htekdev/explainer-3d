import { describe, it, expect } from 'vitest';
import { hexToRgb, getGlowColor, THEME } from '../../src/utils/colors';

describe('hexToRgb', () => {
  it('converts white', () => {
    expect(hexToRgb('#FFFFFF')).toEqual([1, 1, 1]);
  });
  it('converts black', () => {
    expect(hexToRgb('#000000')).toEqual([0, 0, 0]);
  });
  it('converts primary blue', () => {
    const [r, g, b] = hexToRgb('#4A90D9');
    expect(r).toBeCloseTo(0.29, 1);
    expect(g).toBeCloseTo(0.565, 1);
    expect(b).toBeCloseTo(0.851, 1);
  });
  it('handles missing hash', () => {
    expect(hexToRgb('FF0000')).toEqual([1, 0, 0]);
  });
  it('returns white for invalid hex', () => {
    expect(hexToRgb('not-a-hex')).toEqual([1, 1, 1]);
  });
});

describe('getGlowColor', () => {
  it('returns blue glow', () => {
    expect(getGlowColor('blue')).toBe('#4A90D9');
  });
  it('returns all glow colors', () => {
    const keys = Object.keys(THEME.glow) as (keyof typeof THEME.glow)[];
    for (const key of keys) {
      expect(getGlowColor(key)).toBe(THEME.glow[key]);
    }
  });
});

describe('THEME', () => {
  it('has all required colors', () => {
    expect(THEME.primary).toBeDefined();
    expect(THEME.secondary).toBeDefined();
    expect(THEME.accent).toBeDefined();
    expect(THEME.background).toBeDefined();
    expect(THEME.surface).toBeDefined();
    expect(THEME.text).toBeDefined();
  });
});
