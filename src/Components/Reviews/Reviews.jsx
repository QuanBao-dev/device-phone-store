import './Reviews.css';

import React, { useEffect, useMemo, useState } from 'react';

import { fetchReviewsSubscription } from '../../Subscription/reviews';
import FormAddReview from '../FormAddReview/FormAddReview';
import ReviewItem from '../ReviewItem/ReviewItem';

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
  const [trigger, setTrigger] = useState(false);
  const triggerFetchReviews = () => {
    setTrigger(!trigger);
  };
  useEffect(() => {
    const subscription = fetchReviewsSubscription(
      id,
      setReviewsDataState,
      updateNumberOfReviews
    );
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, trigger]);
  const maxPage = useMemo(() => {
    return Math.ceil(reviewsDataState.length / amountPerPage);
  }, [reviewsDataState.length]);
  const listPage = useMemo(() => {
    return Array.from(Array(maxPage).keys());
  }, [maxPage]);
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
                  ({
                    reviewId,
                    imageUrl,
                    username,
                    content,
                    createdAt,
                    star,
                    userId,
                  }) => (
                    <ReviewItem
                      key={reviewId}
                      imageUrl={imageUrl}
                      username={username}
                      content={content}
                      createdAt={createdAt}
                      star={star}
                      reviewId={reviewId}
                      triggerFetchReviews={triggerFetchReviews}
                      productId={id}
                      userId={userId}
                    />
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
      <FormAddReview id={id} triggerFetchReviews={triggerFetchReviews} />
    </div>
  );
};

export default Reviews;
