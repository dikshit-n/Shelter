import { axiosInstance } from "../../../Utility/axiosInstance";
import * as actionTypes from "../../constants";

export const fetchMyHousesStart = () => ({
  type: actionTypes.FETCH_MY_HOUSES_START,
});
export const fetchMyHousesSuccess = (data) => ({
  type: actionTypes.FETCH_MY_HOUSES_SUCCESS,
  data,
});
export const fetchMyHousesFailure = (error) => ({
  type: actionTypes.FETCH_MY_HOUSES_FAILURE,
  error,
});
export const fetchMyHouses = (url) => {
  return (dispatch) => {
    console.log(url, "fetching");
    dispatch(fetchMyHousesStart());
    axiosInstance
      .post(url)
      .then((res) => {
        console.log(res.data);
        dispatch(fetchMyHousesSuccess(res.data ? res.data.myHouses : []));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          fetchMyHousesFailure(
            err.response?.statusText || "Something went wrong!"
          )
        );
      });
  };
};
