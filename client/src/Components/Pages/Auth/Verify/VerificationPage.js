import React, { Fragment, useEffect, useState } from "react";
import "./VerificationPage.css";
import Spinner from "../../../UI/Spinner/Spinner";
// import { Redirect } from "react-router";
import { connect } from "react-redux";
import { setTemporaryToken } from "../../../redux/Auth/Login";
import AsyncButton from "../../../UI/AsyncButton/AsyncButton";
import { deleteCookie } from "../../../Utility/cookies";
import { axiosInstance } from "../../../Utility/axiosInstance";
import { Route, Switch } from "react-router";
import UserSignUp from "../UserSignUp/UserSignUp";

const VerificationPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [verifyToken, setVerifyToken] = useState(true);
  const [type, setType] = useState("");
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.open(
      "http://65.0.72.225:5000/verifytoken/fbjmz4zf1j9ez5w",
      "_blank",
      "toolbar=0,location=0,menubar=0"
    );
    localStorage.removeItem("route");
    setLoading(true);
    let tokenArray = window.location.href.split("/");
    let token = tokenArray[tokenArray.length - 1];
    console.log(token);
    axiosInstance
      .post("/verify/mail-token", { token: token })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        // props.setVerified(true);
        props.storeToken(res.data.id, res.data.type);
        deleteCookie("token");
        setType("success");
        setShow(true);
        setStatus(res.status);
        // setTimeout(() => {
        // }, 2000);
      })
      .catch((err) => {
        setLoading(false);
        deleteCookie("token");
        setType("error");
        setShow(true);
        setTimeout(() => {
          setStatus(err.response.status);
        }, 500);
        console.log(err);
      });
  }, []);

  const hideAlert = () => {
    setShow(false);
    if (status === 200) {
      setTimeout(() => {
        // props.history.replace(props.match.url + "/signup");
        setVerifyToken(false);
      }, 500);
    } else {
      setTimeout(() => {
        props.history.replace("/auth/signin");
      }, 500);
    }
  };

  console.log(props.match.url + "/signup");

  return verifyToken ? (
    <div className="full-page-wrapper flex-center flex-column">
      {loading ? (
        <Spinner />
      ) : show ? (
        <Fragment>
          <AsyncButton loading={false} status={type}></AsyncButton>
          <AsyncButton style={{ color: "var(--green)" }} onClick={hideAlert}>
            Continue
          </AsyncButton>
        </Fragment>
      ) : status !== null ? (
        <Fragment>
          <Spinner />
          <h4>Redirecting...</h4>
        </Fragment>
      ) : (
        <Spinner />
      )}
    </div>
  ) : (
    <UserSignUp {...props} />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    // setVerified: (status) => dispatch(setVerified(status)),
    storeToken: (token, temporaryType) =>
      dispatch(setTemporaryToken(token, temporaryType)),
  };
};

export default connect(null, mapDispatchToProps)(VerificationPage);
