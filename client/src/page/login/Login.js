import { Button, Card, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../store/action/Auth.action";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((root) => root.Auth.user);

  const Login = (values) => {
    dispatch(loginAction(values)).then((res) => {
      if (res === true) {
        return navigate("/homepage");
      }
    });
  };

  useEffect(() => {
    if (user !== "") {
      return navigate("/homepage");
    }
  }, []);

  return (
    <>
      <Card title="LOGIN" style={{ width: "450px", left: "35%" }}>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={Login}>
          <Form.Item
            label="User Name"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="yourmail@gmail.com" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="yourpassword123"/>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

export default Login;
