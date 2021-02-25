import {
  GET_PROFILE,
  CLEAR_PROFILE,
  PROFILE_ERROR,
  EDUCATION_ERROR,
  EXPERIENCE_ERROR,
  ADD_EDUCATION,
  ADD_EXPERIENCE,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
  DELETE_PROFILE,
  GET_PROFILES,
  GET_GITHUB,
  GITHUB_ERROR,
} from "../types";

const initialState = {
  profiles: [],
  profile: null,
  repos: [],
  error: [],
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case ADD_EDUCATION:
    case ADD_EXPERIENCE:
    case DELETE_EXPERIENCE:
    case DELETE_EDUCATION:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case PROFILE_ERROR:
    case EDUCATION_ERROR:
    case EXPERIENCE_ERROR:
    case GITHUB_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case GET_PROFILES: {
      return {
        ...state,
        profiles: [...payload],
        loading: false,
      };
    }
    case GET_GITHUB:
      return {
        ...state,
        repos: [...payload],
        loading: false,
      };
    default:
      return state;
  }
};
