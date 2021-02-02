import "./EachRequest.css";
import DefaultHouse from "../../../../../../assets/default-house-image.jpg";
import AsyncButton from "../../../../../UI/AsyncButton/AsyncButton";
import { useState } from "react";
import { axiosInstance } from "../../../../../Utility/axiosInstance";

const EachRequest = (props) => {
  const [cancelStatus, setCancelStatus] = useState({
    loading: false,
    status: "",
  });

  const cancelRequest = (id) => {
    console.log(id);
    setCancelStatus({ loading: true, status: "" });
    console.log("Data Format", {
      requestId: props.requestId,
      houseId: props.houseId, //
    });
    axiosInstance
      .post("/server1/cancelrequest", {
        requestId: props.requestId,
        houseId: props.houseId,
      })
      .then((res) => {
        console.log(res.data);
        setCancelStatus({ loading: false, status: "success" });
        setTimeout(() => {
          setCancelStatus({ loading: false, status: "" });
          props.fetchData();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setCancelStatus({ loading: false, status: "error" });
        setTimeout(() => setCancelStatus({ loading: false, status: "" }), 500);
      });
  };

  return (
    <div
      className="each-house margin-auto flex-row"
      style={{ maxWidth: 700, width: "100%" }}
      onClick={() => props.clickHandler(props.requestId)}
    >
      <div
        style={{ backgroundImage: `url(${props.image || DefaultHouse})` }}
        className="house-image"
      />
      <div className="house-details-container d-flex justify-content-between">
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
        </div>
        <AsyncButton
          loading={cancelStatus.loading}
          onClick={() => cancelRequest(props.requestId)}
          className={`cancel-button ${
            cancelStatus.loading ? "bg-blue" : "bck-transparent"
          }`}
          status={cancelStatus.status}
        >
          Cancel
        </AsyncButton>
      </div>
    </div>
  );
};

export default EachRequest;
