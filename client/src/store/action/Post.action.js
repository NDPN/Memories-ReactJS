import { POST } from "../type/Post.type";
import Post from "../../service/Post.service";

export const getPost = (userid) => {
  return async (dispatch) => {
    dispatch({
      type: POST.POST_REQUEST,
    });

    return Post.getPosts({ userid }).then((res) => {
      if (res.status === 200) {
        const { post } = res.data;
        dispatch({
          type: POST.POST_SUCCESS,
          payload: {
            post,
          },
        });
      } else {
        dispatch({
          type: POST.POST_FAIL,
          payload: {
            message: "Have something wrong !!",
          },
        });
      }
    });
  };
};

export const createPost = (form) => {
  return async (dispatch) => {
    dispatch({
      type: POST.CREATE_POST_REQUEST,
    });

    return Post.createPost(form).then((res) => {
      if (res.status === 200) {
        const { post } = res.data;
        dispatch({
          type: POST.CREATE_POST_SUCCESS,
          payload: { post },
        });
      } else {
        dispatch({
          type: POST.CREATE_POST_FAIL,
          payload: "error",
        });
      }
    });
  };
};

export const deletePost = (post) => {
  return async (dispatch) => {
    dispatch({
      type: POST.DELETE_POST_REQUEST,
    });

    return Post.deletePost({ id: post._id }).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: POST.DELETE_POST_SUCCESS,
          payload: {
            post,
          },
        });
      } else {
        dispatch({
          type: POST.DELETE_POST_FAIL,
        });
      }
    });
  };
};

export const updatePost = (post) => {
  return async (dispatch) => {
    dispatch({
      type: POST.UPDATE_POST_REQUEST,
    });

    return Post.updatePost(post).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: POST.UPDATE_POST_SUCCESS,
          payload: {
            post,
          },
        });
      } else {
        dispatch({
          type: POST.UPDATE_POST_FAIL,
        });
      }
    });
  };
};
