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
    const [x, y, z] = gridPosition(0, 6, 3, 2, true);
    expect(y).toBe(0);
    expect(typeof x).toBe('number');
    expect(typeof z).toBe('number');
  });

  it('items in same row get same Z offset', () => {
    const total = 6;
    const columns = 3;
    const [, , z0] = gridPosition(0, total, columns);
    const [, , z1] = gridPosition(1, total, columns);
    const [, , z2] = gridPosition(2, total, columns);
    expect(z0).toBe(z1);
    expect(z1).toBe(z2);
  });

  it('uses total not index for totalRows calculation', () => {
    const total = 9;
    const columns = 3;
    // All items should compute totalRows = ceil(9/3) = 3 regardless of index
    const [, , z0] = gridPosition(0, total, columns, 2, true);
    // Row 0 items should all have the same Z
    expect(z0).toBe(gridPosition(1, total, columns, 2, true)[2]);
    // Row 1 items should all be the same
    const [, , z3] = gridPosition(3, total, columns, 2, true);
    expect(z3).toBe(gridPosition(4, total, columns, 2, true)[2]);
    expect(z3).toBe(gridPosition(5, total, columns, 2, true)[2]);
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
