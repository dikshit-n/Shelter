import { Fragment, useEffect, useState } from "react";
import AsyncButton from "../../../../../UI/AsyncButton/AsyncButton";
import Card2 from "../../../../../UI/Card2/Card2";
import EachField from "../../../../../UI/FormField/FormField";
import ReactModal from "../../../../../UI/ReactModal/ReactModal";
import { withRouter } from "react-router";
import { axiosInstance } from "../../../../../Utility/axiosInstance";
import "./EditPage.css";
import { filterNumbers } from "../../../../../Utility/filterNumbers";
import { Col, Row } from "reactstrap";
import ErrorBox from "../../../../../UI/ErrorBox/ErrorBox";
import PlacesLoader from "../../PlacesLoader/PlacesLoader";
import FormInfo from "../../../../../UI/FormInfo/FormInfo";
import uniqueId from "uniqid";
import ReactTooltip from "react-tooltip";
import { downloadImgAsPdf } from "../../../../../Utility/fileOperations";
import { capitalize } from "../../../../../Utility/stringFunctions";

const EditPage = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    QRCode: "",
  });
  const [show, setShow] = useState(false);
  const imageId = uniqueId();
  const [status, setStatus] = useState({
    loading: false,
    status: "",
  });
  const [error, setError] = useState(" ");
  const [deleteStatus, setDeleteStatus] = useState({
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
      // type:
      //   formData.type === "Inside Campus (eg. classroom, ground, etc.)" ||
      //   formData.type === "inside"
      //     ? "inside"
      //     : formData.type.toLocaleLowerCase(),
    };
    console.log(submitData);
    axiosInstance
      .post("admin/edit/place", submitData)
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
        setError(err.response?.statusText || "Something went Wrong !");
        setStatus({
          loading: false,
          status: "error",
        });
        setTimeout(() => setStatus({ loading: false, status: "" }), 500);
      });
  };
  const deletePlace = () => {
    setError(" ");
    setDeleteStatus({ loading: true, status: "" });
    axiosInstance
      .post("admin/delete/place", { placeId: props.details.placeId })
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
    let requiredValues = [formData.name, formData.type];
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

  return (
    <Fragment>
      <ReactModal toggle={closeModal} open={show}>
        <h4 className="text-center">Are you sure ?</h4>
        <div className="modal-buttons-container">
          <AsyncButton
            style={
              deleteStatus.loading ? { background: "var(--my-blue)" } : null
            }
            onClick={deletePlace}
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
          <PlacesLoader />
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
            <Col xl="6" lg="12" md="12" sm="12" xs="12">
              <Card2 className="view-parent-form">
                <AsyncButton
                  className="blue back-button bck-transparent"
                  onClick={goback}
                >
                  <i className="fas fa-chevron-left"></i> Back
                </AsyncButton>
                <form onSubmit={submitHandler} autoComplete="off">
                  <FormInfo info={error} />
                  {schema.map((el, index) => (
                    <EachField key={index} {...el} />
                  ))}
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
              className="flex-center qr-section-places"
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
              <div className="qr-container-places pointer">
                <img
                  data-for={imageId}
                  data-tip
                  onClick={() =>
                    downloadImgAsPdf(formData.QRCode, {
                      name: props.details.name,
                    })
                  }
                  src={formData.QRCode}
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

export default withRouter(EditPage);
