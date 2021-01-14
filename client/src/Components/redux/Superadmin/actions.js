import { axiosInstance } from "../../Utility/axiosInstance";
import * as actionTypes from "../constants";

const fetchAdminsStartSuperadmin = () => {
  return {
    type: actionTypes.FETCH_ADMINS_START_SUPERADMIN,
  };
};

const fetchAdminsSuccessSuperadmin = (data) => {
  return {
    type: actionTypes.FETCH_ADMINS_SUCCESS_SUPERADMIN,
    data,
  };
};
const fetchAdminsFailureSuperadmin = (error) => {
  return {
    type: actionTypes.FETCH_ADMINS_FAILURE_SUPERADMIN,
    error,
  };
};

export const fetchAdminsSuperadmin = () => {
  return (dispatch) => {
    dispatch(fetchAdminsStartSuperadmin());
    axiosInstance
      .get("superadmin/view/admin")
      .then((res) => {
        console.log(res.data);
        dispatch(fetchAdminsSuccessSuperadmin([...res.data]));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          fetchAdminsFailureSuperadmin(
            err.response?.statusText || "Something went Wrong !"
          )
        );
      });
  };
};
