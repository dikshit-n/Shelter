import * as actionTypes from "../../constants";

const initialState = {
  error: "",
  data: [],
  loading: false,
};

const schoolsReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.FETCH_SCHOOLS_START_SUPERADMINMAX:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case actionTypes.FETCH_SCHOOLS_SUCCESS_SUPERADMINMAX:
      return {
        ...state,
        loading: false,
        data: [...actions.data],
      };
    case actionTypes.FETCH_SCHOOLS_FAILURE_SUPERADMINMAX:
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

export default schoolsReducer;
