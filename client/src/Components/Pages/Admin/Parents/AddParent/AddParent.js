import { useRef, useState } from "react";
import AsyncButton from "../../../../UI/AsyncButton/AsyncButton";
import Card2 from "../../../../UI/Card2/Card2";
import CountryCode from "../../../../UI/CountryCode/countryCode";
import EachField from "../../../../UI/FormField/FormField";
import { axiosInstance } from "../../../../Utility/axiosInstance";
import { filterNumbers } from "../../../../Utility/filterNumbers";
// import { processImage } from "../../../../Utility/precessImage";
import "./AddParent.css";
import DefaultImage from "../../../../../assets/default-logo.png";
import FormInfo from "../../../../UI/FormInfo/FormInfo";
import { compressFile } from "../../../../Utility/fileOperations";

const AddParent = (props) => {
  const [formData, setFormData] = useState({
    image: null,
    parentName: "",
    rollNo: "",
    name: "",
    age: "",
    bloodGroup: "",
    emiratesId: "",
    email: "",
    address: "",
    class: "",
    phone: [{ countryCode: "+91", number: "" }],
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

    if (name === "age" || name === "phone") {
      value = filterNumbers(value);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const phoneChangeHandler = (event, index) => {
    let { name, value } = event.target;
    if (name === "number") value = filterNumbers(value);
    let updatedFormData = formData;
    updatedFormData.phone[index][name] = value;
    setFormData({ ...updatedFormData });
  };

  var schema = [
    {
      name: "name",
      displayName: "Student Name",
      type: "text",
      value: formData.name,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-add-field",
      // addon: <i className="fa fa-user"></i>,
    },
    {
      name: "rollNo",
      displayName: "Student Roll Number",
      type: "text",
      value: formData.rollNo,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-add-field",
      // addon: <i className="fa fa-user"></i>,
    },
    {
      name: "parentName",
      displayName: "Parent Name",
      type: "text",
      value: formData.parentName,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-add-field",
      // addon: <i className="fa fa-user"></i>,
    },
    {
      name: "age",
      displayName: "Age",
      type: "text",
      min: "0",
      value: formData.age,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-add-field",
      // addon: <i className="fa fa-user"></i>,
    },
    {
      name: "bloodGroup",
      displayName: "Blood Group",
      type: "select",
      value: formData.bloodGroup,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-add-field",
      placeholder: "Choose Blood Group",
      options: [
        "Unknown",
        "Do not prefer to reveal",
        "A",
        "A +ve",
        "A -ve",
        "B",
        "B +ve",
        "B -ve",
        "O",
        "O +ve",
        "O -ve",
        "AB",
        "AB +ve",
        "AB -ve",
      ],
    },
    {
      name: "emiratesId",
      displayName: "Emirates ID",
      type: "text",
      value: formData.emiratesId,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-add-field",
      // addon: <i className="fa fa-user"></i>,
    },
    {
      name: "email",
      displayName: "Email",
      type: "email",
      value: formData.email,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-add-field",
    },
    {
      name: "address",
      displayName: "Address",
      type: "textarea",
      rows: 3,
      value: formData.address,
      onChange: changeHandler,
      required: true,
      containerStyle: { height: "fit-content" },
      containerClassName: "each-add-field __textarea",
    },
    {
      name: "class",
      displayName: "Class / Year",
      type: "text",
      value: formData.class,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-add-field",
    },
    ...formData.phone.map((el, index) => ({
      name: "number",
      displayName: "Phone",
      type: "text",
      value: el.number,
      onChange: (event) => phoneChangeHandler(event, index),
      required: true,
      containerClassName: "each-add-field",
      addon: (
        <CountryCode
          name="countryCode"
          value={el.countryCode}
          defaultValue={el.countryCode}
          onChange={(event) => phoneChangeHandler(event, index)}
        />
      ),
      min: "0",
    })),
  ];

  const submitHandler = (event) => {
    event.preventDefault();
    let submitData = {
      ...formData,
      image: null,
      studentImage: {
        fileType: imageType?.split(".")[1],
        buffer: formData.image,
      },
      phone: [
        ...formData.phone.map((el) =>
          parseInt(
            filterNumbers(el.countryCode.toString() + el.number.toString())
          )
        ),
      ],
    };
    console.log(submitData);
    setStatus({ loading: true, status: "" });
    axiosInstance
      .post("admin/add/parent", submitData)
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
            pathname: "/parents/parent",
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
      parentName: "",
      rollNo: "",
      name: "",
      age: "",
      bloodGroup: "Unknown",
      emiratesId: "",
      email: "",
      class: "",
      phone: [{ countryCode: "+91", number: "" }],
    });
    setImageError(" ");
  };

  const valid = () => {
    let requiredValues = [
      formData.parentName,
      formData.rollNo,
      formData.name,
      formData.age,
      formData.bloodGroup,
      formData.emiratesId,
      formData.email,
      formData.address,
      formData.class,
      ...formData.phone.map((el) => el.number),
    ];
    return requiredValues.every((el) => el.toString().trim() !== "");
  };

  const addMobile = () => {
    setFormData((prev) => ({
      ...prev,
      phone: [...prev.phone, { countryCode: "+91", number: "" }],
    }));
  };
  const removeMobile = () => {
    let phoneArray = formData.phone;
    phoneArray.pop();
    setFormData((prev) => ({
      ...prev,
      phone: [...phoneArray],
    }));
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
  // console.log(imageBuffer, imageType);
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
          <div className="phone-add-remove-container">
            <AsyncButton
              disabled={formData.phone.length >= 4}
              className="bck-transparent green"
              onClick={addMobile}
            >
              Add number
            </AsyncButton>
            <AsyncButton
              className="bck-transparent red"
              disabled={formData.phone.length <= 1}
              onClick={removeMobile}
            >
              Remove number
            </AsyncButton>
          </div>
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

export default AddParent;
