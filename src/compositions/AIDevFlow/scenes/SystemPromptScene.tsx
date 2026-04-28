import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Scene3D, SystemBox, TokenStream, GridFloor, ParticleField, FloatingLabel, AnimatedCamera } from '../../../components';

const PROMPT_TOKENS = [
  'You', 'are', 'an', 'AI', 'assistant.', 'Help', 'users', 'with',
  'code,', 'debugging,', 'and', 'architecture.', 'Be', 'concise.',
  'Follow', 'best', 'practices.', 'Use', 'TypeScript.',
];

export const SystemPromptScene: React.FC = () => {
  return (
    <AbsoluteFill>
      <Scene3D camera={{ position: [0, 2, 8], fov: 50 }}>
        <AnimatedCamera
          keyframes={[
            { frame: 0, position: [0, 2, 10], lookAt: [0, 0, 0] },
            { frame: 180, position: [2, 3, 7], lookAt: [0, 0.5, 0] },
          ]}
        />
        <GridFloor />
        <ParticleField count={100} spread={8} opacity={0.2} />
        <FloatingLabel
          text="System Prompt"
          position={[0, 2.5, 0]}
          fontSize={0.4}
          color="#FFB800"
          animateIn={{ startFrame: 10, durationFrames: 30 }}
        />
        <SystemBox
          position={[0, 0.5, 0]}
          size={[4, 2, 0.3]}
          label="Instructions"
          color="#4A90D9"
          animateIn={{ startFrame: 0, durationFrames: 30 }}
        />
        <TokenStream
          tokens={PROMPT_TOKENS}
          position={[-1.5, 0.5, 0.5]}
          direction="right"
          speed={4}
          color="#00D4AA"
          fontSize={0.15}
          startFrame={30}
          seed={100}
        />
      </Scene3D>
    </AbsoluteFill>
  );
};
