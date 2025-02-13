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
      const groupCenter = new THREE.Vector3();
      const currentPos = new THREE.Vector3();
      const worldOrigin = new THREE.Vector3(0, 0, 0);

      const mesh = group.getObjectByName('box') as THREE.Mesh;
      mesh?.geometry.computeVertexNormals();
      mesh?.geometry.computeBoundingBox();
      mesh?.geometry.boundingBox?.getCenter(groupCenter);
      group.getWorldPosition(currentPos);
      currentPos.add(groupCenter);
      const distToOrigin = worldOrigin.distanceTo(currentPos);

      if (distToOrigin > 1e-2) {
        group.translateX(-currentPos.x);
        group.translateY(-currentPos.y);
        group.translateZ(-currentPos.z);
      }
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
