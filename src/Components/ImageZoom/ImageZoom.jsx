import "./ImageZoom.css";

import React, { useEffect, useRef } from "react";
import { fromEvent } from "rxjs";
const ratio = 2;
const widthSquare = 220;
const heightSquare = 220;
const ImageZoom = ({ imageUrl }) => {
  const zoomSquareRef = useRef();
  const zoomInImageRef = useRef();
  const zoomInWindowRef = useRef();
  const containerImageProductRef = useRef();
  useEffect(() => {
    zoomInImageRef.current.style.width = `${
      containerImageProductRef.current.offsetWidth * ratio
    }px`;
  }, []);
  useEffect(() => {
    const subscription = fromEvent(window, "resize").subscribe(() => {
      zoomInImageRef.current.style.width = `${
        containerImageProductRef.current.offsetWidth * ratio
      }px`;
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <div className="container-image-product" ref={containerImageProductRef}>
      <div
        className="container-image-wrapper"
        onMouseMove={(e) => {
          const adjustOriginY =
            containerImageProductRef.current.offsetTop + heightSquare / 2;
          const adjustOriginX =
            containerImageProductRef.current.offsetLeft + widthSquare / 2;
          const left = e.pageX - adjustOriginX;
          const top = e.pageY - adjustOriginY;
          if (
            left >= 0 &&
            left < containerImageProductRef.current.offsetWidth - widthSquare
          ) {
            zoomSquareRef.current.style.left = `${left}px`;
            zoomInImageRef.current.style.left = `${-left * ratio}px`;
          } else {
            if (left < 0) {
              zoomSquareRef.current.style.left = `${0}px`;
              zoomInImageRef.current.style.left = `${0}px`;
            }
            if (
              left >=
              containerImageProductRef.current.offsetWidth - widthSquare
            ) {
              zoomSquareRef.current.style.left = `${
                containerImageProductRef.current.offsetWidth - widthSquare
              }px`;
            }
          }
          if (
            top >= 0 &&
            top < containerImageProductRef.current.offsetHeight - heightSquare
          ) {
            zoomSquareRef.current.style.top = `${top}px`;
            zoomInImageRef.current.style.top = `${-top * ratio}px`;
          } else {
            if (top < 0) {
              zoomSquareRef.current.style.top = `${0}px`;
              zoomInImageRef.current.style.top = `${0}px`;
            }
            if (
              top >=
              containerImageProductRef.current.offsetHeight - heightSquare
            ) {
              zoomSquareRef.current.style.top = `${
                containerImageProductRef.current.offsetHeight - heightSquare
              }px`;
            }
          }
        }}
        onMouseEnter={() => {
          zoomSquareRef.current.style.display = "block";
          zoomInWindowRef.current.style.display = "block";
        }}
        onMouseLeave={() => {
          zoomSquareRef.current.style.display = "none";
          zoomInWindowRef.current.style.display = "none";
        }}
      >
        <img src={imageUrl} alt="" />
        <span
          ref={zoomSquareRef}
          style={{
            width: widthSquare,
            height: heightSquare,
          }}
        ></span>
      </div>
      <div
        className="zoom-in-window"
        ref={zoomInWindowRef}
        style={{
          width: widthSquare * ratio,
          height: heightSquare * ratio,
        }}
      >
        <div style={{ position: "relative" }}>
          <img src={imageUrl} alt="" ref={zoomInImageRef} />
        </div>
      </div>
    </div>
  );
};

export default ImageZoom;
