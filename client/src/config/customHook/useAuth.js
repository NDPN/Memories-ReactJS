import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "../../store/action";
import { getCookie } from "../getCookie/GetCookie";

function useAuth() {
  const dispatch = useDispatch();
  const authReducer = useSelector((root) => root.Auth);

  useEffect(() => {
    const id = getCookie("user") ? JSON.parse(getCookie("user"))._id : null;

    const auth = {
      userId: id,
      status: authReducer.status,
    };
    dispatch(AuthAction.IsUserLogin(auth));
  }, []);

  return authReducer;
}

export default useAuth;
