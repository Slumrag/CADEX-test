import { useColorScheme } from '@/hooks';
import { ThreeElements } from '@react-three/fiber';
import { FC, useEffect, useRef } from 'react';
import * as THREE from 'three';
export const BufferBox: FC<ThreeElements['mesh'] & { points: Float32Array }> = ({
  points,
  ...props
}) => {
  const ref = useRef<THREE.Group>(null!);
  useEffect(() => {
    if (ref.current) {
      const group = ref.current;
      const mesh = group.getObjectByName('box') as THREE.Mesh;
      mesh?.geometry.computeVertexNormals();
    }
  }, [points]);
  const colorScheme = useColorScheme();
  return (
    <group ref={ref}>
      <mesh name={'box'} {...props}>
        <bufferGeometry>
          <bufferAttribute attach='attributes-position' args={[points, 3]} />
        </bufferGeometry>
        <meshStandardMaterial color={colorScheme === 'light' ? 'lightgrey' : '#505050'} />
      </mesh>
      <mesh {...props}>
        <bufferGeometry>
          <bufferAttribute attach='attributes-position' args={[points, 3]} />
        </bufferGeometry>
        <meshStandardMaterial color={colorScheme === 'light' ? '#000000' : '#ffffff'} wireframe />
      </mesh>
    </group>
  );
};
