import "./EachMate.css";
import DefaultHouse from "../../../../../../assets/default-house-image.jpg";

const EachMate = (props) => {
  return (
    <div className="each-house flex-row hover-grow">
      <div
        className="house-image"
        style={{
          backgroundImage: `url(${props.image || DefaultHouse})`,
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
              <strong>{props.email}</strong>
            </small>
          </div>
          <div>
            <small className="text-left">
              <strong>{props.gender}</strong>
            </small>
          </div>
          <div>
            <small className="text-left">
              <strong>{props.district}</strong>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachMate;
