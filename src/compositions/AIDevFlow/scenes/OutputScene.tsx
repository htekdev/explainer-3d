import React from 'react';
import { AbsoluteFill } from 'remotion';
import {
  Scene3D, SystemBox, TokenStream, Arrow3D, DataFlow,
  GlowOrb, GridFloor, ParticleField, FloatingLabel, AnimatedCamera,
} from '../../../components';

const OUTPUT_TOKENS = [
  'const', 'result', '=', 'await', 'fetchData();',
  'return', 'format(result);',
];

export const OutputScene: React.FC = () => {
  return (
    <AbsoluteFill>
      <Scene3D camera={{ position: [0, 3, 10], fov: 50 }}>
        <AnimatedCamera
          keyframes={[
            { frame: 0, position: [0, 2, 8], lookAt: [0, 0.5, 0] },
            { frame: 120, position: [3, 2, 7], lookAt: [1, 0.5, 0] },
          ]}
        />
        <GridFloor />
        <ParticleField count={100} spread={8} opacity={0.15} seed={400} />

        <GlowOrb position={[-3, 0.5, 0]} radius={0.6} color="#7B61FF"
          intensity={1.5} pulseSpeed={1} startFrame={0} />
        <FloatingLabel text="Model" position={[-3, 2, 0]}
          fontSize={0.25} animateIn={{ startFrame: 0, durationFrames: 15 }} />

        <TokenStream
          tokens={OUTPUT_TOKENS}
          position={[-1.5, 0.5, 0]}
          direction="right"
          speed={3}
          color="#00D4AA"
          fontSize={0.18}
          startFrame={20}
          seed={401}
        />

        <Arrow3D from={[-2, 0.5, 0]} to={[2, 0.5, 0]} color="#FFB800"
          startFrame={30} durationFrames={40} />

        <SystemBox position={[4, 0.5, 0]} label="Tool Calls"
          color="#FF6B9D" size={[2, 1.5, 0.3]}
          animateIn={{ startFrame: 60, durationFrames: 30 }} />

        <DataFlow from={[2, 0.5, 0]} to={[4, 0.5, 0]} color="#FF6B9D"
          particleCount={20} startFrame={70} seed={402} />

        <FloatingLabel text="Output Tokens" position={[0, 2, 0]}
          fontSize={0.3} color="#00D4AA"
          animateIn={{ startFrame: 10, durationFrames: 20 }} />
      </Scene3D>
    </AbsoluteFill>
  );
};
