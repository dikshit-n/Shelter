import { combineReducers } from "redux";
import busesReducer from "./Admin/Buses/busesReducer";
import busLogReducer from "./Admin/Buses/buslogReducer";
import employeesReducer from "./Admin/Employees/employeesReducer";
import homeReducerAdmin from "./Admin/Home/homeReducerAdmin";
import parentsReducer from "./Admin/Parents/parentsReducer";
import placesReducer from "./Admin/Places/placesReducer";
import loginReducer from "./Auth/Login/loginReducer";
import gloabalReducer from "./Global/globalReducer";
import adminsReducer from "./Superadmin/superadminReducer";
import schoolsReducer from "./SuperadminMax/Schools/schoolsReducer";
import housesReducer from "./UserAccount/HomePage/reducer";
import requestsReducer from "./UserAccount/Requests/requestsReducer";

const rootReducer = combineReducers({
  global: gloabalReducer,
  login: loginReducer,
  houses: housesReducer,
  // other
  adminsSuperadmin: adminsReducer,
  employeesAdmin: employeesReducer,
  parentsAdmin: parentsReducer,
  placesAdmin: placesReducer,
  schoolsSuperadminMax: schoolsReducer,
  busesAdmin: busesReducer,
  busLogAdmin: busLogReducer,
  homeAdmin: homeReducerAdmin,
  requests: requestsReducer,
});

export default rootReducer;
