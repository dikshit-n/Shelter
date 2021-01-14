import React from "react";
import "./iOS_Checkbox.css";

const iOS_Checkbox = (props) => {
  return (
    <div className={"toggleWrapper " + props.className}>
      <input
        type="checkbox"
        {...props}
        disabled={props.disabled || props.loading}
        className={"mobileToggle"}
        aria-disabled={props.loading || props.disabled}
      />

      <label
        for={props.id}
        className={props.loading ? "checkbox-loading" : ""}
      ></label>
    </div>
  );
};

export default iOS_Checkbox;
