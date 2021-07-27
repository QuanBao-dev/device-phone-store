import "./ProductFilter.css";

import React, { useRef, useState } from "react";
import TabFilter from "../TabFilter/TabFilter";
import CardProductNewList from "../CardProductNewList/CardProductNewList";
import { useAnimationViewport } from "../../Hooks/AnimationViewport";

const ProductsFilter = ({
  dataListRecent,
  dataListFeatured,
  dataListTop,
  dataListSale,
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const productsFilterRef = useRef();
  useAnimationViewport(productsFilterRef);
  return (
    <div
      ref={productsFilterRef}
      style={{
        overflow: "hidden",
        maxWidth: "1230px",
        width: "100%",
        margin: "auto",
        marginBottom: "5rem",
        opacity: 0,
        transform: "translateY(20px)",
        transition: "1s",
      }}
    >
      <TabFilter tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <div className="container-products-list-filter">
        <CardProductNewList dataList={dataListRecent} isWrap={true} />
        <div
          className={`container-product-item--absolute${
            tabIndex >= 1 ? " active" : ""
          }`}
        >
          <CardProductNewList dataList={dataListFeatured} isWrap={true} />
        </div>
        <div
          className={`container-product-item--absolute${
            tabIndex >= 2 ? " active" : ""
          }`}
        >
          <CardProductNewList dataList={dataListTop} isWrap={true} />
        </div>
        <div
          className={`container-product-item--absolute${
            tabIndex >= 3 ? " active" : ""
          }`}
        >
          <CardProductNewList dataList={dataListSale} isWrap={true} />
        </div>
      </div>
    </div>
  );
};

export default ProductsFilter;
