import { Canvas } from '@react-three/fiber';
import React, { FC } from 'react';
import { Spin } from 'antd';
import { Scene } from './Scene';
import { BufferBox } from './BufferBox';

export type ModelViewProps = {
  data?: Float32Array;
  loading?: boolean;
};
const ModelView: FC<ModelViewProps> = ({ data, loading = false }) => {
  return (
    <Canvas>
      {loading && <Spin />}
      <Scene>
        {data && (
          <BufferBox
            // rotation={[Math.PI / 6, Math.PI / 6.6, 0]}
            points={data}
          ></BufferBox>
        )}
      </Scene>
    </Canvas>
  );
};

export default ModelView;
