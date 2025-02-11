import { CameraControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { FC, PropsWithChildren, useRef } from 'react';

export const Scene: FC<PropsWithChildren> = ({ children }) => {
  const { camera, scene } = useThree();
  const cameraControlsRef = useRef(null);

  return (
    <>
      <CameraControls ref={cameraControlsRef} />
      <axesHelper args={[3]}></axesHelper>
      <cameraHelper args={[camera]}></cameraHelper>
      <ambientLight intensity={Math.PI / 4} />
      <directionalLight position={[1, 1, 1]} />
      <group>{children}</group>
    </>
  );
};
