import "./EachRequest.css";
import DefaultHouse from "../../../../../../assets/default-house-image.jpg";
import AsyncButton from "../../../../../UI/AsyncButton/AsyncButton";
import { useState } from "react";
import { axiosInstance } from "../../../../../Utility/axiosInstance";

const EachRequest = (props) => {
  const [acceptStatus, setAcceptStatus] = useState({
    loading: false,
    status: "",
  });

  const acceptRequest = (id) => {
    console.log(id);
    setAcceptStatus({ loading: true, status: "" });
    axiosInstance
      .post("/acceptrequest", { requestId: id })
      .then((res) => {
        console.log(res.data);
        setAcceptStatus({ loading: false, status: "success" });
        setTimeout(() => {
          setAcceptStatus({ loading: false, status: "" });
          props.fetchData();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setAcceptStatus({ loading: false, status: "error" });
        setTimeout(() => setAcceptStatus({ loading: false, status: "" }), 500);
      });
  };

  return (
    <div
      className="each-house margin-auto flex-row"
      style={{ maxWidth: 700, width: "100%" }}
    >
      <div
        style={{ backgroundImage: `url(${props.image || DefaultHouse})` }}
        className="house-image"
        onClick={() => props.clickHandler(props.requestId)}
      />
      <div className="house-details-container d-flex justify-content-between">
        <div
          className="each-house-description"
          onClick={() => props.clickHandler(props.requestId)}
        >
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
        </div>
        <AsyncButton
          loading={acceptStatus.loading}
          onClick={() => acceptRequest(props.requestId)}
          className={`request-button ${
            acceptStatus.loading ? "bg-blue" : "bck-transparent"
          }`}
          status={acceptStatus.status}
        >
          Accept
        </AsyncButton>
      </div>
    </div>
  );
};

export default EachRequest;