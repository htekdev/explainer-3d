import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import {
  SystemBox, FloatingLabel, Arrow3D, GlowOrb, ConnectionBeam,
} from '../../../components';

interface Props { readonly startFrame: number; readonly endFrame: number }

const LLM: [number, number, number] = [13, 1.2, 0];
const TOOL: [number, number, number] = [16.5, 1.2, 0];
const JSON_POS: [number, number, number] = [13, -1.4, 0];

export const Act5Tools: React.FC<Props> = ({ startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const e = frame - startFrame;
  if (e < 0 || frame > endFrame) return null;

  const detected = e > 180;
  const dispatched = e > 260;
  const executed = e > 340;

  const detectGlow = interpolate(e, [180, 240], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <group>
      <FloatingLabel
        animateIn={{ startFrame: startFrame + 5, durationFrames: 25 }}
        color="#E0E0FF"
        fontSize={0.42}
        position={[14.5, 4, 0]}
        text="Tool Calling"
      />
      <FloatingLabel
        animateIn={{ startFrame: startFrame + 25, durationFrames: 25 }}
        color="#7B61FF"
        fontSize={0.26}
        position={[14.5, 3.3, 0]}
        text="LLM emits structured action"
      />

      <SystemBox
        animateIn={{ startFrame: startFrame + 30, durationFrames: 30 }}
        color="#7B61FF"
        glowIntensity={1.0}
        label="LLM"
        position={LLM}
        size={[2.0, 2.0, 0.5]}
      />

      {/* JSON output emerges below */}
      {e > 80 && (
        <>
          <mesh position={[JSON_POS[0], JSON_POS[1], JSON_POS[2]]}>
            <boxGeometry args={[3.6, 1.2, 0.1]} />
            <meshStandardMaterial
              transparent
              color={detected ? '#FFB800' : '#0A1A2A'}
              emissive={detected ? '#FFB800' : '#00D4AA'}
              emissiveIntensity={detected ? 0.4 + detectGlow * 0.8 : 0.15}
              metalness={0.7}
              opacity={0.85}
              roughness={0.25}
            />
          </mesh>
          <FloatingLabel
            animateIn={{ startFrame: startFrame + 90, durationFrames: 25 }}
            color="#00D4AA"
            fontSize={0.22}
            position={[JSON_POS[0], JSON_POS[1] + 0.18, 0.12]}
            text='{ "tool": "shell",'
          />
          <FloatingLabel
            animateIn={{ startFrame: startFrame + 120, durationFrames: 25 }}
            color="#00D4AA"
            fontSize={0.22}
            position={[JSON_POS[0], JSON_POS[1] - 0.18, 0.12]}
            text='  "cmd": "ls -la" }'
          />
        </>
      )}

      {/* Detector scan beam */}
      {e > 160 && e < 240 && (
        <ConnectionBeam
          color="#FFB800"
          from={[JSON_POS[0] - 1.8, JSON_POS[1], 0.2]}
          pulseSpeed={6}
          to={[JSON_POS[0] + 1.8, JSON_POS[1], 0.2]}
          width={0.04}
        />
      )}

      {detected && (
        <FloatingLabel
          animateIn={{ startFrame: startFrame + 200, durationFrames: 20 }}
          color="#FFB800"
          fontSize={0.26}
          position={[JSON_POS[0], JSON_POS[1] - 1.0, 0]}
          text="✓ tool call detected"
        />
      )}

      {/* Tool box on right */}
      {e > 230 && (
        <SystemBox
          animateIn={{ startFrame: startFrame + 230, durationFrames: 30 }}
          color="#00D4AA"
          glowIntensity={executed ? 1.4 : 0.5}
          label="shell"
          position={TOOL}
          size={[1.8, 1.6, 0.4]}
        />
      )}

      {/* Dispatch arrow */}
      {dispatched && (
        <Arrow3D
          color="#FFB800"
          durationFrames={30}
          from={[JSON_POS[0] + 1.9, JSON_POS[1], 0]}
          startFrame={startFrame + 260}
          thickness={0.07}
          to={[TOOL[0] - 1.0, TOOL[1] - 0.5, 0]}
        />
      )}

      {/* Executed glow on tool */}
      {executed && (
        <GlowOrb
          color="#00D4AA"
          intensity={1.8}
          position={[TOOL[0], TOOL[1], TOOL[2] + 0.4]}
          pulseSpeed={3}
          radius={0.4}
          startFrame={startFrame + 340}
        />
      )}
      {executed && (
        <FloatingLabel
          animateIn={{ startFrame: startFrame + 360, durationFrames: 20 }}
          color="#00D4AA"
          fontSize={0.28}
          position={[TOOL[0], TOOL[1] - 1.4, 0]}
          text="executed"
        />
      )}
    </group>
  );
};
