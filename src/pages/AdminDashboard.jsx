import React from "react";
import { Card, Col, Row, Typography } from "antd";
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

const { Title } = Typography

const data = [
  { name: "Page A", resolved: 4000, processing: 2400 },
  { name: "Page B", resolved: 3000, processing: 1398 },
  { name: "Page C", resolved: 2000, processing: 9800 },
  { name: "Page D", resolved: 2780, processing: 3908 },
  { name: "Page E", resolved: 1890, processing: 4800 },
  { name: "Page F", resolved: 2390, processing: 3800 },
  { name: "Page G", resolved: 3490, processing: 4300 },
];
const AdminDashboard = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Total Request" bordered={false}>
            <Title>40</Title>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Requests Resolved" bordered={false}>
            <Title>60</Title>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Avarage Message" bordered={false}>
            <Title>4.5</Title>
          </Card>
        </Col>
      </Row>

      <br />
      <br />

      <Row gutter={16}>
        <Col xs={{ span: 24 }}>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              width={"100%"}
              height={300}
              data={data}
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

export default AdminDashboard;
