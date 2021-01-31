import "./NewsItem.css";

import React from "react";
import { Link } from "react-router-dom";

const NewsItem = ({
  title,
  category,
  publishedAt,
  imageUrl,
  numberComments,
  style,
}) => {
  return (
    <Link to="/" className="news-item-contain" style={{ ...style }}>
      <div className="news-item">
        <img className="image" src={imageUrl} alt={"Not found"} />
        <div className="container-category-area">
          <div className="category">{category}</div>
          <div className="number-comments">
            <span style={{marginRight: "5px"}}>
              <i className="fas fa-comments"></i>
            </span>
            {numberComments}
          </div>
        </div>
        <h4 className="title">{title}</h4>
        <div className="published-at">{publishedAt}</div>
      </div>
    </Link>
  );
};

export default NewsItem;
