import "./NewsList.css";

import React, { useEffect, useRef, useState } from "react";
import NewsItem from "../NewsItem/NewsItem";
import { popularNewsStream } from "../../Epics/PopularNews";
import {
  mouseDownSub,
  mouseMoveSub,
  mouseUpSub,
  touchStartSub,
  touchMoveSub,
  touchEndSub,
  scrollAllowSlidingHandle,
} from "../../Subscription/productListAutoScrolling";
import { userStream } from "../../Epics/User";
import { useInitStream } from "../../Hooks/InitStream";

const NewsList = ({ dataList, layerRef }) => {
  const newsListRef = useRef();
  const [userState, setUserState] = useState(userStream.currentState());
  useInitStream(setUserState, userStream);
  useEffect(() => {
    const subscription = scrollAllowSlidingHandle(false, popularNewsStream);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
  const { innerWidth } = userState;
  useEffect(() => {
    if (innerWidth >= 1130) {
      popularNewsStream.updateData({ numberOfProductPerPage: 4 });
    } else if (innerWidth >= 826) {
      popularNewsStream.updateData({ numberOfProductPerPage: 3 });
    } else if (innerWidth >= 486) {
      popularNewsStream.updateData({ numberOfProductPerPage: 2 });
    } else {
      popularNewsStream.updateData({ numberOfProductPerPage: 1 });
    }
  }, [innerWidth]);
  return (
    <div
      className="news-list"
      ref={newsListRef}
      style={{
        transform: `translateX(-${
          popularNewsStream.currentState().offsetLeft
        }px)`,
        transition: popularNewsStream.currentState().transition,
        touchAction: "pan-y",
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
            width: popularNewsStream.currentState().widthItem,
          }}
        />
      ))}
    </div>
  );
};

export default NewsList;
