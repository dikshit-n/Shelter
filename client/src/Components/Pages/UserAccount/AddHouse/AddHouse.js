import { useState } from "react";
import "./AddHouse.css";
import { filterNumbers } from "../../../Utility/filterNumbers";
import MyCard from "../../../UI/MyCard/MyCard";
import EachField from "../../../UI/FormField/FormField";
import AsyncButton from "../../../UI/AsyncButton/AsyncButton";
import { axiosInstance } from "../../../Utility/axiosInstance";
import HomeImageUpload from "../../../UI/HouseImageUpload/HouseImageUpload";
import Slick from "../../../UI/Slick/Slick";
import { numberWithComma } from "../../../Utility/numberWithComma";
import { useSelector } from "react-redux";

let country_state_district = require("country_state_district");

let districts = country_state_district.getDistrictsByStateId(32);

const AddHouse = (props) => {
  const [data, setData] = useState({
    monthlyRent: "",
    feature: "",
    rentalType: "",
    maximumSharing: "",
    currentlyOccupied: "",
    street: "",
    town: "",
    district: "",
    contact: "",
    images: [],
  });

  const [status, setStatus] = useState({
    loading: false,
    status: "",
  });
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const show = useSelector((state) => state.login.data.userType === "owner");

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
    setError("");
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  var schema = [
    {
      displayName: "Montly Rent",
      value: data.monthlyRent,
      name: "monthlyRent",
      onChange: changeHandler,
      containerClassName: "each-house-detail",
      required: true,
    },
    {
      displayName: "Feature",
      value: data.feature,
      name: "feature",
      onChange: changeHandler,
      containerClassName: "each-house-detail",
      required: true,
    },
    {
      type: "select",
      options: ["Family", "Sharing"],
      placeholder: "Choose Rental Type",
      displayName: "Rental Type",
      value: data.rentalType,
      name: "rentalType",
      onChange: changeHandler,
      containerClassName: "each-house-detail",
      required: true,
    },
    {
      displayName: "Maximum Sharing",
      value: data.maximumSharing,
      name: "maximumSharing",
      onChange: changeHandler,
      containerClassName: "each-house-detail",
      containerStyleWithLabel: {
        display: data.rentalType === "Family" ? "none" : "block",
      },
    },
    {
      displayName: "Currently Occupied",
      value: data.currentlyOccupied,
      name: "currentlyOccupied",
      onChange: changeHandler,
      containerClassName: "each-house-detail",
      containerStyleWithLabel: {
        display: data.rentalType === "Family" ? "none" : "block",
      },
    },
    {
      displayName: "Street",
      value: data.street,
      name: "street",
      onChange: changeHandler,
      containerClassName: "each-house-detail",
      required: true,
    },
    {
      displayName: "Town",
      value: data.town,
      name: "town",
      onChange: changeHandler,
      containerClassName: "each-house-detail",
      required: true,
    },
    {
      type: "select",
      options: [...districts.map((el) => el.name)],
      placeholder: "Choose District",
      displayName: "District",
      value: data.district,
      name: "district",
      onChange: changeHandler,
      containerClassName: "each-house-detail",
      required: true,
    },
    {
      displayName: "Contact",
      value: data.contact,
      name: "contact",
      onChange: changeHandler,
      containerClassName: "each-house-detail",
      required: true,
    },
  ];

  const submitHandler = (event) => {
    event.preventDefault();
    setStatus({ loading: true, status: "" });
    axiosInstance
      .post("/server1/AddHouse", {
        ...data,
        monthlyRent: filterNumbers(data.monthlyRent).toString(),
        maximumSharing: filterNumbers(data.maximumSharing).toString(),
        currentlyOccupied: filterNumbers(data.currentlyOccupied).toString(),
        contact: filterNumbers(data.contact).toString(),
      })
      .then((res) => {
        console.log(res.data);
        setStatus({ loading: false, status: "success" });
        setTimeout(() => {
          setStatus({ loading: false, status: "" });
          props.history.push("/home");
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setStatus({ loading: false, status: "error" });
        setTimeout(() => setStatus({ loading: false, status: "" }), 700);
      });
  };

  const valid = () => {
    let requiredFieldsArray = [];
    if (data.rentalType === "Family") {
      requiredFieldsArray = [
        data.monthlyRent,
        data.feature,
        data.rentalType,
        data.street,
        data.town,
        data.district,
        data.contact,
        data.images,
      ];
    } else {
      requiredFieldsArray = [...Object.values(data)];
    }
    return requiredFieldsArray.every((el) => el.toString().trim() !== "");
  };

  const openUploadPage = () => {
    setOpen(true);
  };
  const closeUploadPage = () => {
    setOpen(false);
  };

  console.log(show);

  return show ? (
    <>
      {open ? (
        <HomeImageUpload
          afterCompression={(compressedFiles) =>
            setData((prev) => ({ ...prev, images: compressedFiles }))
          }
          close={closeUploadPage}
        />
      ) : null}
      <MyCard className="add-house-form">
        <div>
          <Slick items={data.images} />
        </div>
        <br />
        <div
          onClick={openUploadPage}
          to="/uploadfile"
          className="no-nav-default fit-content"
        >
          <button className="house-image-upload flex-row flex-center">
            <i className="fas fa-upload"></i>&nbsp;&nbsp;Upload Images
          </button>
        </div>
        <br />
        <form onSubmit={submitHandler}>
          {schema.map((el, index) => (
            <EachField {...el} key={index} />
          ))}
          <AsyncButton
            type={"submit"}
            loading={status.loading}
            status={status.status}
            disabled={!valid()}
            className="bg-blue"
          >
            Add
          </AsyncButton>
          <br />
          <p style={{ textAlign: "left", color: "red" }}>{error}</p>
        </form>
      </MyCard>
    </>
  ) : (
    <MyCard className="add-house-form">
      <h4>Upgrade To Owner Account To Add House</h4>
    </MyCard>
  );
};

export default AddHouse;
