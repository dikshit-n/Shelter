import * as actionTypes from "../../constants";

const initialState = {
  error: "",
  data: [],
  loading: false,
};

const parentsReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.FETCH_PARENTS_START_ADMIN:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case actionTypes.FETCH_PARENTS_SUCCESS_ADMIN:
      return {
        ...state,
        loading: false,
        error: "",
        data: [...actions.data],
      };
    case actionTypes.FETCH_PARENTS_FAILURE_ADMIN:
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

export default parentsReducer;
