import "./Incoming.css";
import uniqueId from "uniqid";
import AnimatedList from "../../../../UI/AnimatedList/AnimatedList";
import { useDispatch, useSelector } from "react-redux";
import EachRequest from "./EachRequest/EachRequest";
import { useEffect, useState } from "react";
import { fetchRequests } from "../../../../redux/UserAccount/Requests/actions";
import { axiosInstance } from "../../../../Utility/axiosInstance";
import RefreshButton from "../../../../UI/RefreshButton/RefreshButton";
import HouseDetail from "./HouseDetail/HouseDetail";
import EmptyMessage from "../../../../UI/EmptyMessage/EmptyMessage";
import Loader from "./Loader";
import AsyncButton from "../../../../UI/AsyncButton/AsyncButton";

const Incoming = (props) => {
  const incomingId = uniqueId();
  var { incomingRequests, error, loading } = useSelector(
    (state) => state.requests
  );
  const dispatch = useDispatch();
  // data = [
  //   { name: "Hariharan", contact: "90321930" },
  //   { name: "Dikshit", contact: "9025077644" },
  //   { name: "Mani", contact: "9999131313" },
  // ];

  const [detailError, setDetailError] = useState(null);

  const [acceptStatus, setAcceptStatus] = useState({
    loading: false,
    status: "",
  });

  // Each Detail
  const [eachDetailLoading, setEachDetailLoading] = useState(false);
  const [eachDetail, setEachDetail] = useState({});

  useEffect(() => {
    console.log("hello world");
    fetchData();
  }, []);

  const fetchData = () => {
    console.log("Data Format", {
      "route-I-am-Posting": "/server1/incomingRequests",
      incomingRequests: [
        { name: "...", contact: "...", requestId: "...", image: "..." },
        { name: "...", contact: "...", requestId: "...", image: "..." },
      ],
    });
    dispatch(fetchRequests("/server1/incomingRequests", props.id));
  };

  const getList = () => {
    return incomingRequests.map((el, index) => (
      <EachRequest
        {...el}
        clickHandler={clickHandler}
        key={index}
        requestId={el.requestId}
        houseId={props.id}
        fetchData={fetchData}
      />
    ));
  };

  const clickHandler = (id, houseId) => {
    console.log(id, houseId);
    open();
    setEachDetailLoading(true);
    console.log("Data Format", {
      "route-I-am-Posting": "/server1/detailedview",
      "what-I-post": { requestId: "...", houseId: "..." },
      "In-res.data-I-need-this": {
        name: "...",
        street: "...",
        town: "...",
        district: "...",
        contact: "...",
        logo: "...",
        requestId: "...",
      },
    });
    axiosInstance
      .post("/server1/detailedview", { requestId: id, houseId: houseId })
      .then((res) => {
        console.log(res.data);
        setEachDetailLoading(false);
        setEachDetail({ ...res.data });
      })
      .catch((err) => {
        console.log(err);
        setEachDetailLoading(false);
        setDetailError("Something went wrong !");
      });
  };

  const open = () => {
    const container = document.getElementById(incomingId);
    if (container.classList.contains("request-scroll-right"))
      container.classList.remove("request-scroll-right");
    container.classList.add("request-scroll-left");
  };
  const close = () => {
    setDetailError(null);
    const container = document.getElementById(incomingId);
    if (container.classList.contains("request-scroll-left"))
      container.classList.remove("request-scroll-left");
    container.classList.add("request-scroll-right");
  };

  return (
    <div className="request-scroller-container">
      <div className="view-requests-container" id={incomingId}>
        <div className="view-requests-list-container">
          <div
            style={{
              width: "80%",
              margin: "20px auto",
              maxWidth: 692.48,
              position: "relative",
            }}
            className="view-requests-list"
          >
            <AsyncButton
              className="blue back-button bck-transparent"
              style={{
                position: "absolute",
                left: 20,
                top: -70,
                zIndex: 10,
              }}
              onClick={props.close}
            >
              <i className="fas fa-chevron-left"></i> Back
            </AsyncButton>
            <RefreshButton
              onClick={fetchData}
              className="refresh-button"
              loading={loading}
            />

            {loading ? (
              <Loader />
            ) : getList().length === 0 ? (
              <EmptyMessage message="No Incoming Requests" />
            ) : (
              <>
                <AnimatedList
                  // error={error?.length > 0 ? error : null}
                  loading={loading}
                  emptyMessage="No Incoming Requests"
                >
                  {getList()}
                </AnimatedList>
              </>
            )}
          </div>
        </div>
        <div className="each-request-view-container">
          <HouseDetail
            close={close}
            details={eachDetail}
            loading={eachDetailLoading}
            error={detailError}
            houseId={props.id}
          />
        </div>
      </div>
    </div>
  );
};

export default Incoming;
