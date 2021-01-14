import "./EachBusDetail.css";
import { CSSTransition } from "react-transition-group";
import { Fragment, useEffect, useState } from "react";
import EachField from "../../../../UI/FormField/FormField";
import ReactModal from "../../../../UI/ReactModal/ReactModal";
import { axiosInstance } from "../../../../Utility/axiosInstance";
import AsyncButton from "../../../../UI/AsyncButton/AsyncButton";
import FormInfo from "../../../../UI/FormInfo/FormInfo";
import ErrorBox from "../../../../UI/ErrorBox/ErrorBox";
import Card2 from "../../../../UI/Card2/Card2";
import { Col, Row, UncontrolledTooltip } from "reactstrap";
import BusDetailLoader from "./BusDetailLoader/BusDetailLoader";
import ReactTooltip from "react-tooltip";
import uniqueId from "uniqid";
import { downloadImgAsPdf } from "../../../../Utility/fileOperations";

const EachBusDetail = (props) => {
  const [formData, setFormData] = useState({
    busNo: "",
    routeCode: "",
    status: "",
    QRCode: "",
  });
  const imageId = uniqueId();
  const [updateStatus, setUpdateStatus] = useState({
    loading: false,
    status: "",
  });
  const [updateError, setUpdateError] = useState(" ");
  const [showModal, setShowModal] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState({
    loading: false,
    status: "",
  });

  useEffect(() => {
    if (Object.keys(props.details).length > 0)
      setFormData((prev) => ({ ...prev, ...props.details }));
  }, [props.details]);
  // useEffect(() => {
  //   let image = document.getElementById("img");
  //   let imageToolTip = document.getElementById(imageId);
  //   image.addEventListener("mousemove", () => {
  //     console.log(image.);
  //     imageToolTip.style.left = image.offsetLeft + "px";
  //   });
  // }, []);

  const changeHandler = (event) => {
    const { value, name } = event.target;
    setUpdateError(" ");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setUpdateStatus({ loading: true, status: "" });
    axiosInstance
      .post("/admin/buses/update", { ...formData, busId: props.details?.busId })
      .then((res) => {
        console.log(res.data);
        setUpdateStatus({ loading: false, status: "success" });
        setTimeout(() => {
          setUpdateStatus({ loading: false, status: "" });
          props.goback();
          props.afterUpdate();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setUpdateError(err.response?.statusText || "Something went wrong !");
        setUpdateStatus({ loading: false, status: "error" });
        setTimeout(() => setUpdateStatus({ loading: false, status: "" }), 500);
      });
  };

  const deleteBus = (event) => {
    setDeleteStatus({ loading: true, status: "" });
    axiosInstance
      .post("/admin/buses/delete", { busId: props.details?.busId })
      .then((res) => {
        console.log(res.data);
        setDeleteStatus({ loading: false, status: "" });
        setTimeout(() => {
          props.goback();
          props.afterUpdate();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setDeleteStatus({ loading: false, status: "error" });
        setTimeout(() => setDeleteStatus({ loading: false, status: "" }), 500);
      });
  };

  var schema = [
    {
      name: "busNo",
      type: "text",
      required: true,
      displayName: "Bus No",
      value: formData.busNo,
      onChange: changeHandler,
      containerClassName: "each-add-field",
    },
    {
      name: "routeCode",
      type: "text",
      required: true,
      displayName: "Route Code",
      value: formData.routeCode,
      onChange: changeHandler,
      containerClassName: "each-add-field",
    },
  ];

  const closeModal = () => {
    if (!deleteStatus.loading && deleteStatus.status === "") {
      setUpdateError(" ");
      setShowModal(false);
    }
  };

  const valid = () => {
    return Object.values(formData).every((el) => el.toString().trim() !== "");
  };

  const goback = () => {
    if (!updateStatus.loading && updateStatus.status === "") {
      props.goback();
    }
  };

  return (
    <Fragment>
      <ReactModal toggle={closeModal} open={showModal}>
        <h4 className="text-center">Are you sure ?</h4>
        <div className="modal-buttons-container">
          <AsyncButton
            style={
              deleteStatus.loading ? { background: "var(--my-blue)" } : null
            }
            onClick={deleteBus}
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
      <CSSTransition
        in={props.open}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <Fragment>
          <div className="each-bus-detail flex-center blurred-box">
            <div onClick={goback} className="fake-detail"></div>
            {props.loading ? (
              <div className="bus-content">
                <BusDetailLoader />
              </div>
            ) : props.error.length > 0 ? (
              <div className="bus-content">
                <ErrorBox message={props.error} />
              </div>
            ) : (
              <Card2 className="flex-column bus-content each-bus-detail-form">
                <Row>
                  <Col xl="6" lg="6" md="6" sm="12" xs="12">
                    <form onSubmit={submitHandler}>
                      <AsyncButton
                        className="blue back-button bck-transparent"
                        onClick={goback}
                      >
                        <i className="fas fa-chevron-left"></i> Back
                      </AsyncButton>
                      <FormInfo info={updateError} />
                      {schema.map((el, index) => (
                        <EachField {...el} key={index} />
                      ))}
                      <div className="each-bus-details-buttons-container">
                        <AsyncButton
                          type="submit"
                          disabled={!valid()}
                          loading={updateStatus.loading}
                          status={updateStatus.status}
                          className="bg-blue white small-button"
                        >
                          Update
                        </AsyncButton>
                        <AsyncButton
                          disabled={updateStatus.loading}
                          className="bg-red white small-button"
                          onClick={() => setShowModal(true)}
                        >
                          Delete
                        </AsyncButton>
                      </div>
                    </form>
                  </Col>
                  <Col
                    className="qr-section-bus flex-center pointer"
                    xl="6"
                    lg="6"
                    md="6"
                    sm="12"
                    xs="12"
                    style={{ position: "relative" }}
                  >
                    <UncontrolledTooltip
                      fade
                      innerClassName="top-right-arrow"
                      placement="top"
                      target={imageId}
                    >
                      <span>Download PDF</span>
                    </UncontrolledTooltip>
                    <div className="qr-container-bus">
                      <img
                        id={imageId}
                        onClick={() =>
                          downloadImgAsPdf(formData.QRCode, {
                            name: formData.busNo,
                          })
                        }
                        src={formData.QRCode}
                        alt="qr-code"
                      />
                    </div>
                  </Col>
                </Row>
              </Card2>
            )}
          </div>
        </Fragment>
      </CSSTransition>
    </Fragment>
  );
};

export default EachBusDetail;
