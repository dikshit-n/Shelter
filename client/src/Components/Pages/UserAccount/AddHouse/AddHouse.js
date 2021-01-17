import { useState } from "react";
import "./AddHouse.css";
import { filterNumbers } from "../../../Utility/filterNumbers";
import MyCard from "../../../UI/MyCard/MyCard";
import EachField from "../../../UI/FormField/FormField";
import AsyncButton from "../../../UI/AsyncButton/AsyncButton";
import { axiosInstance } from "../../../Utility/axiosInstance";
import HomeImageUpload from "../../../UI/HouseImageUpload/HouseImageUpload";
import Slick from "../../../UI/Slick/Slick";

const AddHouse = (props) => {
  const [data, setData] = useState({
    ownerName: "",
    monthlyRent: "",
    feature: "",
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

  const changeHandler = ({ target: { name, value } }) => {
    const numberTypes = ["contact"];
    setError("");
    setData((prev) => ({
      ...prev,
      [name]: numberTypes.some((el) => el === name)
        ? filterNumbers(value)
        : value,
    }));
  };

  var schema = [
    {
      displayName: "Owner Name",
      value: data.ownerName,
      name: "ownerName",
      onChange: changeHandler,
      containerClassName: "each-house-detail",
      required: true,
    },
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
      displayName: "Maximum Sharing",
      value: data.maximumSharing,
      name: "maximumSharing",
      onChange: changeHandler,
      containerClassName: "each-house-detail",
      required: true,
    },
    {
      displayName: "Currently Occupied",
      value: data.currentlyOccupied,
      name: "currentlyOccupied",
      onChange: changeHandler,
      containerClassName: "each-house-detail",
      required: true,
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

  const submitHandler = ({ preventDefault }) => {
    preventDefault();
    setStatus({ loading: true, status: "" });
    setTimeout(() => setStatus({ loading: false, status: "" }), 500);
    axiosInstance
      .post("/addhpuse", data)
      .then((res) => {
        console.log(res.data);
        setStatus({ loading: false, status: "success" });
        setTimeout(() => setStatus({ loading: false, status: "" }), 500);
        props.history.push("/home");
      })
      .catch((err) => {
        console.log(err);
        setStatus({ loading: false, status: "error" });
        setTimeout(() => setStatus({ loading: false, status: "" }), 500);
      });
  };

  const valid = () => {
    let requiredFields = [...Object.values(data)];
    return requiredFields.every((el) => el.toString().trim() !== "");
  };

  const openUploadPage = () => {
    setOpen(true);
  };
  const closeUploadPage = () => {
    setOpen(false);
  };

  return (
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
        </form>
      </MyCard>
    </>
  );
};

export default AddHouse;
