import "./Slick.css";
import Slider from "react-slick";

const Slick = ({ options = {}, items = [] }) => {
  const settings = {
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    speed: 1000,
    ...options,
  };

  return (
    <Slider {...settings}>
      {items.map((el, index) => (
        <div className="flex-center each-slick-item-container" key={index}>
          <div
            style={{ backgroundImage: `url(${el})` }}
            className="each-slick-item margin-auto"
          />
        </div>
      ))}
    </Slider>
  );
};

export default Slick;
