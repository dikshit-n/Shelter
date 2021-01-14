import "./EachBus.css";
import BusRed from "../../../../../assets/bus_red.png";
import BusYellow from "../../../../../assets/bus_yellow.png";
import BusGreen from "../../../../../assets/bus_green.jpg";
import ReactTooltip from "react-tooltip";
import uniqueId from "uniqid";
import { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";

const EachBus = (props) => {
  const toolTipId = uniqueId();
  return (
    <Fragment>
      <ReactTooltip
        id={toolTipId}
        place="top"
        type={
          props.status === "idle"
            ? "warning"
            : props.status === "emergency"
            ? "error"
            : props.status === "running"
            ? "success"
            : "dark"
        }
        effect="float"
      >
        <span>{props.status?.toUpperCase()}</span>
      </ReactTooltip>
      <NavLink
        to={props.match.url + `/${props.busId}/${props.status}`}
        data-for={toolTipId}
        data-tip
        className="each-bus-container"
      >
        <div
          className="each-bus"
          // style={{
          //   backgroundImage:
          //     `url(` +
          //     (props.status === "running"
          //       ? BusGreen
          //       : props.status === "idle"
          //       ? BusYellow
          //       : BusRed) +
          //     `)`,
          // }}
        >
          <img
            src={
              props.status === "running"
                ? BusGreen
                : props.status === "idle"
                ? BusYellow
                : BusRed
            }
            alt=" "
            width="100%"
            height="100%"
          />
        </div>
        <div className="bus-details">
          <h6 className="overflow-elipsis">{props.busNo}</h6>
          <p className="overflow-elipsis">{props.routeCode}</p>
        </div>
      </NavLink>
    </Fragment>
  );
};
export default withRouter(EachBus);
