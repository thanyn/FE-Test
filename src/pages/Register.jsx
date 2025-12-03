import { useState } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import ModalSuccess from '../component/ModalSuccess';
import { CheckCircleFilled } from '@ant-design/icons';
import bcrypt from 'bcryptjs';

const { Title } = Typography;

export default function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalSuccess, setIsModalSuccess] = useState(false);

  const onFinish = (values) => {
    const { name, last_name, email, password } = values;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const emailExists = users.find((user) => user.email === email);
    if (emailExists) {
      form.setFields([
        {
          name: 'email',
          errors: ['This email is already in use'],
        },
      ]);
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    users.push({ name, last_name, email, password: hashedPassword });
    localStorage.setItem('users', JSON.stringify(users));

    setIsModalSuccess(true);
  };

  const handleModalOk = () => {
    setIsModalSuccess(false);
    navigate('/');
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: "url('/images/sky-sunset.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Card style={{ width: 400, padding: 20 }}>
        <Title
          level={2}
          style={{
            textAlign: 'center',
            color: '#0072c3',
            textDecoration: 'underline',
            textDecorationColor: '#e6b8a7',
          }}
        >
          Register
        </Title>

        <Form
          form={form}
          name="registerForm"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: 'Please enter last name' }]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Invalid email format' },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter password' },
              {
                min: 6,
                message: 'Password must be at least 6 characters long',
              },
              {
                pattern: /[!@#$%^&*(),.?":{}_|<>+/-]/,
                message: 'Password must contain at least one special character',
              },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Enter confirm password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ background: '#0072c3' }}
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <span>Already have an account?</span>

          <span
            style={{ marginLeft: 5, color: '#0072c3', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Login
          </span>
        </div>
      </Card>

      <ModalSuccess
        open={isModalSuccess}
        title={
          <span>
            <CheckCircleFilled
              style={{ fontSize: 50, color: '#52c41a', marginBottom: 20 }}
            />
            <Title level={4} style={{ marginBottom: 10 }}>
              Registration Successful!
            </Title>
          </span>
        }
        content={
          <p>You have successfully registered! Please login to continue.</p>
        }
        onOk={handleModalOk}
        onCancel={handleModalOk}
      />
    </div>
  );
}
