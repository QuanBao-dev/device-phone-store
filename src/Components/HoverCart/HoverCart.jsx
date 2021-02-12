import "./HoverCart.css";

import React from "react";
import { removeFromCart } from "../../Epics/Cart";
import { Link } from "react-router-dom";
import { parseCurrency, parseUrlTitle } from "../../Epics/Share";

const HoverCart = ({ cartState, subTotal }) => {
  return (
    <div className="hover-cart-nav-wrapper">
      <div className="hover-cart-nav-container">
        <div style={{ overflow: "auto", maxHeight: "360px" }}>
          {cartState.dataCart.map(
            ({ title, originalPrice, newPrice, imageUrl }, key) => (
              <div className="hover-cart-nav-item-container" key={key}>
                <Link
                  to={"/product/" + parseUrlTitle(title)}
                  style={{ width: "100%" }}
                >
                  <div className="hover-cart-nav-item">
                    <img src={imageUrl} alt="" />
                    <div className="nav-text">
                      <div>{title}</div>
                      <div>
                        {originalPrice && (
                          <span
                            style={{
                              textDecoration: newPrice ? "line-through" : null,
                            }}
                          >
                            ${parseCurrency(originalPrice.replace("$", ""))}
                          </span>
                        )}
                        {newPrice && (
                          <span>
                            ${parseCurrency(newPrice.replace("$", ""))}
                          </span>
                        )}
                        <span>x{cartState.cartNumberOfProduct[title]}</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    color: "red",
                    cursor: "pointer",
                  }}
                  onClick={() => removeFromCart(title)}
                >
                  x
                </div>
              </div>
            )
          )}
        </div>
        {cartState.dataCart.length > 0 && (
          <div>
            <div>Total: ${parseCurrency(subTotal.toFixed(2))}</div>
            <div className="container-button">
              <Link to={"/cart"}>
                <div className="container-button-item">View Cart</div>
              </Link>
              <Link to={"/checkout"}>
                <div className="container-button-item">Check Out</div>
              </Link>
            </div>
          </div>
        )}
        {cartState.dataCart.length === 0 && (
          <div>
            <div>No Products</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HoverCart;
