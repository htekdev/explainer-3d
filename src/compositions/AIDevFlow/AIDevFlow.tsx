import React from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { SystemPromptScene } from './scenes/SystemPromptScene';
import { SkillsMergeScene } from './scenes/SkillsMergeScene';
import { ModelProcessScene } from './scenes/ModelProcessScene';
import { OutputScene } from './scenes/OutputScene';
import type { SceneDefinition } from '../../utils/types';

const CROSSFADE = 30;

const SCENES: SceneDefinition[] = [
  { id: 'system-prompt', from: 0, durationInFrames: 450, component: SystemPromptScene },
  { id: 'skills-merge', from: 420, durationInFrames: 480, component: SkillsMergeScene },
  { id: 'model-process', from: 870, durationInFrames: 420, component: ModelProcessScene },
  { id: 'output', from: 1260, durationInFrames: 540, component: OutputScene },
];

const CrossfadeWrapper: React.FC<{
  readonly sceneFrom: number;
  readonly sceneDuration: number;
  readonly isFirst: boolean;
  readonly isLast: boolean;
  readonly children: React.ReactNode;
}> = ({ sceneFrom, sceneDuration, isFirst, isLast, children }) => {
  const frame = useCurrentFrame() + sceneFrom;
  const sceneEnd = sceneFrom + sceneDuration;

  const fadeIn = isFirst
    ? 1
    : interpolate(frame, [sceneFrom, sceneFrom + CROSSFADE], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

  const fadeOut = isLast
    ? 1
    : interpolate(frame, [sceneEnd - CROSSFADE, sceneEnd], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

  return <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut) }}>{children}</AbsoluteFill>;
};

export const AIDevFlow: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0A1A' }}>
      {SCENES.map((scene, i) => {
        const SceneComponent = scene.component;
        return (
          <Sequence key={scene.id} from={scene.from} durationInFrames={scene.durationInFrames}>
            <CrossfadeWrapper
              sceneFrom={scene.from}
              sceneDuration={scene.durationInFrames}
              isFirst={i === 0}
              isLast={i === SCENES.length - 1}
            >
              <SceneComponent />
            </CrossfadeWrapper>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
