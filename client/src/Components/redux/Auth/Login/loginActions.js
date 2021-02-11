import { axiosInstance } from "../../../Utility/axiosInstance";
import { deleteCookie, getCookie } from "../../../Utility/cookies";
import * as actionTypes from "../../constants";

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

export const upgradeAccount = (accountType) => ({
  type: actionTypes.UPGRADEACCOUNT,
  accountType,
});
export const updateProfile = (logo) => ({
  type: actionTypes.UPDATE_PROFILE,
  logo,
});

export const logout = () => {
  deleteCookie("token");
  deleteCookie("userType");
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
      axiosInstance
        .post("/server1/checkauthstatus", { token: token })
        .then((res) => {
          console.log(res.data);
          dispatch(loginSuccess({ ...res.data, token }));
        })
        .catch((err) => {
          console.log(err);
          dispatch(loginFailure());
        });
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
