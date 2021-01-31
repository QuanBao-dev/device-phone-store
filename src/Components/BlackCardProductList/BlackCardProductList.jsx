import "./BlackCardProductList.css";

import React from "react";
import BlackCardProductItem from "../BlackCardProductItem/BlackCardProductItem";

function BlackCardProductList({dataList}) {
  return (
    <ul className="black-card-product-list">
      {dataList.map(({ title, genre, startingAt, imageUrl }, key) => (
        <BlackCardProductItem
          title={title}
        genre={genre}
          startingAt={startingAt}
          imageUrl={imageUrl}
          key={key}
        />
      ))}
    </ul>
  );
}

export default BlackCardProductList;
