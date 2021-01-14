import { Redirect, Route, Switch } from "react-router";
import "./Buses.css";
import LiveDetail from "./LiveDetail/LiveDetail";
import ViewBuses from "./ViewBuses/ViewBuses";

const Buses = (props) => {
  return (
    <Switch>
      <Route
        path={props.match.url + "/viewbuses/:id/:status"}
        component={LiveDetail}
      />
      <Route path={props.match.url + "/viewbuses"} component={ViewBuses} />
      <Redirect to={props.match.url + "/viewbuses"} />
    </Switch>
  );
};

export default Buses;
