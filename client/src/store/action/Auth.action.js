import { AUTH } from "../type/Auth.type";
import AuthLogin from "../../service/Auth.service";
import axios from "../../config/Axiosconfig";
import { message } from "antd";
import { getCookie } from "../../config/getCookie/GetCookie";

// Register
export const registerAction = (form) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH.REGISTER_REQUEST,
    });

    return AuthLogin.signupService(form).then((res) => {
      if (res.status === 200) {
        const { email, password, token } = res.data.user;
        dispatch({
          type: AUTH.REGISTER_SUCCESS,
          payload: {
            user: { email, password },
            token,
            message: message.success("Đăng ký thành công"),
          },
        });
      } else {
        dispatch({
          type: AUTH.REGISTER_FAIL,
          message: message.error("Đăng ký không thành công"),
        });
      }
    });
  };
};

// Login
export const loginAction = (form) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH.LOGIN_REQUEST,
    });
    return AuthLogin.loginService(form)
      .then((res) => {
        const { token, user } = res.data;
        document.cookie = "token=" + token;
        document.cookie = "user=" + JSON.stringify(user);
        if (res.status === 200) {
          dispatch({
            type: AUTH.LOGIN_SUCCESS,
            payload: {
              token,
              user,
              message: message.success("Đăng nhập thành công"),
            },
          });
        }
        return true;
      })
      .catch((err) => {
        dispatch({
          type: AUTH.LOGIN_FAIL,
          payload: {
            message: message.error("Sai tài khoản hoặc mật khẩu"),
          },
        });
      });
  };
};

// Authenticate
export const IsUserLogin = () => {
  return async (dispatch) => {
    dispatch({
      type: AUTH.LOGIN_REQUEST,
    });

    const token = getCookie("token") !== null ? getCookie("token") : "";

    if (token) {
      const res = await axios.post("/auth");
      if (res.status === 200) {
        const user = JSON.parse(getCookie("user"));
        dispatch({
          type: AUTH.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
        return true;
      } else {
        dispatch({
          type: AUTH.LOGIN_FAIL,
          payload: {
            message: "something wrong!!",
          },
        });
      }
    } else {
      dispatch({
        type: AUTH.LOGIN_FAIL,
        payload: {
          message: "something wrong!!",
        },
      });
    }
  };
};

// Logout
export const userLogout = () => {
  return async (dispatch) => {
    dispatch({
      type: AUTH.LOGOUT_REQUEST,
    });
    const res = await axios.post("/signout");
    if (res) {
      document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      dispatch({
        type: AUTH.LOGOUT_SUCCESS,
      });
    }
  };
};

// Change avatar
export const changeAvatar = (form) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH.CHANGE_AVATAR_REQUEST,
    });
    return AuthLogin.changeAvatar(form).then((res) => {
      if (res.status === 200) {
        const { avatar } = res.data;
        dispatch({
          type: AUTH.CHANGE_AVATAR_SUCCESS,
          payload: {
            avatar,
          },
        });
      } else {
        dispatch({
          type: AUTH.CHANGE_AVATAR_FAIL,
        });
      }
    });
  };
};
