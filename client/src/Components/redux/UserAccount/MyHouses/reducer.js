import * as actionTypes from "../../constants";

const initialReducer = {
  loading: false,
  error: null,
  data: [],
};

const myHousesReducer = (state = initialReducer, actions) => {
  switch (actions.type) {
    case actionTypes.FETCH_MY_HOUSES_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_MY_HOUSES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...actions.data],
      };
    case actionTypes.FETCH_MY_HOUSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error,
      };
    default:
      return state;
  }
};

export default myHousesReducer;
