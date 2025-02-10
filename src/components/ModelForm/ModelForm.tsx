import { Button, Form, Input } from 'antd';
import React, { FC } from 'react';

type ModelFormProps = {};

const ModelForm: FC<ModelFormProps> = () => {
  return (
    <Form>
      <Form.Item label='length' name={'length'}>
        <Input />
      </Form.Item>
      <Form.Item label='width' name={'width'}>
        <Input />
      </Form.Item>
      <Form.Item label='height' name={'height'}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button htmlType='submit'>send</Button>
      </Form.Item>
    </Form>
  );
};

export default ModelForm;
