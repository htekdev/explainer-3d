import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import {
  SystemBox, FloatingLabel, TokenStream, DataFlow, GlowOrb,
} from '../../../components';

interface Props { readonly startFrame: number; readonly endFrame: number }

const SOURCES: { label: string; pos: [number, number, number]; color: string; tokens: string[]; seed: number }[] = [
  { label: 'Books', pos: [-14, 2.2, 0], color: '#4A90D9', tokens: ['ch', 'ap', 'ter', 'one'], seed: 11 },
  { label: 'Code',  pos: [-14, 0,    0], color: '#00D4AA', tokens: ['fn', '()', '{', 'ret', '}'], seed: 22 },
  { label: 'Web',   pos: [-14, -2.2, 0], color: '#FF6B9D', tokens: ['blog', 'post', 'href'], seed: 33 },
];

const TARGET: [number, number, number] = [-9.5, 0, 0];

export const Act1Training: React.FC<Props> = ({ startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const e = frame - startFrame;
  if (e < 0 || frame > endFrame) return null;

  const groupOpacity = interpolate(frame, [endFrame - 30, endFrame], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <group>
      <FloatingLabel
        animateIn={{ startFrame: startFrame + 5, durationFrames: 25 }}
        color="#E0E0FF"
        fontSize={0.45}
        position={[-11.5, 4, 0]}
        text="Training Data"
      />

      {SOURCES.map((s, i) => (
        <group key={s.label}>
          <SystemBox
            animateIn={{ startFrame: startFrame + 10 + i * 15, durationFrames: 30 }}
            color={s.color}
            label={s.label}
            position={s.pos}
            size={[1.6, 1.2, 0.25]}
          />
          <TokenStream
            color={s.color}
            direction="right"
            fontSize={0.18}
            position={[s.pos[0] + 1, s.pos[1], s.pos[2] + 0.2]}
            seed={s.seed}
            speed={3}
            startFrame={startFrame + 60 + i * 10}
            tokens={s.tokens}
          />
          <DataFlow
            color={s.color}
            from={[s.pos[0] + 0.9, s.pos[1], s.pos[2]]}
            particleCount={20}
            startFrame={startFrame + 80}
            to={TARGET}
          />
        </group>
      ))}

      {/* Receiving LLM box (compressing model) */}
      <SystemBox
        animateIn={{ startFrame: startFrame + 90, durationFrames: 40 }}
        color="#7B61FF"
        glowIntensity={0.9}
        label="LLM"
        position={TARGET}
        size={[2, 2.2, 0.5]}
      />
      <GlowOrb
        color="#7B61FF"
        intensity={1.5}
        position={[TARGET[0], TARGET[1], TARGET[2] - 0.6]}
        pulseSpeed={3}
        radius={1.6}
      />
      <FloatingLabel
        animateIn={{ startFrame: startFrame + 130, durationFrames: 30 }}
        color="#7B61FF"
        fontSize={0.32}
        position={[TARGET[0], -2.2, 0]}
        text="compressed into weights"
      />

      {/* fade overlay via material opacity isn't trivial; rely on group fade through component-level animateIn */}
      <mesh position={[0, 0, -10]} visible={groupOpacity < 1}>
        <planeGeometry args={[0.01, 0.01]} />
        <meshBasicMaterial opacity={0} transparent />
      </mesh>
    </group>
  );
};
