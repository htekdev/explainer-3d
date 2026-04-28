import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { TokenStream, FloatingLabel } from '../../../components';

const USER_TOKENS = [
  'Build', 'me', 'a', 'REST', 'API', 'with', 'auth', 'and', 'rate', 'limiting',
];

interface UserInputPhaseProps {
  readonly startFrame: number;
}

export const UserInputPhase: React.FC<UserInputPhaseProps> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;

  const opacity = interpolate(elapsed, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (elapsed < 0) return null;

  return (
    <group position={[-8, 0.5, 0]}>
      {/* Typing cursor */}
      <mesh position={[-0.5, 0, 0.2]}>
        <boxGeometry args={[0.05, 0.4, 0.02]} />
        <meshStandardMaterial
          transparent
          color="#00D4AA"
          emissive="#00D4AA"
          emissiveIntensity={1 + Math.sin(elapsed * 0.15) * 0.5}
          opacity={opacity}
        />
      </mesh>

      {/* Typing area glow */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 1.2, 0.1]} />
        <meshStandardMaterial
          transparent
          color="#0A1A2A"
          emissive="#00D4AA"
          emissiveIntensity={0.05}
          metalness={0.8}
          opacity={opacity * 0.6}
          roughness={0.2}
        />
      </mesh>

      {/* User input tokens flowing right */}
      <TokenStream
        color="#00D4AA"
        direction="right"
        fontSize={0.15}
        position={[0.5, 0, 0.3]}
        seed={100}
        speed={3}
        startFrame={startFrame + 30}
        tokens={USER_TOKENS}
      />

      {/* Label */}
      <FloatingLabel
        animateIn={{ startFrame: startFrame + 10, durationFrames: 30 }}
        color="#00D4AA"
        fontSize={0.3}
        position={[0, 1.2, 0]}
        text="User Input"
      />
    </group>
  );
};

// Keep legacy export for backward compatibility
export const SystemPromptScene = UserInputPhase;
