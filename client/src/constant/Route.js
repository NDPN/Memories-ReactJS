import { Layout } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import Login from "../page/Login";
import Home from "../page/Home";
import Profile from "../page/Profile";
import FindUser from "../page/FindUser";
import Message from "../page/Message";
import User from "../component/user";
import MessageContainer from "../component/Message-container";
import { Link, Navigate } from "react-router-dom";
import { HomeTwoTone, MessageTwoTone, ProfileTwoTone } from "@ant-design/icons";

export const ROUTE_LAYOUT = (userId) => [
  {
    key: "homepage",
    label: <Link to={"/homepage"}>Homepage</Link>,
    element: <Home />,
    icon: <HomeTwoTone />,
  },
  {
    key: "message",
    label: <Link to={"/message"}>Message</Link>,
    element: <Message />,
    icon: <MessageTwoTone />,
  },
  {
    key: "profile",
    label: <Link to={"/profile/" + userId}>Profile</Link>,
    element: <Profile />,
    icon: <ProfileTwoTone />,
  },
];

export const ROUTE_LAYOUT_LG = (userId) => [
  {
    key: "homepage",
    label: (
      <Link to={"/homepage"}>
        <HomeTwoTone />
      </Link>
    ),
    element: <Home />,
  },
  {
    key: "message",
    label: (
      <Link to={"/message"}>
        <MessageTwoTone />
      </Link>
    ),
    element: <Message />,
  },
  {
    key: "profile",
    label: (
      <Link to={"/profile/" + userId}>
        <ProfileTwoTone />
      </Link>
    ),
    element: <Profile />,
  },
];

export const ROUTE = (props) => [
  {
    title: "Home",
    path: "/",
    element: <User user={props.auth} socket={props.socket} />,
    children:
      props.auth !== "" ? (
        [
          {
            path: "homepage",
            name: "homepage",
            element: <Home />,
          },
          {
            path: "profile",
            name: "profile",
            children: [{ path: ":id", name: ":id", element: <Profile /> }],
          },
          {
            path: "search",
            name: "search",
            children: [
              {
                path: ":name",
                name: ":name",
                element: <FindUser />,
              },
            ],
          },
          {
            path: "message",
            name: "message",
            element: <Message socket={props.socket} />,
            children: [
              {
                path: ":id",
                name: ":id",
                element: <MessageContainer />,
              },
            ],
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
