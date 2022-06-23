import { USER } from "../type/User.type";
const initialState = {
  data: [],
  loading: false,
};

export default function User(state = initialState, action) {
  switch (action.type) {
    case USER.USER_REQUEST:
      return { ...state, loading: true };
    case USER.USER_SUCCESS:
      return { data: action.payload.userInfo, loading: false };
    case USER.USER_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
}
