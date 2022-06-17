import axios from "../config/Axiosconfig";

const api_path = {
  signup: "/signup",
  login: "/signin",
  changeAvatar: "/changeAvatar",
};

const Auth = {
  async signupService(form) {
    return axios.post(api_path.signup, form);
  },
  async loginService(form) {
    return axios.post(api_path.login, form);
  },
  async changeAvatar(form) {
    return axios.post(api_path.changeAvatar, form);
  },
};

export default Auth;
