import { Redirect, Route } from "react-router";
import Sidebar from "../../UI/Sidebar/Sidebar";
import AddHouse from "./AddHouse/AddHouse";
import HomePage from "./HomePage/HomePage";
import HouseDetail from "./HomePage/HouseDetail/HouseDetail";
import "./UserAccount.css";

const UserAccount = (props) => {
  var sidebarRoutes = [
    // {
    //   component: (
    //     <div className="sidebar-logo">
    //       <img src={schoolLogo} alt=" " />
    //     </div>
    //   ),
    // },
    // {
    //   profile: {
    //     name: "Mani",
    //     to: "/profile",
    //   },
    // },
    { name: "Home", to: "/home", icon: "fa fa-home" },
    { name: "Profile", to: "/profile", icon: "fas fa-user" },
    { name: "Requests", to: "/requests", icon: "fas fa-paper-plane" },
    { name: "Add House", to: "/addhouse", icon: "fas fa-upload" },
    { name: "Logout", to: "/logout", icon: "fas fa-power-off" },
  ];

  return (
    <div className="page-container">
      <Sidebar routes={sidebarRoutes} />
      <div className="page-content">
        <Route path="/addhouse" exact component={AddHouse} />
        <Route path="/home" exact component={HomePage} />
        <Route path="/home/:id" component={HouseDetail} />
        <Redirect to={"/home"} />
      </div>
    </div>
  );
};

export default UserAccount;
