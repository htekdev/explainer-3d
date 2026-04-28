import { describe, it, expect } from 'vitest';
import { circularPosition, gridPosition, lerpPosition, midpoint, distance } from '../../src/utils/layout';

describe('circularPosition', () => {
  it('first position is on x-axis', () => {
    const [x, y, z] = circularPosition(0, 4, 5);
    expect(x).toBeCloseTo(5);
    expect(y).toBe(0);
    expect(z).toBeCloseTo(0);
  });
  it('respects y offset', () => {
    const [, y] = circularPosition(0, 4, 5, 3);
    expect(y).toBe(3);
  });
  it('distributes evenly', () => {
    const pos1 = circularPosition(0, 4, 5);
    const pos2 = circularPosition(1, 4, 5);
    const dist = distance(pos1, pos2);
    expect(dist).toBeGreaterThan(0);
  });
});

describe('gridPosition', () => {
  it('first item at centered origin', () => {
    const [x, y, z] = gridPosition(0, 3, 2, true);
    expect(y).toBe(0);
    expect(typeof x).toBe('number');
    expect(typeof z).toBe('number');
  });
});

describe('lerpPosition', () => {
  it('returns start at t=0', () => {
    expect(lerpPosition([0, 0, 0], [10, 10, 10], 0)).toEqual([0, 0, 0]);
  });
  it('returns end at t=1', () => {
    expect(lerpPosition([0, 0, 0], [10, 10, 10], 1)).toEqual([10, 10, 10]);
  });
  it('returns midpoint at t=0.5', () => {
    expect(lerpPosition([0, 0, 0], [10, 10, 10], 0.5)).toEqual([5, 5, 5]);
  });
});

describe('midpoint', () => {
  it('calculates midpoint', () => {
    expect(midpoint([0, 0, 0], [10, 10, 10])).toEqual([5, 5, 5]);
  });
});

describe('distance', () => {
  it('returns 0 for same point', () => {
    expect(distance([1, 2, 3], [1, 2, 3])).toBe(0);
  });
  it('calculates correct distance', () => {
    expect(distance([0, 0, 0], [3, 4, 0])).toBe(5);
  });
});
