import { Col, Row } from "reactstrap";
import Card2 from "../../../../../UI/Card2/Card2";
import "./AdminLoader.css";

const AdminLoader = (props) => {
  return (
    <Row className="view-parent-form-container margin-none">
      <Col>
        <Card2 className="view-parent-form">
          <div className="back-button-loader skeleton-box"></div>
          <div>
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
      </Col>
      {/* <Col
        className="flex-center qr-section-staffs"
        xl="6"
        lg="12"
        md="12"
        sm="12"
        xs="12"
      >
        <div className="qr-container-staffs skeleton-box"></div>
      </Col> */}
    </Row>
  );
};

export default AdminLoader;
