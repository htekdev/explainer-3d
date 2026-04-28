import React, { useMemo, useRef } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import * as THREE from 'three';
import type { Vec3 } from '../utils/types';
import { createSeededRandom, seededRange } from '../utils/random';
import { hexToRgb } from '../utils/colors';

export interface DataFlowProps {
  from: Vec3;
  to: Vec3;
  color?: string;
  particleCount?: number;
  speed?: number;
  width?: number;
  startFrame?: number;
  durationFrames?: number;
  seed?: number;
}

export const DataFlow: React.FC<DataFlowProps> = ({
  from,
  to,
  color = '#4A90D9',
  particleCount = 50,
  speed = 1,
  width = 0.3,
  startFrame = 0,
  durationFrames = 300,
  seed = 42,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pointsRef = useRef<THREE.Points>(null);
  const rgb = useMemo(() => hexToRgb(color), [color]);

  const { positions, sizes } = useMemo(() => {
    const rng = createSeededRandom(seed);
    const pos = new Float32Array(particleCount * 3);
    const sz = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;
      sz[i] = seededRange(rng, 0.02, 0.06);
    }
    return { positions: pos, sizes: sz };
  }, [particleCount, seed]);

  const updatedPositions = useMemo(() => {
    const elapsed = Math.max(0, frame - startFrame);
    const progress = Math.min(1, elapsed / durationFrames);
    if (progress <= 0) return positions;

    const rng = createSeededRandom(seed + frame);
    const pos = new Float32Array(particleCount * 3);
    const dir: Vec3 = [to[0] - from[0], to[1] - from[1], to[2] - from[2]];

    for (let i = 0; i < particleCount; i++) {
      const t = ((i / particleCount + (elapsed / fps) * speed) % 1) * progress;
      const jitterX = seededRange(rng, -width, width);
      const jitterY = seededRange(rng, -width, width);
      pos[i * 3] = from[0] + dir[0] * t + jitterX;
      pos[i * 3 + 1] = from[1] + dir[1] * t + jitterY;
      pos[i * 3 + 2] = from[2] + dir[2] * t;
    }
    return pos;
  }, [frame, from, to, particleCount, speed, width, startFrame, durationFrames, seed, fps, positions]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[updatedPositions, 3]}
          count={particleCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={particleCount}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={new THREE.Color(...rgb)}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
