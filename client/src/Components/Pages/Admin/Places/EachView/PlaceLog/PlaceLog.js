import { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router";
import AsyncButton from "../../../../../UI/AsyncButton/AsyncButton";
import EachField from "../../../../../UI/FormField/FormField";
import MyCard from "../../../../../UI/MyCard/MyCard";
import RefreshButton from "../../../../../UI/RefreshButton/RefreshButton";
import EachLogLoader from "./EachLogLoader/EachLogLoader";
import EachLog from "./EachLog/EachLog";
import "./PlaceLog.css";

const PlaceLog = (props) => {
  const [time, setTime] = useState(null);

  // useEffect(() => {
  //   afterMount();
  // }, [props.logLoading]);

  // const afterMount = () => {
  //   let newDate = props.data[0]?.date.split("-").reverse();
  //   setTime(props.data.length === 0 ? null : newDate ? newDate : null);
  // };

  const changeHandler = (event) => {
    props.gatherLog(props.placeId, new Date(event.target.value).getTime());
    setTime(event.target.value);
  };

  var schema = [
    {
      name: "time",
      type: "date",
      placeholder: "Choose a Date",
      value: time,
      onChange: changeHandler,
      disabled: props.logLoading,
    },
  ];

  console.log(time);

  return (
    <div
      className="_100 each-log-container bg-milk-white"
      style={{ paddingTop: 5 }}
    >
      <div className="buses-header bck-transparent flex-wrap d-flex justify-content-between">
        <AsyncButton
          className="blue back-button bck-transparent"
          onClick={props.close}
        >
          <i className="fas fa-chevron-left"></i> Back
        </AsyncButton>
        <div className="fit-content flex-row">
          {props.component}
          <RefreshButton
            className="buses-refresh-button"
            loading={props.logLoading}
            onClick={() =>
              props.gatherLog(props.placeId, time && new Date(time).getTime())
            }
          />
        </div>
      </div>
      <Fragment>
        {schema.map((el, index) => (
          <EachField key={index} {...el} />
        ))}
        <br />
      </Fragment>
      {props.logLoading ? (
        <Fragment>
          <EachLogLoader />
          <br />
          <br />
          <br />
          <EachLogLoader />
          <br />
        </Fragment>
      ) : props.data.length === 0 ? (
        <MyCard
          style={{ margin: "20px auto", width: "100%", textAlign: "center" }}
        >
          <h4>No Log to show !</h4>
        </MyCard>
      ) : (
        <Fragment>
          {props.data.map((el, index) => (
            <EachLog key={index} data={el} />
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default withRouter(PlaceLog);
