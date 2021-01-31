import "./CardProductSaleList.css";

import React from "react";
import CardProductSaleItem from "../CardProductSaleItem/CardProductSaleItem";

const CardProductSaleList = ({dataList}) => {
  return (
    <ul className="card-product-sale-list">
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
