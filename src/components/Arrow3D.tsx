import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import * as THREE from 'three';
import type { Vec3 } from '../utils/types';
import { hexToRgb } from '../utils/colors';

export interface Arrow3DProps {
  from: Vec3;
  to: Vec3;
  color?: string;
  thickness?: number;
  animated?: boolean;
  startFrame?: number;
  durationFrames?: number;
}

export const Arrow3D: React.FC<Arrow3DProps> = ({
  from,
  to,
  color = '#FFB800',
  thickness = 0.05,
  animated = true,
  startFrame = 0,
  durationFrames = 30,
}) => {
  const frame = useCurrentFrame();
  const rgb = useMemo(() => hexToRgb(color), [color]);

  const progress = animated
    ? interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;

  const currentTo: Vec3 = [
    from[0] + (to[0] - from[0]) * progress,
    from[1] + (to[1] - from[1]) * progress,
    from[2] + (to[2] - from[2]) * progress,
  ];

  const mid: Vec3 = [
    (from[0] + currentTo[0]) / 2,
    (from[1] + currentTo[1]) / 2,
    (from[2] + currentTo[2]) / 2,
  ];

  const dir = new THREE.Vector3(
    currentTo[0] - from[0],
    currentTo[1] - from[1],
    currentTo[2] - from[2],
  );
  const currentLen = dir.length();
  dir.normalize();

  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    return q;
  }, [dir]);

  if (progress <= 0) return null;

  return (
    <group>
      <mesh position={mid} quaternion={quaternion}>
        <cylinderGeometry args={[thickness, thickness, currentLen, 8]} />
        <meshStandardMaterial
          color={new THREE.Color(...rgb)}
          emissive={new THREE.Color(...rgb)}
          emissiveIntensity={0.3}
        />
      </mesh>
      {progress >= 0.9 && (
        <mesh position={currentTo} quaternion={quaternion}>
          <coneGeometry args={[thickness * 3, thickness * 8, 8]} />
          <meshStandardMaterial
            color={new THREE.Color(...rgb)}
            emissive={new THREE.Color(...rgb)}
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
    </group>
  );
};
