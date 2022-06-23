import axios from "../config/Axiosconfig";

const api_path = {
  sendFriendReq: "addfriend",
  acceptFriendReq: "acceptfriend",
};

const friend = {
  async sendFriendReq(email) {
    return axios.post(api_path.sendFriendReq, email);
  },
  async acceptFriendReq(id) {
    return axios.post(api_path.acceptFriendReq, id);
  },
};

export default friend;
