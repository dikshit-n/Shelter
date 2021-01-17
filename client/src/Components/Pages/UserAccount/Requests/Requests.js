import { Redirect, Route, Switch } from "react-router";
import Incoming from "./Incoming/Incoming";
import Sent from "./Sent/Sent";
import "./Requests.css";
import RequestsNavigator from "./RequestsNavigator/RequestsNavigator";

const Requests = (props) => {
  const {
    match: { url },
  } = props;
  const requestsNavigationRoutes = [
    { name: "Incoming", to: url + "/incoming" },
    { name: "Sent", to: url + "/sent" },
  ];
  console.log(url);
  return (
    <div className="height_100 requests-container">
      <RequestsNavigator routes={requestsNavigationRoutes} />
      <Switch>
        <Route path={url + "/sent"} component={Sent} />
        <Route path={url + "/incoming"} component={Incoming} />
        <Redirect to={url + "/incoming"} />
      </Switch>
    </div>
  );
};

export default Requests;
