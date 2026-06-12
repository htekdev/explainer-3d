import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import {
  SystemBox, FloatingLabel, Arrow3D, GlowOrb, ConnectionBeam,
} from '../../../components';

interface Props { readonly startFrame: number; readonly endFrame: number }

const BOX_POS: [number, number, number] = [-3, 0, 0];
const IN_POS: [number, number, number] = [-6, 0, 0];
const OUT_POS: [number, number, number] = [0, 0, 0];

export const Act2LLMBox: React.FC<Props> = ({ startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const e = frame - startFrame;
  if (e < 0 || frame > endFrame) return null;

  const inputPulse = interpolate(e, [60, 120], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const outputPulse = interpolate(e, [180, 240], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <group>
      <FloatingLabel
        animateIn={{ startFrame: startFrame + 5, durationFrames: 25 }}
        color="#E0E0FF"
        fontSize={0.45}
        position={[BOX_POS[0], 4, 0]}
        text="The Language Model"
      />
      <FloatingLabel
        animateIn={{ startFrame: startFrame + 25, durationFrames: 25 }}
        color="#7B61FF"
        fontSize={0.28}
        position={[BOX_POS[0], 3.3, 0]}
        text="next-token predictor"
      />

      <SystemBox
        animateIn={{ startFrame: startFrame + 30, durationFrames: 40 }}
        color="#7B61FF"
        glowIntensity={1.0}
        label="LLM"
        position={BOX_POS}
        size={[2.6, 2.6, 0.6]}
      />

      {/* Input token "the" */}
      {e > 50 && (
        <>
          <GlowOrb
            color="#00D4AA"
            intensity={1.2}
            position={[IN_POS[0], IN_POS[1], IN_POS[2] + 0.3]}
            pulseSpeed={2}
            radius={0.35 + inputPulse * 0.1}
            startFrame={startFrame + 50}
          />
          <FloatingLabel
            animateIn={{ startFrame: startFrame + 55, durationFrames: 20 }}
            color="#00D4AA"
            fontSize={0.32}
            position={[IN_POS[0], 1.1, 0]}
            text={'"the"'}
          />
          <FloatingLabel
            animateIn={{ startFrame: startFrame + 55, durationFrames: 20 }}
            color="#8888AA"
            fontSize={0.22}
            position={[IN_POS[0], -1.2, 0]}
            text="input token"
          />
          <Arrow3D
            color="#00D4AA"
            durationFrames={30}
            from={[IN_POS[0] + 0.6, 0, 0]}
            startFrame={startFrame + 80}
            thickness={0.06}
            to={[BOX_POS[0] - 1.4, 0, 0]}
          />
        </>
      )}

      {/* Output token */}
      {e > 170 && (
        <>
          <Arrow3D
            color="#FFB800"
            durationFrames={30}
            from={[BOX_POS[0] + 1.4, 0, 0]}
            startFrame={startFrame + 170}
            thickness={0.06}
            to={[OUT_POS[0] + 1.4, 0, 0]}
          />
          <GlowOrb
            color="#FFB800"
            intensity={1.4}
            position={[OUT_POS[0] + 2.2, 0, 0.3]}
            pulseSpeed={2}
            radius={0.4 + outputPulse * 0.1}
            startFrame={startFrame + 200}
          />
          <FloatingLabel
            animateIn={{ startFrame: startFrame + 210, durationFrames: 20 }}
            color="#FFB800"
            fontSize={0.32}
            position={[OUT_POS[0] + 2.2, 1.1, 0]}
            text={'"cat"'}
          />
          <FloatingLabel
            animateIn={{ startFrame: startFrame + 210, durationFrames: 20 }}
            color="#8888AA"
            fontSize={0.22}
            position={[OUT_POS[0] + 2.2, -1.2, 0]}
            text="next token"
          />
        </>
      )}

      {/* Inner pulse beam during prediction */}
      {e > 100 && e < 200 && (
        <ConnectionBeam
          color="#7B61FF"
          from={[BOX_POS[0] - 1, 0, 0.3]}
          pulseSpeed={4}
          to={[BOX_POS[0] + 1, 0, 0.3]}
        />
      )}
    </group>
  );
};
