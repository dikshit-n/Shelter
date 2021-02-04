import "./MyHouses.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { fetchMyHouses } from "../../../redux/UserAccount/MyHouses/actions";
import EmptyMessage from "../../../UI/EmptyMessage/EmptyMessage";
import ErrorBox from "../../../UI/ErrorBox/ErrorBox";
import EachHouse from "./EachHouse/EachHouse";
import AsyncButton from "../../../UI/AsyncButton/AsyncButton";
import { filterNumbers } from "../../../Utility/filterNumbers";
import { numberWithComma } from "../../../Utility/numberWithComma";
import EachField from "../../../UI/FormField/FormField";
import ReactModal from "../../../UI/ReactModal/ReactModal";
import { deleteEmptyKeys } from "../../../Utility/deleteEmptyKeys";
import Loader from "../HomePage/Loader";
import RefreshButton from "../../../UI/RefreshButton/RefreshButton";

var mount = 0;

let country_state_district = require("country_state_district");

let districts = country_state_district.getDistrictsByStateId(32);

const MyHouses = (props) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: "",
    monthlyRent: "",
    feature: "",
    maximumSharing: "",
    district: "",
  });
  let { data, error, loading } = useSelector((state) => state.myHouses);
  const location = useLocation();
  const dispatch = useDispatch();
  // data = [
  //   {
  //     ownerName: "Gokulnath",
  //     monthlyRent: 1000,
  //     town: "Dubai Town",
  //     feature: "",
  //     maximumSharing: 100,
  //     district: "Dindigul",
  //     image: null,
  //   },
  //   {
  //     ownerName: "Hariharan",
  //     monthlyRent: 2000,
  //     town: "Amazon Forest",
  //     feature: "",
  //     maximumSharing: 100,
  //     district: "Forest Main",
  //     image: null,
  //   },
  //   {
  //     ownerName: "Thirunelveli",
  //     monthlyRent: 10000,
  //     town: "Thirunelveli Cross Street",
  //     feature: "",
  //     maximumSharing: 100,
  //     district: "Tirunelveli",
  //     image: null,
  //   },
  // ];

  useEffect(() => {
    // if (mount === 0 || location.state?.refresh) {
    //   mount = 1;
    fetchHouses();
    // }
  }, []);

  const fetchHouses = () => {
    console.log("fetching houses");
    dispatch(fetchMyHouses("/server1/MyHouses"));
  };

  const changeHandler = ({ target: { name, value } }) => {
    const numberTypes = ["contact", "maximumSharing", "currentlyOccupied"];
    const withCommas = ["monthlyRent"];
    setFormData((prev) => ({
      ...prev,
      [name]: numberTypes.some((el) => el === name)
        ? filterNumbers(value)
        : withCommas.some((el) => el === name)
        ? numberWithComma(filterNumbers(value))
        : value,
    }));
  };

  var schema = [
    {
      displayName: "Owner Name",
      value: formData.ownerName,
      name: "ownerName",
      onChange: changeHandler,
      containerClassName: "each-house-detail",
      required: true,
    },

    {
      displayName: "Montly Rent",
      value: formData.monthlyRent,
      name: "monthlyRent",
      onChange: changeHandler,
      containerClassName: "each-house-detail",
      required: true,
    },
    {
      displayName: "Feature",
      value: formData.feature,
      name: "feature",
      onChange: changeHandler,
      containerClassName: "each-house-detail",
      required: true,
    },
    {
      displayName: "Maximum Sharing",
      value: formData.maximumSharing,
      name: "maximumSharing",
      onChange: changeHandler,
      containerClassName: "each-house-detail",
      required: true,
    },
    {
      type: "select",
      options: [...districts.map((el) => el.name)],
      placeholder: "Choose District",
      displayName: "District",
      value: formData.district,
      name: "district",
      onChange: changeHandler,
      containerClassName: "each-house-detail",
      required: true,
    },
  ];

  const getFilteredList = () => {
    const absolutes = ["maximumSharing", "monthlyRent"];
    const numbers = ["monthlyRent"];
    let filteredData = [...data];
    if (Object.values(formData).every((el) => el.toString().trim() === "")) {
      return [...filteredData];
    } else {
      let nonEmptyFilters = { ...deleteEmptyKeys(formData) };
      filteredData = [
        ...filteredData.filter((el) => {
          let keys = Object.keys(nonEmptyFilters);
          let values = Object.values(nonEmptyFilters);
          let conditions = keys.map((ele, index) => {
            if (numbers.includes(ele)) {
              el[ele] = filterNumbers(el[ele]);
              values[index] = filterNumbers(values[index]);
            }
            console.log(ele, el[ele], values[index]);
            if (absolutes.includes(ele)) {
              return el[ele] === values[index];
            }
            return el[ele]
              .toString()
              .toLowerCase()
              .includes(values[index].toString().toLowerCase());
          });
          return conditions.every((el) => el);
        }),
      ];
      return filteredData;
    }
  };

  const getFilterStatus = () => {
    return Object.values(formData).every((el) => el.toString().trim() === "");
  };

  const clearFilters = () => {
    setFormData({
      ownerName: "",
      monthlyRent: "",
      feature: "",
      maximumSharing: "",
      district: "",
    });
  };

  let afterFilter = getFilteredList();

  return (
    <>
      <ReactModal open={show} toggle={() => setShow((prev) => !prev)}>
        {schema.map((el, index) => (
          <EachField {...el} key={index} />
        ))}
        <AsyncButton onClick={() => setShow(false)} className="bg-blue">
          Done
        </AsyncButton>
      </ReactModal>
      <div
        className="houses-container flex-row flex-wrap"
        style={{ position: "relative", marginTop: 30 }}
      >
        <div className="flex-row filter-button">
          <AsyncButton
            className="bg-red"
            style={{ visibility: getFilterStatus() ? "hidden" : "visible" }}
            disabled={loading}
            onClick={clearFilters}
          >
            Clear Filters
          </AsyncButton>
          &nbsp;&nbsp;
          {/* <AsyncButton
            className="bg-blue"
            disabled={loading}
            onClick={() => setShow(true)}
          >
            Add Filters
          </AsyncButton> */}
          &nbsp;&nbsp;&nbsp;
          <RefreshButton
            onClick={fetchHouses}
            style={{ marginTop: 23 }}
            className="refresh-button"
            loading={loading}
          />
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorBox message={error} />
        ) : afterFilter.length === 0 ? (
          <EmptyMessage message={"No Houses Found"} />
        ) : (
          <>
            {afterFilter.map((el, index) => (
              <EachHouse key={index} {...el} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default MyHouses;
