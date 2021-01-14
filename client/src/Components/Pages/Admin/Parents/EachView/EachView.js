// import "./EachView.css";

// const EachView = (props) => {
//   // console.log(props.details);
//   return (
//     <div className="each-view">
//       <button onClick={props.close}>Cancel</button>
//       Each View
//     </div>
//   );
// };

// export default EachView;

import { Fragment, useEffect, useRef, useState } from "react";
import AsyncButton from "../../../../UI/AsyncButton/AsyncButton";
import Card2 from "../../../../UI/Card2/Card2";
import EachField from "../../../../UI/FormField/FormField";
import ReactModal from "../../../../UI/ReactModal/ReactModal";
import { withRouter } from "react-router";
import { axiosInstance } from "../../../../Utility/axiosInstance";
import "./EachView.css";
import { filterNumbers } from "../../../../Utility/filterNumbers";
import { Col, Row } from "reactstrap";
import ParentLoader from "../ParentLoader/ParentLoader";
import CountryCode from "../../../../UI/CountryCode/countryCode";
import ErrorBox from "../../../../UI/ErrorBox/ErrorBox";
import uniqueId from "uniqid";
import ReactTooltip from "react-tooltip";
import { downloadImgAsPdf } from "../../../../Utility/fileOperations";
import DefaultImage from "../../../../../assets/default-logo.png";
import FormInfo from "../../../../UI/FormInfo/FormInfo";
import { compressFile } from "../../../../Utility/fileOperations";

