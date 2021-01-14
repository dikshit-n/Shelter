import { useEffect, useState } from "react";
// import ReactTable from "../../../UI/ReactTable/ReactTable";
import "./Place.css";
import EachView from "./EachView/EachView";
import uniqueId from "uniqid";
import { useDispatch, useSelector } from "react-redux";
import RefreshButton from "../../../UI/RefreshButton/RefreshButton";
import { fetchPlacesAdmin } from "../../../redux/Admin/Places/actions";
import { axiosInstance } from "../../../Utility/axiosInstance";
import Gate from "../../../../assets/gate.svg";
import ClassRoom from "../../../../assets/classRoom.png";
import AnimatedList from "../../../UI/AnimatedList/AnimatedList";
import EachPlace from "./EachPlace/EachPlace";
import Toggler from "../../../UI/Toggler/Toggler";

var mount = 0;

const Place = (props) => {
  const [containerId] = useState(uniqueId());
  const [eachDetail, setEachDetail] = useState({});
  const [logDetail, setLogDetail] = useState([]);
  const [placeId, setPlaceId] = useState(null);
  const dispatch = useDispatch();
  var data = useSelector((state) => state.placesAdmin.data);
  var loading = useSelector((state) => state.placesAdmin.loading);
  const [gates, setGates] = useState(false);
  var tableError = useSelector((state) => state.placesAdmin.error) || "";
  const [detailLoading, setDetailLoading] = useState(false);
  const [logLoading, setLogLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = () => {
    console.log("Fetching Places");
    dispatch(fetchPlacesAdmin());
  };

  useEffect(() => {
    if (props.location.state?.refresh || mount === 0) {
      mount = 1;
      fetchData();
    }
  }, []);

  const gatherData = (id) => {
    setDetailLoading(true);
    setError("");
    axiosInstance
      .post("/admin/view/place/single", { placeId: id })
      .then((res) => {
        console.log(res.data);
        setDetailLoading(false);
        setEachDetail({ ...res.data });
      })
      .catch((err) => {
        console.log(err);
        setDetailLoading(false);
        setEachDetail((prev) => ({ ...prev }));
        setError("Something went wrong!");
      });
  };

  const gatherLog = (id, time) => {
    console.log(id, time);
    setLogLoading(true);
    setError("");
    axiosInstance
      .post("/admin/view/placelog", { placeId: id, time })
      .then((res) => {
        console.log(res.data);
        setLogLoading(false);
        setLogDetail([...res.data]);
      })
      .catch((err) => {
        console.log(err);
        setLogLoading(false);
        setLogDetail((prev) => [...prev]);
        setError("Something went wrong!");
      });
  };

  const open = (detail) => {
    const container = document.getElementById(containerId);
    if (container.classList.contains("place-scroll-right"))
      container.classList.remove("place-scroll-right");
    container.classList.add("place-scroll-left");
  };
  const close = () => {
    const container = document.getElementById(containerId);
    if (container.classList.contains("place-scroll-left"))
      container.classList.remove("place-scroll-left");
    container.classList.add("place-scroll-right");
  };

  const getList = () => {
    let newData = data;
    newData = gates
      ? newData.filter((el) => el.type === "gate")
      : newData.filter((el) => el.type === "inside");
    return newData.map((el, index) => (
      <EachPlace
        status={el.status}
        key={index}
        onClick={() => {
          open(el);
          gatherLog(el.placeId);
          setPlaceId(el.placeId);
          // gatherData(el.placeId);
        }}
        name={el.name}
        image={gates ? Gate : ClassRoom}
      />
    ));
  };

  const getToggleElements = () => {
    return [
      { name: "Inside Campus", actions: { onClick: () => setGates(false) } },
      { name: "Entry Gate", actions: { onClick: () => setGates(true) } },
    ];
  };

  return (
    <div className="place-scroller-container">
      <div className="view-places-container" id={containerId}>
        <div className="view-places-table">
          <div className="places-container">
            <div className="places-header d-flex justify-content-between flex-wrap">
              <div></div>
              <div className="fit-content flex-vertical-center">
                <Toggler
                  markerClassName="marker"
                  routes={getToggleElements()}
                />
              </div>
              <RefreshButton
                onClick={fetchData}
                className="refresh-button"
                loading={loading}
              />
            </div>
            <div className="places-list-container">
              <AnimatedList
                error={tableError?.length > 0 ? tableError : null}
                loading={loading}
                emptyMessage="No places found"
              >
                {getList()}
              </AnimatedList>
            </div>
          </div>
        </div>
        <div className="each-place-view-container bg-milk-white">
          <EachView
            placeId={placeId}
            error={error}
            gatherData={gatherData}
            loading={detailLoading}
            afterUpdate={() => {
              close();
              fetchData();
            }}
            onClick={open}
            close={close}
            details={eachDetail}
            // log details
            data={logDetail}
            logLoading={logLoading}
            gatherLog={gatherLog}
          />
        </div>
      </div>
    </div>
  );
};

export default Place;
