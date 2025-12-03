import React from "react";
import { Menu, Button, Layout } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#001529",
        padding: "0 20px",
      }}
    >
      <div style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
        MyApp
      </div>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </Header>
  );
}