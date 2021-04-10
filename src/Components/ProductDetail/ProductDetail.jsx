import "./ProductDetail.css";

import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { addToCart } from "../../Epics/Cart";
import { addToCompare } from "../../Epics/Compare";
import { parseCurrency } from "../../Epics/Share";
import ImageZoom from "../ImageZoom/ImageZoom";
import Stars from "../Stars/Stars";

const ProductDetail = ({ productData }) => {
  const inputNumberRef = useRef();
  const [isAdded, setIsAdded] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setIsAdded(false);
  }, [productData.id]);
  return (
    <div className="container-product-info">
      <ImageZoom imageUrl={productData.imageUrl} />
      <div className="container-area-title">
        <h3 className="title">{productData.title}</h3>
        <Stars star={productData.star} />
        <div className="price-container">
          {!productData.newPrice && productData.originalPrice && (
            <span className="price-product">
              ${parseCurrency(productData.originalPrice.replace("$", ""))}
            </span>
          )}
          {productData.newPrice && productData.originalPrice && (
            <span className="price-new">
              ${parseCurrency(productData.newPrice.replace("$", ""))}
            </span>
          )}
          {productData.originalPrice && productData.newPrice && (
            <span className="price-original">
              ${parseCurrency(productData.originalPrice.replace("$", ""))}
            </span>
          )}
        </div>
        <div className="description">{productData.description}</div>
        <form className="container-input-area">
          <input type="number" defaultValue="1" ref={inputNumberRef} min="1" />
          {!isAdded && (
            <button
              onClick={(e) => {
                console.log(isNaN(parseInt(inputNumberRef.current.value)));
                if (
                  !isNaN(parseInt(inputNumberRef.current.value)) &&
                  parseInt(inputNumberRef.current.value) >= 1
                ) {
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
                setIsAdded(true);
              }}
            >
              Add to cart
            </button>
          )}
          {isAdded && (
            <button
              onClick={(e) => {
                e.preventDefault();
                history.push("/cart");
              }}
            >
              View cart
            </button>
          )}
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
