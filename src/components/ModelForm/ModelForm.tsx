import { Button, Form, FormInstance, InputNumber } from 'antd';
import React, { FC } from 'react';
import classes from './ModelForm.module.css';

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
    <Form
      form={form}
      onFinish={onSubmit}
      initialValues={initialValues}
      autoComplete='off'
      className={classes['model-form']}
      requiredMark={false}
    >
      <Form.Item label='height' name={'height'} rules={[{ required: true }]}>
        <InputNumber min={0} className={classes['model-form__input']} />
      </Form.Item>
      <Form.Item label='width' name={'width'} rules={[{ required: true }]}>
        <InputNumber min={0} className={classes['model-form__input']} />
      </Form.Item>
      <Form.Item label='length' name={'length'} rules={[{ required: true }]}>
        <InputNumber min={0} className={classes['model-form__input']} />
      </Form.Item>
      <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
        <Button htmlType='submit' type='primary'>
          Calculate
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ModelForm;
