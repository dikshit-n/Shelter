import { Col, Row } from "reactstrap";
import Card2 from "../../../../../UI/Card2/Card2";
import "./BusDetailLoader.css";

const BusDetailLoader = (props) => {
  return (
    <Card2 className="flex-column bus-content each-bus-detail-form">
      <Row>
        <Col xl="6" lg="6" sm="12" xs="12">
          <div
            className="skeleton-box"
            style={{ width: 100, height: 25 }}
          ></div>
          <br />
          <div
            className="skeleton-box"
            style={{ width: 110, height: 30 }}
          ></div>
          <br />
          <div
            className="skeleton-box"
            style={{ width: "100%", height: 30 }}
          ></div>
          <div
            className="skeleton-box"
            style={{ width: 110, height: 30 }}
          ></div>
          <br />
          <div
            className="skeleton-box"
            style={{ width: "100%", height: 30 }}
          ></div>
          <div className="each-bus-details-buttons-container">
            <div
              className="skeleton-box"
              style={{ width: 100, height: 30 }}
            ></div>
            <div
              className="skeleton-box"
              style={{ width: 100, height: 30 }}
            ></div>
          </div>
        </Col>
        <Col
          className="qr-section-bus flex-center"
          xl="6"
          lg="6"
          sm="12"
          xs="12"
        >
          <div className="qr-container-bus">
            <div className="skeleton-box"></div>
          </div>
        </Col>
      </Row>
    </Card2>
  );
};

export default BusDetailLoader;
