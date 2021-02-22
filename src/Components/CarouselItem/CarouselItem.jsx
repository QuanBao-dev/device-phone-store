import "./CarouselItem.css";

import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";

const CarouselItem = ({ pageId, page, title, description, url }) => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const seeMoreRef = useRef();
  useEffect(() => {
    if (page === pageId) {
      titleRef.current.style.transform = "translateX(0)";
      descriptionRef.current.style.opacity = 1;
      descriptionRef.current.style.transform = "translateY(0)";
      seeMoreRef.current.style.opacity = 1;
    } else {
      titleRef.current.style.transform = "translateX(-600px)";
      descriptionRef.current.style.opacity = 0;
      descriptionRef.current.style.transform = "translateY(20px)";
      seeMoreRef.current.style.opacity = 0;
    }
  }, [page, pageId]);
  return (
    <div
      className={`carousel-product-item-container${
        pageId === page ? " show" : ""
      }`}
      key={pageId}
    >
      <div className={`carousel-product-item`} key={pageId}>
        <img
          className="carousel-product-item__image"
          src={url}
          alt="NOT FOUND"
        />
        <div className="carousel-product-item__area-title">
          <h1 className="title" ref={titleRef}>
            {title}
          </h1>
          <div className="description">
            <div ref={descriptionRef}>{description}</div>
          </div>
          <Link className="link" to="/" ref={seeMoreRef}>
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;
