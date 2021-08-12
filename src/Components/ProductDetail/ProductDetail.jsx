import "./ProductDetail.css";

import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { addToCart } from "../../Epics/Cart";
import { addToCompare } from "../../Epics/Compare";
import { parseCurrency } from "../../Epics/Share";
import ImageZoom from "../ImageZoom/ImageZoom";
import Stars from "../Stars/Stars";
import HeadLineProduct from "../HeadLineProduct/HeadLineProduct";
import TabProductDetail from "../TabProductDetail/TabProductDetail";
import { useFetchDetailProduct } from "../../Hooks/fetchApi";
import CardProductNewItem from "../CardProductNewItem/CardProductNewItem";
const tabNameList = ["Description", "Additional information", "Reviews"];

const ProductDetail = ({ id, isRelatedProductIncluded, styleCss }) => {
  const inputNumberRef = useRef();
  const [isAdded, setIsAdded] = useState(false);
  const history = useHistory();
  const [productData, setProductData] = useState({});
  const [dataRelatedProduct, setDataRelatedProduct] = useState([]);
  useFetchDetailProduct(
    id,
    setProductData,
    setDataRelatedProduct,
    isRelatedProductIncluded
  );
  useEffect(() => {
    setIsAdded(false);
  }, [productData.id]);
  if (Object.keys(productData).length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "4rem 0",
        }}
      >
        <i className="fas fa-spinner fa-spin fa-4x"></i>
      </div>
    );
  }
  return (
    <div style={styleCss}>
      {isRelatedProductIncluded && (
        <HeadLineProduct productData={productData} />
      )}
      <div className="container-product-info">
        {isRelatedProductIncluded && (
          <ImageZoom imageUrl={productData.imageUrl} />
        )}
        {!isRelatedProductIncluded && (
          <div className="container-image-product">
            <div className="container-image-wrapper">
              <img src={productData.imageUrl} alt="" />
            </div>
          </div>
        )}
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
            <input
              type="number"
              defaultValue="1"
              ref={inputNumberRef}
              min="1"
            />
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
                    id,
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
                <td>
                  {productData.tags.map((tag, index) => (
                    <Link
                      key={index}
                      to={"/shop/page/1?category=" + tag.replace(/ /g, "-")}
                    >
                      {tag}
                      {index < productData.tags.length - 1 ? ", " : ""}
                    </Link>
                  ))}
                </td>
              </tr>
              <tr>
                <th>Share: </th>
                <td>Facebook</td>
              </tr>
            </tbody>
          </table>
          {isRelatedProductIncluded && (
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
          )}
        </div>
      </div>
      <TabProductDetail tabNameList={tabNameList} productData={productData} />
      {Object.keys(dataRelatedProduct).filter(
        (title) => dataRelatedProduct[title].productId !== productData.productId
      ).length > 0 && (
        <div className="container-related-product">
          <h1 className="title-related-product">Related products</h1>
          <div className="list-related-product">
            {Object.keys(dataRelatedProduct)
              .filter(
                (title) =>
                  dataRelatedProduct[title].productId !== productData.productId
              )
              .slice(0, 4)
              .map((title, key) => (
                <CardProductNewItem
                  productId={dataRelatedProduct[title].productId}
                  title={title}
                  description={dataRelatedProduct[title].description}
                  imageUrl={dataRelatedProduct[title].imageUrl}
                  isSale={dataRelatedProduct[title].isSale}
                  newPrice={dataRelatedProduct[title].newPrice}
                  originalPrice={dataRelatedProduct[title].originalPrice}
                  star={dataRelatedProduct[title].star}
                  tags={dataRelatedProduct[title].tags}
                  key={key}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
