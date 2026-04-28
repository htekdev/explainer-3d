export const THEME = {
  primary: '#4A90D9',
  secondary: '#7B61FF',
  accent: '#00D4AA',
  warning: '#FFB800',
  error: '#FF4757',
  background: '#0A0A1A',
  surface: '#1A1A2E',
  text: '#E0E0FF',
  textMuted: '#8888AA',
  glow: {
    blue: '#4A90D9',
    purple: '#7B61FF',
    green: '#00D4AA',
    orange: '#FFB800',
    pink: '#FF6B9D',
    white: '#FFFFFF',
  },
} as const;

export type ThemeColor = keyof typeof THEME.glow;

export function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
}

export function getGlowColor(name: ThemeColor): string {
  return THEME.glow[name];
}
