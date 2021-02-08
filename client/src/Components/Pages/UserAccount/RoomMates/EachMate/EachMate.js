import "./EachMate.css";
import DefaultHouse from "../../../../../assets/default-house-image.jpg";
import { numberWithComma } from "../../../../Utility/numberWithComma";

const EachMate = (props) => {
  return (
    <div
      className="each-house flex-row hover-grow"
      // onClick={props.onClick}
    >
      <div
        className="house-image"
        style={{
          backgroundImage: `url(${props.logo || DefaultHouse})`,
          width: 100,
          height: 100,
          borderRadius: "50%",
        }}
      />
      <div className="house-details-container flex-row flex-wrap">
        <div className="each-house-description">
          <div>
            <small className="text-left">
              <strong>{props.name}</strong>
            </small>
          </div>
          <div>
            <small className="text-left">
              <strong>{props.contact}</strong>
            </small>
          </div>
          <div>
            <small className="text-left">
              <strong>{props.district}</strong>
            </small>
          </div>
          <div>
            <small className="text-left">
              <strong>{props.gender}</strong>
            </small>
          </div>
          <div>
            <small className="text-left" style={{ color: "coral" }}>
              <strong>Share: ₹ {numberWithComma(props.amount)}</strong>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachMate;
