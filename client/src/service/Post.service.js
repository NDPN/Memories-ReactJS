import axios from "../config/Axiosconfig";

const api_path = {
  getPost: "post/getPosts",
  createPost: "post/create",
  deletePost: "post/delete",
  updatePost: "/post/update",
};

const Post = {
  async getPosts({ userid }) {
    return axios.post(api_path.getPost, { userid });
  },
  async createPost(form) {
    return axios.post(api_path.createPost, form);
  },
  async deletePost(post) {
    return axios.post(api_path.deletePost, post);
  },
  async updatePost(post) {
    return axios.post(api_path.updatePost, post);
  },
};

export default Post;
