import "./BlackCardProductList.css";

import React, { useRef } from "react";
import BlackCardProductItem from "../BlackCardProductItem/BlackCardProductItem";
import { useAnimationViewport } from "../../Hooks/AnimationViewport";

function BlackCardProductList({dataList}) {
  const blackCardProductListRef = useRef();
  useAnimationViewport(blackCardProductListRef);
  return (
    <ul className="black-card-product-list" ref={blackCardProductListRef}>
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
