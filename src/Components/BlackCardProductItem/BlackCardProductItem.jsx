import "./BlackCardProductItem.css";

import React from "react";
import { Link } from "react-router-dom";
import { parseUrlTitle } from "../../Epics/Share";

const BlackCardProductItem = ({
  imageUrl,
  title,
  genre,
  startingAt,
  originalPrice,
  subClassName,
}) => {
  return (
    <li
      className={`black-card-product-item${
        subClassName ? " " + subClassName : ""
      }`}
    >
      <img src={imageUrl} alt="Not found" />
      <div className="black-card-product-item__container-text">
        <div className="genre">{genre}</div>
        <Link to={`/shop`} className="title">
          {title}
        </Link>
        <div className="start-at">{originalPrice || "Starting at"}</div>
        <div className="price">{startingAt}</div>
      </div>
    </li>
  );
};

export default BlackCardProductItem;
