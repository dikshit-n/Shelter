import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusLogAdmin } from "../../../../redux/Admin/Buses/actions";
import AsyncButton from "../../../../UI/AsyncButton/AsyncButton";
import ErrorBox from "../../../../UI/ErrorBox/ErrorBox";
import { axiosInstance } from "../../../../Utility/axiosInstance";
import EachBusDetail from "../EachBusDetail/EachBusDetail";
import Idle from "./Idle/Idle";
import "./LiveDetail.css";
import Running from "./Running/Running";
// var mount = 0;
const LiveDetail = (props) => {
  const { status, id } = props.match.params;
  const data = useSelector((state) =>
    status === "running"
      ? state.busLogAdmin.runningData
      : status === "idle"
      ? state.busLogAdmin.idleData
      : state.busLogAdmin.emergencyData
  );
  const loading = useSelector((state) => state.busLogAdmin.loading);
  const error = useSelector((state) => state.busLogAdmin.error);

  // get the bus ID from the route
  //   const busId = props

  // Editable View
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const [openDetail, setOpenDetail] = useState(false);
  const [details, setDetails] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    // mount = 1;
    fetchData();
  }, []);

  const fetchData = (logTime = Date.now()) => {
    dispatch(fetchBusLogAdmin(status, id, logTime));
  };

  // Data for Editable View
  const gatherData = (id) => {
    setDetailError("");
    setDetailLoading(true);
    axiosInstance
      .post("/admin/view/bus/single", { busId: id })
      .then((res) => {
        setDetailLoading(false);
        setDetails({ ...res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setDetailLoading(false);
        setDetailError(err.response?.statusText || "Something Went Wrong !");
      });
  };

  const clickHandler = (id) => {
    setOpenDetail(true);
    gatherData(id);
  };

  const goback = () => {
    setOpenDetail(false);
  };

  const EditBusDetail = (
    <AsyncButton
      onClick={() => clickHandler(id)}
      disabled={loading}
      className="bg-green white buses-header-button"
    >
      View Bus
    </AsyncButton>
  );

  return (
    <div
      style={{ overflow: openDetail ? "hidden" : "auto" }}
      className="_100 buses-section-container"
    >
      {error !== "" ? (
        <Fragment>
          <ErrorBox
            message={error}
            component={
              <AsyncButton
                className="blue back-button bck-transparent"
                onClick={props.history.goBack}
              >
                <i className="fas fa-chevron-left"></i> Back
              </AsyncButton>
            }
          />
          {/* <AsyncButton
            className="blue back-button bck-transparent"
            onClick={props.history.goBack}
          >
            <i className="fas fa-chevron-left"></i> Back
          </AsyncButton> */}
        </Fragment>
      ) : data === null && !loading ? (
        <Fragment>
          <ErrorBox
            message="No Details Found"
            component={
              <AsyncButton
                className="blue back-button bck-transparent"
                onClick={props.history.goBack}
              >
                <i className="fas fa-chevron-left"></i> Back
              </AsyncButton>
            }
          />
        </Fragment>
      ) : props.match.params.status === "running" ? (
        <Running
          component={EditBusDetail}
          data={data}
          loading={loading}
          fetchData={fetchData}
        />
      ) : props.match.params.status === "idle" ? (
        <Idle
          component={EditBusDetail}
          fetchData={fetchData}
          data={data}
          loading={loading}
        />
      ) : (
        <div>SOS !</div>
      )}
      <EachBusDetail
        afterUpdate={fetchData}
        open={openDetail}
        details={details}
        loading={detailLoading}
        error={detailError}
        goback={goback}
      />
    </div>
  );
};

export default LiveDetail;
