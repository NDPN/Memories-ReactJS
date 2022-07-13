import { FRIEND } from "../type/Friend.type";
const initialState = {
  message: null,
  friendList: null,
};

export default function Friend(state = initialState, action) {
  switch (action.type) {
    case FRIEND.GETFRIENDLIST_REQUEST:
      return { ...state };
    case FRIEND.GETFRIENDLIST_SUCCESS:
      return { ...state, friendList: action.payload.friendList };
    case FRIEND.GETFRIENDLIST_FAIL:
      return { ...state };
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
    case FRIEND.UNFRIEND_REQUEST:
      return { ...state };
    case FRIEND.UNFRIEND_SUCCESS:
      return { ...state };
    case FRIEND.UNFRIEND_FAIL:
      return { ...state };
    default:
      return { ...state };
  }
}
