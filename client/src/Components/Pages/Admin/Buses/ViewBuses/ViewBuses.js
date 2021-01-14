import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusesAdmin } from "../../../../redux/Admin/Buses/actions";
import AsyncButton from "../../../../UI/AsyncButton/AsyncButton";
import ErrorBox from "../../../../UI/ErrorBox/ErrorBox";
import RefreshButton from "../../../../UI/RefreshButton/RefreshButton";
import AddBus from "../AddBus/AddBus";
import "./ViewBuses.css";
import BusesLoader from "../BusesLoader/BusesLoader";
import EachBus from "../EachBus/EachBus";
import EmptyMessage from "../../../../UI/EmptyMessage/EmptyMessage";
const ViewBuses = (props) => {
  const loading = useSelector((state) => state.busesAdmin.loading);
  const error = useSelector((state) => state.busesAdmin.error);
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("all");

  const buses = useSelector((state) => state.busesAdmin.data);
  const dispatch = useDispatch();
  useEffect(() => {
    // props.location.state?.refresh
    fetchData();
  }, []);

  const fetchData = () => {
    dispatch(fetchBusesAdmin());
  };

  const openModal = () => {
    setOpen(true);
  };

  const sortBy = (type) => {
    setSort(type);
  };

  let sortedBuses = buses;
  sortedBuses =
    sort === "all"
      ? sortedBuses
      : sortedBuses.filter((el) => el.status === sort);

  return (
    <div className="_100 buses bg-white">
      <AddBus open={open} setOpen={setOpen} />
      <div className="_100 buses-section-container">
        <div className="buses-header flex-wrap bg-white d-flex justify-content-between">
          <div className="mac-buttons flex-row flex-wrap justify-content-start align-items-center pointer">
            <div
              className={`${sort === "all" ? "bus-filter-active" : ""}`}
              onClick={() => sortBy("all")}
            >
              <div className="zoom tool bg-blue"></div>
              <small className="no-wrap">&nbsp;- All &nbsp;</small>
            </div>
            <div
              className={`${sort === "running" ? "bus-filter-active" : ""}`}
              onClick={() => sortBy("running")}
            >
              <div className="zoom tool bg-green"></div>
              <small className="no-wrap">&nbsp;- Running &nbsp;</small>
            </div>
            <div
              className={`${sort === "idle" ? "bus-filter-active" : ""}`}
              onClick={() => sortBy("idle")}
            >
              <div className="minimize tool"></div>
              <small className="no-wrap">&nbsp;- Idle &nbsp;</small>
            </div>
            <div
              className={`${
                sort === "emergency"
                  ? `bus-filter-active ${
                      sortedBuses.length > 0 ? "sos-alert" : ""
                    }`
                  : ""
              }`}
              onClick={() => sortBy("emergency")}
            >
              <div className="close tool"></div>
              <small className="no-wrap">&nbsp;- SOS! &nbsp;</small>
            </div>
          </div>
          <div className="flex-row">
            <AsyncButton
              onClick={openModal}
              disabled={loading}
              className="bg-green white buses-header-button"
            >
              Add Bus
            </AsyncButton>
            <RefreshButton
              className="buses-refresh-button"
              loading={loading}
              onClick={fetchData}
            />
          </div>
        </div>
        {loading ? (
          <div className="flex-row flex-wrap bg-white">
            <BusesLoader />
          </div>
        ) : error !== "" ? (
          <div style={{ paddingBottom: 100 }}>
            <ErrorBox message={error || "Something went wrong!"} />
          </div>
        ) : sortedBuses.length === 0 ? (
          <EmptyMessage message="No Buses Found !" />
        ) : (
          <div className="flex-row flex-wrap bg-white">
            {sortedBuses.map((el, index) => (
              <EachBus {...el} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBuses;
