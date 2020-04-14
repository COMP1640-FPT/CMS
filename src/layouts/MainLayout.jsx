import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Layout, Menu, Divider } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UserAddOutlined,
  DashboardOutlined,
  LockOutlined,
  WechatOutlined,
  MergeCellsOutlined,
} from "@ant-design/icons";
import store from "store";
import Store from "../context";

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children, bg }) => {
  const data = useContext(Store);
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);

  const { pathname } = history.location;

  const toggle = () => {
    setCollapsed((collapsed) => !collapsed);
  };

  const _handleLogout = () => {
    store.remove("token");
    data.setAuth(null);
  };

  return (
    <Layout id="components-layout-demo-custom-trigger">

      <Sider theme="dark" trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" style={{ fontSize: collapsed ? "10px" : "20px" }}>
          e-Tutor
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[pathname]}>
          <Menu.Item key="/">
            <Link to="/">
              <DashboardOutlined />
              <span>Dashboard</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="/users">
            <Link to="/users">
              <UserOutlined />
              <span>List Users</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/users/create">
            <Link to="/users/create">
              <UserAddOutlined />
              <span>Create Users</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/users/assign">
            <Link to="/users/assign">
              <MergeCellsOutlined />
              <span>Assign Tutor</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/request">
            <Link to="/request">
              <WechatOutlined />
              <span>Request</span>
            </Link>
          </Menu.Item>
          <Divider />
          <Menu.Item
            key="99"
            onClick={() => {
              _handleLogout();
            }}
          >
            <LockOutlined />
            <span>Logout</span>
          </Menu.Item>
        </Menu>
      </Sider>
      
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "calc(100vh - 112px)",
            background: bg || "#fff",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
