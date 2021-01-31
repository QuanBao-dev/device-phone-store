import "./NewsList.css";

import React, { useEffect, useRef } from "react";
import NewsItem from "../NewsItem/NewsItem";
import { popularNewsStream } from "../../Epics/PopularNews";
import {
  mouseDownSub,
  mouseMoveSub,
  mouseUpSub,
  touchStartSub,
  touchMoveSub,
  touchEndSub,
} from "../../Subscription/productListAutoScrolling";

const NewsList = ({ dataList, layerRef }) => {
  const newsListRef = useRef();
  useEffect(() => {
    const subscription = mouseDownSub(false, newsListRef, popularNewsStream);
    const subscription2 = mouseMoveSub(
      false,
      newsListRef,
      popularNewsStream,
      layerRef
    );
    const subscription3 = mouseUpSub(
      false,
      newsListRef,
      popularNewsStream,
      layerRef
    );

    const subscription4 = touchStartSub(false, newsListRef, popularNewsStream);
    const subscription5 = touchMoveSub(false, newsListRef, popularNewsStream);
    const subscription6 = touchEndSub(false, newsListRef, popularNewsStream);
    return () => {
      subscription.unsubscribe();
      subscription2.unsubscribe();
      subscription3.unsubscribe();
      subscription4.unsubscribe();
      subscription5.unsubscribe();
      subscription6.unsubscribe();
    };
  }, [layerRef]);
  return (
    <div
      className="news-list"
      ref={newsListRef}
      style={{
        transform: `translateX(-${
          popularNewsStream.currentState().offsetLeft
        }px)`,
        transition: popularNewsStream.currentState().transition,
      }}
    >
      {dataList.map((newItemData, key) => (
        <NewsItem
          key={key}
          imageUrl={newItemData.imageUrl}
          title={newItemData.title}
          category={newItemData.category}
          publishedAt={newItemData.publishedAt}
          numberComments={newItemData.numberComments}
          style={{
            marginLeft: key === 0 ? 0 : null,
            marginRight: key === dataList.length - 1 ? 0 : null,
            width: popularNewsStream.currentState().widthItem,
          }}
        />
      ))}
    </div>
  );
};

export default NewsList;
