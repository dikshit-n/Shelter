import { combineReducers } from "redux";
import loginReducer from "./Auth/Login/loginReducer";
import gloabalReducer from "./Global/globalReducer";
import housesReducer from "./UserAccount/HomePage/reducer";
import myHousesReducer from "./UserAccount/MyHouses/reducer";
import requestsReducer from "./UserAccount/Requests/requestsReducer";

const rootReducer = combineReducers({
  global: gloabalReducer,
  login: loginReducer,
  houses: housesReducer,
  myHouses: myHousesReducer,
  requests: requestsReducer,
});

export default rootReducer;
