import React from 'react';
import { useCurrentFrame } from 'remotion';
import {
  SystemBox, GlowOrb, ConnectionBeam, DataFlow,
  TokenStream, FloatingLabel,
} from '../../../components';

const SYSTEM_PROMPT_TOKENS = ['You', 'are', 'a', 'senior', 'engineer'];
const SKILLS_TOKENS = ['TypeScript', 'Node.js', 'Express'];
const TOOLS_TOKENS = ['file_edit', 'terminal', 'search'];

interface ContextMergePhaseProps {
  readonly startFrame: number;
}

export const ContextMergePhase: React.FC<ContextMergePhaseProps> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;

  if (elapsed < 0) return null;

  return (
    <group>
      {/* System Prompt Box (top) */}
      <SystemBox
        animateIn={{ startFrame, durationFrames: 30 }}
        color="#4A90D9"
        label="System Prompt"
        position={[-4, 2.5, 0]}
        size={[2.2, 0.8, 0.3]}
      />
      <FloatingLabel
        animateIn={{ startFrame, durationFrames: 30 }}
        color="#4A90D9"
        fontSize={0.15}
        position={[-4, 3.2, 0]}
        text="System Prompt"
      />

      {/* Skills Box (middle) */}
      <SystemBox
        animateIn={{ startFrame: startFrame + 15, durationFrames: 30 }}
        color="#7B61FF"
        label="Skills"
        position={[-4, 1.5, 0]}
        size={[2.2, 0.8, 0.3]}
      />

      {/* Tools Box (bottom) */}
      <SystemBox
        animateIn={{ startFrame: startFrame + 30, durationFrames: 30 }}
        color="#FFB800"
        label="Tools"
        position={[-4, 0.5, 0]}
        size={[2.2, 0.8, 0.3]}
      />

      {/* Token streams from each box */}
      <TokenStream
        color="#4A90D9"
        direction="right"
        fontSize={0.12}
        position={[-2.8, 2.5, 0.3]}
        seed={210}
        speed={2}
        startFrame={startFrame + 40}
        tokens={SYSTEM_PROMPT_TOKENS}
      />
      <TokenStream
        color="#7B61FF"
        direction="right"
        fontSize={0.12}
        position={[-2.8, 1.5, 0.3]}
        seed={211}
        speed={2}
        startFrame={startFrame + 50}
        tokens={SKILLS_TOKENS}
      />
      <TokenStream
        color="#FFB800"
        direction="right"
        fontSize={0.12}
        position={[-2.8, 0.5, 0.3]}
        seed={212}
        speed={2}
        startFrame={startFrame + 60}
        tokens={TOOLS_TOKENS}
      />

      {/* Merge point GlowOrb */}
      <GlowOrb
        color="#FF6B9D"
        intensity={2}
        position={[-1, 1.5, 0]}
        pulseSpeed={1.5}
        radius={0.4}
        startFrame={startFrame + 70}
      />
      <FloatingLabel
        animateIn={{ startFrame: startFrame + 80, durationFrames: 20 }}
        fontSize={0.2}
        position={[-1, 2.5, 0]}
        text="Token Merge"
      />

      {/* Connection beams from boxes to merge point */}
      <ConnectionBeam
        color="#4A90D9"
        from={[-2.8, 2.5, 0]}
        startFrame={startFrame + 50}
        to={[-1, 1.5, 0]}
      />
      <ConnectionBeam
        color="#7B61FF"
        from={[-2.8, 1.5, 0]}
        startFrame={startFrame + 55}
        to={[-1, 1.5, 0]}
      />
      <ConnectionBeam
        color="#FFB800"
        from={[-2.8, 0.5, 0]}
        startFrame={startFrame + 60}
        to={[-1, 1.5, 0]}
      />

      {/* DataFlows converging to merge point */}
      <DataFlow
        color="#4A90D9"
        from={[-2.8, 2.5, 0]}
        particleCount={25}
        seed={220}
        startFrame={startFrame + 60}
        to={[-1, 1.5, 0]}
      />
      <DataFlow
        color="#7B61FF"
        from={[-2.8, 1.5, 0]}
        particleCount={25}
        seed={221}
        startFrame={startFrame + 65}
        to={[-1, 1.5, 0]}
      />
      <DataFlow
        color="#FFB800"
        from={[-2.8, 0.5, 0]}
        particleCount={25}
        seed={222}
        startFrame={startFrame + 70}
        to={[-1, 1.5, 0]}
      />

      {/* DataFlow from user input stream to merge point */}
      <DataFlow
        color="#00D4AA"
        from={[-5, 0.5, 0]}
        particleCount={30}
        seed={223}
        speed={1.2}
        startFrame={startFrame + 40}
        to={[-1, 1.5, 0]}
      />

      {/* Merged stream flowing from merge point to agent model */}
      <DataFlow
        color="#FF6B9D"
        from={[-1, 1.5, 0]}
        particleCount={40}
        seed={224}
        speed={1.5}
        startFrame={startFrame + 90}
        to={[2, 0.5, 0]}
      />
      <ConnectionBeam
        color="#FF6B9D"
        from={[-1, 1.5, 0]}
        startFrame={startFrame + 85}
        to={[2, 0.5, 0]}
      />
    </group>
  );
};

// Keep legacy export
export const SkillsMergeScene = ContextMergePhase;
