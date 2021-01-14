import Profile from "./Profile/Profile";
import "./SuperAdminMax.css";
import { Switch, Route, Redirect } from "react-router";
import Sidebar from "../../UI/Sidebar/Sidebar";
import Add from "./Schools/Add/Add";
import View from "./Schools/View/View";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UncontrolledTooltip } from "reactstrap";
import uniqueId from "uniqid";
// import { getCookie } from "../../Utility/cookies";

const SuperAdminMax = (props) => {
  const supportId = uniqueId();
  const logoutId = uniqueId();
  const schoolLogo = useSelector((state) => state.login.data.schoolLogo);
  const avatar = useSelector((state) => state.login.data.avatar);
  var sidebarRoutes = [
    {
      component: (
        <div className="sidebar-logo">
          <img src={schoolLogo} alt=" " />
        </div>
      ),
    },
    // {
    //   profile: {
    //     name: "Mani",
    //     to: props.match.url + "/profile",
    //   },
    // },
    { name: "Home", to: props.match.url + "/home", icon: "fa fa-home" },
    {
      name: "Super Admin",
      letterIcon: "S",
      dropdown: [
        { name: "Add", to: props.match.url + "/add", letterIcon: "Ad" },
        { name: "View", to: props.match.url + "/view", letterIcon: "vi" },
      ],
    },
  ];

  var topRightRoutes = [
    {
      component: (
        <NavLink
          to={props.match.url + "/profile"}
          style={{ backgroundImage: `url(${avatar})` }}
          className="top-right-profile"
        />
      ),
      to: "/logout",
    },
    {
      name: "Support",
      to: "/",
      icon: "far fa-comment",
      notActive: true,
      id: supportId,
    },
    { name: "Logout", to: "/logout", icon: "fas fa-power-off", id: logoutId },
  ];

  let redirectTo = localStorage.getItem("route");

  return (
    <div className="page-container">
      <UncontrolledTooltip
        fade
        innerClassName="bg-black top-right-arrow"
        autohide={false}
        placement="bottom"
        target={supportId}
      >
        Support
      </UncontrolledTooltip>
      <UncontrolledTooltip
        fade
        innerClassName="bg-black top-right-arrow"
        placement="bottom"
        target={logoutId}
        autohide={false}
      >
        Logout
      </UncontrolledTooltip>
      <Sidebar routes={sidebarRoutes} topRightRoutes={topRightRoutes} />
      <div className="page-content">
        <Switch>
          <Route path={props.match.url + "/add"} component={Add} />
          <Route path={props.match.url + "/view"} component={View} />
          <Route
            path={props.match.url + "/home"}
            render={() => <div>Hello</div>}
          />
          <Route path={props.match.url + "/profile"} component={Profile} />
          <Redirect to={redirectTo || props.match.url + "/home"} />
        </Switch>
      </div>
    </div>
  );
};
export default SuperAdminMax;
