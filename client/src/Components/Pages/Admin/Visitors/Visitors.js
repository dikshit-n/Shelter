import Place from "./Place";
import "./Visitors.css";

const Visitors = (props) => {
  return (
    <div className="height_100 employees-container">
      <Place {...props} />
    </div>
  );
};

export default Visitors;
