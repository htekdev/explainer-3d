import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { clamp } from '../utils/easing';

export function useAnimatedValue(
  startFrame: number,
  durationFrames: number,
  outputRange: [number, number] = [0, 1],
): number {
  const frame = useCurrentFrame();
  return interpolate(frame, [startFrame, startFrame + durationFrames], outputRange, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

export function useSpringValue(
  startFrame: number,
  config?: { damping?: number; mass?: number; stiffness?: number },
): number {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const adjustedFrame = Math.max(0, frame - startFrame);
  if (frame < startFrame) return 0;
  return spring({
    frame: adjustedFrame,
    fps,
    config: {
      damping: config?.damping ?? 15,
      mass: config?.mass ?? 1,
      stiffness: config?.stiffness ?? 80,
    },
  });
}

export function useFrameProgress(startFrame: number, durationFrames: number): number {
  const frame = useCurrentFrame();
  return clamp((frame - startFrame) / durationFrames, 0, 1);
}