const EachView = (props) => {
  const imageId = uniqueId();
  const [formData, setFormData] = useState({
    image: null,
    rollNo: "",
    parentName: "",
    name: "",
    age: "",
    bloodGroup: "Unknown",
    email: "",
    address: "",
    class: "",
    phone: [""],
    qrCode: "",
  });
  const [show, setShow] = useState(false);

  // image
  const inputRef = useRef();
  // const [imageChanged, setImageChanged] = useState(false);
  const [imageType, setImageType] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [imageError, setImageError] = useState(" ");

  const [qrPosition, setQrPosition] = useState(0);

  const [status, setStatus] = useState({
    loading: false,
    status: "",
  });
  const [deleteStatus, setDeleteStatus] = useState({
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
    if (
      updatedFormData.phone[index].countryCode ||
      updatedFormData.phone[index].number
    ) {
      updatedFormData.phone[index][name] = value;
    } else {
      updatedFormData.phone[index] = value;
    }
    setFormData({ ...updatedFormData });
  };

  useEffect(() => {
    if (Object.keys(props.details).length !== 0) {
      console.log(props.details);
      setFormData((prev) => ({
        ...prev,
        ...props.details,
        image: props.details.studentImage?.url,
      }));

      // console.log({
      //   ...props.details,
      //   image: props.details.studentImage?.buffer,
      // });
    }
  }, [props.details]);

  var schema = [
    {
      name: "name",
      displayName: "Student Name",
      type: "text",
      value: formData.name,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-add-field",
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
    },
    {
      name: "bloodGroup",
      displayName: "Blood Group",
      type: "select",
      value: formData.bloodGroup,
      onChange: changeHandler,
      required: true,
      containerClassName: "each-add-field",
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
      placeholder: "Choose Blood Group",
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
    ...formData.phone.map((el, index) => {
      return {
        name: "number",
        displayName: "Phone",
        type: "text",
        value: el.number || el.countryCode ? el.number : el,
        onChange: (event) => phoneChangeHandler(event, index),
        required: true,
        containerClassName: "each-add-field",
        min: "0",
        addon: el.countryCode ? (
          <CountryCode
            name="countryCode"
            value={el.countryCode}
            defaultValue={el.countryCode}
            onChange={(event) => phoneChangeHandler(event, index)}
          />
        ) : undefined,
      };
    }),
  ];

  const submitHandler = (event) => {
    event.preventDefault();
    let submitData = {
      ...formData,
      omage: null,
      imageData: {
        fileType: imageType?.split(".")[1],
        buffer: formData.image,
        studentId: props.details.studentId,
        change: formData.image !== props.details.studentImage?.url,
      },
      phone: [
        ...formData.phone.map((el) =>
          el.countryCode && el.number
            ? parseInt(
                filterNumbers(el.countryCode.toString() + el.number.toString())
              )
            : el
        ),
      ],
    };
    console.log(submitData);
    setStatus({ loading: true, status: "" });
    axiosInstance
      .post("admin/update/student/single", submitData)
      .then((res) => {
        console.log(res.data);
        setStatus({
          loading: false,
          status: "success",
        });
        setTimeout(() => {
          setStatus({ loading: false, status: "" });
          props.close();
          props.afterUpdate();
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
  const deleteUser = () => {
    setDeleteStatus({ loading: true, status: "" });
    axiosInstance
      .post("admin/delete/parent", { employeeId: props._id })
      .then((res) => {
        setDeleteStatus({
          loading: false,
          status: "",
        });
        setShow(false);
        setTimeout(() => {
          props.close();
          props.afterUpdate();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setDeleteStatus({
          loading: false,
          status: "error",
        });
        setTimeout(() => {
          setDeleteStatus({ loading: false, status: "" });
          setShow(false);
        }, 500);
      });
  };

  const valid = () => {
    let requiredValues = [
      formData.parentName,
      formData.rollNo,
      formData.name,
      formData.age,
      formData.bloodGroup,
      formData.email,
      formData.address,
      formData.class,
      ...formData.phone.map((el) =>
        el.number || el.countryCode ? el.number : el
      ),
    ];
    return requiredValues.every((el) => el.toString().trim() !== "");
  };

  const goback = () => {
    if (!status.loading) {
      setImageError(" ");
      setImageType(null);
      setProcessing(false);
      // setImageChanged(false);
      clearForm();
      props.close();
    }
  };

  const clearForm = () => {
    setFormData({
      image: null,
      rollNo: "",
      parentName: "",
      name: "",
      age: "",
      bloodGroup: "Unknown",
      email: "",
      address: "",
      class: "",
      phone: [""],
      qrCode: "",
    });
  };

  const closeModal = () => {
    if (!deleteStatus.loading && deleteStatus.status.length === 0) {
      setShow(false);
    }
  };
  const openModal = () => {
    if (!status.loading && status.status.length === 0) {
      setShow(true);
    }
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
  // console.log(formData);
  let container = document.querySelector(".each-parent-view-container");
  container?.addEventListener("scroll", () => {
    setQrPosition(container.scrollTop);
  });
  return (
    <Fragment>
      <ReactModal toggle={closeModal} open={show}>
        <h4 className="text-center">Are you sure ?</h4>
        <div className="modal-buttons-container">
          <AsyncButton
            style={
              deleteStatus.loading ? { background: "var(--my-blue)" } : null
            }
            onClick={deleteUser}
            status={deleteStatus.status}
            loading={deleteStatus.loading}
            className="yes-button"
          >
            Yes
          </AsyncButton>
          <AsyncButton className="cancel-button" onClick={closeModal}>
            No
          </AsyncButton>
        </div>
      </ReactModal>
      <div className="each-parent-view">
        {props.loading ? (
          <ParentLoader />
        ) : props.error.length > 0 ? (
          <Fragment>
            <ErrorBox
              message={props.error}
              component={
                <AsyncButton
                  className="blue back-button bck-transparent"
                  onClick={goback}
                >
                  <i className="fas fa-chevron-left"></i> Back
                </AsyncButton>
              }
            />
          </Fragment>
        ) : (
          <Row className="view-parent-form-container margin-none">
            <Col xl="8" lg="12" md="12" sm="12" xs="12">
              <Card2 className="view-parent-form">
                <AsyncButton
                  className="blue back-button bck-transparent"
                  onClick={goback}
                >
                  <i className="fas fa-chevron-left"></i> Back
                </AsyncButton>
                <form onSubmit={submitHandler} autoComplete="off">
                  <div className="profile-container flex-column">
                    <div
                      style={
                        processing
                          ? null
                          : {
                              backgroundImage: `url(${
                                formData.image || DefaultImage
                              })`,
                            }
                      }
                      className={`user-logo ${
                        processing ? "skeleton-box" : ""
                      }`}
                      onClick={
                        status.loading || processing
                          ? () => {}
                          : () => imageClick()
                      }
                    ></div>
                    <input
                      type="file"
                      ref={inputRef}
                      style={{
                        position: "absolute",
                        visibility: "hidden",
                        height: 0,
                      }}
                      onChange={imageChangeHandler}
                    />
                    <FormInfo info={imageError} />
                  </div>
                  {schema.map((el, index) => (
                    <EachField key={index} {...el} />
                  ))}
                  <div className="phone-add-remove-container">
                    <AsyncButton
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
                  <div className="each-view-buttons-container">
                    <AsyncButton
                      disabled={!valid()}
                      loading={status.loading}
                      status={status.status}
                      className="bg-green"
                      type="submit"
                    >
                      Update
                    </AsyncButton>
                    <AsyncButton className="bg-red" onClick={openModal}>
                      Delete
                    </AsyncButton>
                  </div>
                </form>
              </Card2>
            </Col>
            <Col
              className="flex-center qr-section"
              xl="4"
              lg="12"
              md="12"
              sm="12"
              xs="12"
              style={{
                position: "relative",
              }}
            >
              <ReactTooltip
                id={imageId}
                effect="float"
                type="info"
                place="top"
                className="opacity-1"
              >
                <span>Download PDF</span>
              </ReactTooltip>
              <div
                className="qr-container"
                style={{
                  top: qrPosition,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <img
                  data-for={imageId}
                  data-tip
                  className="pointer"
                  onClick={() =>
                    downloadImgAsPdf(formData.qrCode, {
                      name: props.details.name,
                    })
                  }
                  src={formData.qrCode}
                  alt="qr-code"
                />
              </div>
            </Col>
          </Row>
        )}
      </div>
    </Fragment>
  );
};

export default withRouter(EachView);
