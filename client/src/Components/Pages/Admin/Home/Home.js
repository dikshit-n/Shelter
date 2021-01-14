import { Card, Col, Row } from "reactstrap";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDashboardAdmin } from "../../../redux/Admin/Home/actions";
import { numberWithComma } from "../../../Utility/numberWithComma";
import { useSkeleton } from "../../../hooks/useSkeleton";
import { Bar } from "../../../UI/Graphs/Graphs";
import ClassincSlider from "../../../UI/ClassicSlider/ClassicSlider";
import Toggler from "../../../UI/Toggler/Toggler";
import MyCard from "../../../UI/MyCard/MyCard";
import HomeLoader from "./HomeLoader/HomeLoader";

var mount = 0;

const Home = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.homeAdmin.data);
  const loading = useSelector((state) => state.homeAdmin.loading);
  const error = useSelector((state) => state.homeAdmin.error);
  const [activeIndex, setActiveIndex] = useState(0);
  // const skeleton = useSkeleton();

  const fetchData = () => {
    dispatch(fetchDashboardAdmin());
  };

  useEffect(() => {
    if (mount === 0) {
      mount = 1;
      fetchData();
    }
  }, []);

  // useEffect(() => {
  //   skeleton(".skeleton", loading);
  // }, [loading]);

  const getToggleElements = () => {
    return [
      { name: "Places", actions: { onClick: () => setActiveIndex(0) } },
      { name: "Buses", actions: { onClick: () => setActiveIndex(1) } },
      // { name: "Buses", actions: { onClick: () => setActiveIndex(2) } },
    ];
  };

  console.log(data);

  return loading ? (
    <HomeLoader />
  ) : (
    <div className="admin-dashboard">
      <ClassincSlider activeIndex={activeIndex}>
        <>
          <Row>
            <Col xl="5" lg="5" md="4" sm="12" xs="12">
              <Card className="students-count-admin flex-row flex-wrap my-card-style hover-grow">
                <strong>
                  <h4>Total students</h4>
                </strong>
                <h1 className="break-word">
                  {numberWithComma(data.totalStudents)}
                </h1>
              </Card>
            </Col>
            <Col
              xl="7"
              lg="7"
              md="8"
              sm="12"
              xs="12"
              className="home-navigator-container"
            >
              <Toggler markerClassName="marker" routes={getToggleElements()} />
            </Col>
          </Row>
          <br />
          <Bar
            style={{ width: "100%" }}
            data={{
              labels: [...data.allPlace.map((el) => el.placeName)],
              values: [...data.allPlace.map((el) => el.placeSum)],
            }}
          />
        </>
        {/* <>
          <Row>
            <Col xl="5" lg="5" md="4" sm="12" xs="12">
              <Card className="students-count-admin flex-row flex-wrap my-card-style hover-grow skeleton">
                <strong>
                  <h4>Total students</h4>
                </strong>
                <h1 className="break-word">
                  {numberWithComma(data.totalStudents)}
                </h1>
              </Card>
            </Col>
            <Col
              xl="7"
              lg="7"
              md="8"
              sm="12"
              xs="12"
              className="home-navigator-container"
            >
              <Toggler markerClassName="marker" routes={getToggleElements()} />
            </Col>
          </Row>
          <br />
          <Bar
            style={{ width: "100%" }}
            data={{
              labels: [...data.allPlace.map((el) => el.placeName)],
              values: [...data.allPlace.map((el) => el.placeSum)],
            }}
          />
        </> */}
      </ClassincSlider>
    </div>
  );
};

export default Home;
