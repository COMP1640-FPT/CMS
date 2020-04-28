import React, { useEffect, useState } from "react";
import { Card, Col, Row, Typography, Spin, Table } from "antd";

import agent from "../libs/agent";

const { Title } = Typography;

const Report = () => {
  const [data, setData] = useState();
  const [text, setText] = useState("Start Creating Report...");
  const [doneText, setDoneText] = useState(false);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await agent.get("/create-report");

      if (result && result.data.success) {
        console.log(result);
        setData(result.data.results);
      }
      setLoading(false);
    };
    fetchData();

    setTimeout(() => {
      setText("Proccessing Data...");

      setTimeout(() => {
        setText("Receive Data...");

        setTimeout(() => {
          setDoneText(true);
        }, 2000);
      }, 2000);
    }, [2000]);
  }, []);

  if (loading || !doneText)
    return (
      <div className="spinning-home" style={{ height: "calc(100vh - 150px)" }}>
        <Spin tip={text} />
      </div>
    );

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Average Number Of Message" bordered={false}>
            <Title>
              {data ? data.averageNumberOfMessage : <Spin spinning={true} />}
            </Title>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Number Of Messages in 7 Days" bordered={false}>
            <Title>
              {data ? data.numberOfMessages7Days : <Spin spinning={true} />}
            </Title>
          </Card>
        </Col>
      </Row>

      <br />
      <br />

      <Row gutter={16}>
        <Col xs={{ span: 24 }}>
          <Title level={2}>Student No Interactive in 7 days</Title>
        </Col>

        <Col xs={{ span: 24 }}>
          <Table
            loading={!data}
            columns={columns}
            dataSource={data ? data.studentNoInteract7Day : []}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={{ span: 24 }}>
          <Title level={2}>Student No Interactive in 28 days</Title>
        </Col>

        <Col xs={{ span: 24 }}>
          <Table
            loading={!data}
            columns={columns}
            dataSource={data ? data.studentNoInteract28Day : []}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={{ span: 24 }}>
          <Title level={2}>Student Without Tutor</Title>
        </Col>

        <Col xs={{ span: 24 }}>
          <Table
            loading={!data}
            columns={columns}
            dataSource={data ? data.studentWithoutTutor : []}
          />
        </Col>
      </Row>
    </>
  );
};

export default Report;
