import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBusesAdmin } from "../../../../redux/Admin/Buses/actions";
import AsyncButton from "../../../../UI/AsyncButton/AsyncButton";
import EachField from "../../../../UI/FormField/FormField";
import FormInfo from "../../../../UI/FormInfo/FormInfo";
import ReactModal from "../../../../UI/ReactModal/ReactModal";
import { axiosInstance } from "../../../../Utility/axiosInstance";
import "./AddBus.css";

const AddBus = (props) => {
  const [formData, setFormData] = useState({
    busNo: "",
    routeCode: "",
  });

  const dispatch = useDispatch();

  const [status, setStatus] = useState({
    loading: false,
    status: "",
  });
  const [error, setError] = useState(" ");

  const closeModal = () => {
    if (!status.loading && status.status.length === 0) {
      clearForm();
      props.setOpen(false);
    }
  };

  const changeHandler = (event) => {
    const { value, name } = event.target;
    setError(" ");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setError(" ");
    setStatus({ loading: true, status: "" });
    axiosInstance
      .post("/admin/add/bus", formData)
      .then((res) => {
        console.log(res.data);
        setStatus({
          loading: false,
          status: "success",
        });
        setTimeout(() => {
          setStatus({ loading: false, status: "" });
          clearForm();
          props.setOpen(false);
          dispatch(fetchBusesAdmin());
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setStatus({ loading: false, status: "error" });
        setError(err.response?.statusText || "Something is wrong");
        setTimeout(() => setStatus({ loading: false, status: "" }), 500);
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
      autoFocus: true,
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

  const clearForm = () => {
    setError(" ");
    setFormData({
      busNo: "",
      routeCode: "",
    });
  };

  const valid = () => {
    return Object.values(formData).every((el) => el.toString().trim() !== "");
  };

  return (
    <ReactModal toggle={closeModal} open={props.open}>
      <form autoComplete="off" onSubmit={submitHandler}>
        <FormInfo info={error} />
        {schema.map((el, index) => (
          <EachField {...el} key={index} />
        ))}
        <AsyncButton
          type="submit"
          disabled={!valid()}
          status={status.status}
          loading={status.loading}
          className="bg-blue"
        >
          Add
        </AsyncButton>
      </form>
    </ReactModal>
  );
};

export default AddBus;
