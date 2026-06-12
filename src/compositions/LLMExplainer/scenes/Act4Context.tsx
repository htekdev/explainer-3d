import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import {
  SystemBox, FloatingLabel, GlowOrb,
} from '../../../components';
import * as THREE from 'three';

interface Props { readonly startFrame: number; readonly endFrame: number }

const WINDOW_POS: [number, number, number] = [9, 0, 0];
const WINDOW_W = 5.2;
const WINDOW_H = 1.0;

export const Act4Context: React.FC<Props> = ({ startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const e = frame - startFrame;
  if (e < 0 || frame > endFrame) return null;

  // Fill the context window 0->1 over frames 60->300
  const fill = interpolate(e, [60, 300], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  // Edges glow red as we near full
  const heat = interpolate(fill, [0.7, 1], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  // Compaction kicks in after frame 320
  const compacting = e > 320;
  const compactProgress = interpolate(e, [320, 400], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // After compaction, show compressed bar (small)
  const compactedW = WINDOW_W * (1 - compactProgress * 0.7);
  const fillAfter = compacting ? 1 - compactProgress : fill;
  const fillW = WINDOW_W * fillAfter;

  const edgeColor = new THREE.Color().lerpColors(
    new THREE.Color('#4A90D9'),
    new THREE.Color('#FF4757'),
    heat,
  );

  return (
    <group>
      <FloatingLabel
        animateIn={{ startFrame: startFrame + 5, durationFrames: 25 }}
        color="#E0E0FF"
        fontSize={0.42}
        position={[WINDOW_POS[0], 4, 0]}
        text="Context Window"
      />
      <FloatingLabel
        animateIn={{ startFrame: startFrame + 25, durationFrames: 25 }}
        color="#7B61FF"
        fontSize={0.26}
        position={[WINDOW_POS[0], 3.3, 0]}
        text="finite token capacity"
      />

      {/* Outer window frame */}
      <mesh position={[WINDOW_POS[0], 0.5, 0]}>
        <boxGeometry args={[compacting ? compactedW : WINDOW_W, WINDOW_H, 0.1]} />
        <meshStandardMaterial
          transparent
          color={edgeColor}
          emissive={edgeColor}
          emissiveIntensity={0.3 + heat * 1.5}
          opacity={0.25}
        />
      </mesh>

      {/* Filled portion */}
      <mesh
        position={[
          WINDOW_POS[0] - (compacting ? compactedW : WINDOW_W) / 2 + fillW / 2,
          0.5,
          0.06,
        ]}
      >
        <boxGeometry args={[Math.max(0.001, fillW), WINDOW_H * 0.85, 0.05]} />
        <meshStandardMaterial
          color={heat > 0.5 ? '#FF4757' : '#4A90D9'}
          emissive={heat > 0.5 ? '#FF4757' : '#4A90D9'}
          emissiveIntensity={0.6 + heat}
        />
      </mesh>

      {/* Capacity meter text */}
      <FloatingLabel
        color={heat > 0.5 ? '#FF4757' : '#8888AA'}
        fontSize={0.28}
        position={[WINDOW_POS[0], -0.7, 0]}
        text={compacting
          ? 'compacted: summary only'
          : `${Math.round(fill * 100)}% full`}
      />

      {/* Compactor box appears */}
      {e > 280 && (
        <>
          <SystemBox
            animateIn={{ startFrame: startFrame + 280, durationFrames: 30 }}
            color="#FFB800"
            glowIntensity={1.2}
            label="Compactor"
            position={[WINDOW_POS[0], -2.4, 0]}
            size={[2.4, 1.0, 0.3]}
          />
          {compacting && (
            <GlowOrb
              color="#FFB800"
              intensity={1.8}
              position={[WINDOW_POS[0], -1.5, 0.3]}
              pulseSpeed={5}
              radius={0.25}
              startFrame={startFrame + 320}
            />
          )}
        </>
      )}

      {/* Warning before compaction */}
      {heat > 0.7 && !compacting && (
        <FloatingLabel
          color="#FF4757"
          fontSize={0.32}
          position={[WINDOW_POS[0], 1.6, 0]}
          text="⚠  near limit"
        />
      )}
    </group>
  );
};
