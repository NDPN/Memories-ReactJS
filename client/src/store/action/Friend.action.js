import { FRIEND } from "../type/Friend.type";
import Friend from "../../service/Friend.service";
import { message } from "antd";

export const sendFriendReq = (email) => {
  return async (dispatch) => {
    dispatch({
      type: FRIEND.SENDREQUEST_REQUEST,
    });
    return Friend.sendFriendReq(email).then((res) => {
      if (res.status === 200) {
        const successful = res.data.message;
        dispatch({
          type: FRIEND.SENDREQUEST_SUCCESS,
          payload: {
            message: message.success(successful),
          },
        });
      } else {
        dispatch({
          type: FRIEND.SENDREQUEST_FAIL,
          payload: {
            message: message.error("User not found"),
          },
        });
      }
    });
  };
};

export const acceptFriendReq = (id) => {
  return async (dispatch) => {
    dispatch({
      type: FRIEND.ACCEPTREQUEST_REQUEST,
    });
    return Friend.acceptFriendReq(id).then((res) => {
      if (res.status === 200) {
        const successful = res.data.message;
        dispatch({
          type: FRIEND.ACCEPTREQUEST_SUCCESS,
          payload: {
            message: message.success(successful),
          },
        });
      } else {
        dispatch({
          type: FRIEND.ACCEPTREQUEST_FAIL,
          payload: {
            message: message.error("User not found"),
          },
        });
      }
    });
  };
};
