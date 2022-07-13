import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessage,
  sendMessageAction,
} from "../../store/action/Message.action";
import { Form, Button, Layout, Avatar } from "antd";
import { SendOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import messageBox from "./styles.module.scss";
import { findUserById } from "../../store/action/User.action";
import { useParams } from "react-router-dom";

function MessageContainer({ socket }) {
  const dispatch = useDispatch();
  const formRef = useRef();
  let scrollRef = useRef();
  const user = useParams();

  const selector = useSelector((root) => root);
  const userId = selector.Auth.user._id;
  const message = selector.Message.data;
  const sendMsg = selector.Message.sendMessage;
  const User = selector.User.userData;

  const [usersId, setUsersId] = useState({
    from: user.id,
    to: "",
  });

  // send message with btn
  const sendMessageBtn = (value) => {
    formRef.current.resetFields();

    const message = {
      from: userId,
      to: user.id,
      message: value.message,
    };

    dispatch(sendMessageAction(message)).then(
      () => () =>
        dispatch(
          getMessage({
            from: userId,
            to: user.id,
          })
        )
    );
  };
  // send message with enter
  const sendMessageEnter = (value) => {
    formRef.current.resetFields();

    const message = {
      from: userId,
      to: user.id,
      message: value,
    };

    dispatch(sendMessageAction(message)).then(() =>
      dispatch(
        getMessage({
          from: userId,
          to: user.id,
        })
      )
    );
  };

  // render mess
  const renderMess = (arr) => {
    let xhtml = null;

    if (arr.length > 0) {
      xhtml = arr.map((item) => (
        <div
          className={`${
            item.fromSelf === true ? messageBox.sender : messageBox.receive
          }`}
          ref={scrollRef}
        >
          <div className={messageBox.content}>{item.message}</div>
        </div>
      ));
    }

    return xhtml;
  };

  // scroll to the end of message
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "auto" });
  }, [message]);

  // send message
  useEffect(() => {
    if (sendMsg !== "") {
      socket?.emit("send-msg", sendMsg);
      socket?.on("msg-receive", async (receive) => {
        setUsersId(receive);
      });
    } else {
      return;
    }
    scrollRef?.current?.scrollIntoView({ behavior: "auto" });
  }, [sendMsg]);

  // check user before get message
  useEffect(() => {
    if (usersId[0] === user.id) {
      dispatch(
        getMessage({
          from: usersId[1],
          to: usersId[0],
        })
      );
    } else {
      console.log(false);
    }
  }, [usersId]);

  // get message from the first time
  useEffect(() => {
    let userMessage = {
      from: userId,
      to: user.id,
    };
    dispatch(getMessage(userMessage));
    if (user.id) {
      dispatch(findUserById({ userId: user.id }));
    }
  }, [user.id]);

  return (
    <>
      <Layout>
        <Header
          style={{
            background: "white",
            borderBottom: "2px solid rgb(240, 240, 240)",
          }}
        >
          {user.id ? (
            <div>
              <Avatar src={User.avatar} />
              <span style={{ marginLeft: "10px" }}>
                {User.lastName + " " + User.firstName}
              </span>
            </div>
          ) : (
            <div className={messageBox.notice}>Let talking a bit...</div>
          )}
        </Header>
        <Content
          style={{
            background: "white",
          }}
        >
          <div className={messageBox.message}>
            {user.id ? renderMess(message) : <div>Animated sticker</div>}
          </div>
        </Content>

        <Footer
          style={{
            background: "white",
            border: "2px solid rgb(240, 240, 240)",
          }}
        >
          <Form layout="inline" onFinish={sendMessageBtn} ref={formRef}>
            <Form.Item name="message" style={{ width: "90%" }}>
              {user.id ? (
                <TextArea
                  autoSize={{
                    minRows: 1,
                    maxRows: 2,
                  }}
                  onPressEnter={(e) =>
                    e.key === "Enter" ? sendMessageEnter(e.target.value) : null
                  }
                />
              ) : (
                <TextArea
                  autoSize={{
                    minRows: 1,
                  }}
                  disabled
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                style={{ width: "150%" }}
              >
                <SendOutlined />
              </Button>
            </Form.Item>
          </Form>
        </Footer>
      </Layout>
    </>
  );
}

export default MessageContainer;
