import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import * as THREE from 'three';
import type { Vec3 } from '../utils/types';
import { hexToRgb } from '../utils/colors';

export interface GlowOrbProps {
  readonly position: Vec3;
  readonly radius?: number;
  readonly color?: string;
  readonly pulseSpeed?: number;
  readonly intensity?: number;
  readonly startFrame?: number;
}

export const GlowOrb: React.FC<GlowOrbProps> = ({
  position,
  radius = 0.5,
  color = '#7B61FF',
  pulseSpeed = 2,
  intensity = 1.5,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rgb = useMemo(() => hexToRgb(color), [color]);

  const elapsed = Math.max(0, frame - startFrame);
  const time = elapsed / fps;
  const pulse = 1 + Math.sin(time * pulseSpeed * Math.PI * 2) * 0.15;
  const currentIntensity = intensity * pulse;
  const scale = pulse;
  const opacity = elapsed > 0 ? Math.min(1, elapsed / 15) : 0;

  return (
    <group position={position}>
      <mesh scale={[scale, scale, scale]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          transparent
          color={new THREE.Color(...rgb)}
          emissive={new THREE.Color(...rgb)}
          emissiveIntensity={currentIntensity}
          opacity={opacity}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      <mesh scale={[scale * 1.3, scale * 1.3, scale * 1.3]}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshBasicMaterial
          transparent
          color={new THREE.Color(...rgb)}
          opacity={opacity * 0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
