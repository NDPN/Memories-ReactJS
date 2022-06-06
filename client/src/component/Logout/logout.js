import React from "react";
import { useDispatch } from "react-redux";
import { LeftCircleTwoTone } from "@ant-design/icons";
import { userLogout } from "../../store/action/Auth.action";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(userLogout()).then((res) => {
          navigate("/login");
        });
      }}
    >
      <LeftCircleTwoTone />
      Logout
    </div>
  );
}

export default Logout;
