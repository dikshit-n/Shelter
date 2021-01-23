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
var mount = 0;
const Incoming = (props) => {
  const incomingId = uniqueId();
  var { data, error, loading } = useSelector((state) => state.requests);
  const dispatch = useDispatch();
  data = [
    { name: "Hariharan", contact: "90321930" },
    { name: "Dikshit", contact: "9025077644" },
    { name: "Mani", contact: "9999131313" },
  ];

  const [detailError, setDetailError] = useState(null);

  const [acceptStatus, setAcceptStatus] = useState({
    loading: false,
    status: "",
  });

  // Each Detail
  const [eachDetailLoading, setEachDetailLoading] = useState(false);
  const [eachDetail, setEachDetail] = useState({});

  useEffect(() => {
    if (mount === 0) {
      mount = 1;
      fetchData();
    }
  }, []);

  const fetchData = () => {
    dispatch(fetchRequests("/requests"));
  };

  const getList = () => {
    return data.map((el, index) => (
      <EachRequest
        {...el}
        clickHandler={clickHandler}
        key={index}
        requestId="aifkd"
        fetchData={fetchData}
      />
    ));
  };

  const clickHandler = (id) => {
    console.log(id);
    open();
    setEachDetailLoading(true);
    axiosInstance
      .post("/detailedview", { requestId: id })
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
            <RefreshButton
              onClick={fetchData}
              className="refresh-button"
              loading={loading}
            />
            {getList().length === 0 ? (
              <EmptyMessage message="No Requests" />
            ) : (
              <AnimatedList
                // error={error?.length > 0 ? error : null}
                loading={loading}
                emptyMessage="No Incoming Requests"
              >
                {getList()}
              </AnimatedList>
            )}
          </div>
        </div>
        <div className="each-request-view-container">
          <HouseDetail
            close={close}
            details={eachDetail}
            loading={eachDetailLoading}
            error={detailError}
          />
        </div>
      </div>
    </div>
  );
};

export default Incoming;
