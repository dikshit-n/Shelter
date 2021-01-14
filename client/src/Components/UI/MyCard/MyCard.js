import React, { Fragment } from "react";
import { CardTitle } from "reactstrap";
import "./MyCard.css";

const MyCard = (props) => {
  let classNames = ["my-card", props.className ? props.className : ""];
  return (
    <div
      className={classNames.join(" ")}
      style={props.style}
      onClick={props.onClick}
    >
      {props.title ? (
        <Fragment>
          <CardTitle>
            <h4
              className="card-title-responsive"
              style={{
                ...props.titleStyle,
                textAlign: props.titleCenter ? "center" : "left",
              }}
            >
              {props.title}
            </h4>
          </CardTitle>
        </Fragment>
      ) : null}
      {props.children}
    </div>
  );
};

export default MyCard;
