import { Canvas } from '@react-three/fiber';
import { FC } from 'react';
import { Flex, Spin } from 'antd';
import { Scene } from './Scene';
import { BufferBox } from './BufferBox';

export type ModelViewProps = {
  data?: Float32Array;
  loading?: boolean;
};
const ModelView: FC<ModelViewProps> = ({ data, loading = false }) => {
  return (
    <>
      {loading && (
        <Flex
          vertical
          style={{
            position: 'absolute',
            width: '100%',
            minHeight: '100%',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 100,
          }}
          align='center'
          justify='center'
        >
          <Spin size='large' />
        </Flex>
      )}
      <Canvas>
        <Scene>{data && <BufferBox points={data}></BufferBox>}</Scene>
      </Canvas>
    </>
  );
};

export default ModelView;
