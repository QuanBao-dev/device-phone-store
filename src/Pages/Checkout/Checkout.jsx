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
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const companyNameRef = useRef();
  const countryRegionRef = useRef();
  const streetAddressRef = useRef();
  const apartmentRef = useRef();
  const townCityRef = useRef();
  const postcodeRef = useRef();
  const phoneRef = useRef();
  const emailAddressRef = useRef();
  const createAccountRef = useRef();
  const orderNotesRef = useRef();
  const checkBoxCreateAccountRef = useRef();
  return (
    <div style={{ maxWidth: "1210px", margin: "auto" }}>
      <HeadLine pathLocation={props.location.pathname} />
      <form action="#">
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <h1>Billing details</h1>
            <Input
              label={"First Name"}
              isRequired={true}
              type={"input"}
              inputRef={firstNameRef}
            />
            <Input
              label={"Last Name"}
              isRequired={true}
              type={"input"}
              inputRef={lastNameRef}
            />
            <Input
              label={"Company Name"}
              isRequired={false}
              type={"input"}
              inputRef={companyNameRef}
            />
            <Input
              label={"Country / Region"}
              isRequired={true}
              type={"select"}
              inputRef={countryRegionRef}
            />
            <Input
              label={"Street address"}
              isRequired={true}
              type={"input"}
              placeholder={"House number and street name"}
              inputRef={streetAddressRef}
            />
            <Input
              label={"Apartment, suite, unit, etc."}
              type={"input"}
              placeholder={"Apartment, suite, unit, etc."}
              inputRef={apartmentRef}
            />
            <Input
              label={"Town / City"}
              type={"input"}
              isRequired={true}
              inputRef={townCityRef}
            />
            <Input
              isRequired={true}
              type={"input"}
              label={"Postcode / ZIP"}
              inputRef={postcodeRef}
            />
            <Input
              isRequired={true}
              type={"input"}
              label={"Phone"}
              inputRef={phoneRef}
            />
            <Input
              isRequired={true}
              type={"input"}
              label={"Email address"}
              inputRef={emailAddressRef}
            />
            <Input
              type={"checkbox"}
              label={"Create an account?"}
              inputRef={createAccountRef}
              checkBoxRef={checkBoxCreateAccountRef}
            />
          </div>
          <div style={{ marginLeft: "60px", flex: "1 1 auto" }}>
            <h1>Additional information</h1>
            <Input
              label={"Order notes"}
              isRequired={false}
              type={"textarea"}
              inputRef={orderNotesRef}
            />
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
            checkBoxRef={termOfUseCheckBoxRef}
            inputRef={termOfUseCheckBoxRef}
            isRequired={true}
          />
          <button
            className="white-button"
            onClick={(e) => {
              if (
                !termOfUseCheckBoxRef.current.checked ||
                [
                  firstNameRef.current.value.trim(),
                  lastNameRef.current.value.trim(),
                  countryRegionRef.current.value.trim(),
                  streetAddressRef.current.value.trim(),
                  apartmentRef.current.value.trim(),
                  townCityRef.current.value.trim(),
                  postcodeRef.current.value.trim(),
                  phoneRef.current.value.trim(),
                  emailAddressRef.current.value.trim(),
                ].includes("") ||
                (checkBoxCreateAccountRef.current.checked &&
                  createAccountRef.current.value.trim() === "")
              ) {
                return;
              }
              e.preventDefault();
              console.log({
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                companyName: companyNameRef.current.value,
                countryRegion: countryRegionRef.current.value,
                streetAddress: streetAddressRef.current.value,
                apartment: apartmentRef.current.value,
                townCity: townCityRef.current.value,
                postcode: postcodeRef.current.value,
                phone: phoneRef.current.value,
                emailAddress: emailAddressRef.current.value,
                createAccount: createAccountRef.current.value,
                isAgreed: termOfUseCheckBoxRef.current.checked,
              });
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
