import { Col, Row } from "reactstrap";
import Card2 from "../../../../UI/Card2/Card2";
import "./EmployeeLoader.css";

const EmployeeLoader = (props) => {
  return (
    <Row className="view-parent-form-container margin-none">
      <Card2 className="view-employee-form">
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
          &nbsp;&nbsp;&nbsp;
          <div className="each-field-label-loader skeleton-box"></div>
        </div>
      </Card2>
      {/* <Col
        className="flex-center qr-section-employee"
        xl="6"
        lg="12"
        md="12"
        sm="12"
        xs="12"
      >
        <div className="qr-container-employee skeleton-box"></div>
      </Col> */}
    </Row>
  );
};

export default EmployeeLoader;
