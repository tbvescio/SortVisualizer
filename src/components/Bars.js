import React from "react";
// import "./Bars.css";

function Bars({ barsArray }) {
  return (
    <div>
      <div className="array-container">
        {barsArray.map((value, id) => (
          <div
            className="array-bar"
            key={id}
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Bars;
