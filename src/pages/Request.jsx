import React, { useState, useEffect, useContext } from "react";
import isImage from "is-image";
import io from "socket.io-client";
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
  Avatar,
  Spin,
  Select,
  Upload,
  message,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import agent from "../libs/agent";
import CONSTANTS from "../constants";
import TextareaAutosize from "react-textarea-autosize";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { animateScroll as scroll } from "react-scroll";
import Store from "../context";
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;
const { Option } = Select;

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  // if (!isJpgOrPng) {
  //   message.error("You can only upload JPG/PNG file!");
  // }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isLt2M;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const Request = () => {
  const data = useContext(Store)
  const history = useHistory();
  if(!data.user || !["student"].includes(data.user.role)) {
    history.push("/")
  }
  const [socket, setSocket] = useState(null);
  const [me, setMe] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [student, setStudent] = useState(null);
  const [tutor, setTutor] = useState(null);
  const [tutorInfoLoading, setTutorInfoLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [uploadFileLoading, setUploadFileLoading] = useState(false);
  const [loadingSendMessage, setLoadingSendMessage] = useState(false);
  const [processingRequests, setProcessingRequests] = useState([]);
  const [doneRequests, setDoneRequests] = useState([]);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [form] = Form.useForm();

  const _renderFile = (file) => {
    console.log(file);
    console.log(isImage(file));
    if (isImage(file)) {
      return (
        <img
          style={{ width: "100%", maxHeight: 300, maxWidth: 300 }}
          alt="File"
          src={CONSTANTS.CORE.AWS_S3 + "/" + file}
        />
      );
    }

    return (
      <a
        href={CONSTANTS.CORE.AWS_S3 + "/" + file}
        rel="noopener noreferrer"
        target="_blank"
      >
        {file.split("/").pop()}
      </a>
    );
  };

  const _sendMessageSocket = (data) => {
    socket.emit("new message", {
      ...data,
      room: currentRequest.room,
    });
  };

  const _handleSendMessage = async () => {
    setLoadingSendMessage(true);
    const result = await agent.post("/store-message", {
      request_id: currentRequest.id,
      sender_id: me.id,
      content: message,
      file: null,
    });

    if (result && result.data.success) {
      setMessages([
        ...messages,
        {
          title: me.name || "",
          message,
          avatar: result.data.results.sender_avatar,
        },
      ]);
      _sendMessageSocket(result.data.results);
      setMessage("");
    }
    setLoadingSendMessage(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const callback = (key) => {
    console.log(key);
  };

  const onFinish = async (values) => {
    console.log(values);
    setConfirmLoading(true);

    const result = await agent.post("/create-request", {
      student_id: student.id,
      tutor_id: tutor.id,
      ...values,
    });

    if (result && result.data.success) {
      console.log(result.data.results);
      setProcessingRequests([
        { ...result.data.results, status: "Not Resolve" },
        ...processingRequests,
      ]);
    }

    setVisible(false);
    setConfirmLoading(false);
  };

  const _handleChooseRequest = async (item) => {
    socket.emit("leave room", { room: item.room });

    setCurrentRequest(item);
    setLoadingMessage(true);
    setMessages([]);

    const result = await agent.get("/request-messages/" + item.id);

    if (result && result.data.success) {
      const messages = result.data.results.map((message) => {
        return {
          title: message.sender_name,
          message: message.content,
          file: message.file,
          avatar: message.sender_avatar,
        };
      });
      socket.emit("join room", { room: item.room });
      setMessages(messages);
    }
    setLoadingMessage(false);
  };

  const _handleDoneRequest = async (id) => {
    setDoneLoading(true);
    const result = await agent.get("/change-request-status/" + id);

    if (result && result.data.success) {
      const index = processingRequests.findIndex(
        (request) => request.id === id
      );
      const target = processingRequests.splice(index, 1);
      setProcessingRequests([...processingRequests]);
      setDoneRequests([{ ...target[0], status: "Resolved" }, ...doneRequests]);
      setCurrentRequest(null);
    }

    setDoneLoading(false);
  };

  const _handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const _handleKeyDown = (e) => {
    if ((e.which === 13 || e.keyCode === 13) && e.ctrlKey) {
      e.preventDefault();
      setMessage(message + "\n");
    } else if (e.which === 13 || e.keyCode === 13) {
      e.preventDefault();
      _handleSendMessage();
    }
  };

  const _customRequest = async (request) => {
    setUploadFileLoading(true);
    const url = CONSTANTS.CORE.NODE_SERVER + "/requests/upload-file";
    const formData = new FormData();
    formData.append("file", request.file);
    const result = await axios({
      method: "post",
      url,
      baseURL: "/",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (result && result.data.success) {
      const result2 = await agent.post("/store-message", {
        request_id: currentRequest.id,
        sender_id: me.id,
        content: "",
        file: result.data.results.url,
      });

      if (result2 && result2.data.success) {
        setMessages([
          ...messages,
          {
            title: me.name || "",
            message: "",
            file: result.data.results.url,
            avatar: me.avatar,
          },
        ]);
        _sendMessageSocket(result2.data.results);
        setMessage("");
      }
    }

    setUploadFileLoading(false);
  };

  useEffect(() => {
    const socket = io(CONSTANTS.CORE.NODE_SERVER);
    setSocket(socket);

    const fetchTutorInfo = async () => {
      setTutorInfoLoading(true);
      const ownInfo = await agent.get("/me");

      if (!ownInfo || !ownInfo.data.success) return setTutorInfoLoading(false);

      setMe(ownInfo.data.results);

      const [tutorInfo, requestRes] = await Promise.all([
        agent.get("/student/" + ownInfo.data.results.id),
        agent.get("/student-requests/" + ownInfo.data.results.id),
      ]);

      if (tutorInfo && tutorInfo.data.success) {
        setTutor(tutorInfo.data.results);
      }

      if (requestRes && requestRes.data.success) {
        const data = requestRes.data.results;

        setProcessingRequests(
          data.filter((request) => request.status === "Not Resolve")
        );
        setDoneRequests(
          data.filter((request) => request.status !== "Not Resolve")
        );
      }

      setStudent(ownInfo.data.results);
      setTutorInfoLoading(false);
    };

    fetchTutorInfo();

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("receive message", (data) => {
      setMessages([
        ...messages,
        {
          title: data.sender_name || "",
          message: data.content,
          file: data.file,
          avatar: data.avatar || data.sender_avatar,
        },
      ]);
    });

    return () => {
      socket.removeListener("receive message");
    };
  }, [messages, socket]);

  useEffect(() => {
    scroll.scrollToBottom({
      duration: 0,
      containerId: "chat-container",
    });
  }, [messages]);

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
          <TabPane tab="Requests" key="1">
            <Button type="primary" block onClick={showModal}>
              Create Request
            </Button>
            <Divider orientation="left">Processing</Divider>
            <List
              style={{ maxHeight: 300, overflow: "auto" }}
              dataSource={processingRequests}
              loading={tutorInfoLoading}
              renderItem={(item) => (
                <List.Item
                  onClick={() => _handleChooseRequest(item)}
                  className="list-hover"
                >
                  <Typography.Text strong>{item.title}</Typography.Text>
                </List.Item>
              )}
            />

            <Divider orientation="left">Done</Divider>
            <List
              dataSource={doneRequests}
              loading={tutorInfoLoading}
              renderItem={(item) => (
                <List.Item
                  onClick={() => _handleChooseRequest(item)}
                  className="list-hover"
                >
                  <Typography.Text strong>{item.title}</Typography.Text>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="Tutor Information" key="2">
            <Spin spinning={tutorInfoLoading}>
              <Row>
                <Col span={24} align="center">
                  {tutor && tutor.avatar ? (
                    <Avatar
                      size={200}
                      src={CONSTANTS.CORE.AWS_S3 + "/" + tutor.avatar}
                    />
                  ) : (
                    <Avatar size={200} icon={<UserOutlined />} />
                  )}
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={{ span: 24 }}>
                  <Typography.Title level={4}>Code</Typography.Title>
                </Col>
                <Col xs={{ span: 24 }}>{tutor && tutor.code}</Col>
              </Row>
              <br />
              <Row>
                <Col xs={{ span: 24 }}>
                  <Typography.Title level={4}>Name</Typography.Title>
                </Col>
                <Col xs={{ span: 24 }}>{tutor && tutor.name}</Col>
              </Row>
            </Spin>
          </TabPane>
        </Tabs>
      </Col>

      {currentRequest ? (
        <Col xs={{ span: 24 }} lg={{ span: 18 }}>
          <Card
            title={currentRequest.title}
            bordered={false}
            extra={
              currentRequest.status === "Not Resolve" ? (
                <Button
                  loading={doneLoading}
                  onClick={() => _handleDoneRequest(currentRequest.id)}
                  type="primary"
                >
                  Done
                </Button>
              ) : null
            }
          >
            <List
              id="chat-container"
              style={{ height: 500, overflow: "auto" }}
              loading={loadingMessage}
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={(item) => {
                console.log(item);
                return (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        item.avatar ? (
                          <Avatar
                            src={CONSTANTS.CORE.AWS_S3 + "/" + item.avatar}
                            onLoad={() => {
                              setTimeout(() => {
                                console.log("okiii");
                                scroll.scrollToBottom({
                                  duration: 0,
                                  containerId: "chat-container",
                                });
                              }, 500);
                            }}
                          />
                        ) : (
                          <Avatar icon={<UserOutlined />} />
                        )
                      }
                      title={<a>{item.title}</a>}
                      description={
                        item.file ? _renderFile(item.file) : item.message
                      }
                    />
                  </List.Item>
                );
              }}
            />

            <br />
            {currentRequest && currentRequest.status === "Not Resolve" ? (
              <Row gutter={[8, 8]}>
                <Col xs={{ span: 24 }} lg={{ span: 20 }}>
                  <TextareaAutosize
                    style={{
                      height: "72px",
                      width: "100%",
                      border: "1px solid #ccc",
                      padding: "10px",
                      resize: "none",
                    }}
                    value={message}
                    onChange={_handleChangeMessage}
                    onKeyDown={_handleKeyDown}
                    minRows={3}
                    maxRows={6}
                    autoFocus
                    placeholder="Input message"
                  />
                </Col>

                <Col
                  xs={{ span: 24 }}
                  lg={{ span: 4 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <Button
                    type="primary"
                    loading={loadingSendMessage}
                    onClick={_handleSendMessage}
                  >
                    Send
                  </Button>
                  <br />
                  <Upload
                    showUploadList={false}
                    customRequest={_customRequest}
                    beforeUpload={beforeUpload}
                  >
                    <Button loading={uploadFileLoading} block>
                      <UploadOutlined /> File
                    </Button>
                  </Upload>
                </Col>
              </Row>
            ) : null}
          </Card>
        </Col>
      ) : null}

      <Modal
        title="Create Request Form"
        visible={visible}
        onOk={() => form.submit()}
        okText={"Create Request"}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          form={form}
          initialValues={{
            type: "message",
          }}
          name="request-form"
          onFinish={onFinish}
        >
          <Form.Item label="Type" name="type" rules={[{ required: true }]}>
            <Select
              placeholder="Choose tyepe *"
              // onChange={_handleChangeRole}
              // loading={chooseRoleLoading}
            >
              <Option value="message">Message</Option>
              <Option value="meeting">Meeting</Option>
            </Select>
          </Form.Item>
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
