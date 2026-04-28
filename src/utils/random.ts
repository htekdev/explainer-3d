export function createSeededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

export function seededRange(rng: () => number, min: number, max: number): number {
  return min + rng() * (max - min);
}

export function seededPosition(
  rng: () => number,
  spread: number,
): [number, number, number] {
  return [
    seededRange(rng, -spread, spread),
    seededRange(rng, -spread, spread),
    seededRange(rng, -spread, spread),
  ];
}
