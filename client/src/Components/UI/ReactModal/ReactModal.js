import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const ReactModal = (props) => {
  const { className } = props;
  return (
    <div>
      {/* <Button color="danger" onClick={toggle}>
        {buttonLabel}
      </Button> */}
      <Modal isOpen={props.open} toggle={props.toggle} className={className}>
        {props.title ? (
          <ModalHeader toggle={props.toggle}>{props.title}</ModalHeader>
        ) : null}
        <ModalBody>{props.children}</ModalBody>
        {/* <ModalFooter>
          
        </ModalFooter> */}
      </Modal>
    </div>
  );
};

export default ReactModal;
