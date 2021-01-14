import { Fragment } from "react";
import { loop } from "../../../Utility/loop";
import "./Loader.css";

const Loader = (props) => {
  return (
    <Fragment>
      {props.count ? (
        loop(props.count[0] ? props.count[0] : 3, (index) => (
          <tr style={{ height: 50 }} key={index}>
            {props.number ? (
              <td style={{ minWidth: 50, maxWidth: "fit-content" }}>
                <div
                  className="skeleton-box"
                  style={{ width: "100%", height: 30 }}
                ></div>
              </td>
            ) : null}
            {loop(props.count[1] ? props.count[1] : 3, (index) => (
              <td key={index}>
                <div
                  className="skeleton-box"
                  style={{ width: "100%", height: 30 }}
                ></div>
              </td>
            ))}
          </tr>
        ))
      ) : (
        <Fragment>
          <tr>
            {props.number ? (
              <td style={{ minWidth: 50, maxWidth: "fit-content" }}>
                <div
                  className="skeleton-box"
                  style={{ width: "100%", height: 30 }}
                ></div>
              </td>
            ) : null}
            <td>
              <div
                className="skeleton-box"
                style={{ width: "100%", height: 30 }}
              ></div>
            </td>
            <td>
              <div
                className="skeleton-box"
                style={{ width: "100%", height: 30 }}
              ></div>
            </td>
            <td>
              <div
                className="skeleton-box"
                style={{ width: "100%", height: 30 }}
              ></div>
            </td>
          </tr>
          <tr>
            {props.number ? (
              <td style={{ minWidth: 50, maxWidth: "fit-content" }}>
                <div
                  className="skeleton-box"
                  style={{ width: "100%", height: 30 }}
                ></div>
              </td>
            ) : null}
            <td>
              <div
                className="skeleton-box"
                style={{ width: "100%", height: 30 }}
              ></div>
            </td>
            <td>
              <div
                className="skeleton-box"
                style={{ width: "100%", height: 30 }}
              ></div>
            </td>
            <td>
              <div
                className="skeleton-box"
                style={{ width: "100%", height: 30 }}
              ></div>
            </td>
          </tr>
          <tr>
            {props.number ? (
              <td style={{ minWidth: 50, maxWidth: "fit-content" }}>
                <div
                  className="skeleton-box"
                  style={{ width: "100%", height: 30 }}
                ></div>
              </td>
            ) : null}
            <td>
              <div
                className="skeleton-box"
                style={{ width: "100%", height: 30 }}
              ></div>
            </td>
            <td>
              <div
                className="skeleton-box"
                style={{ width: "100%", height: 30 }}
              ></div>
            </td>
            <td>
              <div
                className="skeleton-box"
                style={{ width: "100%", height: 30 }}
              ></div>
            </td>
          </tr>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Loader;
