import React from "react";
import { Navigate } from "react-router-dom";

export default function WithAuth(Component, user) {
  return function Authenticated(props) {
    if (props.user.status === false) {
      return <Navigate to="/login" />;
    }

    if (props.user.user !== "") {
      return <Component {...props} />;
    }
  };
}
