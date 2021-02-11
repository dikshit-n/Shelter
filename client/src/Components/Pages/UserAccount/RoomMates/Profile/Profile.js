import { useEffect, useRef, useState } from "react";
import { filterNumbers } from "../../../../Utility/filterNumbers";
import "./Profile.css";
import MyCard from "../../../../UI/MyCard/MyCard";
import EachField from "../../../../UI/FormField/FormField";
import DefaultImage from "../../../../../assets/default-logo.png";
import { compressFile } from "../../../../Utility/fileOperations";
import { axiosInstance } from "../../../../Utility/axiosInstance";
import AsyncButton from "../../../../UI/AsyncButton/AsyncButton";
import ErrorBox from "../../../../UI/ErrorBox/ErrorBox";
import FormInfo from "../../../../UI/FormInfo/FormInfo";
import ProfileLoader from "./ProfileLoader/ProfileLoader";
import { useDispatch } from "react-redux";
import { upgradeAccount } from "../../../../redux/Auth/Login/loginActions";

let country_state_district = require("country_state_district");

let districts = country_state_district.getDistrictsByStateId(32);

const Profile = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    accountType: "",
    gender: "",
    phone: "",
    street: "",
    town: "",
    district: "",
    email: "",
    logo: null,
  });

  // loading
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // states for logo
  const [logoCache, setLogoCache] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [imageError, setImageError] = useState(" ");
  const inputRef = useRef();

  const [passwordOpen, setPasswordOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const nonEditable = ["email"];

  const [error, setError] = useState(null);
  const [updateError, setUpdateError] = useState(" ");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axiosInstance
      .post("server1/profile")
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setFormData((prev) => ({ ...prev, ...res.data }));
        setLogoCache(res.data?.logo);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        // setError(err.response?.statusText || "Something went wrong!");
        setFormData({
          name: "Nath",
          password: "gokul",
          accountType: "Owner",
          gender: "Female",
          phone: "3209432",
          street: "Dindukal street",
          town: "Dindukal town",
          district: "Dindukal",
          email: "gokul@mail.com",
          logo: null,
        });
      });
  };

  const changeHandler = (event) => {
    var { name, value } = event.target;
    const numberTypes = ["phone"];
    if (numberTypes.some((el) => el === name)) value = filterNumbers(value);
    setError(null);
    setImageError(" ");
    setUpdateError(" ");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [status, setStatus] = useState({
    loading: false,
    status: "",
  });

  var schema = [
    {
      name: "name",
      // displayName: "Name",
      placeholder: "User Name",
      type: "text",
      value: formData.name,
      onChange: changeHandler,
      required: true,
      spellCheck: false,
      autoComplete: "off",
      autoFocus: true,
      containerClassName: "each-house-detail",
      addon: (
        <i
          style={{ fontSize: 13, marginTop: -8, marginLeft: -10 }}
          className="fas fa-user"
        />
      ),
    },
    {
      name: "phone",
      type: "text",
      value: formData.phone,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-house-detail",
      placeholder: "Contact Nmber",
      addon: (
        <i
          style={{ fontSize: 13, marginTop: -8, marginLeft: -10 }}
          className="fas fa-phone"
        />
      ),
    },
    {
      name: "gender",
      type: "select",
      value: formData.gender,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-house-detail",
      placeholder: "Gender",
      options: ["Male", "Female", "Non-Binary"],
      addon: (
        <i
          style={{ fontSize: 13, marginTop: -8, marginLeft: -10 }}
          className="fas fa-venus"
        />
      ),
    },
    {
      name: "street",
      type: "text",
      value: formData.street,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-house-detail",
      placeholder: "Street",
      addon: (
        <i
          style={{ fontSize: 13, marginTop: -8, marginLeft: -10 }}
          className="fas fa-street-view"
        />
      ),
    },
    {
      name: "town",
      type: "text",
      value: formData.town,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-house-detail",
      placeholder: "Town",
      addon: (
        <i
          style={{ fontSize: 13, marginTop: -8, marginLeft: -10 }}
          className="fas fa-city"
        />
      ),
    },
    {
      type: "select",
      options: [...districts.map((el) => el.name)],
      placeholder: "Choose District",
      value: formData.district,
      name: "district",
      onChange: changeHandler,
      containerClassName: "each-house-detail",
      required: true,
      addon: (
        <i
          style={{ fontSize: 13, marginTop: -8, marginLeft: -10 }}
          className="fas fa-map-marker"
        />
      ),
    },
    {
      name: "email",
      // displayName: "Name",
      placeholder: "Email",
      type: "email",
      value: formData.email,
      onChange: changeHandler,
      required: true,
      spellCheck: false,
      autoComplete: "off",
      autoFocus: true,
      containerClassName: "each-house-detail",
      addon: (
        <i
          style={{ fontSize: 13, marginTop: -8, marginLeft: -10 }}
          className="fas fa-envelope"
        />
      ),
    },
  ];

  const submitHandler = (event) => {
    event.preventDefault();
    setStatus({ loading: true, status: "" });
    setUpdateError(" ");
    console.log(formData);
    axiosInstance
      .post("server1/UpdateProfile", {
        ...formData,
        phone: filterNumbers(formData.phone).toString(),
      })
      .then((err) => {
        console.log(err);
        setStatus({ loading: false, status: "success" });
        dispatch(upgradeAccount(formData.accountType));
        setTimeout(() => {
          setStatus({ loading: false, status: "" });
          setEdit(false);
          fetchData();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setStatus({ loading: false, status: "error" });
        setUpdateError(err.response?.statusText || "Something went Wrong !");
        setTimeout(() => setStatus({ loading: false, status: "" }), 700);
      });
  };

  const valid = () => {
    let requiredFields = [
      formData.name,
      formData.email,
      formData.phone,
      formData.street,
      formData.town,
      formData.district,
      formData.gender,
    ];
    return requiredFields.every((el) => el.toString().trim() !== "");
  };

  const imageClick = () => {
    inputRef.current.click();
  };
  const imageChangeHandler = (event) => {
    setImageError(" ");
    let file = event.target.files[0];
    const supportedFormats = ["jpg", "png", "jfif", "jpeg"];
    if (file) {
      const checkValidity = (name) =>
        supportedFormats.some((el) => name.toLowerCase().endsWith(el));
      if (checkValidity(file.name)) {
        setProcessing(true);
        compressFile([file], { size: 0.3 }, (compressedFiles) => {
          // let base64 = compressedFiles[0].dataWithPrefix;
          setFormData((prev) => ({
            ...prev,
            logo: compressedFiles[0].dataWithPrefix,
          }));
          setProcessing(false);
        });
      } else {
        setFormData((prev) => ({
          ...prev,
          logo: null,
        }));
        setImageError("Invalid format");
      }
    }
  };

  return loading ? (
    <ProfileLoader />
  ) : error ? (
    <>
      <ErrorBox message={error} />
      <AsyncButton
        className="blue back-button bck-transparent"
        onClick={props.close}
      >
        <i className="fas fa-chevron-left"></i> Back
      </AsyncButton>
    </>
  ) : (
    <MyCard style={{ width: "80%", margin: "50px auto", paddingBottom: 0 }}>
      <AsyncButton
        className="blue back-button bck-transparent"
        onClick={props.close}
      >
        <i className="fas fa-chevron-left"></i> Back
      </AsyncButton>
      <div className="profile-logo-container flex-column">
        <div
          style={
            processing
              ? null
              : {
                  cursor: edit ? "pointer" : "no-drop",
                  backgroundImage: `url(${formData.logo || DefaultImage})`,
                }
          }
          className={`profile-logo ${processing ? "skeleton-box" : ""}`}
          onClick={
            status.loading || processing || !edit
              ? () => {}
              : () => imageClick()
          }
        ></div>
        <input
          type="file"
          ref={inputRef}
          style={{ position: "absolute", visibility: "hidden", height: 0 }}
          onChange={imageChangeHandler}
        />
        <FormInfo info={imageError} />
      </div>
      <form onSubmit={submitHandler}>
        {schema.map((el, index) => (
          <EachField
            key={index}
            {...el}
            disabled={!edit || nonEditable.includes(el.name)}
          />
        ))}
        <div style={{ visibility: edit ? "visible" : "hidden" }}>
          <br />
          <AsyncButton
            disabled={!valid()}
            loading={status.loading}
            status={status.status}
            className="bg-green"
            style={{ margin: 0 }}
            type="submit"
          >
            Update
          </AsyncButton>
          <FormInfo info={updateError} />
          <br />
        </div>
      </form>
    </MyCard>
  );
};

export default Profile;
