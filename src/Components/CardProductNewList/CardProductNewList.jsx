import "./CardProductNewList.css";

import React, { useEffect, useRef } from "react";

import { bestSellerStream } from "../../Epics/BestSeller";
import {
  mouseDownSub,
  mouseMoveSub,
  mouseUpSub,
  touchEndSub,
  touchMoveSub,
  touchStartSub,
} from "../../Subscription/productListAutoScrolling";
import CardProductNewItem from "../CardProductNewItem/CardProductNewItem";

const CardProductNewList = ({ dataList, isWrap = true, layerNoWrapRef }) => {
  const cardProductListRef = useRef();
  useEffect(() => {
    const subscription = mouseUpSub(
      isWrap,
      cardProductListRef,
      bestSellerStream,
      layerNoWrapRef
    );
    const subscription2 = mouseDownSub(
      isWrap,
      cardProductListRef,
      bestSellerStream
    );
    const subscription3 = mouseMoveSub(
      isWrap,
      cardProductListRef,
      bestSellerStream,
      layerNoWrapRef
    );

    const subscription4 = touchStartSub(
      isWrap,
      cardProductListRef,
      bestSellerStream
    );
    const subscription5 = touchMoveSub(
      isWrap,
      cardProductListRef,
      bestSellerStream
    );
    const subscription6 = touchEndSub(
      isWrap,
      cardProductListRef,
      bestSellerStream
    );

    return () => {
      subscription.unsubscribe();
      subscription2.unsubscribe();
      subscription3.unsubscribe();
      subscription4.unsubscribe();
      subscription5.unsubscribe();
      subscription6.unsubscribe();
    };
  }, [isWrap, layerNoWrapRef]);
  return (
    <div
      ref={cardProductListRef}
      className={`card-product-new-list${isWrap ? "" : " nowrap"}`}
      style={{
        transform: !isWrap
          ? `translateX(-${bestSellerStream.currentState().offsetLeft}px)`
          : null,
        transition: bestSellerStream.currentState().transition,
      }}
    >
      {dataList.map(
        (
          {
            imageUrl,
            title,
            tags,
            newPrice,
            star,
            originalPrice,
            isSale,
            description,
          },
          key
        ) => (
          <CardProductNewItem
            imageUrl={imageUrl}
            title={title}
            tags={tags}
            newPrice={newPrice}
            star={star}
            originalPrice={originalPrice}
            isSale={isSale}
            description={description}
            key={key}
            style={{
              width: !isWrap ? bestSellerStream.currentState().widthItem : null,
            }}
          />
        )
      )}
    </div>
  );
};

export default CardProductNewList;
