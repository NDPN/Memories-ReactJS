import { FRIEND } from "../type/Friend.type";
const initialState = {
  message: null,
};

export default function Friend(state = initialState, action) {
  switch (action.type) {
    case FRIEND.SENDREQUEST_REQUEST:
      return { ...state };
    case FRIEND.SENDREQUEST_SUCCESS:
      return { message: action.payload };
    case FRIEND.SENDREQUEST_FAIL:
      return { message: action.payload };
    case FRIEND.ACCEPTREQUEST_REQUEST:
      return { ...state };
    case FRIEND.ACCEPTREQUEST_SUCCESS:
      return { message: action.payload };
    case FRIEND.ACCEPTREQUEST_FAIL:
      return { message: action.payload };
    default:
      return { ...state };
  }
}
