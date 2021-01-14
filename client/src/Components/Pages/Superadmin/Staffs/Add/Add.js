import { useState } from "react";
import "./Add.css";
import { axiosInstance } from "../../../../Utility/axiosInstance";
import EachField from "../../../../UI/FormField/FormField";
import AsyncButton from "../../../../UI/AsyncButton/AsyncButton";
import CountryCode from "../../../../UI/CountryCode/countryCode";
import { filterNumbers } from "../../../../Utility/filterNumbers";
import FormInfo from "../../../../UI/FormInfo/FormInfo";

const Add = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    countryCode: "+91",
  });
  const [error, setError] = useState(" ");
  const [buttonStatus, setButtonStatus] = useState({
    loading: false,
    status: "",
  });

  const changeHandler = (event) => {
    let { name, value } = event.target;
    if (name === "phone") {
      value = filterNumbers(value);
    }
    setError(" ");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let submitData = {
      ...formData,
      phone: parseInt(
        filterNumbers(
          formData.countryCode.toString() + formData.phone.toString()
        )
      ),
    };
    setError(" ");
    setButtonStatus({
      loading: true,
      status: "",
    });
    axiosInstance
      .post("superadmin/add/admin", submitData)
      .then((res) => {
        console.log(res.data);
        setButtonStatus({
          loading: false,
          status: "success",
        });
        setTimeout(() => {
          clearForm();
          setButtonStatus({
            loading: false,
            status: "",
          });

          props.history.push({
            pathname: "/view",
            state: { refresh: true },
          });
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response?.statusText || "Something went Wrong !");
        setButtonStatus({
          loading: false,
          status: "error",
        });
        setTimeout(() => {
          setButtonStatus({
            loading: false,
            status: "",
          });
        }, 500);
      });
  };

  const valid = () => {
    return Object.values(formData).every((el) => el.toString().trim() !== "");
  };

  const clearForm = () => {
    setError(" ");
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      countryCode: "+91",
    });
  };

  var schema = [
    {
      name: "name",
      displayName: "Staff Name",
      // placeholder: "Institute Name",
      value: formData.name,
      onChange: changeHandler,
      type: "text",
      required: true,
      spellCheck: false,
      autoComplete: "off",
      containerClassName: "each-textbox",
      // autoFocus: true,
      addon: <i className="fa fa-user"></i>,
    },
    {
      name: "email",
      displayName: "Staff Email",
      // placeholder: "Institute Email",
      value: formData.email,
      onChange: changeHandler,
      type: "email",
      required: true,
      spellCheck: false,
      autoComplete: "off",
      containerClassName: "each-textbox",
      addon: <i className="fas fa-envelope"></i>,
    },
    {
      name: "phone",
      min: "0",
      displayName: "Staff Contact",
      // placeholder: "Institute Contact",
      value: formData.phone,
      onChange: changeHandler,
      type: "text",
      required: true,
      spellCheck: false,
      autoComplete: "off",
      containerClassName: "each-textbox",
      addon: (
        <CountryCode
          name="countryCode"
          value={formData.countryCode}
          defaultValue={formData.countryCode}
          onChange={changeHandler}
        />
      ),
    },
    {
      name: "address",
      displayName: "Staff Address",
      // placeholder: "Institute Address",
      value: formData.address,
      onChange: changeHandler,
      type: "textarea",
      required: true,
      spellCheck: false,
      autoComplete: "off",
      rows: "4",
      cols: "50",
      containerStyle: { height: "fit-content" },
      addon: <i className="fas fa-address-book"></i>,
      containerClassName: "each-textbox",
    },
  ];

  return (
    <div className="add-school _100">
      <form
        className="add-form-container"
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <div className="add-school-header">
          <h3>Add New Admin</h3>
        </div>
        <div className="add-form flex-column">
          <FormInfo info={error} />
          {schema.map((el, index) => (
            <EachField key={index} {...el} />
          ))}
          <AsyncButton
            className={`add-button ${
              buttonStatus.loading ? "bg-blue" : "bck-transparent"
            }`}
            type="submit"
            loading={buttonStatus.loading}
            disabled={!valid()}
            status={buttonStatus.status}
            style={
              buttonStatus.status !== "" ? { borderColor: "transparent" } : null
            }
          >
            Add
          </AsyncButton>
        </div>
      </form>
    </div>
  );
};

export default Add;
