import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import * as THREE from 'three';
import type { Vec3 } from '../utils/types';
import { hexToRgb } from '../utils/colors';
import { distance } from '../utils/layout';

export interface ConnectionBeamProps {
  readonly from: Vec3;
  readonly to: Vec3;
  readonly color?: string;
  readonly width?: number;
  readonly animated?: boolean;
  readonly pulseSpeed?: number;
  readonly startFrame?: number;
}

export const ConnectionBeam: React.FC<ConnectionBeamProps> = ({
  from,
  to,
  color = '#4A90D9',
  width = 0.02,
  animated = true,
  pulseSpeed = 3,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rgb = useMemo(() => hexToRgb(color), [color]);
  const len = distance(from, to);

  const elapsed = Math.max(0, frame - startFrame);
  const opacity = interpolate(elapsed, [0, 15], [0, 0.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pulse = animated ? 0.6 + Math.sin((elapsed / fps) * pulseSpeed * Math.PI * 2) * 0.4 : 1;

  const mid: Vec3 = [
    (from[0] + to[0]) / 2,
    (from[1] + to[1]) / 2,
    (from[2] + to[2]) / 2,
  ];

  const dir = new THREE.Vector3(to[0] - from[0], to[1] - from[1], to[2] - from[2]);
  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    return q;
  }, [dir]);

  return (
    <group>
      <mesh position={mid} quaternion={quaternion}>
        <cylinderGeometry args={[width, width, len, 6]} />
        <meshStandardMaterial
          transparent
          color={new THREE.Color(...rgb)}
          emissive={new THREE.Color(...rgb)}
          emissiveIntensity={pulse}
          opacity={opacity}
        />
      </mesh>
      <mesh position={mid} quaternion={quaternion}>
        <cylinderGeometry args={[width * 3, width * 3, len, 6]} />
        <meshBasicMaterial
          transparent
          color={new THREE.Color(...rgb)}
          opacity={opacity * 0.1 * pulse}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
