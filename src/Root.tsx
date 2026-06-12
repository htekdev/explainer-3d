import React from 'react';
import { Composition } from 'remotion';
import { AIDevFlow } from './compositions/AIDevFlow';
import { LLMExplainer } from './compositions/LLMExplainer';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="AIDevFlow"
        component={AIDevFlow}
        durationInFrames={1800}
        fps={60}
        width={1920}
        height={1080}
      />
      <Composition
        id="LLMExplainer"
        component={LLMExplainer}
        durationInFrames={2700}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{ topic: 'how llms work' }}
      />
    </>
  );
};
