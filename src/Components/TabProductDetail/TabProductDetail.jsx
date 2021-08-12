import './TabProductDetail.css';

import React, { useEffect, useRef, useState } from 'react';

import AdditionalInformation from '../AđitionalInformation/AdditionalInformation';
import Reviews from '../Reviews/Reviews';

const TabProductDetail = ({ tabNameList, productData }) => {
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
    if (productData.reviews)
      setNumberOfReviews(productData.reviews.length);
    return () => {
      updateNumberOfReviews([])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            id={productData.productId}
            containerTabRef={containerTabRef}
            updateNumberOfReviews={updateNumberOfReviews}
          />
        </div>
      </div>
    </div>
  );
};

export default TabProductDetail;
