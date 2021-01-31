import './CardProductNewItem.css';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { addToCart } from '../../Epics/Cart';
import { addToCompare } from '../../Epics/Compare';
import { parseCurrency, parseUrlTitle } from '../../Epics/Share';
import Stars from '../Stars/Stars';

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
}) => {
  const [triggerChangeState, setTriggerChangeState] = useState(false);
  const [isViewCart, setIsViewCart] = useState(false);
  return (
    <div className="card-product-new-item" style={{ ...style }}>
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
      </div>
      <Link
        to={`/product/${parseUrlTitle(title)}`}
        style={{ width: "95%", textAlign: "center" }}
      >
        <img className="product-image" src={imageUrl} alt={"Product"} />
      </Link>
      <div className="tags-container">
        {tags.map((tag, key) => (
          <span key={key}>
            <Link to={"/shop/page/1?category=" + tag.replace(/ /g, "-")}>
              {tag}
            </Link>
            {key !== tags.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
      <div className="title">{title}</div>
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
          <span className="original-price">
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
              title,
              description,
              star,
              originalPrice,
              newPrice,
              imageUrl
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
