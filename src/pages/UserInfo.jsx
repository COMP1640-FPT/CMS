import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Input, Form, Radio } from "antd";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import agent from "../libs/agent";

const { Title } = Typography;

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

const UserInfo = () => {
  const { id } = useParams();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      setLoading(true);

      const result = await agent.get(`/user/${id}/edit`);
      if (result && result.data.success) {
        console.log(result);
        form.setFieldsValue({
          ...result.data.results,
          birthday: format(
            new Date(result.data.results.birthday),
            "dd-MM-yyyy"
          ),
        });
      }

      setLoading(false);
    };

    fetchUser();
  }, [id]);

  return (
    <div>
      <Form form={form} {...layout}>
        <Row type="flex" justify="center">
          <Col>
            <Title level={2}>User Info</Title>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 18, offset: 4 }}>
            <Row gutter={[6, 6]}>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item name="role" label="Role">
                  <Input
                    readOnly
                    disabled
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
              </Col>

              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item name="code" label="Code">
                  <Input
                    readOnly
                    disabled
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[6, 6]}>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item name="name" label="Fullname">
                  <Input
                    readOnly
                    disabled
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[6, 6]}>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item name="phone" label="Phone">
                  <Input
                    readOnly
                    disabled
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
              </Col>

              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item name="country" label="Country">
                  <Input
                    readOnly
                    disabled
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[6, 6]}>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item name="email" label="Email">
                  <Input
                    readOnly
                    disabled
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
              </Col>

              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item name="birthday" label="Birthday">
                  <Input
                    placeholder="Address"
                    readOnly
                    disabled
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
              </Col>

              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item name="gender" label="Gender">
                  <Radio.Group>
                    <Radio value={0}>Male</Radio>
                    <Radio value={1}>Female</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[6, 6]}>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item label="Address">
                  <Input.TextArea readOnly disabled rows={8} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UserInfo;
