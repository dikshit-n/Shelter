import { numberWithComma } from "../../../../Utility/numberWithComma";
import "./EachHouse.css";
import DefaultHouse from "../../../../../assets/default-house-image.jpg";
import { useHistory } from "react-router";

const EachHouse = (props) => {
  const history = useHistory();
  return (
    <div
      className="each-house flex-row hover-grow"
      onClick={() => history.push(`/myhouses/${props.houseId}`)}
      style={{ position: "relative" }}
    >
      {props.hold && (
        <i
          className="fas fa-flag"
          style={{ color: "coral", position: "absolute", top: 5, right: 5 }}
        />
      )}
      <div
        style={{ backgroundImage: `url(${props.image || DefaultHouse})` }}
        className="house-image"
      />
      <div className="house-details-container flex-row flex-wrap">
        <div className="each-house-description">
          <div>
            <small className="text-left">
              <strong>{props.ownerName}</strong>
            </small>
          </div>
          <div>
            <small className="text-left">
              <strong>₹ {numberWithComma(props.monthlyRent)}</strong>
            </small>
          </div>
          <div>
            <small className="text-left">
              <strong>{props.rentalType}</strong>
            </small>
          </div>
        </div>
        <div className="each-house-description address">
          <div>
            <small className="text-left">
              <strong>{props.town + ", " + props.district}</strong>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachHouse;
