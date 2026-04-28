import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import * as THREE from 'three';
import { createSeededRandom, seededRange } from '../utils/random';
import { hexToRgb } from '../utils/colors';

export interface ParticleFieldProps {
  count?: number;
  size?: number;
  color?: string;
  spread?: number;
  speed?: number;
  opacity?: number;
  seed?: number;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 200,
  size = 0.03,
  color = '#FFFFFF',
  spread = 10,
  speed = 0.3,
  opacity = 0.4,
  seed = 42,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rgb = useMemo(() => hexToRgb(color), [color]);

  const basePositions = useMemo(() => {
    const rng = createSeededRandom(seed);
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = seededRange(rng, -spread, spread);
      pos[i * 3 + 1] = seededRange(rng, -spread, spread);
      pos[i * 3 + 2] = seededRange(rng, -spread, spread);
    }
    return pos;
  }, [count, spread, seed]);

  const positions = useMemo(() => {
    const time = frame / fps;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];
      pos[i * 3] = bx + Math.sin(time * speed + bx) * 0.2;
      pos[i * 3 + 1] = by + Math.cos(time * speed + by) * 0.2;
      pos[i * 3 + 2] = bz + Math.sin(time * speed + bz * 0.5) * 0.2;
    }
    return pos;
  }, [frame, fps, count, speed, basePositions]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={new THREE.Color(...rgb)}
        transparent
        opacity={opacity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
