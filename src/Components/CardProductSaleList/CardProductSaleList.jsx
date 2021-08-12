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
        ({ star, imageUrl, title, originalPrice, newPrice, productId }, key) => (
          <CardProductSaleItem
            key={key}
            star={star}
            imageUrl={imageUrl}
            title={title}
            originalPrice={originalPrice}
            newPrice={newPrice}
            productId={productId}
          />
        )
      )}
    </ul>
  );
};

export default CardProductSaleList;
