import {
  ADD_EDUCATION,
  ADD_EXPERIENCE,
  CLEAR_PROFILE,
  DELETE_EXPERIENCE,
  DELETE_PROFILE,
  EDUCATION_ERROR,
  EXPERIENCE_ERROR,
  GET_GITHUB,
  GET_PROFILE,
  GET_PROFILES,
  GITHUB_ERROR,
  LOG_OUT,
  PROFILE_ERROR,
} from "../types";
import { setAlert } from "./alert";
import axios from "axios";
import profile from "../reducers/profile";

export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    console.error(error.response.data);

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getProfiles = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.msg, "danger"));
  }
};

export const getProfileItem = (userID) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userID}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: error.response.data.msg,
    });
  }
};

export const setProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/profile", formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(
      setAlert(edit ? "Profile was updated" : "Profile was created", "success")
    );

    !edit && history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors)
      errors.forEach((item) => dispatch(setAlert(item.msg, "danger")));
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/experience", formData, config);
    dispatch({
      type: ADD_EXPERIENCE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors)
      errors.forEach((item) => dispatch(setAlert(item.msg, "danger")));
    dispatch({
      type: EXPERIENCE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/education", formData, config);
    dispatch({
      type: ADD_EDUCATION,
      payload: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors)
      errors.forEach((item) => dispatch(setAlert(item.msg, "danger")));
    dispatch({
      type: EDUCATION_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteExperience = (expID) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${expID}`);

    dispatch({
      type: DELETE_EXPERIENCE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: EXPERIENCE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteEducation = (eduID) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${eduID}`);

    dispatch({
      type: DELETE_EXPERIENCE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: EXPERIENCE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteProfile = (history) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure you want to delete your profile? This action is permanent!"
    )
  ) {
    try {
      const res = await axios.delete(`/api/profile`);
      dispatch({
        type: DELETE_PROFILE,
        payload: res.data,
      });
      dispatch({
        type: CLEAR_PROFILE,
        payload: res.data,
      });

      history.push("/");
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: "Profile was deleted",
        },
      });
    }
  }
};

export const getGithubRepos = (githubusername) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${githubusername}`);

    dispatch({
      type: GET_GITHUB,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GITHUB_ERROR,
      payload: error.response.data.msg,
    });
  }
};
