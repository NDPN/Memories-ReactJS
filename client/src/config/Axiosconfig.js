import axios from "axios";
import store from "../store/StoreConfig"
import { getCookie } from "../config/getCookie/GetCookie";

const token = getCookie("token") != null ? getCookie("token") : "";
const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    Authorization: token ? `Bearer ${token}` : " ",
  },
});

instance.interceptors.request.use(function (config) {
  const { Auth } = store.getState();
  if (Auth.token) {
    config.headers.Authorization = `Bearer ${Auth.token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;