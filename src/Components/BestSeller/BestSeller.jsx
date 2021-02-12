import "./BestSeller.css";

import React, { useRef, useState } from "react";

import { bestSellerStream } from "../../Epics/BestSeller";
import { useInitStream } from "../../Hooks/InitStream";
import {
  useModeChangeHandle,
  useProductResizeHandle,
  useProductWidthHandle,
} from "../../Hooks/productListAutoScrolling";
import CardProductNewList from "../CardProductNewList/CardProductNewList";
import { getDataByTitle } from "../../Epics/Share";
import { useAnimationViewport } from "../../Hooks/AnimationViewport";

const dataBestSeller = [
  getDataByTitle("Tesla Generation"),
  getDataByTitle("Misfit Shine 2"),
  getDataByTitle("Samsung Gear Blue"),
  getDataByTitle("Apple Macbook"),
  getDataByTitle("12-inch Intel Core"),
  getDataByTitle("Samsung Galaxy S8"),
  getDataByTitle("Samsung Galaxy J5 Black"),
  getDataByTitle("Sony Watch 3 SWR50"),
];
const BestSeller = () => {
  const [bestSellerState, setBestSellerState] = useState(
    bestSellerStream.currentState()
  );
  const bestSellerRef = useRef();
  const bestSellerLayerRef = useRef();
  useAnimationViewport(bestSellerRef);
  useInitStream(setBestSellerState, bestSellerStream);
  useProductWidthHandle(bestSellerStream, bestSellerRef, dataBestSeller);
  useProductResizeHandle(bestSellerStream, bestSellerRef, dataBestSeller);
  useModeChangeHandle(bestSellerStream, bestSellerState);
  bestSellerStream.updateDataQuick({
    offsetLeft:
      (bestSellerStream.currentState().widthItem +
        bestSellerStream.currentState().margin) *
      bestSellerStream.currentState().currentPage,
  });
  return (
    <div
      style={{
        width: "100%",
        margin: "4rem auto 4rem auto",
        maxWidth: "1228px",
        position: "relative",
        opacity: 0,
        transform: "translateY(20px)",
        transition: "1s"
      }}
      ref={bestSellerRef}
    >
      <div className="best-seller-layer" ref={bestSellerLayerRef}></div>
      <div className="title-best-seller-area-container">
        <h1 className="title-best-seller">Best seller</h1>
        <div>
          {Array.from(
            Array(
              Math.ceil(
                dataBestSeller.length / bestSellerState.numberOfProductPerPage
              )
            ).keys()
          ).map((key) => (
            <i
              className={`fas fa-circle${
                (key + 1 !==
                  Math.ceil(
                    dataBestSeller.length /
                      bestSellerState.numberOfProductPerPage
                  ) &&
                  bestSellerState.currentPage !== bestSellerState.maxPage &&
                  key + 1 ===
                    Math.floor(
                      (bestSellerState.currentPage +
                        bestSellerState.numberOfProductPerPage) /
                        bestSellerState.numberOfProductPerPage
                    )) ||
                (key + 1 ===
                  Math.ceil(
                    dataBestSeller.length /
                      bestSellerState.numberOfProductPerPage
                  ) &&
                  bestSellerState.currentPage === bestSellerState.maxPage)
                  ? " active"
                  : ""
              }`}
              key={key}
              onClick={() => {
                const page = key * bestSellerState.numberOfProductPerPage;
                bestSellerStream.updateData({
                  currentPage:
                    page < bestSellerState.maxPage
                      ? page
                      : bestSellerState.maxPage,
                });
              }}
            ></i>
          ))}
        </div>
      </div>
      <div style={{ overflow: "hidden", width: "100%" }}>
        <CardProductNewList
          dataList={dataBestSeller}
          isWrap={false}
          layerNoWrapRef={bestSellerLayerRef}
        />
      </div>
    </div>
  );
};

export default BestSeller;
