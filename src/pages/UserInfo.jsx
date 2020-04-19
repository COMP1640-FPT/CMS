import React, { useEffect, useState, useContext } from "react";
import { Typography, Row, Col, Input, Form, Radio, Spin } from "antd";
import { useParams, useHistory } from "react-router-dom";
import { format } from "date-fns";
import agent from "../libs/agent";
import userPlaceHolder from "../assets/user-placeholder.png";
import CONSTANTS from "../constants";
import Store from "../context";

const { Title, Text } = Typography;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const UserInfo = () => {
  const dataContext = useContext(Store);
  const history = useHistory();
  if (!data.user || !["admin", "staff"].includes(data.user.role)) {
    history.push("/");
  }
  const { id } = useParams();
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      setLoading(true);

      const result = await agent.get(`/user/${id}/edit`);
      if (result && result.data.success) {
        setData({
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
    <Spin spinning={loading}>
      <Form form={form} {...layout} labelAlign="left">
        <Row type="flex" justify="center">
          <Col>
            <Title level={2}>User Info</Title>
          </Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col
            xs={{ span: 24, offset: 0, order: 0 }}
            lg={{ span: 10, offset: 0, order: 1 }}
            style={{
              maxHeight: "600px",
            }}
          >
            <img
              src={
                data && data.avatar
                  ? CONSTANTS.CORE.AWS_S3 + "/" + data.avatar
                  : userPlaceHolder
              }
              style={{ width: "100%", height: "100%" }}
              alt=""
            />
          </Col>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 14, offset: 0 }}>
            <Row gutter={[6, 6]}>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item label={"Role"}>
                  <Text strong>{data && data.role}</Text>
                </Form.Item>
              </Col>

              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item label="Code">
                  <Text strong>{data && data.code}</Text>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[6, 6]}>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item label="Fullname">
                  <Text strong>{data && data.name}</Text>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[6, 6]}>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item label="Phone">
                  <Text strong>{data && data.phone}</Text>
                </Form.Item>
              </Col>

              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item label="Country">
                  <Text strong>{data && data.country}</Text>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[6, 6]}>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item label="Email">
                  <Text strong>{data && data.email}</Text>
                </Form.Item>
              </Col>

              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item label="Birthday">
                  <Text strong>{data && data.birthday}</Text>
                </Form.Item>
              </Col>

              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item label="Gender">
                  <Text strong>
                    {data && (data.gender === 0 || data.gender === 1)
                      ? data.gender === 0
                        ? "Male"
                        : "Female"
                      : null}
                  </Text>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[6, 6]}>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item label="Address">
                  <Text strong>{data && data.address}</Text>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default UserInfo;
