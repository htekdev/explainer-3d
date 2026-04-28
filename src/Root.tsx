import React from 'react';
import { Composition } from 'remotion';
import { AIDevFlow } from './compositions/AIDevFlow';

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
    </>
  );
};
