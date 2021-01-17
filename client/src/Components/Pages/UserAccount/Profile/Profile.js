import { useEffect, useRef, useState } from "react";
import { filterNumbers } from "../../../Utility/filterNumbers";
import "./Profile.css";
import MyCard from "../../../UI/MyCard/MyCard";
import EachField from "../../../UI/FormField/FormField";
import DefaultImage from "../../../../assets/default-logo.png";
import { compressFile } from "../../../Utility/fileOperations";
import { axiosInstance } from "../../../Utility/axiosInstance";
import AsyncButton from "../../../UI/AsyncButton/AsyncButton";
import ErrorBox from "../../../UI/ErrorBox/ErrorBox";
import FormInfo from "../../../UI/FormInfo/FormInfo";
import ProfileLoader from "./ProfileLoader/ProfileLoader";

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

  // states for logo
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
      .get("/profile")
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setFormData((prev) => ({ ...prev, ...res.data }));
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
      name: "password",
      placeholder: "Create Password",
      type: passwordOpen ? "text" : "password",
      value: formData.password,
      onChange: changeHandler,
      required: true,
      spellCheck: false,
      autoComplete: "off",
      containerClassName: "each-house-detail",
      addon: (
        <i
          style={{ fontSize: 13, marginTop: -8, marginLeft: -10 }}
          onClick={() => setPasswordOpen((prev) => !prev)}
          className={
            passwordOpen
              ? "fas fa-unlock lock-icon lock-icon-open"
              : "fas fa-lock lock-icon"
          }
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
      name: "district",
      type: "text",
      value: formData.district,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-house-detail",
      placeholder: "District",
      addon: (
        <i
          style={{ fontSize: 13, marginTop: -8, marginLeft: -10 }}
          className="fas fa-area-chart"
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
      .post("/updateprofile", formData)
      .then((err) => {
        console.log(err);
        setStatus({ loading: false, status: "success" });
        setTimeout(() => {
          setStatus({ loading: false, status: "" });
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
      formData.password,
      formData.phone,
      formData.street,
      formData.town,
      formData.district,
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
        onClick={() => props.history.goBack()}
      >
        <i className="fas fa-chevron-left"></i> Back
      </AsyncButton>
    </>
  ) : (
    <MyCard style={{ width: "80%", margin: "50px auto", paddingBottom: 0 }}>
      {
        <AsyncButton
          onClick={() => setEdit((prev) => !prev)}
          className={edit ? "bg-red" : "bg-blue"}
        >
          {edit ? "Cancel" : "Edit"}
        </AsyncButton>
      }
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
