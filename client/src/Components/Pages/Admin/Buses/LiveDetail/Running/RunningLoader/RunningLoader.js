import { Fragment } from "react";
import { Col, Row } from "reactstrap";
import "./RunningLoader.css";

const RunningLoader = (props) => {
  return (
    <Fragment>
      <div className="buses-header bg-white">
        <div className="fit-content flex-row flex-wrap">
          <div className="bus-detail-image flex-center">
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
              }}
              className="skeleton-box"
            ></div>
          </div>
          <div className="bus-details-container flex-row flex-wrap">
            <div className="each-detail">
              <div className="single-detail">
                <small
                  style={{ width: 70, marginBottom: 10, height: 10 }}
                  className="skeleton-box"
                ></small>
                <small
                  style={{ width: 40, marginBottom: 10, height: 10 }}
                  className="skeleton-box"
                ></small>
              </div>
              <div className="single-detail">
                <small
                  style={{ width: 60, marginBottom: 10, height: 10 }}
                  className="skeleton-box"
                ></small>
                <small
                  style={{ width: 30, marginBottom: 10, height: 10 }}
                  className="skeleton-box"
                ></small>
              </div>
              <div className="single-detail">
                <small
                  style={{ width: 90, marginBottom: 10, height: 10 }}
                  className="skeleton-box"
                ></small>
                <small
                  style={{ width: 50, marginBottom: 10, height: 10 }}
                  className="skeleton-box"
                ></small>
              </div>
              <div className="single-detail">
                <small
                  style={{ width: 80, marginBottom: 10, height: 10 }}
                  className="skeleton-box"
                ></small>
                <small
                  style={{ width: 45, marginBottom: 10, height: 10 }}
                  className="skeleton-box"
                ></small>
              </div>
            </div>
            <div className="each-detail">
              <div className="single-detail">
                <small
                  style={{ width: 70, marginBottom: 10, height: 10 }}
                  className="skeleton-box"
                ></small>
                <small
                  style={{ width: 40, marginBottom: 10, height: 10 }}
                  className="skeleton-box"
                ></small>
              </div>
              <div className="single-detail">
                <small
                  style={{ width: 60, marginBottom: 10, height: 10 }}
                  className="skeleton-box"
                ></small>
                <small
                  style={{ width: 30, marginBottom: 10, height: 10 }}
                  className="skeleton-box"
                ></small>
              </div>
              <div className="single-detail">
                <small
                  style={{ width: 90, marginBottom: 10, height: 10 }}
                  className="skeleton-box"
                ></small>
                <small
                  style={{ width: 50, marginBottom: 10, height: 10 }}
                  className="skeleton-box"
                ></small>
              </div>
              <div className="single-detail">
                <small
                  style={{ width: 80, marginBottom: 10, height: 10 }}
                  className="skeleton-box"
                ></small>
                <small
                  style={{ width: 45, marginBottom: 10, height: 10 }}
                  className="skeleton-box"
                ></small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Row>
        <Col lg="6" md="6" sm="12" style={{ marginTop: 20 }}>
          <div className="flex-column punches-box">
            <div
              className="punch-heading skeleton-box"
              style={{
                width: 90,
                height: 30,
                padding: 0,
                marginLeft: 20,
                borderRadius: 10,
                marginTop: 20,
              }}
            ></div>

            <div className="punches-container flex-row flex-wrap">
              <div
                className="each-punch flex-column skeleton-box each-punch-loader"
                style={{ height: "100%", borderRadius: 10 }}
              ></div>
              <div
                className="each-punch flex-column skeleton-box each-punch-loader"
                style={{ height: "100%", borderRadius: 10 }}
              ></div>
              <div
                className="each-punch flex-column skeleton-box each-punch-loader"
                style={{ height: "100%", borderRadius: 10 }}
              ></div>
              <div
                className="each-punch flex-column skeleton-box each-punch-loader"
                style={{ height: "100%", borderRadius: 10 }}
              ></div>
            </div>
          </div>
        </Col>
        <Col lg="6" md="6" sm="12" style={{ marginTop: 20 }}>
          <div className="flex-column punches-box">
            <div
              className="punch-heading skeleton-box"
              style={{
                width: 90,
                height: 30,
                padding: 0,
                marginLeft: 20,
                borderRadius: 10,
                marginTop: 20,
              }}
            ></div>

            <div className="punches-container flex-row flex-wrap">
              <div
                className="each-punch flex-column skeleton-box each-punch-loader"
                style={{ height: "100%", borderRadius: 10 }}
              ></div>
              <div
                className="each-punch flex-column skeleton-box each-punch-loader"
                style={{ height: "100%", borderRadius: 10 }}
              ></div>
              <div
                className="each-punch flex-column skeleton-box each-punch-loader"
                style={{ height: "100%", borderRadius: 10 }}
              ></div>
              <div
                className="each-punch flex-column skeleton-box each-punch-loader"
                style={{ height: "100%", borderRadius: 10 }}
              ></div>
            </div>
          </div>
        </Col>
      </Row>
      <br />
      <br />
      <Col style={{ marginTop: 20 }}>
        <div className="flex-column punches-box">
          <div
            className="punch-heading skeleton-box"
            style={{
              width: 90,
              height: 30,
              padding: 0,
              marginLeft: 20,
              borderRadius: 10,
              marginTop: 20,
            }}
          ></div>

          <div className="punches-container flex-row flex-wrap">
            <div
              className="each-punch flex-column skeleton-box each-punch-loader"
              style={{ height: "100%", borderRadius: 10 }}
            ></div>
            <div
              className="each-punch flex-column skeleton-box each-punch-loader"
              style={{ height: "100%", borderRadius: 10 }}
            ></div>
            <div
              className="each-punch flex-column skeleton-box each-punch-loader"
              style={{ height: "100%", borderRadius: 10 }}
            ></div>
            <div
              className="each-punch flex-column skeleton-box each-punch-loader"
              style={{ height: "100%", borderRadius: 10 }}
            ></div>
          </div>
        </div>
      </Col>
    </Fragment>
  );
};

export default RunningLoader;
