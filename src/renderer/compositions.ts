export const COMPOSITIONS = {
  AIDevFlow: {
    id: 'AIDevFlow',
    defaultOutput: 'out/ai-dev-flow.mp4',
    durationInFrames: 1800,
    fps: 60,
  },
} as const;

export type CompositionId = keyof typeof COMPOSITIONS;
