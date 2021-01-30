import "./EachHouse.css";
import DefaultHouse from "../../../../../../assets/default-house-image.jpg";

const EachHouse = (props) => {
  console.log(props);
  return (
    <div
      className="each-house flex-row hover-grow"
      onClick={() => props.onClick(props.houseId)}
    >
      <div
        style={{ backgroundImage: `url(${props.image || DefaultHouse})` }}
        className="house-image"
      />
      <div className="house-details-container flex-row flex-wrap">
        <div className="each-house-description">
          <div>
            <small className="text-left">
              <strong>{props.address}</strong>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachHouse;
