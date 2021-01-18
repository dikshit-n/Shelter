import { axiosInstance } from "../../../Utility/axiosInstance";
import { deleteCookie, getCookie } from "../../../Utility/cookies";
import * as actionTypes from "../../constants";
import avatar from "../../../../assets/default-logo.png";

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};
export const loginFailure = (error = "Something went wrong !") => {
  deleteCookie("token");
  localStorage.removeItem("route");
  return {
    type: actionTypes.LOGIN_FAILURE,
    error,
  };
};
export const loginSuccess = (data) => {
  console.log(data, " loginActions");
  return {
    type: actionTypes.LOGIN_SUCCESS,
    data,
  };
};

export const logout = () => {
  deleteCookie("token");
  localStorage.removeItem("route");
  window.location.reload();
};

export const deleteToken = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const checkAuthStatus = () => {
  return (dispatch) => {
    dispatch(loginStart());
    let token = getCookie("token");
    if (token) {
      dispatch(loginSuccess({ token: token }));
    } else {
      dispatch(loginFailure());
    }
  };
};

export const setTemporaryToken = (token, temporaryType) => {
  return {
    type: actionTypes.SET_TEMPORARY_TOKEN,
    token,
    temporaryType,
  };
};
