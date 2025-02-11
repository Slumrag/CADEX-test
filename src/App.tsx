import ModelForm from '@/components/ModelForm';
import { Col, Layout, Row } from 'antd';
import ModelView from '@/components/ModelView';
import { useEffect, useState } from 'react';
import { getBufferGeometry } from '@/api/getBufferGeometry';
import { useForm } from 'antd/es/form/Form';

function App() {
  const [geometryData, setGeometryData] = useState<Float32Array>();
  const [form] = useForm();

  const fetchData = async () => {
    const res = await getBufferGeometry(form.getFieldsValue());
    const points = new Float32Array(res);
    setGeometryData(points);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Layout style={{ height: '100vh', padding: '0 16px', justifyContent: 'start' }}>
      <Row gutter={[16, 8]} style={{ height: '100%' }} wrap={false}>
        <Col style={{ alignSelf: 'center' }}>
          <ModelForm
            form={form}
            initialValues={{
              height: 200,
              width: 100,
              length: 150,
            }}
            onSubmit={() => fetchData()}
          />
        </Col>
        <Col flex={1}>
          <ModelView data={geometryData} />
        </Col>
      </Row>
    </Layout>
  );
}

export default App;
