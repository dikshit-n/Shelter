import { useState } from "react";
import AsyncButton from "../../../../UI/AsyncButton/AsyncButton";
import Card2 from "../../../../UI/Card2/Card2";
import EachField from "../../../../UI/FormField/FormField";
import FormInfo from "../../../../UI/FormInfo/FormInfo";
import { axiosInstance } from "../../../../Utility/axiosInstance";
import { filterNumbers } from "../../../../Utility/filterNumbers";
import "./AddPlace.css";

const AddPlace = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
  });

  const [error, setError] = useState(" ");

  const [status, setStatus] = useState({
    loading: false,
    status: "",
  });

  const changeHandler = (event) => {
    let { name, value } = event.target;
    setError(" ");
    if (name === "age" || name === "phone") {
      value = filterNumbers(value);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  var schema = [
    {
      name: "name",
      displayName: "Place Name",
      type: "text",
      value: formData.name,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-add-field",
      // addon: <i className="fa fa-user"></i>,
    },
    {
      name: "type",
      displayName: "Type",
      type: "select",
      value: formData.type,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-add-field",
      placeholder: "Choose Type",
      options: [
        "Gate__gate",
        "Inside Campus (eg. classroom, ground, etc.)__inside",
      ],
    },
  ];

  const submitHandler = (event) => {
    event.preventDefault();
    setError(" ");
    setStatus({ loading: true, status: "" });
    let submitData = {
      ...formData,
    };
    console.log(submitData);
    axiosInstance
      .post("admin/add/place", submitData)
      .then((res) => {
        console.log(res.data);
        setStatus({
          loading: false,
          status: "success",
        });
        setTimeout(() => {
          setStatus({ loading: false, status: "" });
          clearForm();
          props.history.push({
            pathname: "/places/place",
            state: {
              refresh: true,
            },
          });
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response?.statusText || "Something went Wrong !");
        setStatus({
          loading: false,
          status: "error",
        });
        setTimeout(() => setStatus({ loading: false, status: "" }), 500);
      });
  };

  const clearForm = () => {
    setFormData({
      name: "",
      type: "",
    });
  };

  const valid = () => {
    let requiredValues = [formData.name, formData.type];
    return requiredValues.every((el) => el.toString().trim() !== "");
  };

  return (
    <div className="add-employee-form-container">
      <Card2 className="add-employee-form">
        <form onSubmit={submitHandler} autoComplete="off">
          <AsyncButton
            className="blue back-button bck-transparent"
            onClick={props.history.goBack}
          >
            <i className="fas fa-chevron-left"></i> Back
          </AsyncButton>
          <br />
          <FormInfo info={error} />
          {schema.map((el, index) => (
            <EachField key={index} {...el} />
          ))}
          <AsyncButton
            className="bg-blue white"
            disabled={!valid()}
            loading={status.loading}
            status={status.status}
            type="submit"
          >
            Add
          </AsyncButton>
        </form>
      </Card2>
    </div>
  );
};

export default AddPlace;
