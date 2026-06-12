import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import {
  SystemBox, FloatingLabel, Arrow3D, GlowOrb, ConnectionBeam,
} from '../../../components';

interface Props { readonly startFrame: number; readonly endFrame: number }

const HARNESS: [number, number, number] = [21, 0, 0];
const LLM: [number, number, number] = [21, 0, 0];
const CTX_SRC: [number, number, number] = [16.5, 2.2, 0];
const TOOL_SAFE: [number, number, number] = [25.5, -1.5, 0];
const TOOL_BLOCKED: [number, number, number] = [25.5, 1.5, 0];

export const Act6Harness: React.FC<Props> = ({ startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const e = frame - startFrame;
  if (e < 0 || frame > endFrame) return null;

  // Fade in/out for outro
  const outroFade = interpolate(e, [endFrame - startFrame - 90, endFrame - startFrame], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <group>
      <FloatingLabel
        animateIn={{ startFrame: startFrame + 5, durationFrames: 25 }}
        color="#E0E0FF"
        fontSize={0.46}
        position={[HARNESS[0], 4.5, 0]}
        text="Agent Harness"
      />
      <FloatingLabel
        animateIn={{ startFrame: startFrame + 25, durationFrames: 25 }}
        color="#7B61FF"
        fontSize={0.26}
        position={[HARNESS[0], 3.8, 0]}
        text="context injection · hookflow guardrails"
      />

      {/* Outer harness box (large, semi-transparent) */}
      <mesh position={HARNESS}>
        <boxGeometry args={[6.5, 5.5, 0.05]} />
        <meshStandardMaterial
          transparent
          color="#7B61FF"
          emissive="#7B61FF"
          emissiveIntensity={0.25}
          opacity={interpolate(e, [10, 60], [0, 0.18], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          })}
        />
      </mesh>
      {/* Outer harness frame outline via thin beams */}
      {e > 30 && (
        <>
          <ConnectionBeam color="#7B61FF" from={[HARNESS[0] - 3.25, HARNESS[1] - 2.75, 0]}
            pulseSpeed={1} to={[HARNESS[0] + 3.25, HARNESS[1] - 2.75, 0]} width={0.025} />
          <ConnectionBeam color="#7B61FF" from={[HARNESS[0] - 3.25, HARNESS[1] + 2.75, 0]}
            pulseSpeed={1} to={[HARNESS[0] + 3.25, HARNESS[1] + 2.75, 0]} width={0.025} />
          <ConnectionBeam color="#7B61FF" from={[HARNESS[0] - 3.25, HARNESS[1] - 2.75, 0]}
            pulseSpeed={1} to={[HARNESS[0] - 3.25, HARNESS[1] + 2.75, 0]} width={0.025} />
          <ConnectionBeam color="#7B61FF" from={[HARNESS[0] + 3.25, HARNESS[1] - 2.75, 0]}
            pulseSpeed={1} to={[HARNESS[0] + 3.25, HARNESS[1] + 2.75, 0]} width={0.025} />
        </>
      )}

      {/* Inner LLM */}
      <SystemBox
        animateIn={{ startFrame: startFrame + 50, durationFrames: 30 }}
        color="#7B61FF"
        glowIntensity={1.0}
        label="LLM"
        position={LLM}
        size={[2.2, 2.2, 0.5]}
      />

      {/* Context injection (green) from outside */}
      {e > 90 && (
        <>
          <SystemBox
            animateIn={{ startFrame: startFrame + 90, durationFrames: 30 }}
            color="#00D4AA"
            label="context"
            position={CTX_SRC}
            size={[1.6, 1.0, 0.3]}
          />
          <Arrow3D
            color="#00D4AA"
            durationFrames={30}
            from={[CTX_SRC[0] + 0.9, CTX_SRC[1] - 0.2, 0]}
            startFrame={startFrame + 130}
            thickness={0.06}
            to={[LLM[0] - 1.2, LLM[1] + 0.6, 0]}
          />
          <FloatingLabel
            animateIn={{ startFrame: startFrame + 140, durationFrames: 20 }}
            color="#00D4AA"
            fontSize={0.22}
            position={[CTX_SRC[0] + 2.2, CTX_SRC[1] - 0.6, 0]}
            text="injected"
          />
        </>
      )}

      {/* Safe tool call dispatched (green path) */}
      {e > 180 && (
        <>
          <SystemBox
            animateIn={{ startFrame: startFrame + 180, durationFrames: 30 }}
            color="#00D4AA"
            label="read"
            position={TOOL_SAFE}
            size={[1.4, 1.0, 0.3]}
          />
          <Arrow3D
            color="#00D4AA"
            durationFrames={30}
            from={[LLM[0] + 1.2, LLM[1] - 0.5, 0]}
            startFrame={startFrame + 200}
            thickness={0.06}
            to={[TOOL_SAFE[0] - 0.8, TOOL_SAFE[1] + 0.2, 0]}
          />
          <GlowOrb
            color="#00D4AA"
            intensity={1.5}
            position={[TOOL_SAFE[0], TOOL_SAFE[1], 0.4]}
            pulseSpeed={3}
            radius={0.3}
            startFrame={startFrame + 230}
          />
        </>
      )}

      {/* Blocked tool call (red X) — hookflow blocks it */}
      {e > 250 && (
        <>
          <SystemBox
            animateIn={{ startFrame: startFrame + 250, durationFrames: 30 }}
            color="#FF4757"
            label="rm -rf /"
            position={TOOL_BLOCKED}
            size={[1.6, 1.0, 0.3]}
          />
          {/* Half arrow toward it */}
          <Arrow3D
            color="#FFB800"
            durationFrames={20}
            from={[LLM[0] + 1.2, LLM[1] + 0.5, 0]}
            startFrame={startFrame + 280}
            thickness={0.06}
            to={[LLM[0] + 2.4, LLM[1] + 1.0, 0]}
          />
          {/* Red X over the path */}
          <Arrow3D
            animated={false}
            color="#FF4757"
            durationFrames={1}
            from={[LLM[0] + 2.6, LLM[1] + 0.6, 0.2]}
            startFrame={startFrame + 310}
            thickness={0.08}
            to={[LLM[0] + 3.4, LLM[1] + 1.4, 0.2]}
          />
          <Arrow3D
            animated={false}
            color="#FF4757"
            durationFrames={1}
            from={[LLM[0] + 2.6, LLM[1] + 1.4, 0.2]}
            startFrame={startFrame + 310}
            thickness={0.08}
            to={[LLM[0] + 3.4, LLM[1] + 0.6, 0.2]}
          />
          <FloatingLabel
            animateIn={{ startFrame: startFrame + 320, durationFrames: 20 }}
            color="#FF4757"
            fontSize={0.24}
            position={[LLM[0] + 3.0, LLM[1] + 1.9, 0]}
            text="blocked by hookflow"
          />
        </>
      )}

      {/* Brand outro overlay (last 90 frames) */}
      {outroFade < 1 && (
        <group>
          <mesh position={[HARNESS[0], HARNESS[1], 4]}>
            <planeGeometry args={[20, 12]} />
            <meshBasicMaterial color="#0A0A1A" opacity={1 - outroFade} transparent />
          </mesh>
          <FloatingLabel
            color="#7B61FF"
            fontSize={1.2}
            position={[HARNESS[0], HARNESS[1] + 0.6, 4.2]}
            text="htek.dev"
          />
          <FloatingLabel
            color="#E0E0FF"
            fontSize={0.4}
            position={[HARNESS[0], HARNESS[1] - 0.6, 4.2]}
            text="agentic development, blueprinted"
          />
        </group>
      )}
    </group>
  );
};
