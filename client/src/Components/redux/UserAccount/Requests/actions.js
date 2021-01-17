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

export const fetchRequests = (url) => {
  return (dispatch) => {
    dispatch(fetchRequestsStart());
    axiosInstance
      .get(url)
      .then((res) => {
        console.log(res.data);
        dispatch(fetchRequestsSuccess());
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
