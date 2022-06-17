import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  Layout,
  Menu,
  Row,
} from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import { DownOutlined, NotificationOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import WithAuth from "../HOC/WithAuth";
import { ROUTE_LAYOUT } from "../../constant/Route";
import { useSelector } from "react-redux";
import { option, notification } from "../Menu-Dropdown";
import Meta from "antd/lib/card/Meta";

function User() {
  const selector = useSelector((root) => root);
  const navigate = useNavigate();

  const loginUser = selector.Auth.user;
  const request = selector.Auth.user.request;

  const notificationRequest = (arr) => {
    let noti = null;
    let menu = [
      {
        key: "null",
        label: <>You don't have any notification now </>,
      },
    ];

    if (arr !== undefined) {
      noti = arr.map(
        (item) =>
          (menu = {
            key: item[0],
            label: (
              <Card
                style={{
                  width: 300,
                }}
                actions={[<div>Accept</div>, <div>Decline</div>]}
              >
                <Meta
                  avatar={<Avatar src={item[2].toString()} />}
                  title={item[1]}
                  description="Have send a friend request"
                />
              </Card>
            ),
          })
      );
    }

    if (arr !== undefined && arr.length === 0) {
      noti = menu;
    }

    return noti;
  };

  useEffect(() => {
    if (loginUser === "") {
      return navigate("/login");
    } else {
      navigate("/homepage");
    }
  }, []);

  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 2, width: "100%" }}>
        <Row>
          <Col span={8}>
            <Input
              placeholder="Find a friend"
              style={{
                float: "left",
                width: "70%",
                height: "31px",
                margin: "16px 24px 16px 0",
                background: "white",
                fontSize: "10",
                borderRadius: "10px",
              }}
            />
          </Col>
          <Col span={10}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={"home"}
              items={ROUTE_LAYOUT}
            />
          </Col>
          <Col span={3}>
            <Dropdown
              overlay={option}
              placement="bottom"
              arrow={{
                pointAtCenter: true,
              }}
              trigger="click"
            >
              <Button style={{ background: "#001529", color: "white" }}>
                Option
                <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
          <Col span={3}>
            <Dropdown
              overlay={notification(notificationRequest(request))}
              placement="bottom"
              arrow={{
                pointAtCenter: true,
              }}
              trigger="hover"
            >
              <Badge count={request === undefined ? 0 : request.length}>
                <Button
                  shape="square"
                  icon={<NotificationOutlined />}
                  style={{ background: "#001529", color: "white" }}
                >
                  Notification
                </Button>
              </Badge>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "50px", marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: "100vh", backgroundColor: "white" }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Funari ©2022 Chat-Realtime
      </Footer>
    </Layout>
  );
}

export default WithAuth(User, "user");
