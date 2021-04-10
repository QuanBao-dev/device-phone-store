import "./PopularNews.css";

import React, { useEffect, useRef, useState } from "react";

import { popularNewsStream } from "../../Epics/PopularNews";
import { useInitStream } from "../../Hooks/InitStream";
import {
  useModeChangeHandle,
  useProductResizeHandle,
  useProductWidthHandle,
} from "../../Hooks/productListAutoScrolling";
import NewsList from "../NewsList/NewsList";
import { useAnimationViewport } from "../../Hooks/AnimationViewport";
import { userStream } from "../../Epics/User";

const dataList = [
  {
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/06/blog5-2-580x366.jpg",
    title: "Best care and support at Our Stores",
    category: "Hi-Tech",
    publishedAt: "JANUARY 10, 2017",
    numberComments: "0",
  },
  {
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/06/blog1-2-580x366.jpg",
    title: "Dairy: A free Sketch UI kit for minimal apps",
    category: "Hi-Tech",
    publishedAt: "JANUARY 27, 2017",
    numberComments: "1",
  },
  {
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/03/blog4-2-580x366.jpg",
    title: "Laptop technical details",
    category: "Business",
    publishedAt: "MARCH 20, 2017",
    numberComments: "0",
  },
  {
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/06/blog6-2-580x366.jpg",
    title: "The best products at your fingertips",
    category: "Business",
    publishedAt: "APRIL 15, 2017",
    numberComments: "0",
  },
  {
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/06/blog3-2-580x366.jpg",
    title: "Free set of smartphone clay mockups",
    category: "Business",
    publishedAt: "JUNE 6, 2017",
    numberComments: "1",
  },
  {
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/03/blog4-2-580x366.jpg",
    title: "Laptop technical details",
    category: "Business",
    publishedAt: "MARCH 20, 2017",
    numberComments: "0",
  },
  {
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/06/blog6-2-580x366.jpg",
    title: "The best products at your fingertips",
    category: "Business",
    publishedAt: "APRIL 15, 2017",
    numberComments: "0",
  },
  {
    imageUrl:
      "https://devicer.cmsmasters.net/wp-content/uploads/2017/06/blog3-2-580x366.jpg",
    title: "Free set of smartphone clay mockups",
    category: "Business",
    publishedAt: "JUNE 6, 2017",
    numberComments: "1",
  },
];
const PopularNews = () => {
  const [popularNewsState, setPopularState] = useState(
    popularNewsStream.currentState()
  );
  const [userState, setUserState] = useState(userStream.currentState());
  const popularNewsRef = useRef();
  const popularNewsLayerRef = useRef();
  useInitStream(setPopularState, popularNewsStream);
  useInitStream(setUserState, userStream);
  useProductWidthHandle(popularNewsStream, popularNewsRef, dataList);
  useProductResizeHandle(popularNewsStream, popularNewsRef, dataList);
  useModeChangeHandle(popularNewsStream, popularNewsState);
  popularNewsStream.updateDataQuick({
    offsetLeft:
      (popularNewsStream.currentState().widthItem +
        popularNewsStream.currentState().margin) *
      popularNewsStream.currentState().currentPage,
  });
  useAnimationViewport(popularNewsRef);
  const { innerWidth } = userState;
  useEffect(() => {
    if (innerWidth > 800) {
      popularNewsStream.updateData({ numberOfProductPerPage: 3 });
    } else if(innerWidth > 468) {
      popularNewsStream.updateData({ numberOfProductPerPage: 2 });
    } else {
      popularNewsStream.updateData({ numberOfProductPerPage: 1 });
    }
  }, [innerWidth]);
  return (
    <div
      style={{
        width: "100%",
        marginBottom: "4rem",
        maxWidth: "1220px",
        margin: "auto",
        position: "relative",
        opacity: 0,
        transition: "1s",
        transform: "translateY(20px)",
      }}
      ref={popularNewsRef}
    >
      <div className="popular-news-layer" ref={popularNewsLayerRef}></div>
      <div className="title-popular-news-area-container">
        <h1 className="title-popular-news">Popular news</h1>
        <div>
          {Array.from(
            Array(
              Math.ceil(
                dataList.length / popularNewsState.numberOfProductPerPage
              )
            ).keys()
          ).map((key) => (
            <i
              className={`fas fa-circle${
                (key + 1 !==
                  Math.ceil(
                    dataList.length / popularNewsState.numberOfProductPerPage
                  ) &&
                  popularNewsState.currentPage !== popularNewsState.maxPage &&
                  key + 1 ===
                    Math.floor(
                      (popularNewsState.currentPage +
                        popularNewsState.numberOfProductPerPage) /
                        popularNewsState.numberOfProductPerPage
                    )) ||
                (key + 1 ===
                  Math.ceil(
                    dataList.length / popularNewsState.numberOfProductPerPage
                  ) &&
                  popularNewsState.currentPage === popularNewsState.maxPage)
                  ? " active"
                  : ""
              }`}
              key={key}
              onClick={() => {
                const page = key * popularNewsState.numberOfProductPerPage;
                popularNewsStream.updateData({
                  currentPage:
                    page < popularNewsState.maxPage
                      ? page
                      : popularNewsState.maxPage,
                });
              }}
            ></i>
          ))}
        </div>
      </div>
      <div style={{ width: "100%", overflow: "hidden" }}>
        <NewsList dataList={dataList} layerRef={popularNewsLayerRef} />
      </div>
    </div>
  );
};

export default PopularNews;
