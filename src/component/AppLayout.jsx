import { Layout, Menu, Dropdown, Avatar, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
const { Header, Content, Footer } = Layout;

export default function AppLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const user = JSON.parse(localStorage.getItem("user_login")) || [];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_login");
    navigate("/", { replace: true });
  };

  const profileMenu = {
    items: [
      { key: "1", icon: <UserOutlined />, label: `${user.name} ${user.last_name}` },
      { key: "2", icon: <LogoutOutlined />, label: "Logout", onClick: handleLogout },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }} >

      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ padding: 16, display: "flex", alignItems: "center" }}>
          <img src="/images/logo.png" alt="logo" style={{ width: 40, height: 40, marginLeft: 5 }} />
          {!collapsed && <h2 style={{ color: '#e6b8a7', marginTop: 8, marginLeft: 8 }}><b>My APP</b></h2>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={['1']}
          selectedKeys={[location.pathname]}
          items={[
            {
              key: '/home',
              icon: <HomeOutlined />,
              label: 'Home',
              onClick: () => navigate("/home"),
            },
            {
              key: '/about-us',
              icon: <UserOutlined />,
              label: 'About Us',
              onClick: () => navigate("/about-us"),
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            background: "#016fc0",
            justifyContent: "space-between",
            paddingLeft: 0,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: '#FFF'
            }}
          />

          <Dropdown menu={profileMenu} placement="bottomRight">
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer", color: "#fff" }}>
              <Avatar style={{ backgroundColor: "#dde3e8", marginRight: 8 }} icon={<UserOutlined />} />
              <span>{`${user.name} ${user.last_name}`}</span>
            </div>
          </Dropdown>
        </Header>

        <Content style={{ padding: "48px 48px", background: "#eeeeee" }}>
          <div
            style={{
              padding: 24,
              minHeight: "80vh",
              background: "#fff",
              borderRadius: 20,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>

    </Layout>
  );
}