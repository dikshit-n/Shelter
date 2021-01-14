import React, { useEffect, useState } from "react";
import SmallSpinner from "../SmallSpinner/SmallSpinner";
import "./AsyncButton.css";
import uniqueId from "uniqid";

const AsyncButton = (props) => {
  const [buttonId] = useState(uniqueId());
  // let styles = {
  //   ...props.style,
  // };
  // if (props.loading) {
  //   styles = {
  //     ...props.style,
  //     paddingTop: "10px",
  //     paddingBottom: "10px",
  //   };
  // }

  useEffect(() => {
    var button = document.getElementById(buttonId);
    if (props.loading) {
      if (!button.classList.contains("animate")) {
        button.classList.add("animate");
      }
    } else {
      if (props.status) button.classList.add("animate");
      if (props.status && props.status !== "") {
        if (props.status === "success") {
          button.classList.add("success", "button-green");
        } else if (props.status === "error") {
          button.classList.add("error", "button-red");
        }
      } else if (props.status === "") {
        button.classList.remove("animate");
        button.classList.remove("error", "button-red");
        button.classList.remove("success", "button-green");
      }
    }
  }, [props.loading, props.status]);
  return (
    // <button
    //   style={{ ...props.style }}
    //   disabled={props.disabled || props.loading}
    //   className={
    //     props.loading
    //       ? "loading-style " +
    //         (props.className
    //           ? props.className + " bg-green my-button"
    //           : "bg-green my-button")
    //       : props.className
    //       ? props.className + " bg-green my-button"
    //       : "bg-green my-button"
    //   }
    //   type={props.type ? props.type : "button"}
    //   onClick={props.loading ? () => {} : props.onClick}
    // >
    //   <div className={props.loading ? "show" : "hide"}>
    //     <SmallSpinner />{" "}
    //   </div>
    //   <div className={props.loading ? "hide" : "show"}>{props.children}</div>
    // </button>
    <button
      id={buttonId}
      type={props.type ? props.type : "button"}
      className={"button " + props.className}
      onClick={props.loading ? () => {} : props.onClick}
      style={{ ...props.style }}
      disabled={
        props.disabled ||
        props.loading ||
        props.status === "success" ||
        props.status === "error"
      }
    >
      {props.loading ? (
        <SmallSpinner />
      ) : props.status === "success" || props.status === "error" ? (
        ""
      ) : (
        props.children
      )}
    </button>
  );
};

export default AsyncButton;
