import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Tabs,
  Divider,
  List,
  Typography,
  Button,
  Modal,
  Form,
  Input,
} from "antd";

const { TabPane } = Tabs;

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const Request = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const callback = (key) => {
    console.log(key);
  };

  const onFinish = (values) => {
    console.log(values);
    setConfirmLoading(true);

    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <Row
      gutter={[
        { xs: 0, lg: 16 },
        { xs: 16, sm: 16, md: 16, lg: 0 },
      ]}
    >
      <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{ background: "#fff" }}>
        <Tabs
          defaultActiveKey="1"
          onChange={callback}
          style={{ margin: "13px" }}
        >
          <TabPane tab="Tab 1" key="1">
            <Button type="primary" block onClick={showModal}>
              Create Request
            </Button>
            <Divider orientation="left">Processing</Divider>
            <List
              dataSource={data}
              renderItem={(item) => (
                <List.Item className="list-hover">
                  <Typography.Text strong>{item}</Typography.Text>
                </List.Item>
              )}
            />

            <Divider orientation="left">Done</Divider>
            <List
              dataSource={data}
              renderItem={(item) => (
                <List.Item className="list-hover">
                  <Typography.Text strong>{item}</Typography.Text>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </Col>

      <Col xs={{ span: 24 }} lg={{ span: 18 }}>
        <Card title="Card title" bordered={false}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col>

      <Modal
        title="Create Request Form"
        visible={visible}
        onOk={() => form.submit()}
        okText={"Create Request"}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form {...layout} form={form} name="request-form" onFinish={onFinish}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: "Title is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"description"}
            label="Description"
            rules={[{ required: "Description is required" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  );
};

export default Request;
