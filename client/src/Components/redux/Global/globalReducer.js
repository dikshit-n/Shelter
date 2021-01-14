import * as actionTypes from "../constants/index";

const initialState = {
  navStatus: true,
};

const gloabalReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.TOGGLE_NAV:
      return {
        navStatus:
          actions.status !== undefined ? actions.status : !state.navStatus,
      };
    default:
      return state;
  }
};

export default gloabalReducer;
