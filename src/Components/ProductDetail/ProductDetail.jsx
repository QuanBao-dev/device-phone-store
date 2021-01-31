import "./ProductDetail.css";

import React, { useRef } from "react";

import { addToCompare } from "../../Epics/Compare";
import Stars from "../Stars/Stars";
import { addToCart } from "../../Epics/Cart";
import ImageZoom from "../ImageZoom/ImageZoom";

const ProductDetail = ({ productData }) => {
  const inputNumberRef = useRef();
  return (
    <div className="container-product-info">
      <ImageZoom imageUrl={productData.imageUrl} />
      <div className="container-area-title">
        <h3 className="title">{productData.title}</h3>
        <Stars star={productData.star} />
        <div className="description">{productData.description}</div>
        <form className="container-input-area">
          <input type="number" defaultValue="1" ref={inputNumberRef} min="1" />
          <button
            onClick={(e) => {
              if (parseInt(inputNumberRef.current.value) >= 1) {
                e.preventDefault();
              } else {
                return;
              }
              const {
                title,
                description,
                star,
                originalPrice,
                newPrice,
                imageUrl,
              } = productData;
              addToCart(
                title,
                description,
                star,
                originalPrice,
                newPrice,
                imageUrl,
                parseInt(inputNumberRef.current.value)
              );
            }}
          >
            Add to cart
          </button>
        </form>
        <table className="container-tag-category">
          <tbody>
            <tr>
              <th>Categories: </th>
              <td>{productData.tags.join(", ")}</td>
            </tr>
            <tr>
              <th>Share: </th>
              <td>Facebook</td>
            </tr>
          </tbody>
        </table>
        <div
          className="container-compare-area"
          onClick={() => {
            addToCompare(
              productData.title,
              productData.description,
              productData.star,
              productData.originalPrice,
              productData.newPrice,
              productData.imageUrl
            );
          }}
        >
          <i className="fas fa-sync"></i>
          <span>Compare</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
