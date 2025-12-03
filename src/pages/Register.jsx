import React, { useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import ModalSuccess from "../component/ModalSuccess";

const { Title } = Typography;

export default function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalSuccess, setIsModalSuccess] = useState(false);

  const onFinish = (values) => {
    const { username, email, password } = values;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.find((user) => user.email === email);
    if (emailExists) {
      form.setFields([
        {
          name: "email",
          errors: ["This email is already in use"],
        },
      ]);
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    setIsModalSuccess(true)
    // window.location.href = "/";
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
      <Card style={{ width: 400, padding: 20 }}>
        <Title level={2} style={{ textAlign: "center", color: "#0072c3", textDecoration: "underline", textDecorationColor: "#e6b8a7" }}>
          Register
        </Title>

        <Form
          form={form}
          name="registerForm"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "กรุณากรอก username" },
            ]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "กรุณากรอก email" },
              { type: "email", message: "รูปแบบ email ไม่ถูกต้อง" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "กรุณากรอก password" },
              { min: 6, message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: "กรุณายืนยัน password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('รหัสผ่านไม่ตรงกัน'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{ background: "#a8cde6" }}>
              Register
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center", marginTop: 10 }}>
          <span>Already have an account?</span>

          <span style={{ marginLeft: 5, color: "#0072c3", cursor: "pointer" }} onClick={() => navigate("/")}>
            Login
          </span>
        </div>
      </Card>

      <ModalSuccess open={isModalSuccess} title={"Registration successful!"} onOk={() => navigate("/")} />
    </div>
  );
}