import { Fragment, useEffect, useState } from "react";
import "./Toggler.css";
import uniqueId from "uniqid";

const Toggler = (props) => {
  const UniqueId = uniqueId();
  const getActiveProperties = (id) => {
    console.log(id);
    const activeLink = document.getElementById(id);
    if (activeLink !== null) {
      return {
        width: activeLink.offsetWidth,
        height: activeLink.offsetHeight,
        left: activeLink.offsetLeft,
      };
    }
    return {};
  };

  const [activeProperties, setActiveProperties] = useState({});

  useEffect(() => {
    setActiveProperties(getActiveProperties("0" + UniqueId));
  }, []);

  return (
    <Fragment>
      <style>
        {`.active-toggler-line{
          position: absolute;
          left: ${activeProperties.left - 10}px;
          bottom: 0;
          width: ${activeProperties.width + 10}px;
          height: ${activeProperties.height + 10}px;
          background: ${props.markerStyle?.background || "var(--my-blue)"};
          transition: all 0.3s ease;
        }`}
      </style>
      <div
        className={"toggler-navigator " + props.containerClassName}
        style={{ ...props.containerStyle, cursor: "pointer" }}
      >
        <div className="toggle-navigation-container flex-row flex-wrap">
          {props.routes.map((el, index) => (
            <div
              key={index}
              id={index + UniqueId}
              style={{ ...props.eachElementStyle, zIndex: 1 }}
              to={el.to || "#"}
              className={
                "each-toggle-navigation no-break" + props.eachElementClassName
              }
              activeClassName="toggle-navigator-active"
              {...el.actions}
              onClick={() => {
                el.actions?.onClick();
                setActiveProperties(getActiveProperties(index + UniqueId));
              }}
            >
              <small className="black">
                <strong>{el.name}</strong>
              </small>
            </div>
          ))}
          <div
            style={{ ...props.markerStyle, zIndex: 0 }}
            className={"active-toggler-line " + props.markerClassName}
          ></div>
        </div>
      </div>
    </Fragment>
  );
};

export default Toggler;
