import { useEffect, useState } from "react";
import AsyncButton from "../../../../UI/AsyncButton/AsyncButton";
import EmptyMessage from "../../../../UI/EmptyMessage/EmptyMessage";
import ErrorBox from "../../../../UI/ErrorBox/ErrorBox";
import { axiosInstance } from "../../../../Utility/axiosInstance";
import Loader from "../../HomePage/Loader";
import EachHouse from "./EachHouse/EachHouse";
import "./houses.css";
import Incoming from "./Incoming";

const Houses = (props) => {
  const [loading, setLoading] = useState(true);
  const [houses, setHouses] = useState([]);
  const [request, setRequest] = useState({ id: "", show: false });
  const [error, setError] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/server1/myhouses")
      .then((res) => {
        console.log(res.data.myHouses);
        setLoading(false);
        setHouses([...res.data.myHouses]);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
        // setHouses([
        //   { image: null, address: "manitheru" },
        //   { image: null, address: "manitheru" },
        //   { image: null, address: "manitheru" },
        // ]);
      });
  }, []);

  const close = () => {
    setRequest({ id: "", show: false });
  };

  const openHouse = (id) => {
    console.log(id);
    setRequest({ id, show: true });
  };

  let element = (
    <>
      {houses.map((el, index) => (
        <EachHouse {...el} key={index} onClick={openHouse} />
      ))}
    </>
  );

  if (loading) {
    element = <Loader />;
  } else if (houses.length === 0) {
    element = <EmptyMessage message="No houses Found !" />;
  }
  if (error) {
    element = <ErrorBox message="Something went wrong !" />;
  }

  return request.show ? (
    <Incoming id={request.id} close={close} />
  ) : (
    <div
      style={{ width: "fit-content", margin: "0px auto", position: "relative" }}
    >
      <div
        className="houses-container flex-row flex-wrap"
        style={{ position: "relative", marginTop: 30 }}
      >
        {element}
      </div>
    </div>
  );
};

export default Houses;
