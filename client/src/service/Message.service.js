import axios from "../config/Axiosconfig";

const api_path = {
  getMessage: "getMessage",
  sendMessage: "sendMessage",
};

const Message = {
  async getMessages(users) {
    return axios.post(api_path.getMessage, users);
  },
  async sendMessage(content) {
    return axios.post(api_path.sendMessage, content);
  },
};

export default Message;
