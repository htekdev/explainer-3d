import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import {
  SystemBox, FloatingLabel, Arrow3D, GlowOrb,
} from '../../../components';

interface Props { readonly startFrame: number; readonly endFrame: number }

const BOX: [number, number, number] = [3, 0, 0];

// Rectangular loop corners around BOX
const TR: [number, number, number] = [5.5, 0, 0];   // box right edge
const BR: [number, number, number] = [5.5, -2.5, 0];
const BL: [number, number, number] = [0.5, -2.5, 0];
const TL: [number, number, number] = [0.5, 0, 0];   // box left edge

export const Act3Loop: React.FC<Props> = ({ startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const e = frame - startFrame;
  if (e < 0 || frame > endFrame) return null;

  // Multiple loop iterations: tokens travel around the loop
  const cycleLen = 100;
  const cycles = Math.floor(e / cycleLen);
  const tStop = e > 380; // STOP token appears

  return (
    <group>
      <FloatingLabel
        animateIn={{ startFrame: startFrame + 5, durationFrames: 25 }}
        color="#E0E0FF"
        fontSize={0.42}
        position={[BOX[0], 4, 0]}
        text="Autoregressive Loop"
      />
      <FloatingLabel
        animateIn={{ startFrame: startFrame + 25, durationFrames: 25 }}
        color="#7B61FF"
        fontSize={0.26}
        position={[BOX[0], 3.3, 0]}
        text="output token feeds back as input"
      />

      <SystemBox
        animateIn={{ startFrame: startFrame + 30, durationFrames: 30 }}
        color="#7B61FF"
        glowIntensity={1.0}
        label="LLM"
        position={BOX}
        size={[2.4, 2.4, 0.5]}
      />

      {/* Static rectangular loop arrows: out, down, back, up */}
      {!tStop && (
        <>
          <Arrow3D
            color="#FFB800"
            durationFrames={20}
            from={TR}
            startFrame={startFrame + 70}
            thickness={0.05}
            to={BR}
          />
          <Arrow3D
            color="#FFB800"
            durationFrames={20}
            from={BR}
            startFrame={startFrame + 90}
            thickness={0.05}
            to={BL}
          />
          <Arrow3D
            color="#FFB800"
            durationFrames={20}
            from={BL}
            startFrame={startFrame + 110}
            thickness={0.05}
            to={TL}
          />
          <Arrow3D
            color="#FFB800"
            durationFrames={20}
            from={TL}
            startFrame={startFrame + 130}
            thickness={0.05}
            to={[BOX[0] - 1.3, 0, 0]}
          />
        </>
      )}

      {/* Cycling token orb traveling around loop */}
      {e > 150 && !tStop && (() => {
        const phase = ((e - 150) % cycleLen) / cycleLen;
        // 4 segments: TR->BR (0-.25), BR->BL (.25-.5), BL->TL (.5-.75), TL->IN (.75-1)
        let p: [number, number, number];
        if (phase < 0.25) {
          const t = phase / 0.25;
          p = [TR[0], TR[1] + (BR[1] - TR[1]) * t, 0];
        } else if (phase < 0.5) {
          const t = (phase - 0.25) / 0.25;
          p = [TR[0] + (BL[0] - BR[0]) * t, BR[1], 0];
        } else if (phase < 0.75) {
          const t = (phase - 0.5) / 0.25;
          p = [BL[0], BL[1] + (TL[1] - BL[1]) * t, 0];
        } else {
          const t = (phase - 0.75) / 0.25;
          p = [TL[0] + (BOX[0] - 1.3 - TL[0]) * t, 0, 0];
        }
        return <GlowOrb color="#FFB800" intensity={1.6} position={p} pulseSpeed={3} radius={0.18} />;
      })()}

      {/* Cycle counter */}
      {e > 150 && !tStop && (
        <FloatingLabel
          color="#8888AA"
          fontSize={0.24}
          position={[BOX[0], -3.4, 0]}
          text={`token ${Math.min(cycles, 3) + 1} of N`}
        />
      )}

      {/* STOP token breaks the loop */}
      {tStop && (
        <>
          <GlowOrb
            color="#FF4757"
            intensity={2.0}
            position={[BOX[0] + 3.2, 0, 0.3]}
            pulseSpeed={4}
            radius={0.5}
            startFrame={startFrame + 380}
          />
          <FloatingLabel
            animateIn={{ startFrame: startFrame + 390, durationFrames: 20 }}
            color="#FF4757"
            fontSize={0.4}
            position={[BOX[0] + 3.2, 1.1, 0]}
            text="<STOP>"
          />
          <FloatingLabel
            animateIn={{ startFrame: startFrame + 400, durationFrames: 20 }}
            color="#FF4757"
            fontSize={0.28}
            position={[BOX[0] + 3.2, -1.2, 0]}
            text="loop terminates"
          />
        </>
      )}

      {/* Red X across feedback when stopped */}
      {tStop && (
        <>
          <Arrow3D
            animated={false}
            color="#FF4757"
            durationFrames={1}
            from={[BL[0] - 0.5, BL[1] - 0.5, 0.2]}
            startFrame={startFrame + 380}
            thickness={0.08}
            to={[BR[0] + 0.5, BR[1] + 0.5, 0.2]}
          />
          <Arrow3D
            animated={false}
            color="#FF4757"
            durationFrames={1}
            from={[BL[0] - 0.5, BL[1] + 0.5, 0.2]}
            startFrame={startFrame + 380}
            thickness={0.08}
            to={[BR[0] + 0.5, BR[1] - 0.5, 0.2]}
          />
        </>
      )}
    </group>
  );
};
