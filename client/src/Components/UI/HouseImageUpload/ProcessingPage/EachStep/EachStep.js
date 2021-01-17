import "./EachStep.css";

const EachStep = (props) => {
  const { name, status, message } = props;
  let classNames = [
    "status-icon",
    status?.length > 0 ? `upload-${status}` : "",
  ];
  return (
    <div className="each-step">
      <div className={classNames.join(" ")}>
        {status === "success" ? (
          <i className="fas fa-check"></i>
        ) : status === "error" ? (
          <i className="fas fa-times"></i>
        ) : status === "warning" ? (
          <i className="fas fa-exclamation"></i>
        ) : status === "loading" ? (
          <i className="fas fa-sync fa-spin step-black"></i>
        ) : null}
      </div>
      <small className="step-name">
        <strong>{name}</strong>
      </small>
    </div>
  );
};

export default EachStep;
