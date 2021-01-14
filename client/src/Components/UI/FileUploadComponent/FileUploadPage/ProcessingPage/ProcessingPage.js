import { useEffect, useState } from "react";
import { useBlockNavigation, useTextFile } from "../../../../hooks";
import { axiosInstance } from "../../../../Utility/axiosInstance";
import { extractCsvData } from "../../../../Utility/fileOperations";
import AsyncButton from "../../../AsyncButton/AsyncButton";
import EachStep from "./EachStep/EachStep";
import "./ProcessingPage.css";

const ProcessingPage = (props) => {
  const [steps, setSteps] = useState([
    { name: "Processing", status: "loading", message: "" },
    { name: "Checking for Duplication", status: "", message: "" },
    { name: "Uploading", status: "", message: "" },
  ]);
  const [insert, download] = useTextFile();
  const [limit] = useState(null);
  const [started, setStarted] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [dbDup, setDbDup] = useState({
    isDuplicate: false,
    data: null,
  });
  const [
    Prompt,
    blockNavigation,
    unBlockNavigation,
    isBlocked,
  ] = useBlockNavigation("Upload progress will be interrupted !");

  const supportedFormats = ["csv", "xls", "xlsx"];
  const { csvFile, close } = props;

  useEffect(() => {
    if (csvFile) {
      process(csvFile);
      setStarted(true);
    }
  }, [csvFile]);

  // helpers for updating the state easily
  const updateProcessing = (status, message = "") => {
    if (status === "error" || status === "warning") {
      unBlockNavigation();
      setStopped(true);
    }
    let newData = steps;
    newData[0] = { name: "Processing", status, message };
    setSteps([...newData]);
  };
  const updateDuplication = (status, message = "") => {
    if (status === "error" || status === "warning") {
      unBlockNavigation();
      setStopped(true);
    }
    let newData = steps;
    newData[1] = { name: "Checking for Duplication", status, message };
    setSteps([...newData]);
  };
  const updateUpload = (status, message = "") => {
    if (status === "error" || status === "warning") {
      unBlockNavigation();
      setStopped(true);
    }
    let newData = steps;
    newData[2] = { name: "Uploading", status, message };
    setSteps([...newData]);
  };

  // Step 1 helpers
  const extractData = (file, fileUrl, error) => {
    if (fileUrl && !error && file) {
      blockNavigation();
      extractCsvData(file, (result) => {
        // callback after data extraction
        updateProcessing("success");
        checkForDuplication(result);
      });
    } else updateProcessing("error");
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

  const process = (file) => {
    if (file !== null && file !== undefined) {
      let error = checkForErrors(file);
      if (!error) {
        updateProcessing("loading");
        let fd = new FileReader();
        fd.readAsDataURL(file);
        fd.onload = (e) => {
          extractData(file, e.target.result, error);
        };
      } else {
        updateProcessing("error", error);
      }
    } else updateProcessing("error");
  };

  // Step 2 helpers
  const checkForDuplication = (result) => {
    console.log({ data: result });
    if (result) {
      updateDuplication("loading");
      axiosInstance
        .post("/admin/student/import/csv/validate", { data: result })
        .then((res) => {
          console.log(res.data);
          updateDuplication("success");
          upload(res.data);
        })
        .catch((err) => {
          let error = "Something went wrong !";
          let status = err.response?.status;
          if (status === 409) {
            let type = err.response?.data.error;
            if (type === "db") {
              error = "Duplication found in DB";
              setDbDup({ isDuplicate: true, data: err.response?.data.data });
              console.log(err.response?.data.data);
            } else if (type === "file") {
              error = "Duplication found in File";
            }
          }
          updateDuplication("error", error);
        });
    } else {
      updateDuplication("error");
    }
  };

  //Step 3
  const upload = (result) => {
    if (result) {
      updateUpload("loading");
      axiosInstance
        .post("admin/student/import/csv", { data: result })
        .then((res) => {
          console.log(res.data);
          updateUpload("success");
          setStopped(true);
          unBlockNavigation();
        })
        .catch((err) => {
          updateUpload("error", "Something went wrong");
        });
    } else {
      updateUpload("error");
    }
  };

  const downloadDuplicates = () => {
    console.log(dbDup.data);
    insert(
      "duplicates",
      `${dbDup.data.map((el) => `Duplicate found in Row No ${el.index}.\n`)}`
    );
    download();
  };

  const onClose = () => {
    setSteps([
      { name: "Processing", status: "loading", message: "" },
      { name: "Checking for Duplication", status: "", message: "" },
      { name: "Uploading", status: "", message: "" },
    ]);
    setStarted(false);
    setDbDup({
      isDuplicate: false,
      data: null,
    });
    close();
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

  return (
    <div className="processing-page bg-white flex-center flex-row">
      {Prompt}
      <div className="steps-container flex-column">
        {steps.map((el, index) => (
          <EachStep {...el} key={index} />
        ))}
        <div
          // style={{ visibility: getMessage().length > 0 ? "visible" : "hidden" }}
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
              // visibility: started && stopped && !isBlocked ? "visible" : "hidden",
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
          <AsyncButton
            style={{
              // visibility: started && stopped && !isBlocked ? "visible" : "hidden",
              transform: `scaleX(${dbDup.isDuplicate ? "1" : 0})`,
            }}
            className="upload-continue-button bg-red"
            onClick={downloadDuplicates}
          >
            See Log
          </AsyncButton>
        </div>
      </div>
    </div>
  );
};

export default ProcessingPage;
