import "./FormAddReview.css";

import React, { useEffect, useRef, useState } from "react";
import { fromEvent } from "rxjs";
import { filter, map, switchMap, tap } from "rxjs/operators";

import { putProduct$ } from "../../Epics/Product";
import { userStream } from "../../Epics/User";
import Stars from "../Stars/Stars";

const FormAddReview = ({ id, triggerFetchReviews }) => {
  const textareaReviewRef = useRef();
  const buttonRef = useRef();
  const [starValue, setStarValue] = useState(0);
  const [error, setError] = useState(false);
  const user = userStream.currentState().userVm;
  useEffect(() => {
    const subscription = fromEvent(buttonRef.current, "click")
      .pipe(
        filter((e) => {
          if (!user) return false;
          let checkValidate = true;
          if (textareaReviewRef.current.value.trim() === "") {
            console.error("Review is required");
            checkValidate = false;
          }
          if (starValue === 0) {
            console.error("Star is required");
            checkValidate = false;
            e.preventDefault();
            setError(true);
          } else {
            setError(false);
          }
          return checkValidate;
        }),
        tap((e) => {
          e.preventDefault();
          buttonRef.current.disabled = true;
        }),
        map(() => ({
          star: starValue,
          username: user.username,
          content: textareaReviewRef.current.value,
          imageUrl:
            "https://secure.gravatar.com/avatar/a6744578f6a2d7f0c351ed2ddcb40742?s=70&d=mm&r=g",
          createdAt: new Date(Date.now()).toUTCString(),
        })),
        switchMap((body) =>
          putProduct$("/api/product/" + id + "/reviews", body)
        )
      )
      .subscribe(() => {
        triggerFetchReviews();
        buttonRef.current.disabled = false;
        textareaReviewRef.current.value = "";
        setStarValue(0);
      });
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, starValue]);
  return (
    <form className="form-add-review">
      <h4>Add a review</h4>
      <div>Your rating</div>
      <Stars
        isEdit={true}
        star={starValue}
        setStarValue={setStarValue}
        error={error}
      />
      <textarea placeholder="Your review" ref={textareaReviewRef} required />
      <button
        ref={buttonRef}
        disabled={!user}
        title={!user ? "Require log in" : "Submit"}
      >
        Submit
      </button>
    </form>
  );
};

export default FormAddReview;
