import { describe, it, expect } from 'vitest';
import { COMPOSITIONS } from '../../src/renderer/compositions';

describe('Composition Registry', () => {
  it('contains AIDevFlow', () => {
    expect(COMPOSITIONS.AIDevFlow).toBeDefined();
    expect(COMPOSITIONS.AIDevFlow.id).toBe('AIDevFlow');
  });

  it('has valid duration and fps', () => {
    const comp = COMPOSITIONS.AIDevFlow;
    expect(comp.durationInFrames).toBeGreaterThan(0);
    expect(comp.fps).toBe(60);
    expect(comp.durationInFrames / comp.fps).toBeGreaterThanOrEqual(10);
  });

  it('has default output path', () => {
    expect(COMPOSITIONS.AIDevFlow.defaultOutput).toContain('.mp4');
  });
});
