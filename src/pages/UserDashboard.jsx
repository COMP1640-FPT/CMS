import React, { useEffect, useState } from "react";
import { Card, Col, Row, Typography, Spin } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import agent from "../libs/agent";

const { Title } = Typography;

const UserDashboard = ({ id, role }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await agent.get(`${role === "tutor" ? "/tutor-dashboard/" : "/student-dashboard/"}${id}`);

      if (result && result.data.success) {
        console.log(result);
        setData(result.data.results);
      }
    };
    fetchData();
  }, []);

  const chartData = data
    ? Object.keys(data.processingRequestsPerDay).map((el) => {
        return {
          name: el,
          processing: data.processingRequestsPerDay[el],
          resolved: data.resolvedRequestsPerDay[el],
        };
      })
    : [];

  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Total Request" bordered={false}>
            <Title>
              {data ? data.totalRequests : <Spin spinning={true} />}
            </Title>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Requests Resolved" bordered={false}>
            <Title>
              {data ? data.resolvedRequests : <Spin spinning={true} />}
            </Title>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Avarage Message" bordered={false}>
            <Title>
              {data ? data.averageMessages : <Spin spinning={true} />}
            </Title>
          </Card>
        </Col>
      </Row>

      <br />
      <br />

      <Row gutter={16}>
        <Col xs={{ span: 24 }}>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              loading={true}
              width={"100%"}
              height={300}
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                name="Requests Resolved"
                dataKey="resolved"
                stackId="a"
                fill="#8884d8"
              />
              <Bar
                name="Proccessing Requests"
                dataKey="processing"
                stackId="a"
                fill="#82ca9d"
              />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </>
  );
};

export default UserDashboard;
