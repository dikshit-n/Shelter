import * as actionTypes from "../../constants";
import { axiosInstance } from "../../../Utility/axiosInstance";

const fetchDashboardStartAdmin = () => {
  return {
    type: actionTypes.FETCH_DASHBOARD_START_ADMIN,
  };
};

const fetchDashboardSuccessAdmin = (data) => {
  return {
    type: actionTypes.FETCH_DASHBOARD_SUCCESS_ADMIN,
    data,
  };
};
const fetchDashboardFailureAdmin = (error) => {
  return {
    type: actionTypes.FETCH_DASHBOARD_FAILURE_ADMIN,
    error,
  };
};

export const fetchDashboardAdmin = () => {
  return (dispatch) => {
    dispatch(fetchDashboardStartAdmin());
    axiosInstance
      .post("admin/dashboard", { time: Date.now() })
      .then((res) => {
        console.log(res.data);
        dispatch(fetchDashboardSuccessAdmin(res.data));
      })
      .catch((err) => {
        console.log(err);
        let error = "Something went wrong!";
        if (err.response) {
          error = err.response.message;
        }
        dispatch(fetchDashboardFailureAdmin(error));
      });
  };
};
