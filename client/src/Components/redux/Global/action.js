import * as actionTypes from "../constants/index";

export const toggleNav = (status) => {
  return {
    type: actionTypes.TOGGLE_NAV,
    status: status,
  };
};
