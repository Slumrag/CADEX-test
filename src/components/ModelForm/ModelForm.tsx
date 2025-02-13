import { Button, Form, FormInstance, Input, InputNumber } from 'antd';
import { FC } from 'react';
import classes from './ModelForm.module.css';
import { Rule } from 'antd/es/form';

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
  const rules: Rule[] = [
    { required: true },
    {
      validator: (_, value: number) => {
        return value > 0 ? Promise.resolve() : Promise.reject(new Error('Value must be positive'));
      },
    },
  ];
  return (
    <Form
      form={form}
      onFinish={onSubmit}
      initialValues={initialValues}
      autoComplete='off'
      className={classes['model-form']}
      requiredMark={false}
    >
      <Form.Item label='height' name={'height'} rules={rules}>
        <Input min={0} className={classes['model-form__input']} />
      </Form.Item>
      <Form.Item label='width' name={'width'} rules={rules}>
        <InputNumber min={0} className={classes['model-form__input']} />
      </Form.Item>
      <Form.Item label='length' name={'length'} rules={rules}>
        <InputNumber min={0} className={classes['model-form__input']} />
      </Form.Item>
      <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
        <Button htmlType='submit' type='primary' className={classes['model-form__submit']}>
          Calculate
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ModelForm;
