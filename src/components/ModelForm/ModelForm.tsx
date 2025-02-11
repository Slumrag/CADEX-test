import { Button, Form, FormInstance, InputNumber } from 'antd';
import React, { FC } from 'react';
export type Values = {
  height: number;
  width: number;
  length: number;
};
export type ModelFormProps = {
  form: FormInstance;
  initialValues?: Values;
  onSubmit: (values: Values) => void;
};

const ModelForm: FC<ModelFormProps> = ({ form, initialValues, onSubmit }) => {
  return (
    <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
      <Form.Item label='height' name={'height'}>
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item label='width' name={'width'}>
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item label='length' name={'length'}>
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item>
        <Button htmlType='submit'>Calculate</Button>
      </Form.Item>
    </Form>
  );
};

export default ModelForm;
