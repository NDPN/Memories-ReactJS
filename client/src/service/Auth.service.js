import axios from "../config/Axiosconfig";

const api_path = {
  login: "/signin",
};

const Auth = {
  async loginService(form) {
    return axios.post(api_path.login, form);
  },
};

export default Auth;