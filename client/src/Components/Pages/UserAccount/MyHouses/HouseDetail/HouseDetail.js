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
import { filterNumbers } from "../../../../Utility/filterNumbers";
import { numberWithComma } from "../../../../Utility/numberWithComma";
import HomeImageUpload from "../../../../UI/HouseImageUpload/HouseImageUpload";
import HouseMembers from "../HouseMembers/HouseMembers";

let country_state_district = require("country_state_district");

let districts = country_state_district.getDistrictsByStateId(32);

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
    images: [],
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [status, setStatus] = useState({
    loading: false,
    status: "",
  });
  const [deleteStatus, setDeleteStatus] = useState({
    loading: false,
    status: "",
  });
  const [holdStatus, setHoldStatus] = useState({
    loading: false,
    status: "",
  });

  const [show, setShow] = useState(false);

  const params = useParams();

  useEffect(() => {
    console.log(params.id);
    setLoading(true);
    axiosInstance
      .post(`/server1/MyHouseDetails`, { houseId: params.id })
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

  const changeHandler = ({ target: { name, value } }) => {
    const numberTypes = ["contact", "maximumSharing", "currentlyOccupied"];
    const withCommas = ["monthlyRent"];
    value = numberTypes.some((el) => el === name)
      ? filterNumbers(value)
      : withCommas.some((el) => el === name)
      ? numberWithComma(filterNumbers(value))
      : value;
    if (name === "rentalType") {
      setData((prev) => ({
        ...prev,
        currentlyOccupied: value === "Family" ? "" : prev.currentlyOccupied,
        maximumSharing: value === "Family" ? "" : prev.maximumSharing,
      }));
    }
    setFormError(null);
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  var schema = [
    // {
    //   name: "ownerName",
    //   onChange: changeHandler,
    //   required: true,
    //   displayName: "Owner Name",
    //   value: data.ownerName,
    // },
    {
      name: "monthlyRent",
      onChange: changeHandler,
      required: true,
      displayName: "Montly Rent",
      value: data.monthlyRent,
    },
    {
      name: "feature",
      onChange: changeHandler,
      required: true,
      displayName: "Feature",
      value: data.feature,
    },
    {
      name: "rentalType",
      type: "select",
      options: ["Family", "Sharing"],
      onChange: changeHandler,
      required: true,
      displayName: "Rental Type",
      value: data.rentalType,
      placeholder: "Choose Rental Type",
    },
    {
      name: "maximumSharing",
      onChange: changeHandler,
      displayName: "Maximum Sharing",
      value: data.maximumSharing,
      containerStyleWithLabel: {
        display: data.rentalType === "Family" ? "none" : "block",
      },
    },
    {
      name: "currentlyOccupied",
      onChange: changeHandler,
      displayName: "Currently Occupied",
      value: data.currentlyOccupied,
      containerStyleWithLabel: {
        display: data.rentalType === "Family" ? "none" : "block",
      },
    },
    {
      name: "street",
      onChange: changeHandler,
      required: true,
      displayName: "Street",
      value: data.street,
    },
    {
      name: "town",
      onChange: changeHandler,
      required: true,
      displayName: "Town",
      value: data.town,
    },
    {
      name: "district",
      type: "select",
      onChange: changeHandler,
      options: [...districts.map((el) => el.name)],
      required: true,
      displayName: "District",
      value: data.district,
    },
    {
      name: "contact",
      onChange: changeHandler,
      required: true,
      displayName: "Contact",
      value: data.contact,
    },
  ];

  const updateHouse = (event) => {
    event.preventDefault();
    setFormError(null);
    console.log({ ...data, houseId: params.id });
    setStatus({ loading: true, status: "" });
    axiosInstance
      .post("/server1/UpdateDetails", {
        ...data,
        contact: filterNumbers(data.contact).toString(),
        houseId: params.id,
      })
      .then((res) => {
        console.log(res.data);
        setStatus({ loading: false, status: "success" });
        setTimeout(() => {
          setStatus({ loading: false, status: "" });
          props.history.push({
            pathname: "/myhouses",
            state: { refresh: true },
          });
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setStatus({ loading: false, status: "error" });
        setTimeout(() => setStatus({ loading: false, status: "" }), 1000);
        setFormError(err.response?.statusText || "Something went wrong !");
      });
  };

  const deleteHouse = () => {
    setDeleteStatus({ loaing: true, status: "" });
    axiosInstance
      .post("/server1/DeleteHouse", { houseId: params.id })
      .then((res) => {
        setDeleteStatus({ loading: false, status: "success" });
        setTimeout(() => {
          setDeleteStatus({ loading: false, status: "" });
          props.history.push({
            pathname: "/myhouses",
            state: { refresh: true },
          });
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setDeleteStatus({ loading: false, status: "error" });
        setTimeout(() => setStatus({ loading: false, status: "" }), 1000);
        setFormError(err.response?.statusText || "Something went wrong !");
      });
  };
  const toggleHold = () => {
    setHoldStatus({ loaing: true, status: "" });
    axiosInstance
      .post("/server1/hold", {
        houseId: params.id,
        flag: data.hold ? "retain" : "hold",
      })
      .then((res) => {
        setHoldStatus({ loading: false, status: "success" });
        setTimeout(() => {
          setHoldStatus({ loading: false, status: "" });
          props.history.push({
            pathname: "/myhouses",
            state: { refresh: true },
          });
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setHoldStatus({ loading: false, status: "error" });
        setTimeout(() => setStatus({ loading: false, status: "" }), 1000);
        setFormError(err.response?.statusText || "Something went wrong !");
      });
  };

  const valid = () => {
    let requiredFieldsArray = [];
    requiredFieldsArray = [
      data.monthlyRent,
      data.feature,
      data.rentalType,
      data.street,
      data.town,
      data.district,
      data.contact,
      // data.images,
    ];
    return requiredFieldsArray.every((el) => el.toString().trim() !== "");
  };

  const openUploadPage = () => {
    setOpen(true);
  };
  const closeUploadPage = () => {
    setOpen(false);
  };

  const viewHouseMembers = () => {
    setShow(true);
  };

  const back = () => setShow(false);

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
    <>
      {open ? (
        <HomeImageUpload
          afterCompression={(compressedFiles) =>
            setData((prev) => ({ ...prev, images: compressedFiles }))
          }
          close={closeUploadPage}
        />
      ) : null}
      {show ? (
        <HouseMembers houseId={params.id} close={back} />
      ) : (
        <div className="house-detail">
          <MyCard className="house-details-container">
            <AsyncButton
              className="blue back-button bck-transparent"
              onClick={() => props.history.goBack()}
            >
              <i className="fas fa-chevron-left"></i> Back
            </AsyncButton>
            {/* <br />
          <div>
            <Slick items={data.images} />
          </div> */}
            <br />
            {/* <div
            onClick={openUploadPage}
            to="/uploadfile"
            className="no-nav-default fit-content"
          >
            <button className="house-image-upload flex-row flex-center">
              <i className="fas fa-upload"></i>&nbsp;&nbsp;Upload Images
            </button>
          </div> */}
            <br />
            <form onSubmit={updateHouse}>
              {schema.map((el, index) => (
                <EachField
                  key={index}
                  {...el}
                  containerClassName="each-house-detail"
                  className="cursor-default"
                />
              ))}
              <br />
              <AsyncButton
                className="bg-blue"
                disabled={!valid()}
                type="submit"
                loading={status.loading}
                status={status.status}
              >
                Update
              </AsyncButton>
              &nbsp;&nbsp;&nbsp;
              <AsyncButton
                className="bg-red"
                type="button"
                onClick={deleteHouse}
                loading={deleteStatus.loading}
                status={deleteStatus.status}
              >
                <i className="fas fa-trash-alt" /> &nbsp;&nbsp;Delete
              </AsyncButton>
              &nbsp;&nbsp;&nbsp;
              <AsyncButton
                className="bg-green"
                type="button"
                onClick={toggleHold}
                loading={holdStatus.loading}
                status={holdStatus.status}
              >
                <i className={data.hold ? "fas fa-play" : "fas fa-pause"} />{" "}
                &nbsp;&nbsp;
                {data.hold ? "Retain" : "Hold"}
              </AsyncButton>
              &nbsp;&nbsp;&nbsp;
              <AsyncButton
                className="bg-yellow"
                type="button"
                onClick={viewHouseMembers}
              >
                View Members
              </AsyncButton>
              <br />
              <p style={{ color: "red", textAlign: "left" }}>{formError}</p>
            </form>
          </MyCard>
        </div>
      )}
    </>
  );
};

export default HouseDetail;
