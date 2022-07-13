import { USER } from "../type/User.type";
const initialState = {
  userData: [],
  users: [],
  loading: false,
};

export default function User(state = initialState, action) {
  switch (action.type) {
    case USER.USER_REQUEST:
      return { ...state, loading: true };
    case USER.USER_SUCCESS:
      return { ...state, userData: action.payload.userInfo, loading: false };
    case USER.USER_FAIL:
      return { ...state, loading: false };
    case USER.FINDNAMEUSER_REQUEST:
      return { ...state, loading: true };
    case USER.FINDNAMEUSER_SUCCESS:
      return { ...state, users: action.payload, loading: false };
    case USER.FINDNAMEUSER_FAIL:
      return { ...state };
    default:
      return state;
  }
}
