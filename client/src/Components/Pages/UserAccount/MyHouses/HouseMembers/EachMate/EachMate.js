import "./EachMate.css";
import DefaultHouse from "../../../../../../assets/default-house-image.jpg";
import MenuButton from "../../../../../UI/MenuButton/MenuButton";
import { axiosInstance } from "../../../../../Utility/axiosInstance";

const EachMate = (props) => {
  const deleteUser = () => {
    axiosInstance
      .post("/server1/RemoveMember", { userId: props.userId })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="each-house flex-row hover-grow my-each-mate"
      style={{ position: "relative" }}
    >
      <MenuButton onClick={deleteUser} className="delete-button">
        <i className="fas fa-trash-alt" />
      </MenuButton>
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
