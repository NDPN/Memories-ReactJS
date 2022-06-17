import { POST } from "../type/Post.type";
const initialState = {
  data: [],
  loading: false,
};

const updatePost = (array, newData, _id) => {
  let index = -1;
  const currentPost = array;

  index = array.findIndex((arr) => arr._id === _id);

  const afterUpd = [
    ...currentPost.slice(0, index),
    newData,
    ...currentPost.slice(index + 1),
  ];

  return afterUpd;
};

const removeItem = (array, item) => {
  let index = -1;
  const currentPost = array;
  index = array.findIndex((arr) => arr._id === item._id);

  const afterDel = [
    ...currentPost.slice(0, index),
    ...currentPost.slice(index + 1),
  ];

  return afterDel;
};

export default function Post(state = initialState, action) {
  switch (action.type) {
    case POST.POST_REQUEST:
      return { ...state, loading: true };
    case POST.POST_SUCCESS:
      return { data: action.payload.post, loading: false };
    case POST.POST_FAIL:
      return { ...state, loading: false };
    case POST.CREATE_POST_REQUEST:
      return { ...state, loading: true };
    case POST.CREATE_POST_SUCCESS:
      let postCreate = action.payload.post;
      return { ...state, data: [...state.data, postCreate], loading: false };
    case POST.CREATE_POST_FAIL:
      return { ...state, loading: false };
    case POST.DELETE_POST_REQUEST:
      return { ...state, loading: true };
    case POST.DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: removeItem(state.data, action.payload.post),
      };
    case POST.DELETE_POST_FAIL:
      return { ...state, loading: false };
    case POST.UPDATE_POST_REQUEST:
      return { ...state, loading: true };
    case POST.UPDATE_POST_SUCCESS:
      let { post } = action.payload;
      return {
        ...state,
        loading: false,
        data: updatePost(state.data, post, post.id),
      };
    case POST.UPDATE_POST_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
}
