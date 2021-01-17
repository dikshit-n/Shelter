import { axiosInstance } from "../../../Utility/axiosInstance";
import { deleteCookie, getCookie } from "../../../Utility/cookies";
import * as actionTypes from "../../constants";
import schoolLogo from "../../../../assets/logo.webp";
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
    data: { ...data, schoolLogo, avatar },
  };
};

export const logout = () => {
  deleteCookie("token");
  localStorage.removeItem("route");
  window.location.reload();
  // return {
  //   type: actionTypes.LOGOUT,
  // };
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
    console.log(token);
    // axiosInstance
    //   .post("/checkauthstatus", { id: token })
    //   .then((res) => {
    //     console.log(res.data);
    //     console.log("Success auth");
    //     dispatch(loginSuccess(res.data));
    //   })
    //   .catch((err) => {
    //     // dispatch(logout());
    //     console.log(err);
    //     console.log("Failure auth");
    //     let error = err.response?.statusText || "Something went wrong";
    //     dispatch(loginFailure(error));
    //   });
  };
};

export const setTemporaryToken = (token, temporaryType) => {
  return {
    type: actionTypes.SET_TEMPORARY_TOKEN,
    token,
    temporaryType,
  };
};
