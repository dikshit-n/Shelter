import { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./RequestsNavigator.css";

const RequestsNavigator = (props) => {
  const getActiveProperties = () => {
    const activeLink = document.querySelector(".request-navigator-active");
    if (activeLink !== null) {
      return {
        width: activeLink.offsetWidth,
        left: activeLink.offsetLeft,
      };
    }
    return {};
  };

  const [activeProperties, setActiveProperties] = useState({});

  useEffect(() => {
    setActiveProperties(getActiveProperties());
  }, [window.location.href]);

  return (
    <Fragment>
      <style>
        {`.active-line{
          position: absolute;
          left: ${activeProperties.left}px;
          bottom: 0;
          width: ${activeProperties.width}px;
          height: 2px;
          background: var(--my-blue);
          transition: all 0.3s ease;
        }`}
      </style>
      <div className="request-navigator">
        <div className="navigation-container">
          {props.routes.map((el, index) => (
            <NavLink
              key={index}
              className="each-navigation no-wrap"
              activeClassName="request-navigator-active"
              to={el.to}
            >
              {el.name}
            </NavLink>
          ))}
          <div className="active-line"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default RequestsNavigator;
