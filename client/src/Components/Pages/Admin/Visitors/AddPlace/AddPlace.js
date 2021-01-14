import { useState } from "react";
import { withRouter } from "react-router";
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
      placeholder: "Add a Outsiders Gate",
      autoFocus: true,
      type: "text",
      value: formData.name,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-add-field",
      // addon: <i className="fa fa-user"></i>,
    },
  ];

  const submitHandler = (event) => {
    event.preventDefault();
    setError(" ");
    setStatus({ loading: true, status: "" });
    let submitData = {
      ...formData,
      type: "outsider",
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
          props.close();
          props.fetchData();
          clearForm();
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
    });
  };

  const valid = () => {
    let requiredValues = [formData.name];
    return requiredValues.every((el) => el.toString().trim() !== "");
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        autoComplete="off"
        className="flex-row flex-center"
      >
        <AsyncButton
          className={"bck-transparent blue small-buttons not-loading"}
          onClick={props.close}
        >
          <i className="fas fa-chevron-left"></i>
        </AsyncButton>
        {schema.map((el, index) => (
          <EachField key={index} {...el} />
        ))}
        <AsyncButton
          className={
            "bg-blue white small-buttons right-border " +
            (status.loading ? "small-button-loading" : "not-loading")
          }
          disabled={!valid()}
          loading={status.loading}
          status={status.status}
          type="submit"
        >
          <i className="fa fa-plus" aria-hidden="true"></i>
        </AsyncButton>
      </form>
      <FormInfo info={error} />
    </>
  );
};

export default withRouter(AddPlace);
