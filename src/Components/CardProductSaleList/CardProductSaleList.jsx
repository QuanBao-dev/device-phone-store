import "./CardProductSaleList.css";

import React, { useRef } from "react";
import CardProductSaleItem from "../CardProductSaleItem/CardProductSaleItem";
import { useAnimationViewport } from "../../Hooks/AnimationViewport";

const CardProductSaleList = ({dataList}) => {
  const cardProductSaleListRef = useRef();
  useAnimationViewport(cardProductSaleListRef);
  return (
    <ul className="card-product-sale-list" ref={cardProductSaleListRef}>
      {dataList.map(
        ({ star, imageUrl, title, originalPrice, newPrice }, key) => (
          <CardProductSaleItem
            key={key}
            star={star}
            imageUrl={imageUrl}
            title={title}
            originalPrice={originalPrice}
            newPrice={newPrice}
            styleMargin={{
              marginRight: key === dataList.length - 1 ? 0 : null,
              marginLeft: key === 0 ? 0 : null,
            }}
          />
        )
      )}
    </ul>
  );
};

export default CardProductSaleList;
