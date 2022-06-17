import { Button, Form, Input, message, Modal } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { loginAction, registerAction } from "../../store/action/Auth.action";

function SignUp(props) {
  const dispatch = useDispatch();

  const signUp = (values) => {
    if (values.password === values.confirmPW) {
      let form = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
      };

      dispatch(registerAction(form)).then(() =>
        dispatch(loginAction({ email: form.email, password: form.password }))
      );
    } else {
      message.error("Your password and confirming doesn't match");
    }
  };

  return (
    <div>
      <Modal
        title="Sign Up Account"
        visible={props.openSignup}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={null}
      >
        <Form
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={signUp}
        >
          <Form.Item
            label="First name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input placeholder="First name" />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
          >
            <Input placeholder="Last name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input your Phone number!",
              },
            ]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="Confirm PW"
            name="confirmPW"
            rules={[
              {
                required: true,
                message: "Please input your Confirm PW!",
              },
            ]}
          >
            <Input.Password placeholder="Confirm PW" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                props.handleOk();
              }}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default SignUp;
