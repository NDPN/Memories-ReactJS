import { Button, Input, Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import WithAuth from "../HOC/WithAuth";
import { ROUTE_LAYOUT } from "../../constant/Route";
import { useSelector } from "react-redux";

function User() {
  const user = useSelector((root) => root.Auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === "") {
      return navigate("/login");
    } else {
      return navigate("/homepage");
    }
  }, []);

  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 2, width: "100%" }}>
        <Input
          placeholder="Find a friend"
          style={{
            float: "left",
            width: "250px",
            height: "31px",
            margin: "16px 24px 16px 0",
            background: "white",
            fontSize: "10",
            borderRadius: "10px",
          }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={"Home"}
          items={ROUTE_LAYOUT}
        />
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
