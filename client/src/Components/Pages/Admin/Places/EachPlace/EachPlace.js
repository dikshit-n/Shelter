import ReactTooltip from "react-tooltip";
import "./EachPlace.css";
import uniqueId from "uniqid";
import { Fragment } from "react";

const EachPlace = (props) => {
  const statusId = uniqueId();
  console.log(props.status);
  return (
    <div>
      {props.status && (
        <ReactTooltip
          id={statusId}
          type={props.status === "open" ? "success" : "warning"}
          place="top"
          effect="solid"
        >
          <span>{props.status === "open" ? "Active" : "Closed"}</span>
        </ReactTooltip>
      )}
      <div
        className="each-place d-flex justify-content-between pointer flex-wrap"
        onClick={props.onClick}
      >
        <div className="each-place-info flex-row flex-wrap flex-vertical-center">
          <div
            className="each-place-image"
            style={{ backgroundImage: `url(${props.image})` }}
          ></div>
          <h6 className="margin-none">{props.name}</h6>
        </div>
        <div
          data-tip
          data-for={statusId}
          style={{
            background:
              props.status === "open"
                ? "#4DC274"
                : props.status === "closed"
                ? "#E5D934"
                : "transparent",
          }}
          className="place-status-indicator"
        ></div>
      </div>
    </div>
  );
};

export default EachPlace;
