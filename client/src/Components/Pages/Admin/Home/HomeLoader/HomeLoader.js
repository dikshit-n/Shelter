import { Card, Col, Row } from "reactstrap";
import "./HomeLoader.css";

const HomeLoader = (props) => {
  return (
    <div>
      <div className="admin-dashboard">
        <Row>
          <Col xl="5" lg="5" md="4" sm="12" xs="12">
            <Card
              style={{ height: 50 }}
              className="students-count-admin flex-row flex-wrap my-card-style hover-grow skeleton-box"
            ></Card>
          </Col>
          <Col
            xl="7"
            lg="7"
            md="8"
            sm="12"
            xs="12"
            className="home-navigator-container"
          >
            <div
              className="skeleton-box"
              style={{ width: 100, height: 30, borderRadius: 10 }}
            ></div>
          </Col>
        </Row>
        <br />
        <div
          className="skeleton-box"
          style={{ width: "100%", height: 500, borderRadius: 30 }}
        ></div>
      </div>
    </div>
  );
};

export default HomeLoader;
