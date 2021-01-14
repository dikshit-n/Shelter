import "./FileUploadPage.css";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import ProcessingPage from "./ProcessingPage/ProcessingPage";
const FileUploadPage = (props) => {
  const [open, setOpen] = useState(false);
  const [csvData, setCsvData] = useState(null);
  const onDrop = (files) => {
    Open();
    setTimeout(() => {
      if (files) {
        if (files[0]) {
          setCsvData(files[0]);
        }
      }
    }, 1000);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const Open = () => {
    setOpen(true);
  };
  const Close = () => {
    setOpen(false);
  };
  return (
    <div className="full-page-wrapper file-upload">
      <div
        className="upload-page-scroller"
        style={{ transform: `translateY(${open ? "-50%" : 0})` }}
      >
        <div className="file-upload-page-container bg-white flex-column">
          <div
            {...getRootProps()}
            multiple={false}
            className="file-upload-page-drop-container flex-center flex-column"
            style={{
              outline: "none",
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            <div className="drop-file-img"></div>
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag & drop file here or click to select file</p>
            )}
          </div>
        </div>
        <ProcessingPage csvFile={csvData} close={Close} />
      </div>
    </div>
  );
};

export default FileUploadPage;
