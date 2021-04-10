import "./CartShoppingNav.css";

import React, { useState } from "react";

import { cartStream } from "../../Epics/Cart";
import { useInitStream } from "../../Hooks/InitStream";
import HoverCart from "../HoverCart/HoverCart";
import { parseCurrency } from "../../Epics/Share";
import { userStream } from "../../Epics/User";
import { Link } from "react-router-dom";

const CartShoppingNav = () => {
  const [cartState, setCartState] = useState(cartStream.currentState());
  const [userState, setUserState] = useState(userStream.currentState());
  useInitStream(setCartState, cartStream);
  useInitStream(setUserState, userStream);
  const subTotal = cartState.dataCart
    .map(({ newPrice, originalPrice, title }) => {
      let price = originalPrice;
      if (newPrice) price = newPrice;
      return {
        price: parseFloat(price.replace("$", "")),
        amount: cartState.cartNumberOfProduct[title],
      };
    })
    .reduce((ans, { price, amount }) => {
      ans += price * amount;
      return ans;
    }, 0);
  const { innerWidth } = userState;
  if (innerWidth > 1169)
    return (
      <div className="header__cart-shopping-container">
        <div style={{ position: "relative", marginRight: "10px" }}>
          <i className="fas fa-shopping-cart"></i>
          <span className="number-product-in-cart">
            {Object.keys(cartState.cartNumberOfProduct).reduce((ans, title) => {
              ans += cartState.cartNumberOfProduct[title];
              return ans;
            }, 0)}
          </span>
        </div>
        {innerWidth >= 1169 && (
          <div>
            <div>Your Cart</div>
            <div>${parseCurrency(subTotal.toFixed(2))}</div>
          </div>
        )}
        <HoverCart cartState={cartState} subTotal={subTotal} />
      </div>
    );
  else
    return (
      <Link
        to={"/cart"}
        style={{
          width: "50px",
          height: "50px",
          display: "block",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            position: "relative",
            marginRight: "10px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i
            className="fas fa-shopping-cart"
            style={{
              fontSize: "2rem",
              color: "black",
            }}
          />
          <span className="number-product-in-cart" style={{ top: 0 }}>
            {Object.keys(cartState.cartNumberOfProduct).reduce((ans, title) => {
              ans += cartState.cartNumberOfProduct[title];
              return ans;
            }, 0)}
          </span>
        </div>
      </Link>
    );
};

export default CartShoppingNav;
