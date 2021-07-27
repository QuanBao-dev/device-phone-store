import "./CardProductDetail.css";

import React from "react";
import { useState, useEffect } from "react";

import { cardProductDetailStream } from "../../Epics/CardProductDetail";
import { useInitStream } from "../../Hooks/InitStream";
import ProductDetail from "../ProductDetail/ProductDetail";

const CardProductDetail = () => {
  const [cardProductDetailState, setCardProductDetailState] = useState(
    cardProductDetailStream.currentState()
  );
  useInitStream(setCardProductDetailState, cardProductDetailStream);
  useEffect(() => {
    if (cardProductDetailState.isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [cardProductDetailState.isActive]);
  return (
    <div
      className={`card-product-detail-container${
        cardProductDetailState.isActive ? " active" : ""
      }`}
      onClick={(e) => {
        if (e.target.className.includes("card-product-detail-container")) {
          cardProductDetailStream.updateData({
            isActive: false,
          });
        }
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "80vw",
          height: "80vh",
          overflow: "auto",
          padding: "0.5rem 1rem",
          border: "20px solid rgb(112, 112, 112)",
        }}
      >
        {cardProductDetailState.currentId && (
          <ProductDetail
            id={cardProductDetailState.currentId}
            isRelatedProductIncluded={false}
            styleCss={{
              width: "100%",
              height: "100%",
              backgroundColor: "white",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CardProductDetail;
