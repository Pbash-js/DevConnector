import {
  POST_ERROR,
  GET_POSTS,
  UPDATE_LIKES,
  MAKE_POST,
  DELETE_POST,
  GET_POST,
  UPDATE_COMMENTS,
  DELETE_COMMENT,
} from "../types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  errors: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POST:
      return {
        ...state,
        loading: false,
        posts: [],
        post: payload,
      };
    case GET_POSTS:
      return {
        ...state,
        loading: false,
        posts: payload,
      };
    case POST_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === payload.postID ? { ...post, likes: payload.likes } : post
        ),
      };
    case UPDATE_COMMENTS:
    case DELETE_COMMENT:
      return {
        ...state,
        loading: false,
        post: { ...state.post, comments: payload },
      };
    case MAKE_POST:
      return {
        ...state,
        loading: false,
        posts: [payload, ...state.posts],
      };

    case DELETE_POST:
      return {
        ...state,
        loading: false,
        posts: [...state.posts.filter((post) => post._id !== payload.postID)],
      };
    default:
      return state;
  }
};
