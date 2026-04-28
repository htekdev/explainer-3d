import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { Text, Billboard } from '@react-three/drei';
import type { Vec3 } from '../utils/types';
import { createSeededRandom, seededRange } from '../utils/random';

export interface TokenStreamProps {
  tokens: string[];
  position: Vec3;
  direction?: 'left' | 'right' | 'up' | 'down';
  speed?: number;
  color?: string;
  fontSize?: number;
  startFrame?: number;
  seed?: number;
}

const DIRECTION_VECTORS: Record<string, [number, number, number]> = {
  left: [-1, 0, 0],
  right: [1, 0, 0],
  up: [0, 1, 0],
  down: [0, -1, 0],
};

export const TokenStream: React.FC<TokenStreamProps> = ({
  tokens,
  position,
  direction = 'right',
  speed = 3,
  color = '#00D4AA',
  fontSize = 0.2,
  startFrame = 0,
  seed = 42,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dir = DIRECTION_VECTORS[direction];
  const rng = useMemo(() => createSeededRandom(seed), [seed]);
  const offsets = useMemo(
    () => tokens.map(() => seededRange(rng, -0.3, 0.3)),
    [tokens, rng],
  );

  const elapsed = Math.max(0, frame - startFrame);
  const secondsElapsed = elapsed / fps;
  const tokensVisible = Math.min(tokens.length, Math.floor(secondsElapsed * speed));

  return (
    <group position={position}>
      {tokens.slice(0, tokensVisible).map((token, i) => {
        const tokenFrame = startFrame + Math.floor((i / speed) * fps);
        const age = Math.max(0, frame - tokenFrame) / fps;
        const travel = age * speed * 0.3;
        const opacity = Math.min(1, age * 4) * Math.max(0, 1 - age * 0.5);
        const x = dir[0] * travel + i * 0.05;
        const y = dir[1] * travel + offsets[i] * 0.2;
        const z = dir[2] * travel;

        return (
          <Billboard key={`${token}-${i}`} position={[x, y, z]}>
            <Text
              fontSize={fontSize}
              color={color}
              anchorX="center"
              anchorY="middle"
              fillOpacity={Math.max(0, Math.min(1, opacity))}
            >
              {token}
            </Text>
          </Billboard>
        );
      })}
    </group>
  );
};
