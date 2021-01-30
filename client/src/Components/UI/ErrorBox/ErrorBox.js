// import Card2 from "../Card2/Card2";
// import "./ErrorBox.css";
// import errorIcon from "../../../assets/errorIcon.svg";

// const ErrorBox = (props) => {
//   return (
//     <div className="error-box-container flex-center">
//       <Card2 className="error-box">
//         <p>
//           <img src={errorIcon} alt=" " />
//           {props.message}
//         </p>
//       </Card2>
//     </div>
//   );
// };

// export default ErrorBox;

import "./ErrorBox.css";

const ErrorBox = ({ message, component }) => {
  // console.log(message);
  return (
    <div className="margin-auto fit-content" style={{ padding: 50 }}>
      <div className="flex-center margin-auto error-data"></div>
      <div className="empty-message-detail bold">
        <h6>{message || "No Details"}</h6>
        {component}
      </div>
    </div>
  );
};

export default ErrorBox;
