import { axiosInstance } from "../../../Utility/axiosInstance";
import * as actionTypes from "../../constants";

const fetchSchoolsStartSuperAdminMax = () => {
  return {
    type: actionTypes.FETCH_SCHOOLS_START_SUPERADMINMAX,
  };
};

const fetchSchoolsSuccessSuperAdminMax = (data) => {
  return {
    type: actionTypes.FETCH_SCHOOLS_SUCCESS_SUPERADMINMAX,
    data,
  };
};
const fetchSchoolsFailureSuperAdminMax = (error) => {
  return {
    type: actionTypes.FETCH_SCHOOLS_FAILURE_SUPERADMINMAX,
    error,
  };
};

export const fetchSchoolsSuperAdminMax = () => {
  return (dispatch) => {
    dispatch(fetchSchoolsStartSuperAdminMax());
    axiosInstance
      .get("company/view/superadmin")
      .then((res) => {
        console.log(res.data);
        dispatch(fetchSchoolsSuccessSuperAdminMax([...res.data]));
      })
      .catch((err) => {
        console.log(err);
        let error = "Something went wrong!";
        if (err.response) {
          error = err.response.message;
        }
        dispatch(fetchSchoolsFailureSuperAdminMax(error));
      });
  };
};
