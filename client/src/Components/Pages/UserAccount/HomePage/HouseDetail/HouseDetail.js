import { useEffect, useState } from "react";
import { useParams } from "react-router";
import EachField from "../../../../UI/FormField/FormField";
import MyCard from "../../../../UI/MyCard/MyCard";
import Slick from "../../../../UI/Slick/Slick";
import { axiosInstance } from "../../../../Utility/axiosInstance";
import "./HouseDetail.css";
import _1 from "../../../../../assets/demo1.jpg";
import _2 from "../../../../../assets/demo2.jpg";
import _3 from "../../../../../assets/demo3.jpg";
import AsyncButton from "../../../../UI/AsyncButton/AsyncButton";
import HouseDetailLoader from "./HouseDetailLoader/HouseDetailLoader";
import ErrorBox from "../../../../UI/ErrorBox/ErrorBox";
import { useSelector } from "react-redux";

const HouseDetail = (props) => {
  const [data, setData] = useState({
    ownerName: "",
    monthlyRent: "",
    rentalType: "",
    feature: "",
    maximumSharing: "",
    currentlyOccupied: "",
    street: "",
    town: "",
    district: "",
    contact: "",
    images: [_1, _2, _3],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState({
    loading: false,
    status: "",
  });
  const block = useSelector((state) => state.login.data.userType === "owner");

  const params = useParams();

  useEffect(() => {
    console.log(params.id);
    setLoading(true);
    axiosInstance
      .post(`/server1/visit`, { houseId: params.id })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setData((prev) => ({
          ...prev,
          ...res.data,
        }));
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError("We ran into trouble !");
        // setData({
        //   ownerName: "Gokulnath",
        //   monthlyRent: "1000",
        //   feature: "BHK - bla bla bla",
        //   maximumSharing: "3",
        //   currentlyOccupied: "1",
        //   street: "Dindukal street",
        //   town: "dindukal town",
        //   district: "dindukal",
        //   contact: "923840923094",
        //   images: [_1, _2, _3],
        // });
      });
  }, []);

  var schema = [
    {
      displayName: "Owner Name",
      value: data.ownerName,
    },
    {
      displayName: "Montly Rent",
      value: data.monthlyRent,
    },
    {
      displayName: "Feature",
      value: data.feature,
    },
    {
      displayName: "Rental Type",
      value: data.rentalType,
    },
    {
      displayName: "Maximum Sharing",
      value: data.maximumSharing,
      containerStyleWithLabel: {
        display: data.rentalType === "Family" ? "none" : "block",
      },
    },
    {
      displayName: "Currently Occupied",
      value: data.currentlyOccupied,
      containerStyleWithLabel: {
        display: data.rentalType === "Family" ? "none" : "block",
      },
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

  const sendRequest = () => {
    console.log(params.id);
    setStatus({ loading: true, status: "" });
    axiosInstance
      .post("/server1/SendRequest", { houseId: params.id })
      .then((res) => {
        console.log(res.data);
        setStatus({ loading: false, status: "success" });
        setTimeout(() => {
          setStatus({ loading: false, status: "" });
          props.history.goBack();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setStatus({ loading: false, status: "error" });
        setTimeout(() => setStatus({ loading: false, status: "" }), 1000);
      });
  };

  return loading ? (
    <HouseDetailLoader />
  ) : error ? (
    <>
      <ErrorBox message={error} />
      <AsyncButton
        className="blue back-button bck-transparent"
        onClick={() => props.history.goBack()}
      >
        <i className="fas fa-chevron-left"></i> Back
      </AsyncButton>
    </>
  ) : (
    <div className="house-detail">
      <MyCard className="house-details-container">
        <AsyncButton
          className="blue back-button bck-transparent"
          onClick={() => props.history.goBack()}
        >
          <i className="fas fa-chevron-left"></i> Back
        </AsyncButton>
        <br />
        <div>
          <Slick items={data.images} />
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
        {block ? null : (
          <AsyncButton
            className="bg-blue"
            disabled={data.requested}
            onClick={sendRequest}
            loading={status.loading}
            status={status.status}
          >
            {data.requested ? "Pending" : "Request"}
          </AsyncButton>
        )}
      </MyCard>
    </div>
  );
};

export default HouseDetail;
