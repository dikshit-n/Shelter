import { axiosInstance } from "../../../Utility/axiosInstance";
import * as actionTypes from "../../constants";

const fetchPlacesStartAdmin = () => {
  return {
    type: actionTypes.FETCH_PLACES_START_ADMIN,
  };
};

const fetchPlacesSuccessAdmin = (data) => {
  return {
    type: actionTypes.FETCH_PLACES_SUCCESS_ADMIN,
    data,
  };
};
const fetchPlacesFailureAdmin = (error) => {
  return {
    type: actionTypes.FETCH_PLACES_FAILURE_ADMIN,
    error,
  };
};

export const fetchPlacesAdmin = () => {
  return (dispatch) => {
    dispatch(fetchPlacesStartAdmin());
    axiosInstance
      .get("admin/view/places")
      .then((res) => {
        console.log(res.data);
        dispatch(fetchPlacesSuccessAdmin([...res.data]));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          fetchPlacesFailureAdmin(
            err.response?.statusText || "Something went wrong"
          )
        );
      });
  };
};
