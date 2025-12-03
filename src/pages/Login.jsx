import { useState } from "react";
import { Form, Input, Button, Card, Typography, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const { Title } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const [isAlert, setAlert] = useState(false);

  const onFinish = (values) => {
    const { email, password } = values;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) => user.email === email
    );
    
    if (user && bcrypt.compareSync(password, user.password)) {
      localStorage.setItem("token", user.email);
      localStorage.setItem("user_login", JSON.stringify(user));
      navigate("/home");
    } else {
      setAlert(true)
    }
  };

  const onCloseAlert = () => {
    setAlert(false)
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/images/sky-sunset.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card style={{ width: 350, padding: 20 }}>
        <Title level={2} style={{ textAlign: "center", color: "#0072c3", textDecoration: "underline", textDecorationColor: "#e6b8a7" }}>
          Login
        </Title>

        {isAlert &&
          <div style={{ marginTop: 24, marginBottom: 16 }}>
            <Alert title="Email or password is incorrect" type="error" closable={{ closeIcon: true, afterClose: onCloseAlert, 'aria-label': 'close' }} />
          </div>
        }

        <Form
          name="loginForm"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Enter email" },
              { type: "email", message: "รูปแบบ email ไม่ถูกต้อง" }
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Enter password" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{ background: "#0072c3" }}>
              Login
            </Button>
          </Form.Item>

          <Form.Item>
            <div style={{ display: "flex", justifyContent: "center" }} >
              Don't have an account?
              <span style={{ marginLeft: 5, color: "#0072c3", cursor: "pointer" }} onClick={() => navigate("/register")}>
                Register
              </span>
            </div>
          </Form.Item>
        </Form>
      </Card>

    </div>
  );
}