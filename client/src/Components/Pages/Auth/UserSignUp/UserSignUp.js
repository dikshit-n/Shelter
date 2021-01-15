import { useState } from "react";
import { connect } from "react-redux";
import { NavLink, useRouteMatch } from "react-router-dom";
import { loginSuccess } from "../../../redux/Auth/Login";
import AsyncButton from "../../../UI/AsyncButton/AsyncButton";
import EachField from "../../../UI/FormField/FormField";
import FormInfo from "../../../UI/FormInfo/FormInfo";
import { axiosInstance } from "../../../Utility/axiosInstance";
// import { setCookie } from "../../../Utility/cookies";
import "./UserSignUp.css";

const UserSignUp = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    type: "",
  });
  const match = useRouteMatch();
  // update
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
    setStatus({
      loading: true,
      status: "",
    });
    console.log(formData);
    axiosInstance
      .post("/verify/create-password", formData)
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
        if (res.status === 200) {
          props.history.replace("/auth");
        }
      })
      .catch((err) => {
        console.log(err);
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
        setMessage("Something went wrong !");
      });
  };
  const valid = () => {
    return Object.values(formData).every((el) => el.toString().trim() !== "");
  };

  var schema = [
    {
      name: "email",
      // displayName: "Name",
      placeholder: "User Name",
      type: "text",
      value: formData.email,
      onChange: changeHandler,
      required: true,
      spellCheck: false,
      autoComplete: "off",
      addon: <i className="fas fa-user" />,
      autoFocus: true,
      containerClassName: "sign-up-textboxes",
    },
    {
      name: "password",
      placeholder: "Create Password",
      type: passwordOpen ? "text" : "password",
      value: formData.password,
      onChange: changeHandler,
      required: true,
      spellCheck: false,
      autoComplete: "off",
      containerClassName: "sign-up-textboxes",
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
    {
      name: "type",
      type: "select",
      value: formData.type,
      onChange: changeHandler,
      required: true,
      containerClassName: "sign-up-textboxes signup-dropdown",
      options: ["User__user", "House Owner__owner"],
      placeholder: "Account Type",
      addon: <i className="fas fa-user-shield" />,
    },
  ];

  return (
    <div className="signin-container sign-up-mode">
      <div className="forms-container">
        <div className="layer"></div>
        <div className="signin-signup">
          <form onSubmit={submitHandler} className="sign-up-form">
            <h2 className="title white">Sign up</h2>
            <FormInfo info={message} />
            {schema.map((el, index) => (
              <EachField key={index} {...el} />
            ))}
            <br />
            <div className="d-flex justify-content-between auth-buttons flex-vertical-center margin-auto">
              <AsyncButton
                disabled={!valid()}
                type="submit"
                style={{ margin: 0 }}
                className="white bg-blue"
                loading={status.loading}
                status={status.status}
              >
                Create
              </AsyncButton>
              <NavLink
                className="white"
                to={match.url.replace("signup", "signin")}
              >
                Already a user ?
              </NavLink>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Hello there !</h3>
            <p>We are Happy to welcome you to our organization !</p>
          </div>
          <img
            src="img/log.svg"
            style={{ visibility: "hidden" }}
            className="image"
            alt=""
          />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Hello there !</h3>
            <p>We are Happy to welcome you to our organization !</p>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccessful: (token, userType) =>
      dispatch(loginSuccess(token, userType)),
    // setVerified: (status) => dispatch(setVerified(status)),
  };
};

const matchStateToProps = (state) => {
  return {
    token: state.login.data.temporaryToken,
    // email: state.login.data.email,
    temporaryType: state.login.data.temporaryType,
  };
};

export default connect(matchStateToProps, mapDispatchToProps)(UserSignUp);
