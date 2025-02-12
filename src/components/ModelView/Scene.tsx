import { CameraControls } from '@react-three/drei';
import React, { FC, PropsWithChildren, useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Scene: FC<PropsWithChildren> = ({ children }) => {
  // const { camera, scene } = useThree();
  const cameraControlsRef = useRef<CameraControls>(null!);
  const childrenRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    if (!children) {
      return;
    }
    if (cameraControlsRef.current && childrenRef.current) {
      const children = childrenRef.current;
      const camera = cameraControlsRef.current;
      const mesh = children.children[0]?.getObjectByName('box') as THREE.Mesh;
      console.log(children.children[0]);
      console.log('mesh', mesh);

      let boundingBox = mesh.geometry.boundingBox;
      if (boundingBox === null) {
        mesh.geometry.computeBoundingBox();
        boundingBox = mesh.geometry.boundingBox as THREE.Box3;
      }
      camera.fitToSphere(mesh, true);
      camera.azimuthAngle = Math.PI / 6;
      camera.polarAngle = Math.PI / 3;
    }
  }, [children]);

  return (
    <>
      <CameraControls ref={cameraControlsRef} />
      <axesHelper args={[3]}></axesHelper>
      {/* <cameraHelper args={[camera]}></cameraHelper> */}
      <ambientLight intensity={Math.PI / 4} />
      <directionalLight position={[1, 1, 1]} />
      <group ref={childrenRef}>{children}</group>
    </>
  );
};
