import "./Stars.css";

import React, { useEffect, useState } from "react";
const Stars = ({ star, isEdit, setStarValue, error }) => {
  const [amountStarBegin, setAmountStarBegin] = useState(star);
  const [amountStarHover, setAmountStarHover] = useState(amountStarBegin);
  useEffect(() => {
    if (isEdit) setStarValue(amountStarBegin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountStarBegin, isEdit]);
  useEffect(() => {
    setAmountStarBegin(star);
    setAmountStarHover(star);
  },[star]);
  return (
    <div
      style={{ display: "flex" }}
      onMouseOut={() => {
        setAmountStarHover(amountStarBegin);
      }}
    >
      {Array.from(Array(amountStarHover).keys()).map((key) => (
        <span key={key}>
          <i
            className="fas fa-star active"
            onMouseEnter={() => {
              if (isEdit) {
                setAmountStarHover(key + 1);
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
      {Array.from(Array(5 - amountStarHover).keys()).map((key) => (
        <span key={key}>
          <i
            className="fas fa-star"
            onMouseEnter={() => {
              if (isEdit) {
                setAmountStarHover(key + 1 + amountStarHover);
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
