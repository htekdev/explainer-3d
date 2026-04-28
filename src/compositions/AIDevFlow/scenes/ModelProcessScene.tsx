import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Scene3D, GlowOrb, ParticleField, FloatingLabel, GridFloor, AnimatedCamera } from '../../../components';

export const ModelProcessScene: React.FC = () => {
  return (
    <AbsoluteFill>
      <Scene3D camera={{ position: [0, 2, 6], fov: 50 }}
        bloom={{ intensity: 2, luminanceThreshold: 0.15, luminanceSmoothing: 0.8 }}>
        <AnimatedCamera
          keyframes={[
            { frame: 0, position: [0, 2, 8], lookAt: [0, 0.5, 0] },
            { frame: 60, position: [2, 1.5, 6], lookAt: [0, 0.5, 0] },
            { frame: 180, position: [-1, 2.5, 5], lookAt: [0, 0.5, 0] },
          ]}
        />
        <GridFloor />
        <ParticleField count={300} spread={6} speed={0.8} opacity={0.25} color="#7B61FF" seed={300} />

        <GlowOrb position={[0, 0.5, 0]} radius={1} color="#7B61FF"
          intensity={3} pulseSpeed={3} startFrame={0} />
        <GlowOrb position={[0, 0.5, 0]} radius={1.5} color="#4A90D9"
          intensity={1} pulseSpeed={2} startFrame={10} />

        <FloatingLabel text="AI Model" position={[0, 2.8, 0]}
          fontSize={0.45} color="#FFFFFF"
          animateIn={{ startFrame: 20, durationFrames: 30 }} />
        <FloatingLabel text="Processing..." position={[0, -1, 0]}
          fontSize={0.2} color="#8888AA"
          animateIn={{ startFrame: 60, durationFrames: 20 }} />
      </Scene3D>
    </AbsoluteFill>
  );
};
