export type Vec3 = [number, number, number];

export interface AnimationTiming {
  startFrame: number;
  durationFrames: number;
}

export interface SceneDefinition {
  id: string;
  from: number;
  durationInFrames: number;
  component: React.FC;
}
