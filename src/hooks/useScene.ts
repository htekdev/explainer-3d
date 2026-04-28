import { useCurrentFrame, useVideoConfig } from 'remotion';
import { clamp } from '../utils/easing';

export function useSceneProgress(sceneFrom: number, sceneDuration: number): number {
  const frame = useCurrentFrame();
  return clamp((frame - sceneFrom) / sceneDuration, 0, 1);
}

export function useIsSceneActive(sceneFrom: number, sceneDuration: number): boolean {
  const frame = useCurrentFrame();
  return frame >= sceneFrom && frame < sceneFrom + sceneDuration;
}

export function useSceneTime(): { frame: number; fps: number; seconds: number } {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return { frame, fps, seconds: frame / fps };
}
