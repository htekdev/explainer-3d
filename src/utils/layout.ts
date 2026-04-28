export function circularPosition(
  index: number,
  total: number,
  radius: number,
  yOffset: number = 0,
): [number, number, number] {
  const angle = (index / total) * Math.PI * 2;
  return [Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius];
}

export function gridPosition(
  index: number,
  columns: number,
  spacing: number = 2,
  center: boolean = true,
): [number, number, number] {
  const row = Math.floor(index / columns);
  const col = index % columns;
  const totalRows = Math.ceil(index / columns) + 1;
  const offsetX = center ? ((columns - 1) * spacing) / 2 : 0;
  const offsetZ = center ? ((totalRows - 1) * spacing) / 2 : 0;
  return [col * spacing - offsetX, 0, row * spacing - offsetZ];
}

export function lerpPosition(
  from: [number, number, number],
  to: [number, number, number],
  t: number,
): [number, number, number] {
  return [
    from[0] + (to[0] - from[0]) * t,
    from[1] + (to[1] - from[1]) * t,
    from[2] + (to[2] - from[2]) * t,
  ];
}

export function midpoint(
  a: [number, number, number],
  b: [number, number, number],
): [number, number, number] {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
}

export function distance(
  a: [number, number, number],
  b: [number, number, number],
): number {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2,
  );
}
