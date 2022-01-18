import React from 'react'
import { Form, Input, Button } from 'antd';

const CreateCard = ({createCard, onCancel}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    createCard(values)
    form.resetFields()
    onCancel()
  };
  return (
    <Form
      form={form}
      name="user"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item
        label="Word"
        name="word"
        rules={[
          {
            required: true,
            message: 'Please write word!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Translate"
        name="translate"
        rules={[
          {
            required: true,
            message: 'Please write translate!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CreateCard
