import "./Carousel.css";

import React, { useEffect, useState } from "react";
import { interval } from "rxjs";

import CarouselItem from "../CarouselItem/CarouselItem";

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
    const subscription = interval(8000).subscribe(() => {
      if (page + 1 < dataCarousel.length) {
        setPage(page + 1);
      } else {
        setPage(0);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [page]);
  return (
    <div className="carousel-product-container">
      <div className="carousel-product-list">
        <span
          className="carousel-chevron-container left"
          onClick={() => {
            if (page > 0) {
              setPage(page - 1);
            } else {
              setPage(dataCarousel.length - 1);
            }
          }}
        >
          <i className="fas fa-chevron-left" />
        </span>
        <span
          className="carousel-chevron-container right"
          onClick={() => {
            if (page + 1 < dataCarousel.length) {
              setPage(page + 1);
            } else {
              setPage(0);
            }
          }}
        >
          <i className="fas fa-chevron-right" />
        </span>
        {dataCarousel.map(({ title, url, description }, key) => (
          <CarouselItem
            pageId={key}
            key={key}
            title={title}
            url={url}
            description={description}
            page={page}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
