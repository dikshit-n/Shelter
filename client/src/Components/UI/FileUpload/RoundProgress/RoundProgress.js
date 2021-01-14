import "./RoundProgress.css";
import React from "react";
import PropTypes from "prop-types";
// import UploadIcon from "../../../../../assets/upload-animated-gif.gif";
// import SuccessIcon from "../../../../../assets/success-animated-gif.gif";

class ProgressRing extends React.Component {
  constructor(props) {
    super(props);

    const { radius, stroke } = this.props;

    this.normalizedRadius = radius - stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }

  render() {
    const {
      radius,
      stroke,
      progress,
      color,
      displayProgress = false,
    } = this.props;

    const strokeDashoffset =
      this.circumference - (progress / 100) * this.circumference;

    return (
      <div
        style={{
          width: "fit-content",
          height: "fit-content",
          position: "relative",
        }}
        className="my-round-progress"
      >
        <svg height={radius * 2} width={radius * 2}>
          <circle
            className="circle-two"
            stroke={"#B9E9C2"}
            fill="#B9E9C2"
            strokeWidth={stroke}
            strokeDasharray={100 + " " + 100}
            style={{ strokeDashoffset }}
            stroke-width={0}
            r={this.normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            className="circle-one"
            stroke={color || "white"}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={this.circumference + " " + this.circumference}
            style={{ strokeDashoffset }}
            stroke-width={stroke}
            r={this.normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        {displayProgress ? (
          <small className="progress-percentage">{progress}%</small>
        ) : null}
        {/* {displayProgress ? (
          <small className="progress-percentage">{progress}%</small>
        ) : null}
        {progress !== 100 ? (
          <div className="upload-image">
            <img src={UploadIcon} alt=" " />
          </div>
        ) : progress === 100 ? (
          <div className="upload-image">
            <img className="success-animation" src={SuccessIcon} alt=" " />
          </div>
        ) : null} */}
      </div>
    );
  }
}

const RoundProgress = ({
  radius,
  stroke,
  progress,
  progressColor,
  displayProgress,
}) => {
  return (
    <ProgressRing
      radius={parseInt(radius) || 10}
      stroke={stroke || 2}
      progress={progress}
      color={progressColor}
      displayProgress={displayProgress}
    />
  );
};

export default RoundProgress;

RoundProgress.propTypes = {
  radius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  stroke: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  progress: PropTypes.any,
  progressColor: PropTypes.string,
  displayProgress: PropTypes.bool,
};
