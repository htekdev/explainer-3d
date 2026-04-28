import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { RoundedBox, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import type { Vec3, AnimationTiming } from '../utils/types';
import { hexToRgb } from '../utils/colors';

export interface SystemBoxProps {
  position: Vec3;
  size?: Vec3;
  label: string;
  color?: string;
  glowIntensity?: number;
  animateIn?: AnimationTiming;
}

export const SystemBox: React.FC<SystemBoxProps> = ({
  position,
  size = [2, 1.5, 0.3],
  label,
  color = '#4A90D9',
  glowIntensity = 0.5,
  animateIn,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rgb = useMemo(() => hexToRgb(color), [color]);

  let scale = 1;
  let opacity = 1;

  if (animateIn) {
    const progress = spring({
      frame: Math.max(0, frame - animateIn.startFrame),
      fps,
      config: { damping: 15, mass: 1, stiffness: 80 },
    });
    scale = frame >= animateIn.startFrame ? progress : 0;
    opacity = frame >= animateIn.startFrame
      ? interpolate(frame, [animateIn.startFrame, animateIn.startFrame + 20], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 0;
  }

  return (
    <group position={position} scale={[scale, scale, scale]}>
      <RoundedBox args={size} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color={new THREE.Color(...rgb)}
          emissive={new THREE.Color(...rgb)}
          emissiveIntensity={glowIntensity}
          transparent
          opacity={opacity}
          roughness={0.3}
          metalness={0.6}
        />
      </RoundedBox>
      <Billboard position={[0, 0, size[2] / 2 + 0.05]}>
        <Text
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={size[0] * 0.8}
          fillOpacity={opacity}
        >
          {label}
        </Text>
      </Billboard>
    </group>
  );
};
