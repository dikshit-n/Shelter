import "./Logout.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCookie } from "../../../Utility/cookies";
import { axiosInstance } from "../../../Utility/axiosInstance";
// import { logout } from "../../../redux/Auth/Login";
import { deleteToken, logout } from "../../../redux/Auth/Login/loginActions";

const Logout = (props) => {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.login.data.type);
  localStorage.removeItem("route");
  // dispatch(logout());
  window.location.reload();
  useEffect(() => {
    localStorage.removeItem("route");
    deleteCookie("token");
    axiosInstance.post("/logout");
    // setTimeout(() => {
    //   dispatch(deleteToken());
    //   props.history.replace(type === "company" ? "/admin/auth" : "/auth");
    //   // dispatch(logout());
    // }, 500);
  }, []);
  return <div>logging out.....</div>;
};

export default Logout;
