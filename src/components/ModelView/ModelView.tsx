import { Canvas } from '@react-three/fiber';
import { FC } from 'react';
import { Spin } from 'antd';
import { Scene } from './Scene';
import { BufferBox } from './BufferBox';

export type ModelViewProps = {
  data?: Float32Array;
  loading?: boolean;
};
const ModelView: FC<ModelViewProps> = ({ data, loading = false }) => {
  return (
    <>
      {loading && <Spin size='large' fullscreen />}
      <Canvas>
        <Scene>{data && <BufferBox points={data}></BufferBox>}</Scene>
      </Canvas>
    </>
  );
};

export default ModelView;
