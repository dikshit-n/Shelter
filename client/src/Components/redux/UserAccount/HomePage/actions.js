import { axiosInstance } from "../../../Utility/axiosInstance";
import * as actionTypes from "../../constants";

export const fetchUsersStart = () => ({
  type: actionTypes.FETCH_HOUSES_START,
});
export const fetchUsersSuccess = (data) => ({
  type: actionTypes.FETCH_HOUSES_SUCCESS,
  data,
});
export const fetchUsersFailure = (error) => ({
  type: actionTypes.FETCH_HOUSES_FAILURE,
  error,
});
export const fetchUsers = (url) => {
  return (dispatch) => {
    axiosInstance
      .get(url)
      .then((res) => {
        console.log(res.data);
        fetchUsersSuccess(res.data);
      })
      .catch((err) => {
        console.log(err);
        fetchUsersFailure(err.response?.statusText || "Something went wrong!");
      });
  };
};
