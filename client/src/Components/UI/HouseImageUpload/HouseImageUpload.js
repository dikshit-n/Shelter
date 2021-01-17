import "./HouseImageUpload.css";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import ProcessingPage from "./ProcessingPage/ProcessingPage";
import { withRouter } from "react-router";
import AsyncButton from "../AsyncButton/AsyncButton";
const HomeImageUpload = (props) => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState(null);
  const onDrop = (files) => {
    Open();
    setTimeout(() => {
      if (files) {
        setImages(files);
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
          <AsyncButton
            onClick={props.close}
            className="bck-transparent dd-back-button blue"
          >
            <i className="fas fa-chevron-left" /> Back
          </AsyncButton>
        </div>
        <ProcessingPage
          images={images}
          close={Close}
          closeEntirely={props.close}
          afterCompression={(compressedFiles) =>
            props.afterCompression(compressedFiles)
          }
        />
      </div>
    </div>
  );
};

export default withRouter(HomeImageUpload);
