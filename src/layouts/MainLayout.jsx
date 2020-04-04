import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UserAddOutlined,
  DashboardOutlined
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(collapsed => !collapsed);
  };

  return (
    <Layout id="components-layout-demo-custom-trigger">
      <Sider theme="dark" trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" style={{ fontSize: collapsed ? "10px" : "20px" }}>
          e-Tutor
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/">
              <DashboardOutlined />
              <span>Dashboard</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="2">
            <Link to="/users">
              <UserOutlined />
              <span>List Users</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/users/create">
              <UserAddOutlined />
              <span>Create Users</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/users/assign">
              <UserAddOutlined />
              <span>Assign Tutor</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh"
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
