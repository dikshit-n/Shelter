import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { NavLink, useRouteMatch } from "react-router-dom";
import { loginSuccess } from "../../../redux/Auth/Login";
import AsyncButton from "../../../UI/AsyncButton/AsyncButton";
import EachField from "../../../UI/FormField/FormField";
import FormInfo from "../../../UI/FormInfo/FormInfo";
import { axiosInstance } from "../../../Utility/axiosInstance";
import { setCookie } from "../../../Utility/cookies";
import { filterNumbers } from "../../../Utility/filterNumbers";
// import { setCookie } from "../../../Utility/cookies";
import "./UserSignUp.css";

let country_state_district = require("country_state_district");

let districts = country_state_district.getDistrictsByStateId(32);

const UserSignUp = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    phone: "",
    gender: "",
    town: "",
    district: "",
    email: "",
  });
  const match = useRouteMatch();
  const dispatch = useDispatch();
  // update
  const [message, setMessage] = useState(" ");
  const [status, setStatus] = useState({
    loading: false,
    status: "",
  });
  const [passwordOpen, setPasswordOpen] = useState(false);

  const changeHandler = (event) => {
    var { name, value } = event.target;
    const numberTypes = ["phone"];
    if (numberTypes.some((el) => el === name)) value = filterNumbers(value);
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
      .post("/server1/SignUp", {
        ...formData,
        phone: formData.phone.toString(),
      })
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
        props.history.replace("auth/signin");
        // setCookie("token", res.data.token, {
        //   expires: new Date(3030, 0, 1).toUTCString(),
        // });
        // dispatch(loginSuccess(res.data));
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
      name: "name",
      // displayName: "Name",
      placeholder: "User Name",
      type: "text",
      value: formData.name,
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
      name: "phone",
      type: "text",
      value: formData.phone,
      onChange: changeHandler,
      required: true,
      containerClassName: "sign-up-textboxes",
      placeholder: "Contact Number",
      addon: <i className="fas fa-phone" />,
    },
    {
      type: "select",
      options: [...districts.map((el) => el.name)],
      placeholder: "Choose District",
      value: formData.district,
      name: "district",
      onChange: changeHandler,
      containerClassName: "sign-up-textboxes signup-dropdown",
      required: true,
      addon: <i className="fas fa-map-marker" />,
    },
    {
      name: "town",
      type: "text",
      value: formData.town,
      onChange: changeHandler,
      required: true,
      containerClassName: "sign-up-textboxes",
      placeholder: "Town",
      addon: <i className="fas fa-city" />,
    },
    {
      name: "gender",
      type: "select",
      value: formData.gender,
      onChange: changeHandler,
      required: true,
      containerClassName: "sign-up-textboxes signup-dropdown",
      placeholder: "Gender",
      options: ["Male", "Female", "Non-Binary"],
      addon: <i className="fas fa-venus" />,
    },
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
      addon: <i className="fas fa-envelope" />,
      autoFocus: true,
      containerClassName: "sign-up-textboxes",
    },
  ];

  // {
  //   name: "type",
  //   type: "select",
  //   value: formData.type,
  //   onChange: changeHandler,
  //   required: true,
  //   containerClassName: "sign-up-textboxes signup-dropdown",
  //   options: ["User__user", "House Owner__owner"],
  //   placeholder: "Account Type",
  //   addon: <i className="fas fa-user-shield" />,
  // },

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
            <p>At Last, This Is What You've Been Searching For</p>
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
            <p>At Last, This Is What You've Been Searching For</p>
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
