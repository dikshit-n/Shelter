import * as actionTypes from "../../constants/index";

const initialState = {
  runningData: null,
  idleData: [],
  emergencyData: {},
  loading: false,
  error: "",
};

const busLogReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.FETCH_BUSES_LOG_START_ADMIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case actionTypes.FETCH_BUSES_LOG_RUNNING_SUCCESS_ADMIN:
      return {
        ...state,
        loading: false,
        runningData: actions.data,
        error: "",
      };
    case actionTypes.FETCH_BUSES_LOG_IDLE_SUCCESS_ADMIN:
      return {
        ...state,
        loading: false,
        idleData: actions.data,
        error: "",
      };
    case actionTypes.FETCH_BUSES_LOG_EMERGENCY_SUCCESS_ADMIN:
      return {
        ...state,
        loading: false,
        emergencyData: actions.data,
        error: "",
      };
    case actionTypes.FETCH_BUSES_LOG_FAILURE_ADMIN:
      return {
        ...state,
        loading: false,
        error: actions.error,
      };
    default:
      return state;
  }
};

export default busLogReducer;
