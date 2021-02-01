import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { axiosInstance } from "../../../../../Utility/axiosInstance";
import "./HouseDetail.css";
import AsyncButton from "../../../../../UI/AsyncButton/AsyncButton";
import HouseDetailLoader from "./HouseDetailLoader/HouseDetailLoader";
import EachField from "../../../../../UI/FormField/FormField";
import MyCard from "../../../../../UI/MyCard/MyCard";
import DefaultImage from "../../../../../../assets/default-logo.png";

const HouseDetail = (props) => {
  const [data, setData] = useState({
    name: "",
    monthlyRent: "",
    feature: "",
    maximumSharing: "",
    currentlyOccupied: "",
    street: "",
    town: "",
    district: "",
    contact: "",
    logo: null,
  });
  const [status, setStatus] = useState({
    loading: false,
    status: "",
  });

  useEffect(() => {
    if (Object.keys(props.details).length !== 0) {
      setData({ ...props.details });
    }
  }, [props.details]);

  var schema = [
    {
      displayName: "Name",
      value: data.name,
    },
    {
      displayName: "Street",
      value: data.street,
    },
    {
      displayName: "Town",
      value: data.town,
    },
    {
      displayName: "District",
      value: data.district,
    },
    {
      displayName: "Contact",
      value: data.contact,
    },
  ];

  const acceptRequest = () => {
    setStatus({ loading: true, status: "" });
    console.log("Data Format", {
      "route-I-am-Posting": "/server1/acceptrequest",
      "what-I-post": { requestId: data.requestId, houseId: props.houseId },
      "In-res.data-I-need-this": "status-200 (on success)",
    });
    axiosInstance
      .post("server1/acceptrequest", {
        requestId: data.requestId,
        houseId: props.houseId,
      })
      .then((res) => {
        console.log(res.data);
        setStatus({ loading: false, status: "success" });
        setTimeout(() => {
          setStatus({ loading: false, status: "" });
          props.close();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setStatus({ loading: false, status: "error" });
        setTimeout(() => setStatus({ loading: false, status: "" }), 1000);
      });
  };

  return props.loading ? (
    <HouseDetailLoader />
  ) : (
    // : props.error ? (
    //   <>
    //     <ErrorBox message={error} />
    //     <AsyncButton
    //       className="blue back-button bck-transparent"
    //       onClick={() => props.history.goBack()}
    //     >
    //       <i className="fas fa-chevron-left"></i> Back
    //     </AsyncButton>
    //   </>
    // )
    <div className="house-detail">
      <MyCard className="house-details-container">
        <AsyncButton
          className="blue back-button bck-transparent"
          onClick={() => props.close()}
        >
          <i className="fas fa-chevron-left"></i> Back
        </AsyncButton>
        <br />
        <div className="profile-logo-container flex-column">
          <div
            style={{
              backgroundImage: `url(${data.logo || DefaultImage})`,
            }}
            className={`profile-logo`}
          />
        </div>
        <br />
        <br />
        {schema.map((el, index) => (
          <EachField
            key={index}
            {...el}
            containerClassName="each-house-detail"
            className="cursor-default"
            readOnly
          />
        ))}
        <br />
        <AsyncButton
          className="bg-blue"
          onClick={acceptRequest}
          loading={status.loading}
          status={status.status}
        >
          Accept
        </AsyncButton>
      </MyCard>
    </div>
  );
};

export default withRouter(HouseDetail);
