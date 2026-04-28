import React from 'react';
import { ThreeCanvas } from '@remotion/three';
import { useVideoConfig } from 'remotion';
import { useThree, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

interface Scene3DProps {
  children: React.ReactNode;
  camera?: {
    position: [number, number, number];
    fov?: number;
    lookAt?: [number, number, number];
  };
  bloom?: {
    intensity?: number;
    luminanceThreshold?: number;
    luminanceSmoothing?: number;
  };
  backgroundColor?: string;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-5, 5, -5]} intensity={0.4} color="#7B61FF" />
    </>
  );
}

function CameraLookAt({ target }: { target: [number, number, number] }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.lookAt(new THREE.Vector3(...target));
  });
  return null;
}

export const Scene3D: React.FC<Scene3DProps> = ({
  children,
  camera = { position: [0, 3, 10], fov: 50 },
  bloom = { intensity: 1.5, luminanceThreshold: 0.2, luminanceSmoothing: 0.9 },
  backgroundColor = '#0A0A1A',
}) => {
  const { width, height } = useVideoConfig();

  return (
    <ThreeCanvas
      width={width}
      height={height}
      camera={{
        position: camera.position,
        fov: camera.fov ?? 50,
      }}
      style={{ backgroundColor }}
      gl={{ antialias: true }}
    >
      {camera.lookAt && <CameraLookAt target={camera.lookAt} />}
      <Lights />
      {children}
      <EffectComposer>
        <Bloom
          intensity={bloom.intensity ?? 1.5}
          luminanceThreshold={bloom.luminanceThreshold ?? 0.2}
          luminanceSmoothing={bloom.luminanceSmoothing ?? 0.9}
        />
      </EffectComposer>
    </ThreeCanvas>
  );
};
