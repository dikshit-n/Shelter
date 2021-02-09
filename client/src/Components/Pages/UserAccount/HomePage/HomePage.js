import "./HomePage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { fetchUsers } from "../../../redux/UserAccount/HomePage/actions";
import EmptyMessage from "../../../UI/EmptyMessage/EmptyMessage";
import ErrorBox from "../../../UI/ErrorBox/ErrorBox";
import EachHouse from "./EachHouse/EachHouse";
import AsyncButton from "../../../UI/AsyncButton/AsyncButton";
import { filterNumbers } from "../../../Utility/filterNumbers";
import { numberWithComma } from "../../../Utility/numberWithComma";
import EachField from "../../../UI/FormField/FormField";
import ReactModal from "../../../UI/ReactModal/ReactModal";
import { deleteEmptyKeys } from "../../../Utility/deleteEmptyKeys";
import Loader from "./Loader";
import RefreshButton from "../../../UI/RefreshButton/RefreshButton";
import Raven from "../../../../assets/raven.png";

var mount = 0;

let country_state_district = require("country_state_district");

let districts = country_state_district.getDistrictsByStateId(32);

const HomePage = (props) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    rentalType: "",
    monthlyRent: "",
    // feature: "",
    maximumSharing: "",
    district: "",
  });
  let { data, error, loading } = useSelector((state) => state.houses);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    // if (mount === 0 || location.state?.refresh) {
    //   mount = 1;
    fetchHouses();
    // }
  }, []);

  const fetchHouses = () => {
    console.log("fetching houses");
    dispatch(fetchUsers("/server1/Home"));
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
      type: "select",
      placeholder: "Rental Type",
      displayName: "Rental Type",
      value: formData.rentalType,
      name: "rentalType",
      onChange: changeHandler,
      containerClassName: "each-house-detail",
      required: true,
      options: ["Family", "Sharing"],
    },

    {
      displayName: "Montly Rent",
      value: formData.monthlyRent,
      name: "monthlyRent",
      onChange: changeHandler,
      containerClassName: "each-house-detail",
      required: true,
    },
    // {
    //   displayName: "Feature",
    //   value: formData.feature,
    //   name: "feature",
    //   onChange: changeHandler,
    //   containerClassName: "each-house-detail",
    //   required: true,
    // },
    {
      displayName: "Maximum Sharing",
      value: formData.maximumSharing,
      name: "maximumSharing",
      onChange: changeHandler,
      containerClassName: "each-house-detail",
      required: true,
      containerStyleWithLabel: {
        display: formData.rentalType === "Family" ? "none" : "block",
      },
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
  console.log(data);
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
              return el[ele] <= values[index];
            }
            return el[ele]
              ?.toString()
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
      rentalType: "",
      monthlyRent: "",
      // feature: "",
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
        <div className="d-flex justify-content-between">
          <div className="app-head">
            <span
              style={{
                backgroundColor: "white",
                padding: 20,
                paddingTop: 25,
                borderRadius: 15,
                // border: "1px solid grey",
              }}
            >
              <span style={{ color: "red", fontSize: 30, fontWeight: "bold" }}>
                Cuckoo
              </span>
              {"  "}
              <span
                style={{ color: "black", fontSize: 30, fontWeight: "bold" }}
              >
                {" "}
                Raven
              </span>
            </span>
          </div>
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
            <AsyncButton
              className="bg-blue"
              disabled={loading}
              onClick={() => setShow(true)}
            >
              Add Filters
            </AsyncButton>
            &nbsp;&nbsp;&nbsp;
            <RefreshButton
              onClick={fetchHouses}
              style={{ marginTop: 23 }}
              className="refresh-button"
              loading={loading}
            />
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorBox message={error} />
        ) : afterFilter.length === 0 ? (
          <EmptyMessage message={"No Houses Found"} />
        ) : (
          <div
            className="flex-row flex-wrap"
            style={{ width: "100%", marginTop: 30 }}
          >
            {afterFilter.map((el, index) => (
              <EachHouse key={index} {...el} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
