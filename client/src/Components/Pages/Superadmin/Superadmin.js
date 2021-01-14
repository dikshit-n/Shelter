import Profile from "./Profile/Profile";
import "./Superadmin.css";
import { Switch, Route, Redirect } from "react-router";
import Sidebar from "../../UI/Sidebar/Sidebar";
import Add from "./Staffs/Add/Add";
import View from "./Staffs/View/View";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import uniqueId from "uniqid";
import { UncontrolledTooltip } from "reactstrap";
import Home from "./Home/Home";

const SuperAdmin = (props) => {
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

    { name: "Home", to: "/home", icon: "fa fa-home" },
    {
      name: "Admin",
      letterIcon: "A",
      dropdown: [
        { name: "Add", to: "/add", letterIcon: "Ad" },
        { name: "View", to: "/view", letterIcon: "vi" },
      ],
    },
  ];

  var topRightRoutes = [
    {
      component: (
        <NavLink
          to="/profile"
          style={{ backgroundImage: `url(${avatar})` }}
          className="top-right-profile"
        />
      ),
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
  console.log(redirectTo);
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
      >
        Logout
      </UncontrolledTooltip>
      <Sidebar routes={sidebarRoutes} topRightRoutes={topRightRoutes} />
      <div className="page-content">
        <div className="dummy-div"></div>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/add" component={Add} />
          <Route
            path="/view"
            render={(props) => (
              <div className="height_100 employees-container">
                <View {...props} />
              </div>
            )}
          />
          <Route path="/profile" component={Profile} />
          <Redirect to={redirectTo || "/home"} />
        </Switch>
      </div>
    </div>
  );
};
export default SuperAdmin;
