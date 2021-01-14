import { useRef, useState } from "react";
import AsyncButton from "../../../../UI/AsyncButton/AsyncButton";
import Card2 from "../../../../UI/Card2/Card2";
import CountryCode from "../../../../UI/CountryCode/countryCode";
import EachField from "../../../../UI/FormField/FormField";
import FormInfo from "../../../../UI/FormInfo/FormInfo";
import { axiosInstance } from "../../../../Utility/axiosInstance";
import { compressFile } from "../../../../Utility/fileOperations";
import { filterNumbers } from "../../../../Utility/filterNumbers";
import "./AddEmployee.css";
import DefaultImage from "../../../../../assets/default-logo.png";

const AddEmployee = (props) => {
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    emiratesId: "",
    phone: "",
    designation: "",
    countryCode: "+91",
  });

  // image
  const inputRef = useRef();
  const [imageType, setImageType] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [imageError, setImageError] = useState(" ");

  const [status, setStatus] = useState({
    loading: false,
    status: "",
  });

  const changeHandler = (event) => {
    let { name, value } = event.target;
    if (name === "phone") {
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
      displayName: "Name",
      type: "text",
      value: formData.name,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-add-field",
      // addon: <i className="fa fa-user"></i>,
    },
    {
      name: "emiratesId",
      displayName: "Emirates Id",
      type: "text",
      value: formData.emiratesId,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-add-field",
      // addon: <i className="fa fa-user"></i>,
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
      name: "designation",
      displayName: "Designation",
      type: "select",
      value: formData.designation,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-add-field",
      options: [
        "Driver__driver",
        "Staff__staff",
        "Security__security",
        "Bus staff__bus_staff",
      ],
      placeholder: "Choose designation",
    },
  ];

  const submitHandler = (event) => {
    event.preventDefault();
    let submitData = {
      ...formData,
      image: null,
      employeeImage: {
        fileType: imageType?.split(".")[1],
        buffer: formData.image,
      },
      phone: parseInt(
        filterNumbers(
          formData.countryCode.toString() + formData.phone.toString()
        )
      ),
    };
    console.log(submitData);
    setStatus({ loading: true, status: "" });
    axiosInstance
      .post("admin/add/employee", submitData)
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
            pathname: "/employees/employee",
            state: {
              refresh: true,
            },
          });
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setStatus({
          loading: false,
          status: "error",
        });
        setTimeout(() => setStatus({ loading: false, status: "" }), 500);
      });
  };

  const clearForm = () => {
    setFormData({
      image: null,
      name: "",
      emiratesId: "",
      phone: "",
      designation: "",
      countryCode: "+91",
    });
    setImageError(" ");
  };

  const valid = () => {
    return Object.values(formData).every((el) => el?.toString().trim() !== "");
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
            image: compressedFiles[0].dataWithPrefix,
          }));
          setImageType(file.name);
          setProcessing(false);
        });
      } else {
        setFormData((prev) => ({
          ...prev,
          image: null,
        }));
        setImageError("Invalid format");
      }
    }
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
          <div className="profile-container flex-column">
            <div
              style={
                processing
                  ? null
                  : {
                      backgroundImage: `url(${formData.image || DefaultImage})`,
                    }
              }
              className={`user-logo ${processing ? "skeleton-box" : ""}`}
              onClick={
                status.loading || processing ? () => {} : () => imageClick()
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
          {schema.map((el, index) => (
            <EachField key={index} {...el} />
          ))}
          <AsyncButton
            className="bg-blue white"
            disabled={!valid() || processing}
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

export default AddEmployee;
