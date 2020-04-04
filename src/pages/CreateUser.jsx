import React, { useState, useEffect } from "react";
import {
  Typography,
  Row,
  Col,
  Select,
  Input,
  Form,
  InputNumber,
  Radio,
  DatePicker,
  Button,
  notification
} from "antd";
import UploadAvatar from "../components/UploadAvatar";
import agent from "../libs/agent";

const { Title } = Typography;
const { Option } = Select;

const layout = {
  wrapperCol: { span: 24 },
};

const CreateUser = () => {
  const [preCodeData, setPreCodeData] = useState([]);
  const [imageLink, setImageLink] = useState("");
  const [chooseRoleLoading, setChooseRoleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    const data = {
      ...values,
      phone: "0" + values.phone,
      birthday: values.birthday.format("YYYY-MM-DD"),
      avatar: imageLink,
    };

    const result = await agent.post("/user", data);

    if (result && result.data.success) {
      onReset()
      notification.success({
        message: 'Create user sucessfully!'
      })
    }

    setLoading(false);
  };

  const onReset = () => {
    form.resetFields();
    setPreCodeData([]);
    setImageLink("")
  };

  const _handleChangeRole = (role) => {
    const fetchCode = async () => {
      setChooseRoleLoading(true);
      const result = await agent.get("/handleRequest/user/" + role);

      if (result && result.data.success) {
        setPreCodeData(result.data.results.preCode);
        form.setFieldsValue({
          code: result.data.results.code,
        });
      }

      setChooseRoleLoading(false);
    };

    fetchCode();
  };

  const _handleUploadSuccess = (image) => {
    setImageLink(image);
  };

  return (
    <div>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        initialValues={{
          gender: 0,
        }}
      >
        <Row type="flex" justify="center">
          <Col>
            <Title level={2}>Create User</Title>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 18, offset: 4 }}>
            <Row gutter={[6, 6]}>
              <Col xs={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item name="role" rules={[{ required: true }]}>
                  <Select
                    placeholder="Choose role *"
                    onChange={_handleChangeRole}
                    loading={chooseRoleLoading}
                  >
                    <Option value="staff">Staff</Option>
                    <Option value="tutor">Tutor</Option>
                    <Option value="student">Student</Option>
                  </Select>
                </Form.Item>
              </Col>
              {preCodeData && preCodeData.length ? (
                <>
                  <Col xs={{ span: 24 }} lg={{ span: 6 }}>
                    <Form.Item name="precode" rules={[{ required: true }]}>
                      <Select placeholder="Choose code *">
                        {preCodeData &&
                          preCodeData.length &&
                          preCodeData.map((code) => {
                            return (
                              <Option key={code} value={code}>
                                {code}
                              </Option>
                            );
                          })}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item name="code">
                      <Input
                        readOnly
                        disabled
                        // prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username *"
                      />
                    </Form.Item>
                  </Col>
                </>
              ) : null}
            </Row>

            <Row gutter={[6, 6]}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  name="firstName"
                  rules={[
                    { required: true, message: "Please input first name!" },
                  ]}
                >
                  <Input
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="First name *"
                  />
                </Form.Item>
              </Col>

              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  name="lastName"
                  rules={[
                    { required: true, message: "Please input last name!" },
                  ]}
                >
                  <Input
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Last name *"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[6, 6]}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  name="phone"
                  rules={[{ required: true, message: "Please input phone!" }]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Phone *"
                  />
                </Form.Item>
              </Col>

              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  name="country"
                  rules={[{ required: true, message: "Please input country!" }]}
                >
                  <Input
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Country *"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[6, 6]}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item
                  name="state"
                  rules={[{ required: true, message: "Please input state!" }]}
                >
                  <Input
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="State *"
                  />
                </Form.Item>
              </Col>

              <Col xs={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item
                  name="birthday"
                  rules={[
                    { required: true, message: "Please input birthday!" },
                  ]}
                >
                  <DatePicker
                    placeholder="Choose birthday *"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={{ span: 24 }} lg={{ span: 6 }}>
                <Form.Item name="gender">
                  <Radio.Group>
                    <Radio value={0}>Male</Radio>
                    <Radio value={1}>Female</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[6, 6]}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <Form.Item name="address" rules={[]}>
                  <Input.TextArea placeholder="Address" rows={8} />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <UploadAvatar onSuccess={_handleUploadSuccess} imageUrl={imageLink} />
              </Col>
            </Row>

            <Row type="flex" justify="center">
              <Col>
                <Button type="secondary" onClick={onReset}>
                  Reset
                </Button>
                &nbsp;
                <Button type="primary" htmlType="submit" loading={loading}>
                  Create
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateUser;
