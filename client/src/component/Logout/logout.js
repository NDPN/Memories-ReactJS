import React from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../../store/action/Auth.action";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <a
      onClick={() => {
        dispatch(userLogout()).then(() => {
          navigate("/login");
        });
      }}
    >
      Logout
    </a>
  );
}

export default Logout;
