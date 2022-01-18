import React from 'react'
import axios from "axios";

import { Form, Input, Button } from 'antd';

const Auth = ({actionType, setUser, onCancel}) => {
  const [form] = Form.useForm();
  
  const onFinish = (values) => {
    createUser(values)
    form.resetFields()
    onCancel()
  };
  
   const createUser = async(user) => {
    try {
      if(actionType === "SignUp"){
        const res = await axios.post("http://localhost:5000/api/user/registration", user);
        console.log(res);
      } else if(actionType === "SignIn"){
        const res = await axios.post("http://localhost:5000/api/user/login", user);
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("user",JSON.stringify(res.data.user))
        setUser(res.data.user)
      }
     
    } catch (e) {
      console.log(e);
    }
  }
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
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
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

export default Auth
