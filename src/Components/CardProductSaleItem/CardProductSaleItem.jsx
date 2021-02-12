import "./CardProductSaleItem.css";

import React from "react";
import { Link } from "react-router-dom";
import { parseUrlTitle } from "../../Epics/Share";
import TimeCountDown from "../TimeCountDown/TimeCountDown";

const CardProductSaleItem = ({
  title,
  imageUrl,
  star,
  originalPrice,
  newPrice,
  styleMargin = {},
  description,
  isBigSize,
}) => {
  return (
    <Link
      className={`card-product-sale-item${isBigSize ? " large" : ""}`}
      to={"/product/" + parseUrlTitle(title)}
      style={{ display: "block", textDecoration: "none", ...styleMargin }}
    >
      {isBigSize && <div className="large-sale-active">Sale!</div>}
      <li>
        <div className="container-image-sale">
          {!isBigSize && <span className="sale-active">Sale</span>}
          <img src={imageUrl} alt="Not found" />
        </div>
        <div className="container-text">
          <div className="rating-star">
            {Array.from(Array(star).keys()).map((key) => (
              <span key={key}>
                <i className="fas fa-star active"></i>
              </span>
            ))}
            {Array.from(Array(5 - star).keys()).map((key) => (
              <span key={key}>
                <i className="fas fa-star"></i>
              </span>
            ))}
          </div>
          <div className="title">{title}</div>
          <div className="container-price">
            <span className="original-price">{originalPrice}</span>
            <span className="new-price">{newPrice}</span>
          </div>
          {description && <p>{description}</p>}
          <div>
            <TimeCountDown timeSecond={86400 * 2} />
          </div>
        </div>
      </li>
    </Link>
  );
};

export default CardProductSaleItem;
