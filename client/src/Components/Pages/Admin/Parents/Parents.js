import Parent from "./Parent";
import "./Parents.css";
import ParentsNavigator from "./ParentsNavigator/ParentsNavigator";

const { Switch, Route, Redirect } = require("react-router");
const { default: AddParent } = require("./AddParent/AddParent");

const Employees = (props) => {
  const parentsNavigationRoutes = [
    { name: "Students", to: props.match.url + "/parent" },
    { name: "Add New", to: props.match.url + "/addparent" },
  ];

  return (
    <div className="height_100 employees-container">
      <ParentsNavigator routes={parentsNavigationRoutes} />
      <Switch>
        <Route path={props.match.url + "/addparent"} component={AddParent} />
        <Route path={props.match.url + "/parent"} component={Parent} />
        <Redirect to={props.match.url + "/parent"} />
      </Switch>
    </div>
  );
};

export default Employees;
