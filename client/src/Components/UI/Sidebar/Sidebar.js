import { Fragment } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import NavDropDown from "./NavDropDown/NavDropDown";
import DefaultLogo from "./default-logo.jpg";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleNav } from "../../redux/Global/action";
import { useEffect } from "react";

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.global.navStatus);
  const classNames = ["s-sidebar__nav", open ? "nav_open" : ""];

  useEffect(() => {
    window.addEventListener("resize", (event) => {
      if (window.innerWidth >= 500) {
        dispatch(toggleNav(true));
      } else {
        dispatch(toggleNav(false));
      }
    });
  }, []);

  // useEffect(() => {
  //   const content = document.querySelectorAll(".page-content");
  //   content.forEach((el) => {
  //     el.addEventListener("click", () => {
  //       dispatch(toggleNav());
  //     });
  //   });
  // }, []);

  // useEffect(() => {
  //   const pageContent = document.querySelectorAll(".page-content");
  //   pageContent.forEach((el) => {
  //     el.style.marginLeft = open ? "0" : "4em";
  //   });
  // }, [open]);

  // useEffect(() => {
  //   const trigger = document.querySelectorAll(".s-sidebar__trigger");
  //   const sidebar = document.querySelectorAll(".s-sidebar__nav");
  //   sidebar.forEach((el, index) => {
  //     el.addEventListener("mouseover", () => {
  //       trigger[index].style.left = "15em";
  //     });
  //     el.addEventListener("mouseleave", () => {
  //       console.log(open, index);
  //       const nav = document.querySelectorAll(".s-sidebar__nav");
  //       if (!nav[index].classList.contains("nav_open")) {
  //         console.log("before rerender not open");
  //         trigger[index].style.left = "3em";
  //       }
  //     });
  //   });
  // }, []);
  // useEffect(() => {
  //   const trigger = document.querySelectorAll(".s-sidebar__trigger");
  //   const nav = document.querySelectorAll(".s-sidebar__nav");
  //   const sidebar = document.querySelectorAll(".s-sidebar__nav");

  //   sidebar.forEach((el, index) => {
  //     if (!open) {
  //       console.log("after rerender not open");
  //       trigger[index].style.left = "3em";
  //     } else {
  //       trigger[index].style.left = "15em";
  //     }
  //   });
  // }, [open]);

  const toggleNavbar = () => {
    dispatch(toggleNav());
  };

  // const closeNav = () => {
  //   dispatch(toggleNav(false));
  // };
  return (
    <div className="s-layout">
      {/* Sidebar */}
      <div className="s-layout__sidebar">
        <div className="s-layout_header">
          <div className="s-layout_heading">
            {props.heading}
            {props.topRightRoutes && (
              <div className="top-right-icons">
                {props.topRightRoutes.map((el, index) =>
                  el.component ? (
                    <Fragment key={index}>{el.component}</Fragment>
                  ) : (
                    <NavLink
                      key={index}
                      className="each-icon"
                      activeClassName={
                        el.notActive ? "" : "s-layout-active_link"
                      }
                      to={el.to ? el.to : "#"}
                      id={el.id}
                    >
                      {el.icon ? (
                        <i className={el.icon} />
                      ) : (
                        <i>{el.letterIcon}</i>
                      )}
                    </NavLink>
                  )
                )}
              </div>
            )}
          </div>
        </div>
        <div>
          <a onClick={toggleNavbar} className="s-sidebar__trigger">
            <i className={open ? "fas fa-times" : "fa fa-bars"} />
          </a>
          <nav
            className={classNames.join(" ")}
            style={{ position: open ? "relative" : "fixed" }}
          >
            <ul className="routes-container">
              {
                //   fa fa-home, fa fa-user, fa fa-camera
                props.routes.map((el, index) =>
                  el.dropdown ? (
                    <NavDropDown el={el} key={index} index={index} />
                  ) : el.profile ? (
                    // <li key={index} className="s-layout-profile_container">
                    <NavLink
                      key={index}
                      className="s-layout-profile_container"
                      activeClassName="s-layout-profile_active"
                      to={el.profile.to ? el.profile.to : "#"}
                    >
                      <div
                        style={{
                          backgroundImage:
                            `url(` +
                            (el.profile.image
                              ? el.profile.image
                              : DefaultLogo) +
                            ")",
                        }}
                        className="s-layout-profile"
                      ></div>
                      <div className="profile-name">{el.profile.name}</div>
                    </NavLink>
                  ) : el.component ? (
                    <Fragment key={index}>{el.component}</Fragment>
                  ) : (
                    // </li>
                    <li key={index}>
                      <NavLink
                        to={el.to}
                        className="s-sidebar__nav-link"
                        activeClassName="s-layout-active_link"
                      >
                        <div className="s-layout-icon_container">
                          {el.icon ? (
                            <i aria-hidden="true" className={el.icon} />
                          ) : el.iconComponent ? (
                            <i aria-hidden="true">{el.iconComponent}</i>
                          ) : (
                            <i aria-hidden="true">{el.letterIcon}</i>
                          )}
                        </div>
                        <em>{el.name}</em>
                      </NavLink>
                    </li>
                  )
                )
              }
            </ul>
          </nav>
        </div>
      </div>

      {/* Only use .page-content as className for this part */}
      {/* Content */}
      {/* <main className="s-layout__content">
        <h1>Full View, Please!</h1>
      </main> */}
    </div>
  );
};

export default withRouter(Sidebar);
