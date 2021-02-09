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
import DefaultLogo from "../../../assets/default-logo.png";
import appGif from "../../../assets/app-logo.gif";
import appGif2 from "../../../assets/app-logo2.gif";
import appGif3 from "../../../assets/app-logo3.gif";
import appGif4 from "../../../assets/app-logo4.gif";
import appGif5 from "../../../assets/app-logo5.gif";
import appGif6 from "../../../assets/app-logo6.gif";


const UserAccount = (props) => {
  // const show = true;
  var sidebarLogo = appLogo;
  let route = window.location.href;
  console.log(route);

  if (route.includes("/home")) {
    sidebarLogo = appLogo;
  }
  else if(route.includes("/requests/sent")){
    sidebarLogo = appGif2;
  }
  else if(route.includes("/profile")){
    sidebarLogo = appGif3;
  }
  else if(route.includes("/roommates")){
    sidebarLogo = appGif4;
  }
  else if(route.includes("/requests/incoming")){
    sidebarLogo = appGif5;
  }
  else if(route.includes("/myhouses")){
    sidebarLogo = appGif6;
  }
  else if(route.includes("/addhouse")){
    sidebarLogo = appGif;
  }
  

  const logo = useSelector((state) => state.login.data.logo);
  const userName = useSelector((state) => state.login.data.userName);
  const addHouse = useSelector(
    (state) =>
      state.login.data.userType === "owner" ||
      state.login.data.userType === "Owner"
  );
  const roomMates = useSelector(
    (state) =>
      state.login.data.userType === "user" ||
      state.login.data.userType === "User"
  );
  var sidebarRoutes = [
    {
      component: (
        <>
          <div className="sidebar-logo">
            <img src={sidebarLogo} alt=" " />
          </div>
          <br />
          {/* <hr style={{ marginTop: 0 }} /> */}
        </>
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

  const heading = (
    <div className="app-heading flex-vertical-center flex-row">
      <div
        className="top-logo"
        style={{ backgroundImage: `url(${logo || DefaultLogo})` }}
      ></div>
      <span>Hey, {userName}</span>
    </div>
  );

  return (
    <div className="page-container">
      <Sidebar routes={sidebarRoutes} heading={heading} />
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
