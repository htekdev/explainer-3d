import React from 'react';
import { useCurrentFrame } from 'remotion';
import { SystemBox, GlowOrb, FloatingLabel, ParticleField } from '../../../components';

interface AgentProcessPhaseProps {
  readonly startFrame: number;
}

export const AgentProcessPhase: React.FC<AgentProcessPhaseProps> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;

  if (elapsed < 0) return null;

  const processingPulse = 1 + Math.sin(elapsed * 0.08) * 0.3;

  return (
    <group>
      {/* Agent Model — large glowing box */}
      <SystemBox
        animateIn={{ startFrame, durationFrames: 40 }}
        color="#FF6B9D"
        glowIntensity={0.8 * processingPulse}
        label="AI Agent"
        position={[2, 0.5, 0]}
        size={[3, 2, 0.5]}
      />

      {/* Label above */}
      <FloatingLabel
        animateIn={{ startFrame: startFrame + 20, durationFrames: 30 }}
        color="#FFFFFF"
        fontSize={0.35}
        position={[2, 2.2, 0]}
        text="AI Agent"
      />

      {/* Inner processing orb */}
      <GlowOrb
        color="#FF6B9D"
        intensity={3 * processingPulse}
        position={[2, 0.5, 0.3]}
        pulseSpeed={3}
        radius={0.5}
        startFrame={startFrame + 10}
      />

      {/* Secondary processing orb */}
      <GlowOrb
        color="#4A90D9"
        intensity={1.5}
        position={[2, 0.5, 0.3]}
        pulseSpeed={2}
        radius={0.8}
        startFrame={startFrame + 20}
      />

      {/* Internal swirling particles */}
      <group position={[2, 0.5, 0]}>
        <ParticleField
          color="#FF6B9D"
          count={200}
          opacity={0.3}
          seed={300}
          speed={1.2}
          spread={1.2}
        />
      </group>

      {/* Processing sublabel */}
      <FloatingLabel
        animateIn={{ startFrame: startFrame + 60, durationFrames: 20 }}
        color="#8888AA"
        fontSize={0.15}
        position={[2, -0.8, 0]}
        text="Processing tokens..."
      />
    </group>
  );
};

// Keep legacy export
export const ModelProcessScene = AgentProcessPhase;
