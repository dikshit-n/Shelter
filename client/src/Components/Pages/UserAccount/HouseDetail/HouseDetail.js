import { useEffect, useState } from "react";
import { useParams } from "react-router";
import EachField from "../../../UI/FormField/FormField";
import MyCard from "../../../UI/MyCard/MyCard";
import Slick from "../../../UI/Slick/Slick";
import { axiosInstance } from "../../../Utility/axiosInstance";
import "./HouseDetail.css";
import _1 from "../../../../assets/demo1.jpg";
import _2 from "../../../../assets/demo2.jpg";
import _3 from "../../../../assets/demo3.jpg";
import AsyncButton from "../../../UI/AsyncButton/AsyncButton";

const HouseDetail = (props) => {
  const [data, setData] = useState({
    ownerName: "",
    monthlyRent: "",
    feature: "",
    maximumSharing: "",
    currentlyOccupied: "",
    street: "",
    town: "",
    district: "",
    contact: "",
  });
  const [loading, setLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .post(`/singlehouse/`, { houseId: params.id })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setData((prev) => ({
          ...prev,
          ...res.data,
        }));
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setData({
          ownerName: "Gokulnath",
          monthlyRent: "1000",
          feature: "BHK - bla bla bla",
          maximumSharing: "3",
          currentlyOccupied: "1",
          street: "Dindukal street",
          town: "dindukal town",
          district: "dindukal",
          contact: "923840923094",
        });
      });
  }, []);

  var schema = [
    {
      displayName: "Owner Name",
      value: data.ownerName,
    },
    {
      displayName: "Montly Rent",
      value: data.monthlyRent,
    },
    {
      displayName: "Feature",
      value: data.feature,
    },
    {
      displayName: "Maximum Sharing",
      value: data.maximumSharing,
    },
    {
      displayName: "Currently Occupied",
      value: data.currentlyOccupied,
    },
    {
      displayName: "Street",
      value: data.street,
    },
    {
      displayName: "Town",
      value: data.town,
    },
    {
      displayName: "District",
      value: data.district,
    },
    {
      displayName: "Contact",
      value: data.contact,
    },
  ];

  let images = [_1, _2, _3, _1, _2, _3];

  return (
    <div className="house-detail">
      <MyCard className="house-details-container">
        <AsyncButton
          className="blue back-button bck-transparent"
          onClick={() => props.history.goBack()}
        >
          <i className="fas fa-chevron-left"></i> Back
        </AsyncButton>
        <br />
        <div>
          <Slick items={images} />
        </div>
        <br />
        <br />
        {schema.map((el, index) => (
          <EachField
            key={index}
            {...el}
            containerClassName="each-house-detail"
            className="cursor-default"
            readOnly
          />
        ))}
        <br />
      </MyCard>
    </div>
  );
};

export default HouseDetail;
