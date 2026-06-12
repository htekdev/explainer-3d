import React from 'react';
import { AbsoluteFill } from 'remotion';
import {
  Scene3D, AnimatedCamera, GridFloor, ParticleField,
} from '../../components';
import type { CameraKeyframe } from '../../components';
import { Act1Training } from './scenes/Act1Training';
import { Act2LLMBox } from './scenes/Act2LLMBox';
import { Act3Loop } from './scenes/Act3Loop';
import { Act4Context } from './scenes/Act4Context';
import { Act5Tools } from './scenes/Act5Tools';
import { Act6Harness } from './scenes/Act6Harness';

// Acts span 60fps frames. Total = 2700 frames = 45s.
const A1 = { start: 0,    end: 480  };
const A2 = { start: 450,  end: 930  };
const A3 = { start: 900,  end: 1380 };
const A4 = { start: 1350, end: 1830 };
const A5 = { start: 1800, end: 2280 };
const A6 = { start: 2250, end: 2700 };

// Camera pans across the X axis as acts unfold
const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  { frame: 0,    position: [-11, 3,  9], lookAt: [-11, 0, 0] },
  { frame: 450,  position: [-11, 3,  9], lookAt: [-11, 0, 0] },
  { frame: 700,  position: [-3,  3,  8], lookAt: [-3,  0, 0] },
  { frame: 1100, position: [3,   3,  8], lookAt: [3,   0, 0] },
  { frame: 1550, position: [9,   3,  8], lookAt: [9,   0, 0] },
  { frame: 2050, position: [14,  3,  8], lookAt: [14.5, 0, 0] },
  { frame: 2450, position: [21,  3,  9], lookAt: [21,  0, 0] },
  { frame: 2700, position: [21,  3,  9], lookAt: [21,  0, 0] },
];

export interface LLMExplainerProps {
  readonly topic?: string;
}

export const LLMExplainer: React.FC<LLMExplainerProps> = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0A1A' }}>
      <Scene3D
        bloom={{ intensity: 1.6, luminanceThreshold: 0.18, luminanceSmoothing: 0.85 }}
        camera={{ position: [-11, 3, 9], fov: 50 }}
      >
        <AnimatedCamera keyframes={CAMERA_KEYFRAMES} />
        <GridFloor fadeDistance={50} yPosition={-3} />
        <ParticleField count={350} opacity={0.13} seed={7} spread={30} />

        <Act1Training startFrame={A1.start} endFrame={A1.end} />
        <Act2LLMBox   startFrame={A2.start} endFrame={A2.end} />
        <Act3Loop     startFrame={A3.start} endFrame={A3.end} />
        <Act4Context  startFrame={A4.start} endFrame={A4.end} />
        <Act5Tools    startFrame={A5.start} endFrame={A5.end} />
        <Act6Harness  startFrame={A6.start} endFrame={A6.end} />
      </Scene3D>
    </AbsoluteFill>
  );
};
