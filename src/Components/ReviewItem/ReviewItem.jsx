import './ReviewItem.css';

import { useEffect, useRef } from 'react';

import { userStream } from '../../Epics/User';
import { deleteButtonClickSubscription } from '../../Subscription/reviews';
import Stars from '../Stars/Stars';

const ReviewItem = ({
  reviewId,
  imageUrl,
  username,
  star,
  createdAt,
  content,
  triggerFetchReviews,
  productId,
  userId,
}) => {
  const buttonDeleteRef = useRef();
  const { userVm } = userStream.currentState();
  useEffect(() => {
    const subscription = deleteButtonClickSubscription(
      buttonDeleteRef,
      productId,
      reviewId,
      triggerFetchReviews
    );
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, reviewId]);
  return (
    <li className="review-item">
      <img src={imageUrl} alt="Not_found" className="image" />
      <div className="container-review-text">
        <div className="header-review">
          <h4 className="username">{username}</h4>
          <Stars star={star} />
        </div>
        <div className="created-at">{(new Date(createdAt)).toUTCString()}</div>
        <p className="content">{content}</p>
      </div>
      <i
        className="fa fa-times"
        ref={buttonDeleteRef}
        style={{
          display: (!userVm || (userVm && userVm.userId !== userId)) && "none",
        }}
      ></i>
    </li>
  );
};

export default ReviewItem;
