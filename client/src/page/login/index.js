import { Button, Card, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignUp from "../../component/SignUp Modal";
import { loginAction } from "../../store/action/Auth.action";

function Login() {
  const [signUpModal, setSignUpModal] = useState(false);

  const showModal = () => {
    setSignUpModal(true);
  };

  const handleOk = () => {
    setSignUpModal(false);
  };

  const handleCancel = () => {
    setSignUpModal(false);
  };

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
            <Input.Password placeholder="yourpassword123" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="link" onClick={() => showModal()}>
              Do u have an account?
            </Button>
            <Button type="link">Or u Forgot ur password</Button>
          </Form.Item>
        </Form>
      </Card>
      <div>
        <SignUp
          openSignup={signUpModal}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      </div>
    </>
  );
}

export default Login;
