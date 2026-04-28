import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('remotion', () => ({
  useCurrentFrame: vi.fn(() => 0),
  useVideoConfig: vi.fn(() => ({ fps: 60, width: 1920, height: 1080, durationInFrames: 1800 })),
  interpolate: vi.fn((frame: number, inputRange: number[], outputRange: number[]) => {
    const [inMin, inMax] = inputRange;
    const [outMin, outMax] = outputRange;
    const t = Math.max(0, Math.min(1, (frame - inMin) / (inMax - inMin)));
    return outMin + t * (outMax - outMin);
  }),
  spring: vi.fn(({ frame }: { frame: number }) => Math.min(1, frame / 30)),
}));

import { useAnimatedValue, useSpringValue, useFrameProgress } from '../../src/hooks/useAnimatedValue';
import * as remotion from 'remotion';

describe('useAnimatedValue', () => {
  beforeEach(() => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(0);
  });

  it('returns start of output range at start frame', () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(10);
    const result = useAnimatedValue(10, 30, [0, 1]);
    expect(result).toBeCloseTo(0);
  });

  it('returns end of output range at end frame', () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(40);
    const result = useAnimatedValue(10, 30, [0, 1]);
    expect(result).toBeCloseTo(1);
  });
});

describe('useSpringValue', () => {
  it('returns 0 before start frame', () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(5);
    expect(useSpringValue(10)).toBe(0);
  });

  it('returns spring value after start frame', () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(25);
    const result = useSpringValue(10);
    expect(result).toBeGreaterThan(0);
  });
});

describe('useFrameProgress', () => {
  it('returns 0 before start', () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(0);
    expect(useFrameProgress(10, 30)).toBe(0);
  });

  it('returns 1 at end', () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(40);
    expect(useFrameProgress(10, 30)).toBe(1);
  });

  it('returns 0.5 at midpoint', () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(25);
    expect(useFrameProgress(10, 30)).toBeCloseTo(0.5);
  });
});
