import * as actionTypes from "../../constants";

const initialState = {
  error: "",
  incomingRequests: [],
  sentRequests: [],
  loading: true,
};

const requestsReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.FETCH_REQUESTS_START:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case actionTypes.FETCH_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        incomingRequests: [...actions.incomingRequests],
        sentRequests: [...actions.sentRequests],
        error: "",
      };
    case actionTypes.FETCH_REQUESTS_FAILURE:
      return {
        ...state,
        loading: false,
        incomingRequests: [],
        sentRequests: [],
        error: actions.error,
      };
    default:
      return state;
  }
};

export default requestsReducer;
