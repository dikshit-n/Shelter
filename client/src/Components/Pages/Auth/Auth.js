import "./Auth.css";
import { Redirect, Route, Switch } from "react-router";
import UserSignIn from "./UserSignIn/UserSignIn";
import UserSignUp from "./UserSignUp/UserSignUp";
import { useEffect } from "react";
// const lazySignIn = import("./SignIn/SignIn");
// const lazySignUp = import("./SignUp/SignUp");

const Auth = (props) => {
  useEffect(() => {
    localStorage.removeItem("route");
  }, []);
  return (
    <Switch>
      <Route path={props.match.url + "/signin"} exact component={UserSignIn} />
      <Route path={props.match.url + "/signup"} component={UserSignUp} />
      {/* <Route path={props.match.url + "/signup"} component={Signup} /> */}
      <Redirect to={props.match.url + "/signin"} />
    </Switch>
  );
};

export default Auth;
