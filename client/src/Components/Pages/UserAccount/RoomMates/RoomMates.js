import { useEffect, useState } from "react";
import EmptyMessage from "../../../UI/EmptyMessage/EmptyMessage";
import ErrorBox from "../../../UI/ErrorBox/ErrorBox";
import { axiosInstance } from "../../../Utility/axiosInstance";
import EachMate from "./EachMate/EachMate";
import Loader from "./Loader";
import Profile from "./Profile/Profile";
import "./RoomMates.css";

const RoomMates = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [details, setDetails] = useState({ show: false, id: "" });

  useEffect(() => {
    axiosInstance
      .post("/server1/roommates")
      .then((res) => {
        console.log(res.data);
        setData([...res.data]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        // setError(true);
        setData([{ name: "Mani", contact: 329049 }]);
      });
  }, []);

  const showDetail = (id) => {
    setDetails({ show: true, id: id });
  };

  const close = () => {
    setDetails({ show: false, id: "" });
  };

  let element = (
    <>
      {data.map((el, index) => (
        <EachMate {...el} key={index} onClick={() => showDetail(el.userId)} />
      ))}
    </>
  );

  if (loading) {
    element = <Loader />;
  } else if (data.length === 0) {
    element = <EmptyMessage message="No Roommates found !" />;
  }
  if (error) {
    element = <ErrorBox message="Something went wrong !" />;
  }

  return details.show ? (
    <Profile id={details.id} close={close} />
  ) : (
    <div
      className="houses-container flex-row flex-wrap"
      style={{ position: "relative", marginTop: 30 }}
    >
      {element}
    </div>
  );
};

export default RoomMates;
