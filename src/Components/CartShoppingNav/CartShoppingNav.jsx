import "./CartShoppingNav.css";

import React, { useState } from "react";

import { cartStream } from "../../Epics/Cart";
import { useInitStream } from "../../Hooks/InitStream";
import HoverCart from "../HoverCart/HoverCart";
import { parseCurrency } from "../../Epics/Share";

const CartShoppingNav = () => {
  const [cartState, setCartState] = useState(cartStream.currentState());
  useInitStream(setCartState, cartStream);
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
  return (
    <div className="header__cart-shopping-container">
      <div style={{ position: "relative" }}>
        <i className="fas fa-shopping-cart"></i>
        <span className="number-product-in-cart">
          {Object.keys(cartState.cartNumberOfProduct).reduce((ans, title) => {
            ans += cartState.cartNumberOfProduct[title];
            return ans;
          }, 0)}
        </span>
      </div>
      <div>
        <div>Your Cart</div>
        <div>${parseCurrency(subTotal.toFixed(2))}</div>
      </div>
      <HoverCart cartState={cartState} subTotal={subTotal} />
    </div>
  );
};

export default CartShoppingNav;
