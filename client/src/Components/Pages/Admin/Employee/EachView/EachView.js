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
import { capitalize } from "../../../../Utility/stringFunctions";
import ErrorBox from "../../../../UI/ErrorBox/ErrorBox";
import EmployeeLoader from "../EmployeeLoader/EmployeeLoader";
import DefaultImage from "../../../../../assets/default-logo.png";
import { compressFile } from "../../../../Utility/fileOperations";
import FormInfo from "../../../../UI/FormInfo/FormInfo";

const EachView = (props) => {
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    emiratesId: "",
    phone: "",
    designation: "",
  });
  const [show, setShow] = useState(false);

  // image
  const inputRef = useRef();
  const [imageType, setImageType] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [imageError, setImageError] = useState(" ");

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
    if (name === "phone") {
      value = filterNumbers(value);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (Object.keys(props.details).length !== 0) {
      setFormData({
        ...props.details,
        designation: props.details.designation,
        image: props.details.employeeImage?.url,
      });
    }
  }, [props.details]);

  var schema = [
    {
      name: "name",
      displayName: "Name",
      type: "text",
      value: formData.name,
      onChange: changeHandler,
      required: true,
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
      imageData: {
        fileType: imageType?.split(".")[1],
        buffer: formData.image,
        employeeId: props.details._id,
        change: formData.image !== props.details.employeeImage?.url,
      },
    };
    console.log(submitData);
    setStatus({ loading: true, status: "" });
    axiosInstance
      .post("admin/edit/employee", submitData)
      .then((res) => {
        console.log(res.data);
        setStatus({
          loading: false,
          status: "success",
        });
        setTimeout(() => {
          setStatus({ loading: false, status: "" });
          clearForm();
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
      .post("admin/delete/employee", { employeeId: props.details._id })
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

  const clearForm = () => {
    setFormData({
      image: null,
      name: "",
      emiratesId: "",
      phone: "",
      designation: "",
    });
  };

  const valid = () => {
    return Object.values(formData).every((el) => el?.toString().trim() !== "");
  };

  // const modalToggle = () => {
  //   setShow((prev) => !prev);
  // };

  const goback = () => {
    if (!status.loading) {
      clearForm();
      props.close();
    }
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
      <div className="each-employee-view">
        {props.loading ? (
          <EmployeeLoader />
        ) : props.error.length > 0 ? (
          <>
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
          </>
        ) : (
          <div className="view-employee-form-container">
            <Card2 className="view-employee-form">
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
                    className={`user-logo ${processing ? "skeleton-box" : ""}`}
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
                <div className="each-view-buttons-container">
                  <AsyncButton
                    disabled={!valid() || processing}
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
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default withRouter(EachView);
