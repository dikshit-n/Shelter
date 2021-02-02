import { Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, useLocation, withRouter } from "react-router";
import "./App.css";
import Auth from "./Components/Pages/Auth/Auth";
import Logout from "./Components/Pages/Auth/Logout/Logout";
import { checkAuthStatus } from "./Components/redux/Auth/Login";
import UserAccount from "./Components/Pages/UserAccount/UserAccount";
// import { setCookie } from "./Components/Utility/cookies";
import AppSpinner from "./Components/UI/AppSpinner/AppSpinner";

function App(props) {
  const location = useLocation();
  useEffect(() => {
    props.checkAuthStatus();
    // setCookie("token", "waidskjm");
    // let unsupportedRoutes = ["verifyToken", "visitors"];
    // let currentLocation = window.location.href;
    // if (!unsupportedRoutes.some((el) => currentLocation.includes(el)))
    //   props.checkAuthStatus(); // checking authentication status of user on each reload
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
      return (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/" component={UserAccount} />
          <Redirect to="/" />;
        </Switch>
      );
    } else {
      // unauthenticated routes
      return (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Redirect to="/auth" />
        </Switch>
      );
    }
  };
  return (
    <div className="App full-page-wrapper">
      {
        <Suspense fallback={<AppSpinner />}>
          {props.loading ? <AppSpinner /> : getRoutes()}
        </Suspense>
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth:
      state.login.data.token !== undefined && state.login.data.token !== null,
    // auth: true,
    loading: state.login.loading,
    error: state.login.error,
    // type: state.login.data.type,
    type: "user",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthStatus: () => dispatch(checkAuthStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

// import { useState } from "react";
// import "./App.css";
// import AsyncButton from "./Components/UI/AsyncButton/AsyncButton";
// import EachField from "./Components/UI/FormField/FormField";
// import { axiosInstance } from "./Components/Utility/axiosInstance";

// const App = (props) => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [passwordOpen, setPasswordOpen] = useState(false);

//   const changeHandler = (event) => {
//     const { name, value } = event.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   var schema = [
//     {
//       name: "email",
//       // displayName: "Name",
//       placeholder: "User Name",
//       type: "text",
//       value: formData.email,
//       onChange: changeHandler,
//       required: true,
//       spellCheck: false,
//       autoComplete: "off",
//       addon: <i className="fas fa-user" />,
//       autoFocus: true,
//     },
//     {
//       name: "password",
//       // displayName: "Name",
//       placeholder: "Password",
//       type: passwordOpen ? "text" : "password",
//       value: formData.password,
//       onChange: changeHandler,
//       required: true,
//       spellCheck: false,
//       autoComplete: "off",
//       addon: (
//         <i
//           onClick={() => setPasswordOpen((prev) => !prev)}
//           className={
//             passwordOpen
//               ? "fas fa-unlock lock-icon lock-icon-open"
//               : "fas fa-lock lock-icon"
//           }
//         />
//       ),
//     },
//   ];

//   const submitHandler = (event) => {
//     event.preventDefault();
//     console.log(formData);
//     axiosInstance
//       .post("/signin", formData)
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const valid = () => {
//     return Object.values(formData).every((el) => el.toString().trim() !== "");
//   };

//   return (
//     <form onSubmit={submitHandler}>
//       {schema.map((el, index) => (
//         <EachField key={index} {...el} />
//       ))}
//       <AsyncButton disabled={!valid()} type="submit" className="signin-button">
//         Login
//       </AsyncButton>
//     </form>
//   );
// };

// export default App;
