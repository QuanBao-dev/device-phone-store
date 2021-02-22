import "./Stars.css";

import React, { useEffect, useState } from "react";
const Stars = ({ star, isEdit, setStarValue, error }) => {
  const [amountStarBegin, setAmountStarBegin] = useState(star);
  const [amountStar, setAmountStar] = useState(amountStarBegin);
  useEffect(() => {
    if (isEdit) setStarValue(amountStarBegin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountStarBegin, isEdit]);
  return (
    <div
      style={{ display: "flex" }}
      onMouseOut={() => {
        setAmountStar(amountStarBegin);
      }}
    >
      {Array.from(Array(amountStar).keys()).map((key) => (
        <span key={key}>
          <i
            className="fas fa-star active"
            onMouseEnter={() => {
              if (isEdit) {
                setAmountStar(key + 1);
              }
            }}
            onClick={() => {
              if (isEdit) {
                setAmountStarBegin(key + 1);
              }
            }}
          ></i>
        </span>
      ))}
      {Array.from(Array(5 - amountStar).keys()).map((key) => (
        <span key={key}>
          <i
            className="fas fa-star"
            onMouseEnter={() => {
              if (isEdit) {
                setAmountStar(key + 1 + amountStar);
              }
            }}
          ></i>
        </span>
      ))}
      {error && (
        <span style={{ color: "red", marginLeft: "1rem" }}>Required</span>
      )}
    </div>
  );
};

export default Stars;
