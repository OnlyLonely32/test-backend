import React from 'react'
import { Form, Input, Button } from 'antd';

const CreateFolder = ({createFolder, onCancel}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    createFolder(values)
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
        label="Folder name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Folder name!',
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

export default CreateFolder
