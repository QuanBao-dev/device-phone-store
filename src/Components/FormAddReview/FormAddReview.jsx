import React, { useRef, useState } from "react";
import Stars from "../Stars/Stars";
import "./FormAddReview.css";
const FormAddReview = ({ addReview }) => {
  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputCheckBoxRef = useRef();
  const textareaReviewRef = useRef();
  const [starValue, setStarValue] = useState(0);
  const [error, setError] = useState(false);
  return (
    <form className="form-add-review">
      <h4>Add a review</h4>
      <div>Your rating</div>
      <Stars isEdit={true} star={0} setStarValue={setStarValue} error={error} />
      <textarea placeholder="Your review" ref={textareaReviewRef} required />
      <input placeholder="Name" type="text" ref={inputNameRef} required />
      <input placeholder="Email" type="text" ref={inputEmailRef} required />
      <div className="form-checkbox">
        <input type="checkbox" ref={inputCheckBoxRef} />
        <label
          onClick={() => {
            inputCheckBoxRef.current.checked = !inputCheckBoxRef.current
              .checked;
          }}
        >
          Save my name, email, and website in this browser for the next time I
          comment.
        </label>
      </div>
      <button
        onClick={(e) => {
          let checkValidate = true;
          if (inputEmailRef.current.value.trim() === "") {
            console.error("Email is required");
            checkValidate = false;
          }
          if (inputNameRef.current.value.trim() === "") {
            console.error("Name is required");
            checkValidate = false;
          }
          if (textareaReviewRef.current.value.trim() === "") {
            console.error("Review is required");
            checkValidate = false;
          }
          if (starValue === 0) {
            console.error("Star is required");
            checkValidate = false;
            setError(true);
          } else {
            setError(false);
          }
          if (checkValidate) {
            e.preventDefault();
            addReview({
              star: starValue,
              username: inputNameRef.current.value,
              email: inputEmailRef.current.value,
              content: textareaReviewRef.current.value,
              imageUrl:
                "https://secure.gravatar.com/avatar/a6744578f6a2d7f0c351ed2ddcb40742?s=70&d=mm&r=g",
              createdAt: new Date(Date.now()).toUTCString(),
            });
            if (!inputCheckBoxRef.current.checked) {
              inputNameRef.current.value = "";
              inputEmailRef.current.value = "";
            }
            textareaReviewRef.current.value = "";
          }
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default FormAddReview;
