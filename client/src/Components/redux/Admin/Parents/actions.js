import { axiosInstance } from "../../../Utility/axiosInstance";
import * as actionTypes from "../../constants";

const fetchParentsStartAdmin = () => {
  return {
    type: actionTypes.FETCH_PARENTS_START_ADMIN,
  };
};

const fetchParentsSuccessAdmin = (data) => {
  return {
    type: actionTypes.FETCH_PARENTS_SUCCESS_ADMIN,
    data,
  };
};
const fetchParentsFailureAdmin = (error) => {
  return {
    type: actionTypes.FETCH_PARENTS_FAILURE_ADMIN,
    error,
  };
};

export const fetchParentsAdmin = () => {
  return (dispatch) => {
    dispatch(fetchParentsStartAdmin());
    axiosInstance
      .get("admin/view/parent")
      .then((res) => {
        console.log(res.data);
        dispatch(fetchParentsSuccessAdmin([...res.data]));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          fetchParentsFailureAdmin(
            err.response?.statusText || "Something went Wrong !"
          )
        );
      });
  };
};
