import { Redirect, Route, Switch } from "react-router";
import Incoming from "./Incoming/Incoming";
import Sent from "./Sent/Sent";
import "./Requests.css";
// import RequestsNavigator from "./RequestsNavigator/RequestsNavigator";
import { useSelector } from "react-redux";
import Houses from "./Incoming/houses";

const Requests = (props) => {
  const {
    match: { url },
  } = props;
  // const requestsNavigationRoutes = [
  //   { name: "Incoming", to: url + "/incoming" },
  //   { name: "Sent", to: url + "/sent" },
  // ];

  const incoming = useSelector(
    (state) => state.login.data.userType === "owner"
  );
  return (
    <div className="height_100 requests-container">
      {/* <RequestsNavigator routes={requestsNavigationRoutes} /> */}
      <Switch>
        {incoming ? (
          <Route path={url + "/incoming"} component={Houses} />
        ) : (
          <Route path={url + "/sent"} component={Sent} />
        )}
        <Redirect to={url + (incoming ? "/incoming" : "/sent")} />
      </Switch>
    </div>
  );
};

export default Requests;
