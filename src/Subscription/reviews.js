import { fromEvent } from "rxjs";
import { exhaustMap } from "rxjs/operators";
import { deleteProduct$, fetchProduct$ } from "../Epics/Product";

export const deleteButtonClickSubscription = (
  buttonDeleteRef,
  productId,
  reviewId,
  triggerFetchReviews
) => {
  return fromEvent(buttonDeleteRef.current, "click")
    .pipe(
      exhaustMap(() =>
        deleteProduct$("/api/product/" + productId + "/reviews/" + reviewId)
      )
    )
    .subscribe(() => {
      triggerFetchReviews();
    });
};

export const fetchReviewsSubscription = (
  id,
  setReviewsDataState,
  updateNumberOfReviews
) => {
  return fetchProduct$("/api/product/" + id + "/reviews").subscribe((res) => {
    if (!res.error) {
      setReviewsDataState(res);
      updateNumberOfReviews(res);
    }
  });
};
