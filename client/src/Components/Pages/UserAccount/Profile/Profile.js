import { useState } from "react";
import { filterNumbers } from "../../../Utility/filterNumbers";
import "./Profile.css";

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
  });
  const nonEditable = ["email"];
  const [message, setMessage] = useState("");
  const changeHandler = (event) => {
    const { name, value } = event.target;
    const numberTypes = ["phone"];
    if (numberTypes.some((el) => el === name)) value = filterNumbers(value);
    setMessage(" ");
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
      addon: <i className="fas fa-user" />,
      autoFocus: true,
      containerClassName: "sign-up-textboxes",
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
      containerClassName: "sign-up-textboxes",
      addon: (
        <i
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
      containerClassName: "sign-up-textboxes",
      placeholder: "Contact Nmber",
      addon: <i className="fas fa-phone" />,
    },
    {
      name: "street",
      type: "text",
      value: formData.street,
      onChange: changeHandler,
      required: true,
      containerClassName: "sign-up-textboxes",
      placeholder: "Street",
      addon: <i className="fas fa-street-view" />,
    },
    {
      name: "town",
      type: "text",
      value: formData.town,
      onChange: changeHandler,
      required: true,
      containerClassName: "sign-up-textboxes",
      placeholder: "Town",
      addon: <i className="fas fa-city" />,
    },
    {
      name: "district",
      type: "text",
      value: formData.district,
      onChange: changeHandler,
      required: true,
      containerClassName: "sign-up-textboxes",
      placeholder: "District",
      addon: <i className="fa fa-area-chart" />,
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
      addon: <i className="fas fa-envelope" />,
      autoFocus: true,
      containerClassName: "sign-up-textboxes",
    },
  ];

  return <div></div>;
};

export default Profile;
