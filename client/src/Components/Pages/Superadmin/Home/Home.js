import { Card, Col, Row } from "reactstrap";
import "./Home.css";

const Home = (props) => {
  return (
    <div className="superadmin-dashboard">
      <Row>
        <Col xl="5" lg="5" md="4" sm="12" xs="12">
          <Card className="students-count flex-row flex-wrap my-card-style hover-grow">
            <strong>
              <h4>Total students</h4>
            </strong>
            <h1 className="break-word">20</h1>
          </Card>
        </Col>
        <Col xl="7" lg="7" md="8" sm="12" xs="12">
          <Card className="places my-card-style">Places</Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
