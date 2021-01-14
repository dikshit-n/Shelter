import "./FileUpload.css";
import styles from "react-style-proptype";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
// import uploadIcon from "./upload-icon.png";

const FileUpload = ({
  children,
  className,
  style,
  disabled = false,
  onChange,
  supportedFormats,
  name = "fileUpload",
  value = null,
  loading,
  limit,
  fileProcessing,
  status = null,
  progress,
}) => {
  const [processing, setProcessing] = useState(false || fileProcessing);
  const [message, setMessage] = useState({
    display: false,
    message: "",
    color: "",
  });
  const [showMessage, setShowMessage] = useState(
    message.display || status !== null
  );
  const inputRef = useRef();
  useEffect(() => {
    setShowMessage(message.display || status !== null);
  }, [message, status]);
  className = ["file-upload-button", className];

  const changeHandler = (event) => {
    let file = event.target.files[0]; // obtaining the selected file
    if (file !== null && file !== undefined) {
      let error = checkForErrors(file);
      if (!error) {
        setProcessing(true);
        setMessage({
          display: true,
          message: "Processing...",
          color: "#4DC274",
        });
        let fd = new FileReader();
        fd.readAsDataURL(file);
        fd.onload = (e) => {
          setProcessing(false);
          setMessage({ display: true, message: "Processed", color: "#4DC274" });
          setTimeout(() => {
            setMessage({ display: false, message: "", color: "" });
          }, 2000);
          onChange(file, e.target.result, error);
        };
      } else {
        onChange(event, null, error);
        setMessage({ display: true, message: error, color: "coral" });
        setTimeout(() => {
          setMessage({ display: false, message: "", color: "" });
        }, 2000);
      }
    }
  };

  const checkForErrors = (file) => {
    if (limit) {
      if (file.size > limit * 10000) {
        return `Size limit is ${limit}MB`;
      }
    }
    if (!supportedFormats.some((el) => file.name.endsWith(el))) {
      return `wrong format !`;
    }
    return false;
  };
  let errorMessage = status
    ? status.message
    : message.display
    ? message.message
    : "";
  let color = status ? status.color : message.display ? message.color : "coral";

  return (
    <>
      <input
        type="file"
        style={{
          width: 0,
          height: "0",
          position: "absolute",
          visibility: "hidden",
        }}
        ref={inputRef}
        value={value}
        name={name}
        onChange={changeHandler}
      />
      <div className="file-upload-button-container">
        <button
          id="upload-button"
          type="file"
          className={className.join(" ")}
          style={style}
          onClick={() => inputRef.current.click()}
          disabled={processing || loading || disabled}
        >
          Upload
        </button>
        <div
          style={{
            transform: `translateX(${
              showMessage
                ? document.getElementById("upload-button")?.offsetWidth + "px"
                : 0
            })`,
            opacity: showMessage ? 1 : 0,
            left: document.getElementById("upload-button")?.offsetLeft,
            background: color,
          }}
          className="file-error"
        >
          <small>{errorMessage}</small>
        </div>
      </div>
    </>
  );
};

export default FileUpload;

FileUpload.propTypes = {
  className: PropTypes.string,
  style: styles,
  onChange: PropTypes.func.isRequired,
  supportedFormats: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string,
  value: PropTypes.any.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  limit: PropTypes.number,
  fileProcessing: PropTypes.bool,
  progress: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  status: PropTypes.any,
};
