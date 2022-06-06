import { AUTH } from "../type/Auth.type";
const initialState = {
  user: "",
  token: "",
  status: true,
  authenticating: false,
};

export default function Auth(state = initialState, action) {
  switch (action.type) {
    case AUTH.LOGIN_REQUEST:
      return { ...state, status: false, authenticating: true };
    case AUTH.LOGIN_SUCCESS:
      return {
        user: action.payload.user,
        token: action.payload.token,
        status: true,
        authenticating: false,
      };
    case AUTH.LOGIN_FAIL:
      return { ...state, status: false, authenticating: false };
    case AUTH.LOGOUT_REQUEST:
      return { ...state, status: false, authenticating: true };
    case AUTH.LOGOUT_SUCCESS:
      return { user: "", token: "", status: false, authenticating: false };
    default:
      return state;
  }
}
