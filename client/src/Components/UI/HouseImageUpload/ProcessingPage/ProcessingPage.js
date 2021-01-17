import { useEffect, useState } from "react";
import { useBlockNavigation } from "../../../hooks";
import AsyncButton from "../../AsyncButton/AsyncButton";
import EachStep from "./EachStep/EachStep";
import "./ProcessingPage.css";
import { compressFile } from "../../../Utility/fileOperations";

const ProcessingPage = (props) => {
  const [steps, setSteps] = useState([
    { name: "Validating Images", status: "loading", message: "" },
    { name: "Compressing Images", status: "", message: "" },
  ]);
  const [limit] = useState(null);
  const [started, setStarted] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [
    Prompt,
    blockNavigation,
    unBlockNavigation,
    isBlocked,
  ] = useBlockNavigation("Upload progress will be interrupted !");

  const supportedFormats = [
    "jpg",
    "png",
    "jpeg",
    "JPEG",
    "JPG",
    "PNG",
    "jfif",
    "JFIF",
  ];
  const { images, close, afterCompression, closeEntirely } = props;

  useEffect(() => {
    if (images) {
      validation(images);
      setStarted(true);
    }
  }, [images]);

  // helpers for updating the state easily
  const updateValidating = (status, message = "") => {
    if (status === "error" || status === "warning") {
      unBlockNavigation();
      setStopped(true);
    }
    let newData = steps;
    newData[0] = { name: "Validating Images", status, message };
    setSteps([...newData]);
  };
  const updateCompressing = (status, message = "") => {
    if (status === "error" || status === "warning") {
      unBlockNavigation();
      setStopped(true);
    }
    let newData = steps;
    newData[1] = { name: "Compressing Images", status, message };
    setSteps([...newData]);
  };

  // Step 1 helpers
  // const extractData = (file, fileUrl, error) => {
  //   if (fileUrl && !error && file) {
  //     blockNavigation();
  //     extractCsvData(file, (result) => {
  //       // callback after data extraction
  //       updateValidating("success");
  //       checkForDuplication(result);
  //     });
  //   } else updateValidating("error");
  // };

  const checkForErrors = (file) => {
    if (limit) {
      if (file.size > limit * 10000) {
        return `Size limit is ${limit}MB`;
      }
    }
    return supportedFormats.some((el) => file.name.endsWith(el));
  };

  // Step 1 -- Validation of Images

  const validation = (files) => {
    if (files !== null && files !== undefined) {
      blockNavigation();
      updateValidating("loading");

      if (files.length < 3) {
        setTimeout(
          () => updateValidating("error", "Select Atleast 3 images !"),
          1000
        );
      } else {
        if (!files.some((el) => checkForErrors(el))) {
          setTimeout(
            () => updateValidating("error", "Unsupported format found !"),
            1000
          );
        } else {
          setTimeout(() => {
            updateValidating("success");
            compressingImages(files);
          }, 1000);
        }
      }
    } else updateValidating("error");
  };

  // Step 2 -- Compressing Images

  const compressingImages = (files) => {
    updateCompressing("loading");
    compressFile(files, { size: 0.3 }, (compressedFiles) => {
      updateCompressing("success");
      unBlockNavigation();
      setStopped(true);
      afterCompression([...compressedFiles.map((el) => el.prefix + el.data)]);
    });
  };

  const getMessage = () => {
    let message = "";
    steps.map((el) => {
      if (el.message.length > 0) {
        message = el.message;
        return;
      }
    });
    return message;
  };

  const onClose = () => {
    setSteps([
      { name: "Validation Images", status: "loading", message: "" },
      { name: "Compressing", status: "", message: "" },
    ]);
    setStarted(false);
    if (getMessage().length > 0) {
      close();
    } else closeEntirely();
  };
  return (
    <div className="processing-page bg-white flex-center flex-row">
      {Prompt}
      <div className="steps-container flex-column">
        {steps.map((el, index) => (
          <EachStep {...el} key={index} />
        ))}
        <div
          style={{
            transform: `scaleX(${getMessage().length > 0 ? "1" : 0})`,
          }}
          className="pp-error-box"
        >
          {getMessage()}
        </div>
        <div className="flex-row">
          <AsyncButton
            style={{
              transform: `scaleX(${
                started && stopped && !isBlocked ? "1" : 0
              })`,
            }}
            className="upload-continue-button"
            onClick={onClose}
          >
            Continue
          </AsyncButton>
          &nbsp;
          {/* <AsyncButton
            style={{
              transform: `scaleX(${dbDup.isDuplicate ? "1" : 0})`,
            }}
            className="upload-continue-button bg-red"
            onClick={downloadDuplicates}
          >
            See Log
          </AsyncButton> */}
        </div>
      </div>
    </div>
  );
};

export default ProcessingPage;
