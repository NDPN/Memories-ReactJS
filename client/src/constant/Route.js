import { Layout } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import Login from "../page/Login";
import Home from "../page/Home";
import Profile from "../page/Profile";
import User from "../component/user";
import { Link, Navigate } from "react-router-dom";
import { HomeTwoTone, MessageTwoTone, ProfileTwoTone } from "@ant-design/icons";

export const ROUTE_LAYOUT = [
  {
    key: "home",
    label: <Link to={"/homepage"}>Homepage</Link>,
    element: <Home />,
    icon: <HomeTwoTone />,
  },
  {
    key: "message",
    label: <Link to={"/"}>Message</Link>,
    // element: <Home />,
    icon: <MessageTwoTone />,
  },
  {
    key: "profile",
    label: <Link to={"/profile"}>Profile</Link>,
    element: <Profile />,
    icon: <ProfileTwoTone />,
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
          {
            path: "profile",
            name: "profile",
            element: <Profile />,
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
