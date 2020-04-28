import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, notification, Typography } from "antd";
import background from "../assets/bg.jpg";
import agent from "../libs/agent";

const { Title } = Typography

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 12,
  },
};

const Login = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await agent.post("/login", values);

      if (result && result.data) {
        return onSuccess(result.data);
      }
    } catch (err) {
      notification.error({
        message: err.response.data.error,
      });
    }

    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row
      style={{
        height: "100vh",
        background: `url(${background})`,
        backgroundSize: "cover",
      }}
      type="flex"
    >
      <Col xs={{ span: 14, offset: 5 }} align="middle">
        <Title style={{ transform: "translateY(200px)", fontSize: 50 }}>E-Tutor</Title>
      </Col>
      <Col xs={{ span: 14, offset: 5 }} lg={{ span: 6, offset: 9 }}>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
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
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" loading={loading} htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
