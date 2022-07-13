import { MESSAGE } from "../type/Message.type";
const initialState = {
  data: [],
  sendMessage: {
    to: "",
    from: "",
    message: "",
  },
};

export default function Message(state = initialState, action) {
  switch (action.type) {
    case MESSAGE.GETMESSAGE_REQUEST:
      return { ...state };
    case MESSAGE.GETMESSAGE_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case MESSAGE.SENDMESSAGE_REQUEST:
      return { ...state };
    case MESSAGE.SENDMESSAGE_SUCCESS:
      return { ...state, sendMessage: action.payload };
    case MESSAGE.SENDMESSAGE_FAIL:
      return { ...state };
    default:
      return { ...state };
  }
}
