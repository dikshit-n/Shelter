import { Fragment, useState } from "react";
import EditPage from "./EditPage/EditPage";
import "./EachView.css";
import PlaceLog from "./PlaceLog/PlaceLog";
import AsyncButton from "../../../../UI/AsyncButton/AsyncButton";

const EachView = (props) => {
  const [log, setLog] = useState(true);
  const EditPlaceToggler = (
    <AsyncButton
      onClick={() => {
        setLog(false);
        props.gatherData(props.placeId);
      }}
      disabled={props.logLoading || props.detailLoading}
      className="bg-green white places-header-button"
    >
      View Place
    </AsyncButton>
  );

  return (
    <Fragment>
      <div
        style={{
          transition: "all 0.3s ease",
          transform: `scale(${log ? 1 : 0})`,
          height: log ? "fit-content" : 0,
        }}
      >
        <PlaceLog {...props} component={EditPlaceToggler} />
      </div>
      <div
        style={{
          transition: "all 0.3s ease",
          transform: `scale(${log ? 0 : 1})`,
          height: !log ? "fit-content" : 0,
        }}
      >
        <EditPage {...props} close={() => setLog(true)} />
      </div>
    </Fragment>
  );
};

export default EachView;
