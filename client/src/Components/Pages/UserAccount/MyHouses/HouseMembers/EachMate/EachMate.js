import "./EachMate.css";
import DefaultHouse from "../../../../../../assets/default-house-image.jpg";
import MenuButton from "../../../../../UI/MenuButton/MenuButton";
import { axiosInstance } from "../../../../../Utility/axiosInstance";
import { useState } from "react";
import AsyncButton from "../../../../../UI/AsyncButton/AsyncButton";
import ReactModal from "../../../../../UI/ReactModal/ReactModal";

const EachMate = (props) => {
  const [status, setStatus] = useState({ loading: false, status: "" });
  const [open, setOpen] = useState(false);

  const deleteUser = () => {
    setStatus({ lioading: true, status: "" });
    axiosInstance
      .post("/server1/RemoveMember", { userId: props.userId })
      .then((res) => {
        setStatus({ loading: false, status: "success" });
        setOpen(false);
        props.fetchData();
        console.log(res.data);
      })
      .catch((err) => {
        setStatus({ loading: false, status: "error" });
        console.log(err);
      });
  };

  return (
    <>
      <ReactModal
        isOpen={open}
        toggle={() => setOpen((prev) => (status.loading ? true : !prev))}
      >
        <h4 className="text-center">Are you sure ?</h4>
        <div className="modal-buttons-container">
          <AsyncButton
            style={status.loading ? { background: "var(--my-blue)" } : null}
            onClick={deleteUser}
            status={status.status}
            loading={status.loading}
            className="yes-button"
          >
            Yes
          </AsyncButton>
          <AsyncButton
            className="cancel-button"
            onClick={() => setOpen(status.loading)}
          >
            No
          </AsyncButton>
        </div>
      </ReactModal>
      <div
        className="each-house flex-row hover-grow my-each-mate"
        style={{ position: "relative" }}
      >
        <MenuButton onClick={() => setOpen(true)} className="delete-button">
          <i className="fas fa-trash-alt" />
        </MenuButton>
        <div
          className="house-image"
          style={{
            backgroundImage: `url(${props.image || DefaultHouse})`,
            width: 100,
            height: 100,
            borderRadius: "50%",
          }}
        />
        <div className="house-details-container flex-row flex-wrap">
          <div className="each-house-description">
            <div>
              <small className="text-left">
                <strong>{props.name}</strong>
              </small>
            </div>
            <div>
              <small className="text-left">
                <strong>{props.contact}</strong>
              </small>
            </div>
            <div>
              <small className="text-left">
                <strong>{props.email}</strong>
              </small>
            </div>
            <div>
              <small className="text-left">
                <strong>{props.gender}</strong>
              </small>
            </div>
            <div>
              <small className="text-left">
                <strong>{props.district}</strong>
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EachMate;
