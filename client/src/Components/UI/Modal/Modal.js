import React, { Fragment } from "react";
import "./Modal.css";
import { CSSTransition } from "react-transition-group";

const Modal = (props) => {
  return (
    <CSSTransition
      in={props.show}
      timeout={300}
      classNames="alert"
      unmountOnExit
    >
      <Fragment>
        <div
          className={
            "full-page-wrapper flex-center my-modal " +
            props.outerElementClassName
          }
          onClick={props.onClick}
        ></div>
        {props.show && (
          <div
            className={
              "my-modal-element fit-content " + props.innerElementClassName
            }
          >
            {props.children}
          </div>
        )}
      </Fragment>
    </CSSTransition>
  );
};

export default Modal;
