import { axiosInstance } from "../../../Utility/axiosInstance";
import * as actionTypes from "../../constants";

const fetchEmployeesStartAdmin = () => {
  return {
    type: actionTypes.FETCH_EMPLOYEES_START_ADMIN,
  };
};

const fetchEmployeesSuccessAdmin = (data) => {
  return {
    type: actionTypes.FETCH_EMPLOYEES_SUCCESS_ADMIN,
    data,
  };
};
const fetchEmployeesFailureAdmin = (error) => {
  return {
    type: actionTypes.FETCH_EMPLOYEES_FAILURE_ADMIN,
    error,
  };
};

export const fetchEmployeesAdmin = () => {
  return (dispatch) => {
    dispatch(fetchEmployeesStartAdmin());
    axiosInstance
      .get("admin/view/employee")
      .then((res) => {
        console.log(res.data);
        dispatch(fetchEmployeesSuccessAdmin([...res.data]));
      })
      .catch((err) => {
        console.log(err);
        let error = "Something went wrong!";
        if (err.response) {
          error = err.response.message;
        }
        dispatch(fetchEmployeesFailureAdmin(error));
      });
  };
};
