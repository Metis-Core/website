export const brand = {
  graphiteBlack: '#1e2023',
  graphiteGrey: '#9e9e9e',
  accentBlue: '#4A90D9',
  accentBlueDark: '#2a5f9e',
  accentBlueLight: '#7ab0e8',
} as const;

/** Four-up accents that stay in the graphite + blue family. */
export const accentScale = ['#4A90D9', '#2a5f9e', '#3d6d99', '#1e2023'] as const;

export function accentAt(index: number): string {
  return accentScale[index % accentScale.length];
}
