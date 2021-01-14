import { Col, Row } from "reactstrap";
import Card2 from "../../../../UI/Card2/Card2";
import "./PlacesLoader.css";

const PlacesLoader = (props) => {
  return (
    <Row className="view-parent-form-container margin-none">
      <Col xl="6" lg="12" md="12" sm="12" xs="12">
        <Card2 className="view-parent-form">
          <div className="back-button-loader skeleton-box"></div>
          <div>
            <div className="each-field-label-loader skeleton-box"></div>
            <div className="each-field-loader skeleton-box"></div>
            <div className="each-field-label-loader skeleton-box"></div>
            <div className="each-field-loader skeleton-box"></div>
            <div className="each-field-label-loader skeleton-box"></div>
            <div
              className="each-field-label-loader skeleton-box"
              style={{ marginLeft: 20 }}
            ></div>
          </div>
        </Card2>
      </Col>
      <Col
        className="flex-center qr-section-places"
        xl="6"
        lg="12"
        md="12"
        sm="12"
        xs="12"
      >
        <div className="qr-container-places skeleton-box"></div>
      </Col>
    </Row>
  );
};

export default PlacesLoader;
