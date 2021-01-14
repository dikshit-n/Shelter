import React from "react";
import "./FormInfo.css";

const FormInfo = (props) => {
  let classes = ["info", props.className ? props.className : ""];
  return (
    <div className={classes.join(" ")}>
      <p
        className="text-center remove-para-margin"
        style={{ color: props.color ? props.color : "coral" }}
      >
        {props.info}
      </p>
    </div>
  );
};

export default FormInfo;
