import Employee from "./Employee";
import "./Employees.css";
import EmployeesNavigator from "./EmployeesNavigator/EmployeesNavigator";

const { Switch, Route, Redirect } = require("react-router");
const { default: AddEmployee } = require("./AddEmployee/AddEmployee");

const Employees = (props) => {
  const employeeNavigationRoutes = [
    { name: "Employees", to: props.match.url + "/employee" },
    { name: "Add New", to: props.match.url + "/addemployee" },
  ];

  return (
    <div className="height_100 employees-container">
      <EmployeesNavigator routes={employeeNavigationRoutes} />
      <Switch>
        <Route
          path={props.match.url + "/addemployee"}
          component={AddEmployee}
        />
        <Route path={props.match.url + "/employee"} component={Employee} />
        <Redirect to={props.match.url + "/employee"} />
      </Switch>
    </div>
  );
};

export default Employees;
