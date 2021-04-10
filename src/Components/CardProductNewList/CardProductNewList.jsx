import "./CardProductNewList.css";

import React, { useEffect, useRef, useState } from "react";

import {
  mouseDownSub,
  mouseMoveSub,
  mouseUpSub,
  touchEndSub,
  touchMoveSub,
  touchStartSub,
} from "../../Subscription/productListAutoScrolling";
import CardProductNewItem from "../CardProductNewItem/CardProductNewItem";
import { useInitStream } from "../../Hooks/InitStream";
import { userStream } from "../../Epics/User";

const CardProductNewList = ({
  dataList,
  isWrap = true,
  layerNoWrapRef,
  stream,
}) => {
  const cardProductListRef = useRef();
  const [userState, setUserState] = useState(userStream.currentState());
  useInitStream(setUserState, userStream);
  useEffect(() => {
    const subscription = mouseUpSub(
      isWrap,
      cardProductListRef,
      stream,
      layerNoWrapRef
    );
    const subscription2 = mouseDownSub(isWrap, cardProductListRef, stream);
    const subscription3 = mouseMoveSub(
      isWrap,
      cardProductListRef,
      stream,
      layerNoWrapRef
    );

    const subscription4 = touchStartSub(isWrap, cardProductListRef, stream);
    const subscription5 = touchMoveSub(isWrap, cardProductListRef, stream);
    const subscription6 = touchEndSub(isWrap, cardProductListRef, stream);

    return () => {
      subscription.unsubscribe();
      subscription2.unsubscribe();
      subscription3.unsubscribe();
      subscription4.unsubscribe();
      subscription5.unsubscribe();
      subscription6.unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWrap]);
  const { innerWidth } = userState;
  useEffect(() => {
    if (stream)
      if (innerWidth >= 1130) {
        stream.updateData({ numberOfProductPerPage: 4 });
      } else if (innerWidth >= 826) {
        stream.updateData({ numberOfProductPerPage: 3 });
      } else if (innerWidth >= 486) {
        stream.updateData({ numberOfProductPerPage: 2 });
      } else {
        stream.updateData({ numberOfProductPerPage: 1 });
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerWidth]);
  return (
    <div
      ref={cardProductListRef}
      className={`card-product-new-list${isWrap ? "" : " nowrap"}`}
      style={{
        transform: !isWrap
          ? `translateX(-${stream.currentState().offsetLeft}px)`
          : null,
        transition: stream && stream.currentState().transition,
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
              width: !isWrap ? stream.currentState().widthItem : null,
              minWidth: !isWrap ? "auto" : null,
            }}
          />
        )
      )}
    </div>
  );
};

export default CardProductNewList;
