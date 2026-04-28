import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('remotion', () => ({
  useCurrentFrame: vi.fn(() => 0),
  useVideoConfig: vi.fn(() => ({ fps: 60, width: 1920, height: 1080, durationInFrames: 1800 })),
}));

import { useSceneProgress, useIsSceneActive, useSceneTime } from '../../src/hooks/useScene';
import * as remotion from 'remotion';

describe('useSceneProgress', () => {
  it('returns 0 before scene start', () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(0);
    expect(useSceneProgress(10, 30)).toBe(0);
  });

  it('returns 1 at scene end', () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(40);
    expect(useSceneProgress(10, 30)).toBe(1);
  });
});

describe('useIsSceneActive', () => {
  it('returns false before scene', () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(5);
    expect(useIsSceneActive(10, 30)).toBe(false);
  });

  it('returns true during scene', () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(20);
    expect(useIsSceneActive(10, 30)).toBe(true);
  });

  it('returns false after scene', () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(45);
    expect(useIsSceneActive(10, 30)).toBe(false);
  });
});

describe('useSceneTime', () => {
  it('returns correct time', () => {
    vi.mocked(remotion.useCurrentFrame).mockReturnValue(120);
    const { frame, fps, seconds } = useSceneTime();
    expect(frame).toBe(120);
    expect(fps).toBe(60);
    expect(seconds).toBe(2);
  });
});
