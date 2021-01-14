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

const rootReducer = combineReducers({
  global: gloabalReducer,
  login: loginReducer,
  adminsSuperadmin: adminsReducer,
  employeesAdmin: employeesReducer,
  parentsAdmin: parentsReducer,
  placesAdmin: placesReducer,
  schoolsSuperadminMax: schoolsReducer,
  busesAdmin: busesReducer,
  busLogAdmin: busLogReducer,
  homeAdmin: homeReducerAdmin,
});

export default rootReducer;
