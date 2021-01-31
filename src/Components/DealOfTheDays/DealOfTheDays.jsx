import "./DealOfTheDays.css";

import React from "react";
import CardProductSaleItem from "../CardProductSaleItem/CardProductSaleItem";
import BlackCardProductItem from "../BlackCardProductItem/BlackCardProductItem";

const DealOfTheDays = ({ dataProduct }) => {
  return (
    <div className="background-deal-of-the-day">
      <div
        style={{
          maxWidth: "1210px",
          width: "100%",
          margin: "auto",
          padding: "3rem 0",
        }}
      >
        <h1>Deal of the days</h1>
        <div className="container-deal-of-the-day">
          <CardProductSaleItem
            imageUrl={dataProduct.imageUrl}
            star={dataProduct.star}
            newPrice={dataProduct.newPrice}
            originalPrice={dataProduct.originalPrice}
            description={dataProduct.description}
            title={dataProduct.title}
            styleMargin={{ margin: "0 1rem 0 0" }}
            isBigSize={true}
          />
          <BlackCardProductItem
            imageUrl="https://devicer.cmsmasters.net/wp-content/uploads/2017/12/featured-3-2.jpg"
            title={"Sale iPhone X"}
            genre={"Best Digital"}
            originalPrice={"$240"}
            startingAt={"$1199"}
            subClassName={"small"}
          />
        </div>
      </div>
    </div>
  );
};

export default DealOfTheDays;
