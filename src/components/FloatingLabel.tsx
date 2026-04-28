import React from 'react';
import { useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { Text, Billboard } from '@react-three/drei';
import type { Vec3, AnimationTiming } from '../utils/types';

export interface FloatingLabelProps {
  text: string;
  position: Vec3;
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
  animateIn?: AnimationTiming;
}

export const FloatingLabel: React.FC<FloatingLabelProps> = ({
  text,
  position,
  fontSize = 0.3,
  color = '#E0E0FF',
  animateIn,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let opacity = 1;
  let yOffset = 0;

  if (animateIn) {
    const progress = spring({
      frame: Math.max(0, frame - animateIn.startFrame),
      fps,
      config: { damping: 15, mass: 1, stiffness: 80 },
    });
    opacity = frame >= animateIn.startFrame ? progress : 0;
    yOffset = frame >= animateIn.startFrame ? (1 - progress) * 0.5 : 0.5;
  }

  return (
    <Billboard position={[position[0], position[1] + yOffset, position[2]]}>
      <Text
        fontSize={fontSize}
        color={color}
        anchorX="center"
        anchorY="middle"
        fillOpacity={opacity}
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {text}
      </Text>
    </Billboard>
  );
};
