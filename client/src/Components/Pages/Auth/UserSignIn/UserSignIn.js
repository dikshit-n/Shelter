import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink, useRouteMatch } from "react-router-dom";
import { loginSuccess } from "../../../redux/Auth/Login";
import AsyncButton from "../../../UI/AsyncButton/AsyncButton";
import EachField from "../../../UI/FormField/FormField";
import FormInfo from "../../../UI/FormInfo/FormInfo";
import { axiosInstance } from "../../../Utility/axiosInstance";
import { setCookie } from "../../../Utility/cookies";
import "./UserSignIn.css";

const UserSignIn = (props) => {
  const match = useRouteMatch();
  useEffect(() => {
    localStorage.removeItem("route");
    localStorage.removeItem("userType");
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(" ");
  const [status, setStatus] = useState({
    loading: false,
    status: "",
  });
  const [passwordOpen, setPasswordOpen] = useState(false);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setMessage(" ");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formData);
    setStatus({
      loading: true,
      status: "",
    });
    axiosInstance
      .post("/server1/SignIn", formData)
      .then((res) => {
        console.log(res.data);
        setStatus({
          loading: false,
          status: "success",
        });
        setTimeout(() => {
          setStatus({
            loading: false,
            status: "",
          });
        }, 500);
        setCookie("token", res.data.token, {
          expires: new Date(3030, 0, 1).toUTCString(),
        });
        setCookie("userType", res.data.userType);
        props.loginSuccess(res.data);
      })
      .catch((err) => {
        setStatus({
          loading: false,
          status: "error",
        });
        setTimeout(() => {
          setStatus({
            loading: false,
            status: "",
          });
        }, 500);
        setMessage(err.response?.statusText || "Something went Wrong !");
      });
  };
  const valid = () => {
    return Object.values(formData).every((el) => el.toString().trim() !== "");
  };
  var schema = [
    {
      name: "email",
      // displayName: "Name",
      placeholder: "Email",
      type: "email",
      value: formData.email,
      onChange: changeHandler,
      required: true,
      spellCheck: false,
      autoComplete: "off",
      addon: <i className="fas fa-user" />,
      autoFocus: true,
    },
    {
      name: "password",
      // displayName: "Name",
      placeholder: "Password",
      type: passwordOpen ? "text" : "password",
      value: formData.password,
      onChange: changeHandler,
      required: true,
      spellCheck: false,
      autoComplete: "off",
      addon: (
        <i
          onClick={() => setPasswordOpen((prev) => !prev)}
          className={
            passwordOpen
              ? "fas fa-unlock lock-icon lock-icon-open"
              : "fas fa-lock lock-icon"
          }
        />
      ),
    },
  ];

  return (
    <div className="signin-container">
      <div className="forms-container">
        <div className="layer"></div>
        <div className="signin-signup">
          <form onSubmit={submitHandler} className="sign-in-form">
            <h2 className="title white">Sign in</h2>
            <FormInfo
              info={
                message === "Forbidden"
                  ? "Invalid Username / Password"
                  : message
              }
            />
            {schema.map((el, index) => (
              <EachField key={index} {...el} />
            ))}
            {/* <div className="input-field">
              <i className="fas fa-user" />
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock" />
              <input type="password" placeholder="Password" />
            </div> */}
            <div className="d-flex justify-content-between auth-buttons flex-vertical-center">
              <NavLink
                className="white"
                to={match.url.replace("signin", "signup")}
              >
                New user ?
              </NavLink>
              <AsyncButton
                disabled={!valid()}
                type="submit"
                className="signin-button"
                loading={status.loading}
                status={status.status}
              >
                Login
              </AsyncButton>
            </div>
          </form>

          {/* signupform 
          <form action="#" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user" />
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope" />
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock" />
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" className="btn" defaultValue="Sign up" />
          </form>
          */}
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Hello there !</h3>
            <p>At Last, This Is What You've Been Searching For</p>
            {/* <button className="btn bg-transparent white" id="sign-up-btn">
              Sign up
            </button> */}
          </div>
          <img
            src="img/log.svg"
            style={{ visibility: "hidden" }}
            className="image"
            alt=""
          />
        </div>
        {/* 
        Sign up
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div> */}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: (data) => dispatch(loginSuccess(data)),
  };
};

export default connect(null, mapDispatchToProps)(UserSignIn);
