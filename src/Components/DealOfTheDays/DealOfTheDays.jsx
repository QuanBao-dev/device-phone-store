import "./DealOfTheDays.css";

import React, { useRef } from "react";
import CardProductSaleItem from "../CardProductSaleItem/CardProductSaleItem";
import BlackCardProductItem from "../BlackCardProductItem/BlackCardProductItem";
import { useAnimationViewport } from "../../Hooks/AnimationViewport";

const DealOfTheDays = ({ dataProduct }) => {
  const backgroundDealOfTheDayRef = useRef();
  useAnimationViewport(backgroundDealOfTheDayRef)
  return (
    <div className="background-deal-of-the-day" ref={backgroundDealOfTheDayRef}>
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
            productId={dataProduct.productId}
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
            url={"/shop/page/1?category=IPhone"}
          />
        </div>
      </div>
    </div>
  );
};

export default DealOfTheDays;
