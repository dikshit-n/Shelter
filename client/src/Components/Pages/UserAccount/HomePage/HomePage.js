import "./HomePage.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { fetchUsers } from "../../../redux/UserAccount/HomePage/actions";
import EmptyMessage from "../../../UI/EmptyMessage/EmptyMessage";
import ErrorBox from "../../../UI/ErrorBox/ErrorBox";
import EachHouse from ".././EachHouse/EachHouse";

var mount = 0;

const HomePage = (props) => {
  let { data, error, loading } = useSelector((state) => state.houses);
  const match = useRouteMatch();
  data = [
    {
      name: "Gokulnath",
      rupees: 1000,
      address: "Dubai Cross Street, Dubai Main road, Dubai",
      image: null,
    },
    {
      name: "Hariharan",
      rupees: 2000,
      address: "Amazon Forest, Forest Main, Africa",
      image: null,
    },
    {
      name: "Thirunelveli",
      rupees: 10000,
      address: "Thirunelveli Cross Street, Thiru Main, Thirunelveli",
      image: null,
    },
  ];

  useEffect(() => {
    if (mount === 0 || match.state?.refresh) {
      mount = 1;
      fetchHouses();
    }
  }, []);

  const fetchHouses = () => {
    fetchUsers("/houses");
  };

  return (
    <div className="houses-container flex-row flex-wrap">
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <ErrorBox message={error} />
      ) : data.length === 0 ? (
        <EmptyMessage message={"No Houses Found"} />
      ) : (
        data.map((el, index) => <EachHouse key={index} {...el} />)
      )}
    </div>
  );
};

export default HomePage;
