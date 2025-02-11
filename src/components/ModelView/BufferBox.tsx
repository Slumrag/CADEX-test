import { ThreeElements } from '@react-three/fiber';
import React, { FC, useRef } from 'react';
import * as THREE from 'three';

export const BufferBox: FC<ThreeElements['mesh'] & { points: Float32Array }> = ({
  points,
  ...props
}) => {
  const ref = useRef<THREE.Mesh>(null!);
  // console.log(ref.current);
  // useHelper(ref, VertexNormalsHelper);
  return (
    <mesh ref={ref} {...props}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' args={[points, 3]} />
        {/* <bufferAttribute attach='index' args={[new Uint16Array(indices), 3]} /> */}
      </bufferGeometry>
      {/* <boxGeometry args={[1, 1.2, 1.3]}></boxGeometry> */}
      <meshStandardMaterial color={'green'} />
      {/* <Wireframe polygonOffset={true} polygonOffsetFactor={1} polygonOffsetUnits={1} /> */}
      {/* <Helper type={VertexNormalsHelper} /> */}
    </mesh>
  );
};
