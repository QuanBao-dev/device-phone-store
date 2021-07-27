import "./TableProductsCart.css";

import React, { useRef, useState } from "react";

import { cartStream, removeFromCart } from "../../Epics/Cart";
import { useInitStream } from "../../Hooks/InitStream";
import { currentTotalCart, parseCurrency } from "../../Epics/Share";
import { Link } from "react-router-dom";

const TableProductsCart = () => {
  const [tableProductCartState, setTableProductCartState] = useState(
    cartStream.currentState()
  );
  const inputTableItemRef = useRef();
  useInitStream(setTableProductCartState, cartStream);
  const { dataCart, cartNumberOfProduct } = tableProductCartState;
  const cartTotal = currentTotalCart();
  if (dataCart.length === 0) {
    return <div style={{ marginBottom: "1rem" }}>No products in cart</div>;
  }
  return (
    <div style={{ overflow: "auto", width: "100%" }}>
      <div className="table-products-cart-container">
        <table className="table-products-cart">
          <thead>
            <tr
              style={{
                backgroundColor: "#3452FF",
                color: "white",
                height: "60px",
                fontSize: "1.1rem",
              }}
            >
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th style={{ fontWeight: "500" }}>Product</th>
              <th style={{ fontWeight: "500" }}>Price</th>
              <th style={{ fontWeight: "500" }}>Quantity</th>
              <th style={{ fontWeight: "500" }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {dataCart.map(
              ({ title, newPrice, originalPrice, imageUrl }, key) => (
                <tr key={key}>
                  <td style={{ fontWeight: 600, minWidth: 30 }}>
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: "1.2rem",
                      }}
                    >
                      <i
                        style={{ cursor: "pointer" }}
                        className="fas fa-times"
                        onClick={() => removeFromCart(title)}
                      ></i>
                    </div>
                  </td>
                  <td style={{ minWidth: 40 }}>
                    <img
                      src={imageUrl}
                      alt="Not found"
                      width="70px"
                      height="70px"
                    />
                  </td>
                  <td>{title}</td>
                  <td style={{ minWidth: 100 }}>
                    $
                    {parseCurrency(
                      (!newPrice ? originalPrice : newPrice).replace("$", "")
                    )}
                  </td>
                  <td>
                    <input
                      min={1}
                      ref={inputTableItemRef}
                      className="input-table"
                      type="number"
                      defaultValue={cartNumberOfProduct[title]}
                      onChange={(e) => {
                        if (parseInt(e.target.value) < 0) {
                          e.target.value = 0;
                          return;
                        }
                        cartStream.updateData({
                          cartNumberOfProduct: {
                            ...cartNumberOfProduct,
                            [title]: isNaN(parseInt(e.target.value))
                              ? 0
                              : parseInt(e.target.value),
                          },
                        });
                        const myCart = JSON.stringify(
                          cartStream.currentState().dataCart
                        );
                        const myNumberProductCart = JSON.stringify(
                          cartStream.currentState().cartNumberOfProduct
                        );
                        window.localStorage.setItem("myCart", myCart);
                        window.localStorage.setItem(
                          "myNumberProductCart",
                          myNumberProductCart
                        );
                      }}
                    />
                  </td>
                  <td>
                    $
                    {parseCurrency(
                      (
                        parseFloat(
                          (!newPrice ? originalPrice : newPrice).replace(
                            "$",
                            ""
                          )
                        ) * cartNumberOfProduct[title]
                      ).toFixed(2)
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <div className="cart-total-container">
          <span className="title">Cart totals: </span>
          <span>${parseCurrency(cartTotal.toFixed(2))}</span>
        </div>
        <Link to={"/checkout"}>
          <button className="button-checkout">Go to checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default TableProductsCart;
