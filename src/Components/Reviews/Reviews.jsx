import "./Reviews.css";

import React, { useEffect, useState } from "react";
import Stars from "../Stars/Stars";
import FormAddReview from "../FormAddReview/FormAddReview";

const Reviews = ({ reviewsData = [], reviewsRef, title, containerTabRef }) => {
  const [reviewsDataState, setReviewsDataState] = useState(reviewsData);
  const addReview = (review) => {
    setReviewsDataState([...reviewsDataState, review]);
  };
  useEffect(() => {
    setReviewsDataState(reviewsData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[title])
  useEffect(() => {
    containerTabRef.current.style.maxHeight = `${reviewsRef.current.offsetHeight}px`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewsDataState.length]);
  return (
    <div className="review-list-container" ref={reviewsRef}>
      {reviewsDataState && (
        <ul className="review-list">
          <h4>
            {reviewsDataState.length} review
            {reviewsDataState.length > 1 ? "s" : ""} for {title}
          </h4>
          {reviewsDataState &&
            reviewsDataState.map(
              ({ imageUrl, username, content, createdAt, star }, index) => (
                <li key={index} className="review-item">
                  <img src={imageUrl} alt="Not_found" className="image" />
                  <div className="container-review-text">
                    <div className="header-review">
                      <h4 className="username">{username}</h4>
                      <Stars star={star} />
                    </div>
                    <div className="created-at">{createdAt}</div>
                    <p className="content">{content}</p>
                  </div>
                </li>
              )
            )}
        </ul>
      )}
      {!reviewsDataState && (
        <ul className="review-list">
          <h4>No reviews for {title}</h4>
        </ul>
      )}
      <FormAddReview addReview={addReview} />
    </div>
  );
};

export default Reviews;
