import "./ImageZoom.css";

import React, { useEffect, useRef } from "react";
const ratio = 2;
const widthSquare = 200;
const heightSquare = 200;
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
/**
 * has this god been added to pantheon very recently
 * if that is the case
 * it's quite possible that the change might not be reflected in my database
 * my sincerest apologize
 * 
 * I have been thinking about this
 * but don't you think 
 * it might be fun to install a fixed-star light bulbs soon
 * 
 * it seem that she had been born
 * with this enthusiasm, close to zealotry, for her professional duties
 * as I stood there dumbfounded
 * she gracefully bent her hips 
 * and picked up one of light bulbs on the floor
 * 
 * you'd get better eventually.
 * You can't die here
 * It's the easiest way to make someone realize that they're really in the afterlife
 * 
 * it would hurt as much as actually dying
 * 
 * Since you believe me already, 
 * don't worry I won't hurt you
 * 
 * What did you want me to do
 * 
 * the organization enlisted many famous people in raising money to help homeless children
 * 
 * the 
 */