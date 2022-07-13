import axios from "../config/Axiosconfig";

const api_path = {
  findById: "findUserId",
  findByName: "findUserName",
};

const User = {
  async findUserById(userid) {
    return axios.post(api_path.findById, userid);
  },
  async findUserByName(username) {
    return axios.post(api_path.findByName, username);
  },
};

export default User;
