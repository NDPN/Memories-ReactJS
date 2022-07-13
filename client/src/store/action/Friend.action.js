import { FRIEND } from "../type/Friend.type";
import Friend from "../../service/Friend.service";
import { message } from "antd";

export const getFriendList = (idFriendList) => {
  return async (dispatch) => {
    dispatch({
      type: FRIEND.GETFRIENDLIST_REQUEST,
    });
    return Friend.getFriend(idFriendList).then((res) => {
      if (res.status === 200) {
        const friendList = res.data;
        dispatch({
          type: FRIEND.GETFRIENDLIST_SUCCESS,
          payload: friendList,
        });
      } else {
        dispatch({
          type: FRIEND.GETFRIENDLIST_FAIL,
        });
      }
    });
  };
};

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

export const unFriend = (id) => {
  return async (dispatch) => {
    dispatch({
      type: FRIEND.UNFRIEND_REQUEST,
    });

    return Friend.unFriend(id).then((res) => {
      if (res.status === 200) {
        console.log(res.status)
        dispatch({
          type: FRIEND.UNFRIEND_SUCCESS,
        });
      } else {
        dispatch({
          type: FRIEND.UNFRIEND_FAIL,
        });
      }
    });
  };
};
