import { Fragment, useEffect } from "react";
import { withRouter } from "react-router";
import AsyncButton from "../../../../../UI/AsyncButton/AsyncButton";
import uniqueId from "uniqid";
import RefreshButton from "../../../../../UI/RefreshButton/RefreshButton";
import { getTimeCollapsed } from "../../../../../Utility/DateTimeFunctions";
import RunningBus from "../../../../../../assets/bus_green.jpg";
import "./Running.css";
import { Col, Row } from "reactstrap";
import ReactTooltip from "react-tooltip";
import RunningLoader from "./RunningLoader/RunningLoader";
import { controlToolTip } from "../../../../../Utility/controllTooltip";

const Running = (props) => {
  useEffect(() => {
    controlToolTip();
  }, [props.loading]);

  return (
    <div style={{ paddingBottom: 50 }}>
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
            onClick={props.fetchData}
          />
        </div>
      </div>
      {props.loading ? (
        <RunningLoader />
      ) : (
        <Fragment>
          <div className="buses-header bg-white">
            <div className="fit-content flex-row flex-wrap">
              <div className="bus-detail-image">
                <img src={RunningBus} alt="running" />
              </div>
              <div className="bus-details-container flex-row flex-wrap">
                <div className="each-detail">
                  <div className="single-detail">
                    <small className="text-left">
                      <strong>Bus No: </strong>
                    </small>
                    <small>{props.data.busNo}</small>
                  </div>
                  <div className="single-detail">
                    <small className="text-left">
                      <strong>Date: </strong>
                    </small>
                    <small style={{ textTransform: "capitalize" }}>
                      {props.data.date}
                    </small>
                  </div>
                  <div className="single-detail">
                    <small className="text-left">
                      <strong>Status: </strong>
                    </small>
                    <small style={{ textTransform: "capitalize" }}>
                      {props.data.status}
                    </small>
                  </div>
                  <div className="single-detail">
                    <small className="text-left">
                      <strong>Trip: </strong>
                    </small>
                    <small style={{ textTransform: "capitalize" }}>
                      {props.data.trip}
                    </small>
                  </div>
                </div>
                <div className="each-detail">
                  <div className="single-detail">
                    <small className="text-left">
                      <strong>Route Code: </strong>
                    </small>
                    <small>{props.data.routeCode}</small>
                  </div>
                  <div className="single-detail">
                    <small className="text-left">
                      <strong>No of Punchin: </strong>
                    </small>
                    <small style={{ textTransform: "capitalize" }}>
                      {props.data.punchIn?.length}
                    </small>
                  </div>
                  <div className="single-detail">
                    <small className="text-left">
                      <strong>No of Punchout: </strong>
                    </small>
                    <small style={{ textTransform: "capitalize" }}>
                      {props.data.punchOut?.length}
                    </small>
                  </div>
                  <div className="single-detail">
                    <small className="text-left">
                      <strong>Start Time: </strong>
                    </small>
                    <small style={{ textTransform: "capitalize" }}>
                      {getTimeCollapsed(props.data.startTime)}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Col lg="6" md="6" sm="12" style={{ marginTop: 20 }}>
              <div className="flex-column punches-box hover-grow">
                <div className="punch-heading">Punch In</div>
                <div className="punches-container flex-row flex-wrap">
                  {props.data.punchIn.length === 0 ? (
                    <h6>
                      <br />
                      No Punch Ins
                    </h6>
                  ) : (
                    props.data.punchIn.map((el, index) => {
                      const punchId = uniqueId();
                      return (
                        <Fragment key={index}>
                          <ReactTooltip
                            id={punchId}
                            effect="float"
                            place="top"
                            type="success"
                          >
                            <span className="capitalize">{el.name}</span>
                          </ReactTooltip>
                          <div
                            data-tip
                            data-for={punchId}
                            key={index}
                            className="each-punch flex-column"
                          >
                            <h6 className="overflow-elipsis">{el.name}</h6>
                          </div>
                        </Fragment>
                      );
                    })
                  )}
                </div>
              </div>
            </Col>
            <Col lg="6" md="6" sm="12" style={{ marginTop: 20 }}>
              <div className="flex-column punches-box hover-grow">
                <div className="punch-heading">Punch Out</div>
                <div className="punches-container flex-row flex-wrap">
                  {props.data.punchOut.length === 0 ? (
                    <h6>
                      <br />
                      No Punch Outs
                    </h6>
                  ) : (
                    props.data.punchOut.map((el, index) => {
                      const punchId = uniqueId();
                      return (
                        <Fragment key={index}>
                          <ReactTooltip
                            id={punchId}
                            effect="float"
                            place="top"
                            type="success"
                          >
                            <span className="capitalize">{el.name}</span>
                          </ReactTooltip>
                          <div
                            data-tip
                            data-for={punchId}
                            key={index}
                            className="each-punch flex-column"
                          >
                            <h6 className="overflow-elipsis">{el.name}</h6>
                          </div>
                        </Fragment>
                      );
                    })
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Fragment>
      )}
      {/* <Card2 className="flex-column punches-container">
    {props.data.misMatch.map((el, index) => (
      <div key={index} className="each-punch flex-column">
        <h6>{el.name}</h6>
      </div>
    ))}
  </Card2> */}
    </div>
  );
};

export default withRouter(Running);
