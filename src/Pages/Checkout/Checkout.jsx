import "./Checkout.css";

import React, { useEffect, useRef, useState } from "react";

import HeadLine from "../../Components/HeadLine/HeadLine";
import Input from "../../Components/Input/Input";
import { cartStream } from "../../Epics/Cart";
import {
  convertFloatToCurrency,
  currentTotalCart,
  parseCurrency,
} from "../../Epics/Share";
import { useInitStream } from "../../Hooks/InitStream";
import { userStream } from "../../Epics/User";

const Checkout = (props) => {
  const [cartState, setCartState] = useState(cartStream.currentState());
  const [termOfUseState, setTermOfUseState] = useState(false);
  const [userState, setUserState] = useState(userStream.currentState());
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
  const { dataCart, cartNumberOfProduct } = cartState;
  useInitStream(setCartState, cartStream);
  useInitStream(setUserState, userStream);
  useEffect(() => {
    if (userState.userVm) {
      firstNameRef.current.value = userState.userVm.firstName;
      lastNameRef.current.value = userState.userVm.lastName;
      emailAddressRef.current.value = userState.userVm.email;
    }
    window.scroll({
      top: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.userVm]);
  return (
    <div style={{ maxWidth: "1210px", margin: "auto", padding: "0 10px" }}>
      <HeadLine pathLocation={props.location.pathname} />
      <form action="#">
        <div className="container-group-1">
          <div className="billing-details-area">
            <h1>Billing details</h1>
            <Input
              label={"First Name"}
              isRequired={true}
              type={"input"}
              inputRef={firstNameRef}
              isDisable={userState.userVm}
            />
            <Input
              label={"Last Name"}
              isRequired={true}
              type={"input"}
              inputRef={lastNameRef}
              isDisable={userState.userVm}
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
              isDisable={userState.userVm}
            />
            <Input
              type={"checkbox"}
              label={"Create an account?"}
              inputRef={createAccountRef}
              checkBoxRef={checkBoxCreateAccountRef}
              isDisable={userState.userVm}
            />
          </div>
          <div className="additional-information-area">
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
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {dataCart.map(({ title, originalPrice, newPrice }, key) => (
                <tr key={key}>
                  <td>{title}</td>
                  <td>{cartNumberOfProduct[title]}</td>
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
                <td></td>
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
          <p
            className="detail-term-of-use"
            style={{
              maxHeight: termOfUseState ? 92 : 0,
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique,
            ratione minima, sit debitis omnis beatae voluptatum vel est
            obcaecati, sapiente placeat accusantium. Iure, corrupti illum
            accusamus sint corporis commodi at! Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Quasi, tempora incidunt aut sunt
            obcaecati repellat saepe, expedita ut mollitia dolorem, voluptas
            provident reprehenderit maxime quibusdam dignissimos impedit
            laudantium voluptatum vel. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Similique, ratione minima, sit debitis omnis
            beatae voluptatum vel est obcaecati, sapiente placeat accusantium.
            Iure, corrupti illum accusamus sint corporis commodi at! Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Quasi, tempora
            incidunt aut sunt obcaecati repellat saepe, expedita ut mollitia
            dolorem, voluptas provident reprehenderit maxime quibusdam
            dignissimos impedit laudantium voluptatum vel. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Similique, ratione minima, sit
            debitis omnis beatae voluptatum vel est obcaecati, sapiente placeat
            accusantium. Iure, corrupti illum accusamus sint corporis commodi
            at! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi,
            tempora incidunt aut sunt obcaecati repellat saepe, expedita ut
            mollitia dolorem, voluptas provident reprehenderit maxime quibusdam
            dignissimos impedit laudantium voluptatum vel.
          </p>
          <Input
            type={"checkbox"}
            label={
              <span className="checkbox-label">
                I have read and agree to the website
                <span
                  className="term-and-condition"
                  onClick={() => {
                    setTermOfUseState(!termOfUseState);
                  }}
                >
                  {" "}
                  terms and conditions *
                </span>
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
              const body = {
                lineItems: dataCart.map(
                  ({ newPrice, originalPrice, title }) => {
                    const officialPrice = newPrice ? newPrice : originalPrice;
                    const unit_amount = parseFloat(
                      officialPrice.replace("$", "")
                    );
                    return {
                      quantity: cartNumberOfProduct[title],
                      price_data: {
                        currency: "usd",
                        product_data: {
                          name: title,
                        },
                        unit_amount,
                      },
                    };
                  }
                ),
                firstName: userState.userVm
                  ? userState.userVm.firstName
                  : firstNameRef.current.value,
                lastName: userState.userVm
                  ? userState.userVm.lastName
                  : lastNameRef.current.value,
                emailAddress: userState.userVm
                  ? userState.userVm.email
                  : emailAddressRef.current.value,
                password: createAccountRef.current.value,
                orderNotes: orderNotesRef.current.value,
                isAgreed: termOfUseCheckBoxRef.current.checked,
                companyName: companyNameRef.current.value,
                countryRegion: countryRegionRef.current.value,
                streetAddress: streetAddressRef.current.value,
                apartment: apartmentRef.current.value,
                townCity: townCityRef.current.value,
                postcode: postcodeRef.current.value,
                phone: phoneRef.current.value,
              };
              console.log(body);
              alert("Success");
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
