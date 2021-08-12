import "./CardProductSaleItem.css";

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import TimeCountDown from "../TimeCountDown/TimeCountDown";
import { fromEvent } from "rxjs";

const CardProductSaleItem = ({
  title,
  imageUrl,
  star,
  originalPrice,
  newPrice,
  description,
  isBigSize,
  productId
}) => {
  const cardProductSaleItemRef = useRef();
  const imageProductRef = useRef();
  useEffect(() => {
    if (window.innerWidth < 1116) {
      if (
        cardProductSaleItemRef.current &&
        cardProductSaleItemRef.current.offsetWidth > 800
      ) {
        imageProductRef.current.style.width = "500px";
        return;
      }
      if (
        cardProductSaleItemRef.current &&
        cardProductSaleItemRef.current.offsetWidth <= 800 &&
        cardProductSaleItemRef.current.offsetWidth >= 280
      ) {
        imageProductRef.current.style.width = "300px";
        return;
      }
    } else {
      imageProductRef.current.style.width = "170px";
    }
  }, []);
  useEffect(() => {
    const subscription = fromEvent(window, "resize").subscribe(() => {
      // console.log(cardProductSaleItemRef.current);
      if (window.innerWidth < 1116) {
        if (
          cardProductSaleItemRef.current &&
          cardProductSaleItemRef.current.offsetWidth > 800
        ) {
          imageProductRef.current.style.width = "500px";
          return;
        }
        if (
          cardProductSaleItemRef.current &&
          cardProductSaleItemRef.current.offsetWidth <= 800 &&
          cardProductSaleItemRef.current.offsetWidth > 280
        ) {
          imageProductRef.current.style.width = "300px";
          return;
        }
      } else {
        imageProductRef.current.style.width = "170px";
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <Link
      className={`card-product-sale-item${isBigSize ? " large" : ""}`}
      to={"/product/" + productId}
      style={{ display: "block", textDecoration: "none" }}
    >
      {isBigSize && <div className="large-sale-active">Sale!</div>}
      <li ref={cardProductSaleItemRef}>
        <div className="container-image-sale">
          {!isBigSize && <span className="sale-active">Sale</span>}
          <img src={imageUrl} alt="Not found" ref={imageProductRef} />
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
          {description && <p style={{ color: "black" }}>{description}</p>}
          <div>
            <TimeCountDown timeSecond={86400 * 2} />
          </div>
        </div>
      </li>
    </Link>
  );
};

export default CardProductSaleItem;
