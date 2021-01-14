import * as actionTypes from "../../constants";

const initialState = {
  error: "",
  data: [],
  loading: false,
};

const placesReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.FETCH_PLACES_START_ADMIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case actionTypes.FETCH_PLACES_SUCCESS_ADMIN:
      return {
        ...state,
        loading: false,
        data: [...actions.data],
        error: "",
      };
    case actionTypes.FETCH_PLACES_FAILURE_ADMIN:
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

export default placesReducer;
