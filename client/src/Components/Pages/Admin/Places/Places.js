import Place from "./Place";
import "./Places.css";
import PlacesNavigator from "./PlacesNavigator/PlacesNavigator";

const { Switch, Route, Redirect } = require("react-router");
const { default: AddPlace } = require("./AddPlace/AddPlace");

const Places = (props) => {
  const placesNavigationRoutes = [
    { name: "Places", to: props.match.url + "/place" },
    { name: "Add New", to: props.match.url + "/addplace" },
  ];

  return (
    <div className="height_100 employees-container">
      <PlacesNavigator routes={placesNavigationRoutes} />
      <Switch>
        <Route path={props.match.url + "/addplace"} component={AddPlace} />
        <Route path={props.match.url + "/place"} component={Place} />
        <Redirect to={props.match.url + "/place"} />
      </Switch>
    </div>
  );
};

export default Places;
