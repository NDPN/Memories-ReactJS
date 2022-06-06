import { Layout } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import Login from "../page/login/Login";
import Home from "../page/home/Home";
import User from "../component/user";
import { Navigate } from "react-router-dom";
import { HomeTwoTone, MessageTwoTone, ProfileTwoTone } from "@ant-design/icons";
import Logout from "../component/Logout/logout";

export const ROUTE_LAYOUT = [
  {
    label: (
      <>
        <HomeTwoTone /> Home page
      </>
    ),
    key: "Home",
  },
  {
    label: (
      <>
        <MessageTwoTone /> Chatting
      </>
    ),
    key: "Message",
  },
  {
    label: (
      <>
        <ProfileTwoTone /> Your Profile
      </>
    ),
    key: "Profile",
  },
  {
    label: (
      <>
        <Logout />
      </>
    ),
    key: "Logout",
  },
];

export const ROUTE = (user) => [
  {
    title: "Home",
    path: "/",
    element: <User user={user} status={user.status} />,
    children:
      user !== "" && user.status === true ? (
        [
          {
            path: "homepage",
            name: "homepage",
            element: <Home />,
          },
        ]
      ) : (
        <Navigate to="/login" />
      ),
  },
  {
    title: "Login",
    path: "/login",
    element: (
      <Layout style={{ background: "#fff", minHeight: "100vh" }}>
        <Header></Header>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Login />
          </Content>
        </Layout>
        <Footer style={{ textAlign: "center" }}>
          Funari @2022 Chat-Realtime
        </Footer>
      </Layout>
    ),
  },
];
