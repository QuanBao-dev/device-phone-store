import "./TabProductDetail.css";

import React, { useEffect, useRef, useState } from "react";

import { getDataById } from "../../Epics/Share";
import AdditionalInformation from "../AđitionalInformation/AdditionalInformation";
import CardProductNewItem from "../CardProductNewItem/CardProductNewItem";
import Reviews from "../Reviews/Reviews";

const TabProductDetail = ({ tabNameList, productData, dataRelatedProduct }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const reviewsRef = useRef();
  const containerAdditionalInformationRef = useRef();
  const containerDescriptionRef = useRef();
  const containerTabRef = useRef();
  const [numberOfReviews, setNumberOfReviews] = useState(0);
  const updateNumberOfReviews = (reviews) => {
    setNumberOfReviews(reviews.length);
  };
  useEffect(() => {
    setTabIndex(0);
    if (getDataById(productData.id).reviews)
      setNumberOfReviews(getDataById(productData.id).reviews.length);
    return () => {
      updateNumberOfReviews([])
    }
  }, [productData.id]);
  useEffect(() => {
    setTimeout(() => {
      if (tabIndex === 0)
        containerTabRef.current.style.maxHeight = `${
          containerDescriptionRef.current.offsetHeight + 30
        }px`;
    }, 100);
  }, [tabIndex, productData.id]);
  return (
    <div>
      <div className="tab-name-container">
        {tabNameList.map((tabName, index) => (
          <span
            key={index}
            onClick={() => setTabIndex(index)}
            className={`tab-name-item${tabIndex === index ? " active" : ""}`}
          >
            {tabName}{" "}
            {tabName === "Reviews" ? "(" + numberOfReviews + ")" : null}
          </span>
        ))}
      </div>
      <div
        ref={containerTabRef}
        className="container-content-tab"
        style={{
          maxHeight:
            tabIndex === 0
              ? 313
              : tabIndex === 1 && containerAdditionalInformationRef.current
              ? containerAdditionalInformationRef.current.offsetHeight + 30
              : tabIndex === 2 && reviewsRef.current
              ? reviewsRef.current.offsetHeight + 30
              : 313,
          height: "1000px",
        }}
      >
        <div
          ref={containerDescriptionRef}
          className="container-description"
          style={{
            top: tabIndex >= 0 ? "0" : null,
          }}
        >
          <p>{productData.description}</p>
        </div>
        <div
          className="container-additional-information"
          style={{
            top: tabIndex >= 1 ? "0" : null,
          }}
        >
          <AdditionalInformation
            additionalInformation={productData.additionalInformation}
            containerAdditionalInformationRef={
              containerAdditionalInformationRef
            }
          />
        </div>
        <div
          className="container-reviews-container"
          style={{
            top: tabIndex >= 2 ? "0" : null,
          }}
        >
          <Reviews
            reviewsData={productData.reviews}
            reviewsRef={reviewsRef}
            title={productData.title}
            id={productData.id}
            containerTabRef={containerTabRef}
            updateNumberOfReviews={updateNumberOfReviews}
          />
        </div>
      </div>
      {Object.keys(dataRelatedProduct).filter(
        (title) => dataRelatedProduct[title].id !== productData.id
      ).length > 0 && (
        <div className="container-related-product">
          <h1 className="title-related-product">Related products</h1>
          <div className="list-related-product">
            {Object.keys(dataRelatedProduct)
              .filter(
                (title) => dataRelatedProduct[title].id !== productData.id
              )
              .slice(0, 4)
              .map((title, key) => (
                <CardProductNewItem
                  title={title}
                  description={dataRelatedProduct[title].description}
                  imageUrl={dataRelatedProduct[title].imageUrl}
                  isSale={dataRelatedProduct[title].isSale}
                  newPrice={dataRelatedProduct[title].newPrice}
                  originalPrice={dataRelatedProduct[title].originalPrice}
                  star={dataRelatedProduct[title].star}
                  tags={dataRelatedProduct[title].tags}
                  key={key}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TabProductDetail;
