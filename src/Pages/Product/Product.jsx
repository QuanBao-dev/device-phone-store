import "./Product.css";

import React, { useEffect } from "react";

import ProductDetail from "../../Components/ProductDetail/ProductDetail";

const Product = (props) => {
  const { id } = props.match.params;
  useEffect(() => {
    window.scroll({ top: 0 });
  }, [id]);
  return (
    <ProductDetail
      id={id}
      isRelatedProductIncluded={true}
      styleCss={{
        maxWidth: "1210px",
        margin: "auto",
        marginTop: "3rem",
        width: "95%",
      }}
    />
  );
};

export default Product;
