import React from "react";
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const DonutChart = ({ solved = 0, unsolved = 0 }) => {
  const total = solved + unsolved;
  const percentage = total > 0 ? ((solved / total) * 100).toFixed(1) : 0;

  const getColorByPercentage = (percentage) => {
    if (percentage >= 80) return "#28a745"; // Green
    if (percentage >= 50) return "#ffc107"; // Yellow
    return "#dc3545";                      // Red
  };

  const dynamicColor = getColorByPercentage(percentage);

  return (
    <div style={{ width: 200, height: 200, margin: "0 auto", position: "relative" }}>
        <div
        data-tooltip-id="chart-tooltip"
        data-tooltip-content={`Solved: ${solved}, Unsolved: ${unsolved}, Total: ${total}`}
      >
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          pathColor: dynamicColor,
          textColor: dynamicColor,
          trailColor: "#eaeaea",
          textSize: "16px",
        })}
      />
      </div>
      <ReactTooltip id="chart-tooltip" place="left-end" />
    </div>
  );
};

export default DonutChart;
