import React from 'react';
import { useCurrentFrame } from 'remotion';
import {
  SystemBox, TokenStream, Arrow3D, DataFlow,
  GlowOrb, FloatingLabel, ConnectionBeam,
} from '../../../components';

const OUTPUT_TOKENS = [
  'Creating', 'Express', 'server...', 'Adding', 'JWT', 'auth...',
  'Configuring', 'rate', 'limiter...',
];
const TOOL_CALL_TOKENS = ['edit:', 'src/index.ts', 'run:', 'npm', 'install'];
const RESPONSE_TOKENS = [
  '✓', 'Server', 'created', '✓', 'Auth', 'added',
  '✓', 'Rate', 'limiting', 'configured',
];

interface OutputLoopPhaseProps {
  readonly startFrame: number;
}

export const OutputLoopPhase: React.FC<OutputLoopPhaseProps> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;

  if (elapsed < 0) return null;

  return (
    <group>
      {/* Output tokens flowing right from model */}
      <TokenStream
        color="#00D4AA"
        direction="right"
        fontSize={0.14}
        position={[3.8, 0.5, 0.3]}
        seed={401}
        speed={3}
        startFrame={startFrame}
        tokens={OUTPUT_TOKENS}
      />

      {/* Output stream label */}
      <FloatingLabel
        animateIn={{ startFrame, durationFrames: 20 }}
        color="#00D4AA"
        fontSize={0.2}
        position={[5, 1.5, 0]}
        text="Output Tokens"
      />

      {/* Split point */}
      <GlowOrb
        color="#00D4AA"
        intensity={1.5}
        position={[7, 0.5, 0]}
        pulseSpeed={1}
        radius={0.3}
        startFrame={startFrame + 60}
      />

      {/* Arrow to split */}
      <Arrow3D
        color="#00D4AA"
        durationFrames={40}
        from={[5.5, 0.5, 0]}
        startFrame={startFrame + 40}
        to={[7, 0.5, 0]}
      />

      {/* === Upper path: Response Text === */}
      <Arrow3D
        color="#00FF88"
        durationFrames={30}
        from={[7, 0.5, 0]}
        startFrame={startFrame + 80}
        to={[8, 2.5, 0]}
      />

      <SystemBox
        animateIn={{ startFrame: startFrame + 100, durationFrames: 30 }}
        color="#00FF88"
        glowIntensity={0.3}
        label="Response"
        position={[9.5, 2.5, 0]}
        size={[2.5, 1.2, 0.3]}
      />

      <TokenStream
        color="#00FF88"
        direction="right"
        fontSize={0.12}
        position={[8.5, 2.5, 0.3]}
        seed={403}
        speed={2.5}
        startFrame={startFrame + 120}
        tokens={RESPONSE_TOKENS}
      />

      <FloatingLabel
        animateIn={{ startFrame: startFrame + 110, durationFrames: 20 }}
        color="#00FF88"
        fontSize={0.2}
        position={[9.5, 3.5, 0]}
        text="Response Text"
      />

      {/* === Lower path: Tool Calls === */}
      <Arrow3D
        color="#FF6B9D"
        durationFrames={30}
        from={[7, 0.5, 0]}
        startFrame={startFrame + 80}
        to={[8, -1, 0]}
      />

      <SystemBox
        animateIn={{ startFrame: startFrame + 100, durationFrames: 30 }}
        color="#FFB800"
        label="Tool Calls"
        position={[9, -1, 0]}
        size={[2, 1, 0.3]}
      />

      <TokenStream
        color="#FF6B9D"
        direction="right"
        fontSize={0.12}
        position={[8.2, -1, 0.3]}
        seed={402}
        speed={2}
        startFrame={startFrame + 120}
        tokens={TOOL_CALL_TOKENS}
      />

      <FloatingLabel
        animateIn={{ startFrame: startFrame + 110, durationFrames: 20 }}
        color="#FFB800"
        fontSize={0.2}
        position={[9, -0.2, 0]}
        text="Tool Calls"
      />

      {/* === Feedback Loop: Tool Calls back to Tools box === */}
      {/* Curved path via intermediate points */}
      <DataFlow
        color="#FFB800"
        durationFrames={600}
        from={[9, -1, 0]}
        particleCount={40}
        seed={410}
        speed={0.8}
        startFrame={startFrame + 150}
        to={[2, -2.5, 0]}
      />
      <DataFlow
        color="#FFB800"
        durationFrames={600}
        from={[2, -2.5, 0]}
        particleCount={40}
        seed={411}
        speed={0.8}
        startFrame={startFrame + 170}
        to={[-4, -1, 0]}
      />
      <DataFlow
        color="#FFB800"
        durationFrames={600}
        from={[-4, -1, 0]}
        particleCount={30}
        seed={412}
        speed={0.8}
        startFrame={startFrame + 190}
        to={[-4, 0.5, 0]}
      />

      {/* Feedback loop connection beams */}
      <ConnectionBeam
        color="#FFB800"
        from={[9, -1, 0]}
        startFrame={startFrame + 150}
        to={[2, -2.5, 0]}
        width={0.015}
      />
      <ConnectionBeam
        color="#FFB800"
        from={[2, -2.5, 0]}
        startFrame={startFrame + 170}
        to={[-4, -1, 0]}
        width={0.015}
      />
      <ConnectionBeam
        color="#FFB800"
        from={[-4, -1, 0]}
        startFrame={startFrame + 190}
        to={[-4, 0.5, 0]}
        width={0.015}
      />

      {/* Agentic Loop label */}
      <FloatingLabel
        animateIn={{ startFrame: startFrame + 200, durationFrames: 30 }}
        color="#FFB800"
        fontSize={0.25}
        position={[2, -3.2, 0]}
        text="Agentic Loop"
      />

      {/* Final wide-shot title */}
      <FloatingLabel
        animateIn={{ startFrame: startFrame + 300, durationFrames: 40 }}
        color="#FFFFFF"
        fontSize={0.5}
        position={[1, 4.5, 0]}
        text="How AI Agent Development Works"
      />
    </group>
  );
};

// Keep legacy export
export const OutputScene = OutputLoopPhase;
