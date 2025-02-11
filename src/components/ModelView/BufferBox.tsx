import { ThreeElements } from '@react-three/fiber';
import React, { FC } from 'react';

export const BufferBox: FC<ThreeElements['mesh'] & { points: Float32Array }> = ({
  points,
  ...props
}) => {
  return (
    <>
      <mesh {...props}>
        <bufferGeometry>
          <bufferAttribute attach='attributes-position' args={[points, 3]} />
        </bufferGeometry>
        <meshStandardMaterial color={'darkgrey'} />
      </mesh>
      <mesh {...props}>
        <bufferGeometry>
          <bufferAttribute attach='attributes-position' args={[points, 3]} />
        </bufferGeometry>
        <meshStandardMaterial color={'black'} wireframe />
      </mesh>
    </>
  );
};
