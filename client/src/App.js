import { Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, useLocation, withRouter } from "react-router";
import "./App.css";
import Admin from "./Components/Pages/Admin/Admin";
import AdminSignin from "./Components/Pages/Auth/AdminSignIn/AdminSignin";
import Auth from "./Components/Pages/Auth/Auth";
import Logout from "./Components/Pages/Auth/Logout/Logout";
import VerificationPage from "./Components/Pages/Auth/Verify/VerificationPage";
import Outsider from "./Components/Pages/Outsider/Outsider";
import Superadmin from "./Components/Pages/Superadmin/Superadmin";
import SuperAdminMax from "./Components/Pages/SuperAdminMax/SuperAdminMax";
import { checkAuthStatus } from "./Components/redux/Auth/Login";

function App(props) {
  const location = useLocation();
  useEffect(() => {
    let unsupportedRoutes = ["verifyToken", "visitors"];
    let currentLocation = window.location.href;
    if (!unsupportedRoutes.some((el) => currentLocation.includes(el)))
      props.checkAuthStatus(); // checking authentication status of user on each reload
  }, []);

  useEffect(() => {
    let currentLocation =
      location.pathname === "/" ? "getout" : location.pathname;
    const unsupportedRoutes = [
      "auth",
      "logout",
      "verifytoken",
      "upload",
      "getout",
      "visitors",
    ];
    if (!unsupportedRoutes.some((el) => currentLocation.includes(el))) {
      localStorage.setItem("route", currentLocation);
    }
  }, [window.location.href, location.pathname]);

  // filtering routes based on the authentication state of user
  const getRoutes = () => {
    if (props.auth) {
      if (props.type === "company") {
        return (
          <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/verifytoken/:token" component={VerificationPage} />
            <Route path="/outsiders/form/register/:id" component={Outsider} />
            <Route path="/admin" component={SuperAdminMax} />
            <Redirect to="/admin" />
          </Switch>
        );
      } else if (props.type === "superadmin") {
        return (
          <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/verifytoken/:token" component={VerificationPage} />
            <Route path="/outsiders/form/register/:id" component={Outsider} />
            <Route path="/" component={Superadmin} />
            <Redirect to="/" />;
          </Switch>
        );
      } else if (props.type === "admin") {
        return (
          <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/verifytoken/:token" component={VerificationPage} />
            <Route path="/outsiders/form/register/:id" component={Outsider} />
            <Route path="/" component={Admin} />
            <Redirect to="/" />
          </Switch>
        );
      }
    } else {
      // unauthenticated routes
      return (
        <Switch>
          <Route path="/verifytoken/:token" component={VerificationPage} />
          <Route path="/outsiders/form/register/:id" component={Outsider} />
          <Route path="/admin/auth" component={AdminSignin} />
          <Route path="/auth" component={Auth} />
          <Redirect to="/auth" />
        </Switch>
      );
    }
  };
  return (
    <div className="App full-page-wrapper">
      {
        <Suspense fallback={<div>loading...</div>}>
          {props.loading ? <div>Authenticating...</div> : getRoutes()}
        </Suspense>
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth:
      state.login.data.token !== undefined && state.login.data.token !== null,
    loading: state.login.loading,
    error: state.login.error,
    type: state.login.data.type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthStatus: () => dispatch(checkAuthStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
