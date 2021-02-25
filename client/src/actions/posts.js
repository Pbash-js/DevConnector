import axios from "axios";
import {
  GET_POSTS,
  POST_ERROR,
  MAKE_POST,
  UPDATE_LIKES,
  DELETE_POST,
  GET_POST,
  UPDATE_COMMENTS,
  DELETE_COMMENT,
} from "../types";
import { setAlert } from "./alert";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

export const getPost = (postID) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postID}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

export const makePost = (postData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/posts", postData, config);

    dispatch({
      type: MAKE_POST,
      payload: res.data,
    });

    dispatch(setAlert("Posted!", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors)
      errors.forEach((item) => {
        dispatch(setAlert(item.msg, "danger"));
      });
    dispatch({
      type: POST_ERROR,
      payload: errors,
    });
  }
};

export const deletePost = (postID) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postID}`);

    dispatch({
      type: DELETE_POST,
      payload: postID,
    });

    dispatch(getPosts());

    dispatch(setAlert("Post deleted", "success"));
  } catch (error) {
    dispatch(setAlert("Cannot do this action now", "danger"));
    dispatch({
      type: POST_ERROR,
      payload: { msg: "Server error" },
    });
  }
};

export const addLike = (postID) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postID}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postID, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

export const removeLike = (postID) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postID}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postID, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

export const addComment = (text, postID) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(`/api/posts/comment/${postID}`, text, config);

    dispatch({
      type: UPDATE_COMMENTS,
      payload: res.data,
    });

    dispatch(setAlert("Posted!", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

export const deleteComment = (postID, commentID) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postID}/${commentID}`);

    dispatch({
      type: DELETE_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert("Comment Deleted", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};
