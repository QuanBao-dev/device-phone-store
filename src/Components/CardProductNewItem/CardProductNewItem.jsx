import "./CardProductNewItem.css";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { addToCart } from "../../Epics/Cart";
import { addToCompare } from "../../Epics/Compare";
import { parseCurrency } from "../../Epics/Share";
import Stars from "../Stars/Stars";
import { useInitStream } from "../../Hooks/InitStream";
import { shopStream } from "../../Epics/Shop";
import { fromEvent } from "rxjs";
import { bestSellerStream } from "../../Epics/BestSeller";
import { cardProductDetailStream } from "../../Epics/CardProductDetail";

const CardProductNewItem = ({
  title,
  star,
  newPrice,
  originalPrice,
  tags,
  imageUrl,
  style,
  description,
  isSale,
  productId
}) => {
  const [triggerChangeState, setTriggerChangeState] = useState(false);
  const [isViewCart, setIsViewCart] = useState(false);
  const [shopState, setShopState] = useState(shopStream.currentState());
  const [widthItem, setWidthItem] = useState();
  const cardProductNewItemRef = useRef();

  const bestSellerProductsAmountPerPage = bestSellerStream.currentState()
    .numberOfProductPerPage;
  useInitStream(setShopState, shopStream);
  useEffect(() => {
    setWidthItem(cardProductNewItemRef.current.offsetWidth);
  }, [
    shopState.dataList.length,
    bestSellerProductsAmountPerPage,
    shopState.page,
    shopState.tabIndex
  ]);

  useEffect(() => {
    const subscription = fromEvent(window, "resize").subscribe(() => {
      setWidthItem(cardProductNewItemRef.current.offsetWidth);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <div
      className="card-product-new-item"
      style={{
        ...style,
        lineHeight: widthItem && widthItem > 320 ? "3rem" : null,
      }}
      ref={cardProductNewItemRef}
    >
      {isSale && <div className="sale-active">Sale!</div>}
      <div className="menu-control-container">
        <div
          onClick={() => {
            addToCompare(
              title,
              description,
              star,
              originalPrice,
              newPrice,
              imageUrl
            );
          }}
        >
          <i className="fas fa-sync"></i>
        </div>
        <div
          onClick={() => {
            console.log(title);
            cardProductDetailStream.updateData({
              isActive: true,
              currentId: productId
            })
          }}
        >
          <i className="fa fa-search"></i>
        </div>
      </div>
      <Link
        to={`/product/${productId}`}
        style={{ width: "95%", textAlign: "center" }}
      >
        <img
          className="product-image"
          src={imageUrl}
          alt={"Product"}
          style={{
            maxWidth: widthItem && widthItem > 320 ? "600px" : null,
          }}
        />
      </Link>
      <div
        className="tags-container"
        style={{
          fontSize: widthItem && widthItem > 320 ? "1.5rem" : null,
        }}
      >
        {tags.map((tag, key) => (
          <span key={key}>
            <Link to={"/shop/page/1?category=" + tag.replace(/ /g, "-")}>
              {tag}
            </Link>
            {key !== tags.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
      <div
        className="title"
        style={{
          fontSize: widthItem && widthItem > 380 ? "2rem" : "1.4rem",
          margin: "0.6rem",
          textAlign: "center",
        }}
      >
        {title}
      </div>
      <div
        className={`container-price${
          newPrice && originalPrice ? " discount" : ""
        }`}
      >
        {newPrice && (
          <span className="new-price">
            ${parseCurrency(newPrice.replace("$", ""))}
          </span>
        )}
        {originalPrice && (
          <span
            className="original-price"
            style={{
              fontSize:
                cardProductNewItemRef.current &&
                cardProductNewItemRef.current.offsetWidth > 450
                  ? "1.9rem"
                  : null,
            }}
          >
            ${parseCurrency(originalPrice.replace("$", ""))}
          </span>
        )}
      </div>
      <Stars star={star} />
      {!isViewCart && (
        <div
          className="button-add-to-cart"
          onClick={() => {
            addToCart(
              productId,
              title,
              description,
              star,
              originalPrice,
              newPrice,
              imageUrl,
            );
            setTriggerChangeState(!triggerChangeState);
            setIsViewCart(true);
          }}
        >
          Add to cart
        </div>
      )}

      {isViewCart && (
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <div className="button-view-cart">View Cart</div>
        </Link>
      )}
    </div>
  );
};

export default CardProductNewItem;
