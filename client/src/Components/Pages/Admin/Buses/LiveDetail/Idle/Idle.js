import { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router";
import AsyncButton from "../../../../../UI/AsyncButton/AsyncButton";
import EachField from "../../../../../UI/FormField/FormField";
import MyCard from "../../../../../UI/MyCard/MyCard";
import RefreshButton from "../../../../../UI/RefreshButton/RefreshButton";
import RunningLoader from "../Running/RunningLoader/RunningLoader";
import EachLog from "./EachLog/EachLog";
import "./Idle.css";

const Idle = (props) => {
  const [time, setTime] = useState(null);

  // useEffect(() => {
  //   let newDate = props.data[0]?.date.split("-").reverse();
  //   setTime(props.data.length === 0 ? null : newDate ? newDate : null);
  // }, [props.loading]);

  const changeHandler = (event) => {
    console.log(event.target.value);
    props.fetchData(new Date(event.target.value).getTime());
    setTime(event.target.value);
  };

  var schema = [
    {
      name: "time",
      type: "date",
      placeholder: "Choose a Date",
      value: time,
      onChange: changeHandler,
      disabled: props.loading,
    },
  ];

  console.log(time);

  return (
    <Fragment>
      <div className="buses-header bg-white flex-wrap d-flex justify-content-between">
        <AsyncButton
          className="blue back-button bck-transparent"
          onClick={props.history.goBack}
        >
          <i className="fas fa-chevron-left"></i> Back
        </AsyncButton>
        <div className="fit-content flex-row">
          {props.component}
          <RefreshButton
            className="buses-refresh-button"
            loading={props.loading}
            onClick={() => props.fetchData(time && new Date(time).getTime())}
          />
        </div>
      </div>
      <Fragment>
        {schema.map((el, index) => (
          <EachField key={index} {...el} />
        ))}
        <br />
      </Fragment>
      {props.loading ? (
        <Fragment>
          <RunningLoader />
          <br />
          <br />
          <br />
          <RunningLoader />
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
    </Fragment>
  );
};

export default withRouter(Idle);
