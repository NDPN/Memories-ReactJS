import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthAction } from "../../store/action";

function useAuth() {
  const dispatch = useDispatch();
  const authReducer = useSelector((root) => root.Auth);
  useEffect(() => {
    dispatch(AuthAction.IsUserLogin());
  }, []);

  return authReducer;
}

export default useAuth;
