import ModelForm from '@/components/ModelForm';
import { Col, Layout, Row } from 'antd';
import ModelView from '@/components/ModelView';

function App() {
  return (
    <Layout style={{ height: '100vh', padding: '0 16px', justifyContent: 'start' }}>
      <Row gutter={[16, 8]} style={{ height: '100%' }} wrap={false}>
        <Col style={{ alignSelf: 'center' }}>
          <ModelForm
            initialValues={{
              height: 200,
              width: 100,
              length: 150,
            }}
            onSubmit={(values) => console.log(values)}
          />
        </Col>
        <Col flex={1}>
          <ModelView />
        </Col>
      </Row>
    </Layout>
  );
}

export default App;
