import { axiosInstance } from "../../../Utility/axiosInstance";
import * as actionTypes from "../../constants";

const fetchRequestsStart = () => {
  return {
    type: actionTypes.FETCH_REQUESTS_START,
  };
};

const fetchRequestsSuccess = ({ incomingRequests = [], sentRequests = [] }) => {
  return {
    type: actionTypes.FETCH_REQUESTS_SUCCESS,
    incomingRequests,
    sentRequests,
  };
};
const fetchRequestsFailure = (error) => {
  return {
    type: actionTypes.FETCH_REQUESTS_FAILURE,
    error,
  };
};

export const fetchRequests = (url, id) => {
  return (dispatch) => {
    dispatch(fetchRequestsStart());
    console.log("calling " + url, " house Id =  " + id);
    axiosInstance
      .post(url, { houseId: id })
      .then((res) => {
        console.log(res.data);
        dispatch(fetchRequestsSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          fetchRequestsFailure(
            err.response?.statusText || "Something went wrong"
          )
        );
      });
  };
};
