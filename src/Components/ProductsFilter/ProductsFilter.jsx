import "./ProductFilter.css";

import React, { useState } from "react";
import TabFilter from "../TabFilter/TabFilter";
import CardProductNewList from "../CardProductNewList/CardProductNewList";

const ProductsFilter = ({
  dataListRecent,
  dataListFeatured,
  dataListTop,
  dataListSale,
}) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div
      style={{
        overflow: "hidden",
        padding: "0 5px",
        maxWidth: "1230px",
        width: "100%",
        margin:"auto",
        marginBottom:"5rem"
      }}
    >
      <TabFilter tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <div className="container-products-list-filter">
        <div>
          <CardProductNewList dataList={dataListRecent} isWrap={true} />
        </div>
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
