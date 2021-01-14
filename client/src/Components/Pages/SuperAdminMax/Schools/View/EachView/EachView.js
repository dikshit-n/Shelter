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

import { Fragment, useEffect, useState } from "react";
import AsyncButton from "../../../../../UI/AsyncButton/AsyncButton";
import Card2 from "../../../../../UI/Card2/Card2";
import EachField from "../../../../../UI/FormField/FormField";
import ReactModal from "../../../../../UI/ReactModal/ReactModal";
import { withRouter } from "react-router";
import { axiosInstance } from "../../../../../Utility/axiosInstance";
import "./EachView.css";
import { filterNumbers } from "../../../../../Utility/filterNumbers";
import { Col, Row } from "reactstrap";
import ErrorBox from "../../../../../UI/ErrorBox/ErrorBox";
// import uniqueId from "uniqid";
import AdminLoader from "../SuperadminLoader/SuperadminLoader";

const EachView = (props) => {
  // const imageId = uniqueId();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [show, setShow] = useState(false);

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
  // const phoneChangeHandler = (event, index) => {
  //   let { name, value } = event.target;
  //   if (name === "number") value = filterNumbers(value);
  //   let updatedFormData = formData;
  //   if (
  //     updatedFormData.phone[index].countryCode ||
  //     updatedFormData.phone[index].number
  //   ) {
  //     updatedFormData.phone[index][name] = value;
  //   } else {
  //     updatedFormData.phone[index] = value;
  //   }
  //   setFormData({ ...updatedFormData });
  // };

  useEffect(() => {
    if (Object.keys(props.details).length !== 0)
      setFormData((prev) => ({
        ...prev,
        ...props.details,
      }));
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
      name: "email",
      displayName: "Email",
      type: "email",
      value: formData.email,
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
    // ...formData.phone.map((el, index) => {
    //   return {
    //     name: "number",
    //     displayName: "Phone",
    //     type: "text",
    //     value: el.number || el.countryCode ? el.number : el,
    //     onChange: (event) => phoneChangeHandler(event, index),
    //     required: true,
    //     containerClassName: "each-add-field",
    //     min: "0",
    //     addon: el.countryCode ? (
    //       <CountryCode
    //         name="countryCode"
    //         value={el.countryCode}
    //         defaultValue={el.countryCode}
    //         onChange={(event) => phoneChangeHandler(event, index)}
    //       />
    //     ) : undefined,
    //   };
    // }),
  ];

  const submitHandler = (event) => {
    event.preventDefault();
    let submitData = {
      ...formData,
      // phone: [
      //   ...formData.phone.map((el) =>
      //     el.countryCode && el.number
      //       ? parseInt(
      //           filterNumbers(el.countryCode.toString() + el.number.toString())
      //         )
      //       : el
      //   ),
      // ],
    };
    console.log(submitData);
    setStatus({ loading: true, status: "" });
    axiosInstance
      .post("/admin", submitData)
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
      .post("/admin", { employeeId: props._id })
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
      formData.name,
      formData.email,
      formData.phone,
      // ...formData.phone.map((el) =>
      //   el.number || el.countryCode ? el.number : el
      // ),
    ];
    return requiredValues.every((el) => el.toString().trim() !== "");
  };

  const goback = () => {
    if (!status.loading) {
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

  // const addMobile = () => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     phone: [...prev.phone, { countryCode: "+91", number: "" }],
  //   }));
  // };
  // const removeMobile = () => {
  //   let phoneArray = formData.phone;
  //   phoneArray.pop();
  //   setFormData((prev) => ({
  //     ...prev,
  //     phone: [...phoneArray],
  //   }));
  // };

  // console.log(props.details);
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
          <AdminLoader />
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
            <Col>
              <Card2 className="view-parent-form">
                <AsyncButton
                  className="blue back-button bck-transparent"
                  onClick={goback}
                >
                  <i className="fas fa-chevron-left"></i> Back
                </AsyncButton>
                <form onSubmit={submitHandler} autoComplete="off">
                  {schema.map((el, index) => (
                    <EachField key={index} {...el} />
                  ))}
                  {/* <div className="phone-add-remove-container">
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
                  </div> */}
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
            {/* <Col
              className="flex-center qr-section"
              xl="6"
              lg="12"
              md="12"
              sm="12"
              xs="12"
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
              <div className="qr-container">
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
            </Col> */}
          </Row>
        )}
      </div>
    </Fragment>
  );
};

export default withRouter(EachView);
