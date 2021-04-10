import "./Reviews.css";

import React, { useEffect, useMemo, useState } from "react";
import Stars from "../Stars/Stars";
import FormAddReview from "../FormAddReview/FormAddReview";
import { getDataById, postNewReview } from "../../Epics/Share";

const Reviews = ({
  reviewsData = [],
  reviewsRef,
  title,
  containerTabRef,
  id,
  updateNumberOfReviews,
}) => {
  const amountPerPage = 5;
  const [reviewsDataState, setReviewsDataState] = useState(reviewsData);
  const [page, setPage] = useState(1);
  const addReview = (review) => {
    postNewReview(id, review);
    setReviewsDataState([...getDataById(id).reviews]);
    updateNumberOfReviews(getDataById(id).reviews);
  };
  const maxPage = useMemo(() => {
    return Math.ceil(reviewsDataState.length / amountPerPage);
  }, [reviewsDataState.length]);
  const listPage = useMemo(() => {
    return Array.from(Array(maxPage).keys());
  }, [maxPage]);
  useEffect(() => {
    setReviewsDataState(reviewsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);
  useEffect(() => {
    containerTabRef.current.style.maxHeight = `${reviewsRef.current.offsetHeight}px`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewsDataState.length, page]);

  return (
    <div className="review-list-container" ref={reviewsRef}>
      {reviewsDataState && (
        <ul className="review-list">
          <h4>
            {reviewsDataState.length} review
            {reviewsDataState.length > 1 ? "s" : ""} for {title}
          </h4>
          <div>
            {reviewsDataState &&
              reviewsDataState
                .slice((page - 1) * amountPerPage, amountPerPage * page)
                .map(
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
          </div>
          <div className="review-page-container">
            {listPage.length > 1 &&
              listPage.map((pageItem, index) => (
                <span
                  key={index}
                  style={{
                    color: pageItem + 1 === page ? "blue" : null,
                    fontWeight: pageItem + 1 === page ? 600 : null,
                  }}
                  onClick={() => setPage(pageItem + 1)}
                >
                  {pageItem + 1}
                </span>
              ))}
          </div>
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
