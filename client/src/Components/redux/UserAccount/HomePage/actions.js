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
    console.log(url, "fetching");
    dispatch(fetchUsersStart());
    axiosInstance
      .post(url)
      .then((res) => {
        console.log(res.data);
        dispatch(fetchUsersSuccess(res.data ? res.data.houses : []));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          fetchUsersFailure(err.response?.statusText || "Something went wrong!")
        );
      });
  };
};
