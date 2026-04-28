import React from 'react';
import { Grid } from '@react-three/drei';

export interface GridFloorProps {
  size?: number;
  divisions?: number;
  color?: string;
  fadeDistance?: number;
  yPosition?: number;
}

export const GridFloor: React.FC<GridFloorProps> = ({
  size = 100,
  color = '#2A2A4A',
  fadeDistance = 30,
  yPosition = -2,
}) => {
  return (
    <Grid
      position={[0, yPosition, 0]}
      args={[size, size]}
      cellSize={1}
      cellThickness={0.5}
      cellColor={color}
      sectionSize={5}
      sectionThickness={1}
      sectionColor="#3A3A5A"
      fadeDistance={fadeDistance}
      infiniteGrid
    />
  );
};
