import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

export default () => {
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 12,
    },
  };
  // const [componentSize, setComponentSize] = useState('default');
  const [form] = Form.useForm();
  const handleOnReset = () => {
    form.resetFields();
  };
  const onFinish = (value) => {
    console.log(value);
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  return (
    <PageContainer>
      <Card>
        <>
          <Form
            {...layout}
            form={form}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={['user', 'time']}
              label="时间"
              rules={[
                {
                  required: true,
                  // type: 'email'
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item name={['user', 'introduction']} label="Introduction">
              <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
              <Button type="primary" htmlType="submit" style={{ marginRight: 15 }}>
                提交
              </Button>
              <Button htmlType="button" onClick={handleOnReset}>
                重置
              </Button>
            </Form.Item>
          </Form>
        </>
      </Card>
    </PageContainer>
  );
};
