import { describe, it, expect, vi } from 'vitest';

// Mock modules that depend on WebGL / Three.js internals not available in Node
vi.mock('@react-three/postprocessing', () => ({
  EffectComposer: () => null,
  Bloom: () => null,
}));
vi.mock('@remotion/three', () => ({
  ThreeCanvas: ({ children }: { children: React.ReactNode }) => children,
}));
vi.mock('@react-three/fiber', () => ({
  useThree: () => ({ camera: { position: { set: vi.fn() }, lookAt: vi.fn(), updateProjectionMatrix: vi.fn() } }),
}));
vi.mock('@react-three/drei', () => ({
  RoundedBox: () => null,
  Text: () => null,
  Billboard: ({ children }: { children: React.ReactNode }) => children,
  Grid: () => null,
}));
vi.mock('remotion', () => ({
  useCurrentFrame: () => 0,
  useVideoConfig: () => ({ fps: 60, width: 1920, height: 1080, durationInFrames: 1800 }),
  interpolate: () => 0,
  spring: () => 0,
}));

import * as components from '../../src/components';

describe('Component Library Exports', () => {
  const expectedExports = [
    'Scene3D',
    'SystemBox',
    'TokenStream',
    'DataFlow',
    'Arrow3D',
    'FloatingLabel',
    'GlowOrb',
    'ConnectionBeam',
    'GridFloor',
    'ParticleField',
    'AnimatedCamera',
  ];

  it.each(expectedExports)('exports %s', (name) => {
    expect(components).toHaveProperty(name);
    expect(typeof (components as Record<string, unknown>)[name]).toBe('function');
  });

  it('exports all expected components', () => {
    const exportedNames = Object.keys(components).filter(
      k => typeof (components as Record<string, unknown>)[k] === 'function'
    );
    expect(exportedNames.sort()).toEqual(expectedExports.sort());
  });
});
