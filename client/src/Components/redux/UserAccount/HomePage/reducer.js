import * as actionTypes from "../../constants";

const initialReducer = {
  loading: true,
  error: null,
  data: [],
};

const housesReducer = (state = initialReducer, actions) => {
  switch (actions.type) {
    case actionTypes.FETCH_HOUSES_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_HOUSES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...actions.data],
      };
    case actionTypes.FETCH_HOUSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error,
      };
    default:
      return state;
  }
};

export default housesReducer;
