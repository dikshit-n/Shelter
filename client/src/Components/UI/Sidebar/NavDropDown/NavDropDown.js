import { useState } from "react";
import uniqueid from "uniqid";

const { NavLink } = require("react-router-dom");

const NavDropDown = (props) => {
  // const [open, setOpen] = useState(
  //   props.el.dropdown.some((el) => window.location.href.endsWith(el.to))
  // );
  const id = useState(uniqueid());
  const toggle = () => {
    const allDropdowns = document.querySelectorAll(".s-layout-dropdown");
    allDropdowns.forEach((el) => {
      if (el.id.split(",")[0] !== id[0]) {
        el.style.maxHeight = "4em";
      }
    });
    const thisDropDown = document.getElementById(id);
    if (thisDropDown.style.maxHeight === "500px") {
      thisDropDown.style.maxHeight = `4em`;
      thisDropDown.style.overflow = `hidden`;
    } else thisDropDown.style.maxHeight = "500px";
  };

  return (
    <div href="#" key={props.index} className="s-layout-dropdown" id={id}>
      <div className="dropdown-heading" onClick={toggle}>
        <div className="s-layout-icon_container">
          {props.el.icon ? (
            <i className={props.el.icon} />
          ) : (
            <i>{props.el.letterIcon}</i>
          )}
        </div>
        <em>{props.el.name}</em>
        <i className="fas fa-caret-down"></i>
      </div>
      <ul>
        {props.el.dropdown.map((ele, ind) => (
          <li key={ind * props.index + 100}>
            <NavLink
              to={ele.to}
              className="s-sidebar__nav-link"
              activeClassName="s-layout-active_link"
              onClick={props.closeNav}
            >
              <div className="s-layout-icon_container">
                {ele.icon ? (
                  <i className={ele.icon} />
                ) : (
                  <i>{ele.letterIcon}</i>
                )}
              </div>
              <em>{ele.name}</em>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavDropDown;
