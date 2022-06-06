import { Layout } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React from "react";
import { Navigate } from "react-router-dom";
import MenuHeader from "../MenuHeader";

export default function WithAuth(Component, user) {
  return function Authenticated(props) {
    if (props.user === "" && props.status === false) {
      return <Navigate to="/login" />;
    }

    if (user) {
      return <Component />;
    }
  };
}
