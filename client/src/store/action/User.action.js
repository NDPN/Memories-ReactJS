import { USER } from "../type/User.type";
import User from "../../service/User.service";

export const findUserById = (userid) => {
  return async (dispatch) => {
    dispatch({
      type: USER.USER_REQUEST,
    });

    return User.findUserById(userid).then((res) => {
      if (res.status === 200) {
        const { userInfo } = res.data;
        dispatch({
          type: USER.USER_SUCCESS,
          payload: {
            userInfo,
          },
        });
      } else {
        dispatch({
          type: USER.USER_FAIL,
          payload: {
            message: "Something wrong !!",
          },
        });
      }
    });
  };
};
