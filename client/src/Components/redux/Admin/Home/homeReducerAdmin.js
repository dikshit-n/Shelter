import * as actionTypes from "../../constants";

const initialState = {
  error: "",
  data: {
    totalStudents: "--",
    allPlace: [],
  },
  loading: false,
};

const homeReducerAdmin = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.FETCH_DASHBOARD_START_ADMIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case actionTypes.FETCH_DASHBOARD_SUCCESS_ADMIN:
      return {
        ...state,
        loading: false,
        data: actions.data,
        error: "",
      };
    case actionTypes.FETCH_DASHBOARD_FAILURE_ADMIN:
      return {
        ...state,
        loading: false,
        data: {
          totalStudents: "--",
          allPlace: [],
        },
        error: actions.error,
      };
    default:
      return state;
  }
};

export default homeReducerAdmin;
