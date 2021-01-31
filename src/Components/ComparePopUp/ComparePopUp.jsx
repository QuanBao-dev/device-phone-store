import "./ComparePopUp.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { addToCart } from "../../Epics/Cart";
import { compareStream, removeFromCompare } from "../../Epics/Compare";
import { useInitStream } from "../../Hooks/InitStream";

const dataKey = [
  "title",
  "price",
  "add to cart",
  "description",
  "availability",
];
const ComparePopUp = () => {
  const [compareState, setCompareState] = useState(
    compareStream.currentState()
  );
  useInitStream(setCompareState, compareStream);
  useEffect(() => {
    return () => {
      compareStream.updateData({ isActive: false });
      document.body.style.overflow = "auto";
    };
  }, []);
  useEffect(() => {
    if (compareState.isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [compareState.isActive]);
  if (!compareState.isActive) {
    return <></>;
  }
  return (
    <div className="compare-pop-up-container">
      <div
        className="background"
        onClick={() => {
          compareStream.updateData({ isActive: false });
        }}
      ></div>
      <div className="compare-pop-up">
        <h1>Compare Products</h1>
        <table>
          <tbody>
            <tr>
              <th>&nbsp;</th>
              {compareState.dataCompare &&
                compareState.dataCompare.map(({ title }, key) => (
                  <th
                    style={{ padding: "0 1rem", textAlign: "center" }}
                    key={key}
                  >
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        removeFromCompare(title);
                        const { dataCompare } = compareStream.currentState();
                        if(dataCompare.length === 0){
                          compareStream.updateData({ isActive: false });
                        }
                      }}
                    >
                      Remove
                      <span
                        style={{
                          color: "red",
                          marginLeft: "4px",
                          fontSize: "1rem",
                        }}
                      >
                        x
                      </span>
                    </div>
                  </th>
                ))}
            </tr>
            <tr>
              <th>&nbsp;</th>
              {compareState.dataCompare &&
                compareState.dataCompare.map(({ imageUrl }, key) => (
                  <td
                    style={{ padding: "0 1rem", textAlign: "center" }}
                    key={key}
                  >
                    <img src={imageUrl} alt="Not found" width="200px"></img>
                  </td>
                ))}
            </tr>
            {dataKey.map((keyInfo, key) => (
              <tr
                key={key}
                style={{ textTransform: "uppercase", textAlign: "left" }}
              >
                <th>{keyInfo}</th>
                {keyInfo === "title" &&
                  compareState.dataCompare.map(({ title }, key) => (
                    <td key={key} style={{ textAlign: "center" }}>
                      {title}
                    </td>
                  ))}
                {keyInfo === "price" &&
                  compareState.dataCompare.map(
                    ({ originalPrice, newPrice }, key) => (
                      <td
                        key={key}
                        style={{ textAlign: "center", textTransform: "none" }}
                      >
                        <span
                          style={{
                            textDecoration: newPrice ? "line-through" : null,
                            fontSize: newPrice ? "0.7rem" : null,
                            position: newPrice ? "relative" : null,
                            bottom: newPrice ? "0.3rem" : null,
                            marginRight: newPrice ? "5px" : null,
                          }}
                        >
                          {originalPrice}
                        </span>
                        <span>{newPrice}</span>
                      </td>
                    )
                  )}
                {keyInfo === "add to cart" &&
                  compareState.dataCompare.map(
                    (
                      {
                        title,
                        description,
                        star,
                        originalPrice,
                        newPrice,
                        imageUrl,
                      },
                      key
                    ) => (
                      <td key={key} style={{ textAlign: "center" }}>
                        <ButtonAddToCart
                          title={title}
                          description={description}
                          star={star}
                          originalPrice={originalPrice}
                          newPrice={newPrice}
                          imageUrl={imageUrl}
                        />
                      </td>
                    )
                  )}
                {keyInfo === "description" &&
                  compareState.dataCompare.map(({ description }, key) => (
                    <td
                      key={key}
                      style={{
                        textAlign: "center",
                        textTransform: "none",
                        fontSize: "0.9rem",
                        width: 100 / compareState.dataCompare.length + "%",
                      }}
                    >
                      <p>{description}</p>
                    </td>
                  ))}
                {keyInfo === "availability" &&
                  compareState.dataCompare.map((_, key) => (
                    <td
                      key={key}
                      style={{
                        textAlign: "center",
                        textTransform: "none",
                        color: "green",
                      }}
                    >
                      <p>In stock</p>
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparePopUp;
function ButtonAddToCart({
  title,
  description,
  star,
  originalPrice,
  newPrice,
  imageUrl,
}) {
  const [isViewCart, setIsViewCart] = useState(false);
  if (isViewCart) {
    return (
      <Link
        to={"/cart"}
        onClick={() => {
          compareStream.updateData({ isActive: false });
        }}
      >
        <button>View Cart</button>
      </Link>
    );
  }
  return (
    <button
      onClick={() => {
        addToCart(title, description, star, originalPrice, newPrice, imageUrl);
        setIsViewCart(true);
      }}
    >
      Add to cart
    </button>
  );
}
