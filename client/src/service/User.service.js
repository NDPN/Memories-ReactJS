import axios from "../config/Axiosconfig";

const api_path = {
  findById: "findUserId",
};

const User = {
  async findUserById(userid) {
    return axios.post(api_path.findById, userid);
  },
};

export default User;
