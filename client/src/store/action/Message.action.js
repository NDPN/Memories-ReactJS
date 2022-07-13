import { MESSAGE } from "../type/Message.type";
import Message from "../../service/Message.service";

export const getMessage = (user) => {
  return async (dispatch) => {
    dispatch({
      type: MESSAGE.GETMESSAGE_REQUEST,
    });

    return Message.getMessages(user).then((res) => {
      if (res.status === 200) {
        const data = res.data;
        dispatch({
          type: MESSAGE.GETMESSAGE_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: MESSAGE.SENDMESSAGE_FAIL,
          payload: "Something wrong !!",
        });
      }
    });
  };
};

export const sendMessageAction = (content) => {
  return async (dispatch) => {
    dispatch({
      type: MESSAGE.SENDMESSAGE_REQUEST,
    });

    return Message.sendMessage(content).then((res) => {
      if (res.status === 200) {
        const data = res.data;
        dispatch({
          type: MESSAGE.SENDMESSAGE_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: MESSAGE.SENDMESSAGE_FAIL,
          payload: "Something wrong !!",
        });
      }
    });
  };
};
