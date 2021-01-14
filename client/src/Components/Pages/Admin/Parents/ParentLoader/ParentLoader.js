import { Col, Row } from "reactstrap";
import Card2 from "../../../../UI/Card2/Card2";
import "./ParentLoader.css";

const ParentLoader = (props) => {
  return (
    <Row className="view-parent-form-container margin-none">
      <Col xl="8" lg="12" md="12" sm="12" xs="12">
        <Card2 className="view-parent-form">
          <div className="back-button-loader skeleton-box"></div>
          <div>
            <div className="user-logo skeleton-box"></div>
            <br />
            <div className="each-field-label-loader skeleton-box"></div>
            <div className="each-field-loader skeleton-box"></div>
            <div className="each-field-label-loader skeleton-box"></div>
            <div className="each-field-loader skeleton-box"></div>
            <div className="each-field-label-loader skeleton-box"></div>
            <div className="each-field-loader skeleton-box"></div>
            <div className="each-field-label-loader skeleton-box"></div>
            <div className="each-field-loader skeleton-box"></div>
            <div className="each-field-label-loader skeleton-box"></div>
            <div className="each-field-loader skeleton-box"></div>
            <div className="each-field-label-loader skeleton-box"></div>
            <div className="each-field-loader-textarea skeleton-box"></div>
            <div className="each-field-label-loader skeleton-box"></div>
            <div className="each-field-loader skeleton-box"></div>
            <div className="phone-add-remove-container">
              <div className="add-rem-button-loader skeleton-box"></div>
              <div className="add-rem-button-loader skeleton-box"></div>
            </div>
            <div className="each-field-label-loader skeleton-box"></div>
          </div>
        </Card2>
      </Col>
      <Col
        className="flex-center qr-section"
        xl="4"
        lg="12"
        md="12"
        sm="12"
        xs="12"
      >
        <div className="qr-container skeleton-box"></div>
      </Col>
    </Row>
  );
};

export default ParentLoader;
