import React from 'react';
import { AbsoluteFill } from 'remotion';
import {
  Scene3D, SystemBox, GlowOrb, ConnectionBeam, DataFlow,
  GridFloor, ParticleField, FloatingLabel, AnimatedCamera,
} from '../../../components';

export const SkillsMergeScene: React.FC = () => {
  return (
    <AbsoluteFill>
      <Scene3D camera={{ position: [0, 4, 10], fov: 50 }}>
        <AnimatedCamera
          keyframes={[
            { frame: 0, position: [0, 4, 10], lookAt: [0, 0.5, 0] },
            { frame: 120, position: [3, 3, 8], lookAt: [0, 0.5, 0] },
            { frame: 240, position: [0, 2, 7], lookAt: [0, 0.5, 0] },
          ]}
        />
        <GridFloor />
        <ParticleField count={150} spread={10} opacity={0.15} />

        <SystemBox position={[-4, 1, 0]} label="Skills" color="#7B61FF"
          animateIn={{ startFrame: 0, durationFrames: 30 }} />
        <SystemBox position={[0, 1, -3]} label="Tools" color="#00D4AA"
          animateIn={{ startFrame: 15, durationFrames: 30 }} />
        <SystemBox position={[4, 1, 0]} label="Extensions" color="#FFB800"
          animateIn={{ startFrame: 30, durationFrames: 30 }} />

        <GlowOrb position={[0, 0.5, 0]} radius={0.6} color="#FF6B9D"
          intensity={2} pulseSpeed={1.5} startFrame={60} />
        <FloatingLabel text="Merge Point" position={[0, 2, 0]}
          fontSize={0.25} animateIn={{ startFrame: 70, durationFrames: 20 }} />

        <ConnectionBeam from={[-4, 1, 0]} to={[0, 0.5, 0]} color="#7B61FF" startFrame={50} />
        <ConnectionBeam from={[0, 1, -3]} to={[0, 0.5, 0]} color="#00D4AA" startFrame={55} />
        <ConnectionBeam from={[4, 1, 0]} to={[0, 0.5, 0]} color="#FFB800" startFrame={60} />

        <DataFlow from={[-4, 1, 0]} to={[0, 0.5, 0]} color="#7B61FF"
          particleCount={30} startFrame={60} seed={200} />
        <DataFlow from={[0, 1, -3]} to={[0, 0.5, 0]} color="#00D4AA"
          particleCount={30} startFrame={65} seed={201} />
        <DataFlow from={[4, 1, 0]} to={[0, 0.5, 0]} color="#FFB800"
          particleCount={30} startFrame={70} seed={202} />
      </Scene3D>
    </AbsoluteFill>
  );
};
