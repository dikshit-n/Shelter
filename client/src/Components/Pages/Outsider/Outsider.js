import { useState } from "react";
import { useParams } from "react-router";
import { Container } from "reactstrap";
import AsyncButton from "../../UI/AsyncButton/AsyncButton";
import CountryCode from "../../UI/CountryCode/countryCode";
import EachField from "../../UI/FormField/FormField";
import MyCard from "../../UI/MyCard/MyCard";
import { axiosInstance } from "../../Utility/axiosInstance";
import { filterNumbers } from "../../Utility/filterNumbers";
import "./Outsider.css";

const Outsider = (props) => {
  const params = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    emiratesId: "",
    purpose: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    status: "",
    message: null,
  });

  const changeHandler = (event) => {
    let { name, value } = event.target;
    if (name === "phone") {
      value = filterNumbers(value);
    }
    setStatus({ loading: false, status: "", message: null });
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  var schema = [
    {
      name: "name",
      placeholder: "Enter Your Name",
      displayName: "Name",
      type: "text",
      value: formData.name,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-add-field",
      // addon: <i className="fa fa-user"></i>,
    },
    {
      name: "email",
      displayName: "Email",
      placeholder: "Enter Your Email",
      value: formData.email,
      onChange: changeHandler,
      type: "email",
      required: true,
      spellCheck: false,
      autoComplete: "off",
      containerClassName: "each-add-field",
    },
    {
      name: "phone",
      displayName: "Phone",
      type: "text",
      value: formData.phone,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-add-field",
      addon: (
        <CountryCode
          name="countryCode"
          value={formData.countryCode}
          defaultValue={formData.countryCode}
          onChange={changeHandler}
        />
      ),
      min: "0",
    },
    {
      name: "emiratesId",
      placeholder: "Enter Your Emirates Id",
      displayName: "Emirates Id",
      type: "text",
      value: formData.emiratesId,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-add-field",
      // addon: <i className="fa fa-user"></i>,
    },
    {
      name: "purpose",
      displayName: "Purpose",
      placeholder: "Enter Your Purpose",
      value: formData.purpose,
      onChange: changeHandler,
      type: "textarea",
      required: true,
      spellCheck: false,
      autoComplete: "off",
      rows: "4",
      cols: "50",
      containerStyle: { height: "fit-content" },
      containerClassName: "each-textbox",
    },
  ];

  const valid = () => {
    return Object.values(formData).every((el) => el?.toString().trim() !== "");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setStatus({ loading: true, status: "", message: null });
    axiosInstance
      .post(`admin/outsiders`, { placeId: params.id })
      .then((res) => {
        console.log(res.data);
        setStatus({ loading: false, status: "success" });
        setTimeout(
          () => setStatus({ loading: false, status: "", message: null }),
          500
        );
      })
      .catch((err) => {
        console.log(err);
        setStatus({
          loading: false,
          status: "error",
          message: err.response?.statusText || "Something went wrong !",
        });
        setTimeout(
          () =>
            setStatus({
              loading: false,
              status: "",
              message: err.response?.statusText || "Something went wrong !",
            }),
          500
        );
      });
  };

  console.log(params.id);

  return (
    <div className="full-page-wrapper outsider flex-safe-center">
      <Container style={{ margin: "auto auto" }}>
        <MyCard className="visitor-form">
          <form onSubmit={submitHandler}>
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
              Finish
            </AsyncButton>
          </form>
        </MyCard>
      </Container>
    </div>
  );
};

export default Outsider;
