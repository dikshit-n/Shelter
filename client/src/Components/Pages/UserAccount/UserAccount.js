import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import Sidebar from "../../UI/Sidebar/Sidebar";
import AddHouse from "./AddHouse/AddHouse";
import HomePage from "./HomePage/HomePage";
import HouseDetail from "./HomePage/HouseDetail/HouseDetail";
import MyHouseDetail from "./MyHouses/HouseDetail/HouseDetail";
import MyHouses from "./MyHouses/MyHouses";
import Profile from "./Profile/Profile";
import Requests from "./Requests/Requests";
import RoomMates from "./RoomMates/RoomMates";
import "./UserAccount.css";
import appLogo from "../../../assets/app-logo.png";

const UserAccount = (props) => {
  // const show = true;
  const addHouse = useSelector(
    (state) => state.login.data.userType === "owner"
  );
  const roomMates = useSelector(
    (state) => state.login.data.userType === "user"
  );
  var sidebarRoutes = [
    {
      component: (
        <div className="sidebar-logo">
          <img src={appLogo} alt=" " />
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
    { name: "Profile", to: "/profile", icon: "fas fa-user" },
    { name: "Requests", to: "/requests", icon: "fas fa-paper-plane" },
    { name: "Add House", to: "/addhouse", icon: "fas fa-upload" },
    addHouse
      ? { name: "My Houses", to: "/myhouses", icon: "fas fa-dollar-sign" }
      : null,
    roomMates
      ? { name: "Room Mates", to: "/roommates", icon: "fas fa-user-friends" }
      : null,
    { name: "Logout", to: "/logout", icon: "fas fa-power-off" },
  ].filter((el) => el !== null);

  return (
    <div className="page-container">
      <Sidebar routes={sidebarRoutes} />
      <div className="page-content">
        <Route path="/requests" component={Requests} />
        {addHouse ? (
          <Route path="/myhouses/:id" exact component={MyHouseDetail} />
        ) : null}
        {roomMates ? <Route path="/roommates" component={RoomMates} /> : null}
        {addHouse ? (
          <Route path="/myhouses" exact component={MyHouses} />
        ) : null}
        <Route path="/addhouse" exact component={AddHouse} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/home" exact component={HomePage} />
        <Route path="/home/:id" component={HouseDetail} />
        <Redirect to={"/home"} />
      </div>
    </div>
  );
};

export default UserAccount;
