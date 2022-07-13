import axios from "../config/Axiosconfig";

const api_path = {
  getFriendList: "getFriend",
  sendFriendReq: "addfriend",
  acceptFriendReq: "acceptfriend",
  unFriend: "unfriend",
};

const friend = {
  async getFriend(arr) {
    return axios.post(api_path.getFriendList, arr);
  },
  async sendFriendReq(email) {
    return axios.post(api_path.sendFriendReq, email);
  },
  async acceptFriendReq(id) {
    return axios.post(api_path.acceptFriendReq, id);
  },
  async unFriend(id) {
    return axios.post(api_path.unFriend, id);
  },
};

export default friend;
