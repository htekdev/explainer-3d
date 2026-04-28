import React from 'react';
import { AbsoluteFill } from 'remotion';
import {
  Scene3D, AnimatedCamera, GridFloor, ParticleField,
} from '../../components';
import { UserInputPhase } from './scenes/SystemPromptScene';
import { ContextMergePhase } from './scenes/SkillsMergeScene';
import { AgentProcessPhase } from './scenes/ModelProcessScene';
import { OutputLoopPhase } from './scenes/OutputScene';
import type { CameraKeyframe } from '../../components';

const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  { frame: 0, position: [-10, 2, 6], lookAt: [-8, 0.5, 0] },
  { frame: 200, position: [-5, 3, 8], lookAt: [-3, 1, 0] },
  { frame: 450, position: [0, 3, 8], lookAt: [1, 0.5, 0] },
  { frame: 750, position: [4, 3, 8], lookAt: [5, 0.5, 0] },
  { frame: 1050, position: [6, 3, 9], lookAt: [4, 0, 0] },
  { frame: 1350, position: [0, 6, 16], lookAt: [0, 0.5, 0] },
  { frame: 1800, position: [0, 7, 18], lookAt: [0, 0.5, 0] },
];

export const AIDevFlow: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0A1A' }}>
      <Scene3D
        bloom={{ intensity: 1.8, luminanceThreshold: 0.15, luminanceSmoothing: 0.85 }}
        camera={{ position: [-10, 2, 6], fov: 50 }}
      >
        <AnimatedCamera keyframes={CAMERA_KEYFRAMES} />
        <GridFloor fadeDistance={40} yPosition={-2} />
        <ParticleField count={300} opacity={0.15} seed={1} spread={20} />

        {/* Phase 1: User typing (frames 0-300) */}
        <UserInputPhase startFrame={0} />

        {/* Phase 2: Context boxes + merge (frames 200-550) */}
        <ContextMergePhase startFrame={200} />

        {/* Phase 3: Agent model processing (frames 450-900) */}
        <AgentProcessPhase startFrame={450} />

        {/* Phase 4-6: Output, split, feedback loop (frames 750+) */}
        <OutputLoopPhase startFrame={750} />
      </Scene3D>
    </AbsoluteFill>
  );
};
