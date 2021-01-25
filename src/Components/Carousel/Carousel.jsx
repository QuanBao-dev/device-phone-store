import "./Carousel.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { timer } from "rxjs";

const dataCarousel = [
  {
    url:
      "https://devicer.cmsmasters.net/wp-content/uploads/revslider/home_slider_video/01-1-1.jpg",
    title: "New Collection coming to town 1",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, doloribus.",
  },
  {
    url:
      "https://devicer.cmsmasters.net/wp-content/uploads/revslider/home_slider_video/02-1.jpg",
    title: "New Collection coming to town 2",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, doloribus.",
  },
  {
    url:
      "https://devicer.cmsmasters.net/wp-content/uploads/revslider/home_slider_video/03-1.jpg",
    title: "New Collection coming to town 3",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, doloribus.",
  },
];
const Carousel = () => {
  const [page, setPage] = useState(0);
  useEffect(() => {
    const subscription = timer(4000, 4000).subscribe((v) => {
      if(page + 1 <  dataCarousel.length){
        setPage(page + 1)
      } else {
        setPage(0)
      }
    })
    return () => {
      subscription.unsubscribe();
    }
  },[page]);
  return (
    <div className="carousel-product-container">
      <div className="carousel-product-list">
        {dataCarousel.map(({ title, url, description }, key) => (
          <div
            className={`carousel-product-item-container${
              key === page ? " show" : ""
            }`}
            key={key}
          >
            <div className={`carousel-product-item`} key={key}>
              <img
                className="carousel-product-item__image"
                src={url}
                alt="NOT FOUND"
              />
              <div className="carousel-product-item__area-title">
                <h1 className="title">{title}</h1>
                <div className="description">{description}</div>
                <Link className="link" to="/">
                  Read more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
