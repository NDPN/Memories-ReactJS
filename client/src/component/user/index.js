import { Layout, Row } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import WithAuth from "../HOC/WithAuth";
import FirstPage from "../../page/FisrtPage.js";
import { useSelector } from "react-redux";
import useWindowSize from "../../config/customHook/useWindowSize";
import MenuHeaderLg from "../MenuHeader";

function User({ socket, user }) {
  const selector = useSelector((root) => root);
  const location = useLocation();
  const size = useWindowSize();

  const loginUser = selector.Auth.user;
  const request = selector.Auth.user.request;

  useEffect(() => {
    if (loginUser && socket) {
      socket.emit("add-user", loginUser._id);
    }
  }, []);

  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 2, width: "100%" }}>
        <Row>
          <MenuHeaderLg request={request} user={user.user} size={size} />
        </Row>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "2% 10% 2% 10%", marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: "100vh", width: "100%" ,backgroundColor: "white" }}
        >
          {location.pathname === "/" ? <FirstPage /> : <Outlet />}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Funari ©2022 Memories-Realtime V1.0
      </Footer>
    </Layout>
  );
}

export default WithAuth(User, "user");
