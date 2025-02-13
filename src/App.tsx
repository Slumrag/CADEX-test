import ModelForm from '@/components/ModelForm';
import { Col, Layout, Row } from 'antd';
import ModelView from '@/components/ModelView';
import { useEffect, useState } from 'react';
import { getBufferGeometry } from '@/api/getBufferGeometry';
import { useForm } from 'antd/es/form/Form';
import ThemeProvider from './components/ThemeProvider';

function App() {
  const [geometryData, setGeometryData] = useState<Float32Array>();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getBufferGeometry(form.getFieldsValue());
      const points = new Float32Array(res);
      setGeometryData(points);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ThemeProvider>
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
            <ModelView loading={loading} data={geometryData} />
          </Col>
        </Row>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
