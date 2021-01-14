import Profile from "./Profile/Profile";
import "./Admin.css";
import { Switch, Route, Redirect, useLocation } from "react-router";
import Sidebar from "../../UI/Sidebar/Sidebar";
import Buses from "./Buses/Buses";
import Parents from "./Parents/Parents";
import Places from "./Places/Places";
import Employees from "./Employee/Employees";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import uniqueId from "uniqid";
import { UncontrolledTooltip } from "reactstrap";
import FileUploadPage from "../../UI/FileUploadComponent/FileUploadPage/FileUploadPage";
import Visitors from "./Visitors/Visitors";
import Home from "./Home/Home";
// import { getCookie } from "../../Utility/cookies";

const Admin = (props) => {
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
    //     to: "/profile",
    //   },
    // },
    { name: "Home", to: "/home", icon: "fa fa-home" },
    { name: "Employee", to: "/employees", icon: "fas fa-user-tie" },
    {
      name: "Students",
      to: "/parents",
      icon: "fas fa-user-friends",
    },
    { name: "Transport", to: "/transport", icon: "fas fa-bus" },
    { name: "Places", to: "/places", icon: "fa fa-map-marker" },
    { name: "Visitors", to: "/outsiders", icon: "fa fa-eye" },
  ];

  var topRightRoutes = [
    {
      component: (
        <NavLink
          // activeClassName="nav-profile-active"
          to="/profile"
          style={{ backgroundImage: `url(${avatar})` }}
          className="top-right-profile"
        />
      ),
    },
    {
      name: "Support",
      to: "/home",
      icon: "far fa-comment",
      notActive: true,
      id: supportId,
    },
    {
      name: "Logout",
      to: "/logout",
      icon: "fas fa-power-off",
      id: logoutId,
    },
  ];
  let redirectTo = localStorage.getItem("route");
  console.log(redirectTo);
  return (
    <div className="page-container">
      <UncontrolledTooltip
        fade
        innerClassName="bg-black top-right-arrow"
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
          <Route path="/uploadfile" component={FileUploadPage} />
          <Route path="/outsiders" component={Visitors} />
          <Route path="/places" component={Places} />
          <Route path="/transport" component={Buses} />
          <Route path="/parents" component={Parents} />
          <Route path="/employees" component={Employees} />
          <Route path="/home" component={Home} />
          <Route path="/profile" component={Profile} />
          <Redirect to={redirectTo || "/home"} />
        </Switch>
      </div>
    </div>
  );
};
export default Admin;
