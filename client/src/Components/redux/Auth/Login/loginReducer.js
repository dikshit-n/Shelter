import * as actionTypes from "../../constants";

var initialState = {
  loading: false,
  error: null,
  data: {},
};

const loginReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.UPGRADEACCOUNT:
      return {
        ...state,
        data: {
          ...state.data,
          userType: actions.accountType,
        },
      };
    case actionTypes.UPDATE_PROFILE:
      return {
        ...state,
        data: {
          ...state.data,
          logo: actions.logo,
        },
      };
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { ...actions.data },
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        data: {},
        loading: false,
        error: actions.error,
      };
    case actionTypes.SET_TEMPORARY_TOKEN:
      return {
        ...state,
        data: {
          ...state.data,
          temporaryToken: actions.token,
          temporaryType: actions.temporaryType,
        },
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        data: {},
      };
    default:
      return state;
  }
};

export default loginReducer;
