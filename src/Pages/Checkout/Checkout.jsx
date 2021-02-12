import "./Checkout.css";

import React, { useRef } from "react";

import HeadLine from "../../Components/HeadLine/HeadLine";
import Input from "../../Components/Input/Input";
import { cartStream } from "../../Epics/Cart";
import {
  convertFloatToCurrency,
  currentTotalCart,
  parseCurrency,
} from "../../Epics/Share";
import { Link } from "react-router-dom";

const Checkout = (props) => {
  const { dataCart, cartNumberOfProduct } = cartStream.currentState();
  const termOfUseCheckBoxRef = useRef();
  return (
    <div style={{ maxWidth: "1210px", margin: "auto" }}>
      <HeadLine pathLocation={props.location.pathname} />
      <form action="#">
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <h1>Billing details</h1>
            <Input label={"First Name"} isRequired={true} type={"input"} />
            <Input label={"Last Name"} isRequired={true} type={"input"} />
            <Input label={"Company Name"} isRequired={false} type={"input"} />
            <Input
              label={"Country / Region"}
              isRequired={true}
              type={"select"}
            />
            <Input
              label={"Street address"}
              isRequired={true}
              type={"input"}
              placeholder={"House number and street name"}
            />
            <Input
              label={"Apartment, suite, unit, etc."}
              type={"input"}
              placeholder={"Apartment, suite, unit, etc."}
            />
            <Input label={"Town / City"} type={"input"} isRequired={true} />
            <Input isRequired={true} type={"input"} label={"Postcode / ZIP"} />
            <Input isRequired={true} type={"input"} label={"Phone"} />
            <Input isRequired={true} type={"input"} label={"Email address"} />
            <Input type={"checkbox"} label={"Create an account?"} />
          </div>
          <div style={{ marginLeft: "60px", flex: "1 1 auto" }}>
            <h1>Additional information</h1>
            <Input label={"Order notes"} isRequired={true} type={"textarea"} />
          </div>
        </div>
        <div className="your-order-container">
          <h1>Your order</h1>
          <table className="your-order-table">
            <thead>
              <tr className="title">
                <th>Product</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {dataCart.map(({ title, originalPrice, newPrice }, key) => (
                <tr key={key}>
                  <td>{title}</td>
                  <td>
                    $
                    {convertFloatToCurrency(
                      newPrice ? newPrice : originalPrice,
                      cartNumberOfProduct[title]
                    )}
                  </td>
                </tr>
              ))}
              <tr style={{ color: "blue" }}>
                <td style={{ borderBottomLeftRadius: "10px" }}>Total</td>
                <td style={{ borderBottomRightRadius: "10px" }}>
                  ${parseCurrency(currentTotalCart().toFixed(2).toString())}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="container-place-order-area">
          <div className="warning-message">
            Sorry, it seems that there are no available payment methods for your
            state. Please contact us if you require assistance or wish to make
            alternate arrangements.
          </div>
          <Input
            type={"checkbox"}
            label={
              <span className="checkbox-label">
                I have read and agree to the website
                <Link to="#"> terms and conditions *</Link>
              </span>
            }
            inputRef={termOfUseCheckBoxRef}
          />
          <button
            className="white-button"
            onClick={(e) => {
              console.log(e);
            }}
          >
            Place order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
