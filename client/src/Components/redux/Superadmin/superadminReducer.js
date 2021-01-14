import * as actionTypes from "../constants";

const initialState = {
  error: "",
  data: [],
  loading: false,
};

const adminsReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.FETCH_ADMINS_START_SUPERADMIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case actionTypes.FETCH_ADMINS_SUCCESS_SUPERADMIN:
      return {
        ...state,
        loading: false,
        error: "",
        data: [...actions.data],
      };
    case actionTypes.FETCH_ADMINS_FAILURE_SUPERADMIN:
      return {
        ...state,
        loading: false,
        data: [],
        error: actions.error,
      };
    default:
      return state;
  }
};

export default adminsReducer;
