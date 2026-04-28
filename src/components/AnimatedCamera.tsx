import React, { useEffect } from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { useThree } from '@react-three/fiber';
import type { Vec3 } from '../utils/types';

export interface CameraKeyframe {
  frame: number;
  position: Vec3;
  lookAt: Vec3;
}

export interface AnimatedCameraProps {
  readonly keyframes: CameraKeyframe[];
}

export const AnimatedCamera: React.FC<AnimatedCameraProps> = ({ keyframes }) => {
  const frame = useCurrentFrame();
  const { camera } = useThree();

  useEffect(() => {
    if (keyframes.length === 0) return;
    if (keyframes.length === 1) {
      const kf = keyframes[0];
      camera.position.set(...kf.position);
      camera.lookAt(...kf.lookAt);
      camera.updateProjectionMatrix();
      return;
    }

    let startIdx = 0;
    for (let i = 0; i < keyframes.length - 1; i++) {
      if (frame >= keyframes[i].frame) startIdx = i;
    }
    const endIdx = Math.min(startIdx + 1, keyframes.length - 1);
    const start = keyframes[startIdx];
    const end = keyframes[endIdx];

    if (startIdx === endIdx) {
      camera.position.set(...start.position);
      camera.lookAt(...start.lookAt);
    } else {
      const t = interpolate(frame, [start.frame, end.frame], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

      const smoothT = t * t * (3 - 2 * t);

      camera.position.set(
        start.position[0] + (end.position[0] - start.position[0]) * smoothT,
        start.position[1] + (end.position[1] - start.position[1]) * smoothT,
        start.position[2] + (end.position[2] - start.position[2]) * smoothT,
      );
      camera.lookAt(
        start.lookAt[0] + (end.lookAt[0] - start.lookAt[0]) * smoothT,
        start.lookAt[1] + (end.lookAt[1] - start.lookAt[1]) * smoothT,
        start.lookAt[2] + (end.lookAt[2] - start.lookAt[2]) * smoothT,
      );
    }
    camera.updateProjectionMatrix();
  }, [frame, keyframes, camera]);

  return null;
};
