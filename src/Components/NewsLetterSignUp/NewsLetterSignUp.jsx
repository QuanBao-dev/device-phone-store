import "./NewsLetterSignUp.css";

import React from "react";

const NewsLetterSignUp = () => {
  return (
    <div className="news-letter-sign-up-container">
      <div className="news-letter-sign-up">
        <h2 className="title">Newsletter Signup</h2>
        <form className="form-submit">
          <input type="text" placeholder="Your Email..." required/>
          <button className="">SUBSCRIBE</button>
        </form>
        <h4 style={{fontWeight:400}}>Never miss our great deals. Huge sale every week!</h4>
      </div>
    </div>
  );
};

export default NewsLetterSignUp;
