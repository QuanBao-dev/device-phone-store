import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { fromEvent } from "rxjs";
import { filter } from "rxjs/operators";

let posX1 = 0;
let posX2 = 0;
let delta = 0;
export const useRollerScroll = (
  priceAdjustRef,
  rollerRef,
  anotherRollerRef,
  offsetLeft,
  setOffsetLeft,
  limitOffsetLeft,
  limitOffsetRight,
  setPrice,
  setTempPrice,
  maxPrice,
  category
) => {
  const isMouseDown = useRef(false);
  const history = useHistory();
  useEffect(() => {
    const subscription = fromEvent(window, "mousemove")
      .pipe(filter(() => isMouseDown.current))
      .subscribe((e) => {
        isMouseDown.current = true;
        posX2 = posX1 - e.clientX;
        if (posX1 !== 0) delta -= posX2 * 0.4;
        posX1 = e.clientX;
        if (limitOffsetLeft && offsetLeft + delta < limitOffsetLeft)
          rollerRef.current.style.left = limitOffsetLeft + "%";
        else if (limitOffsetRight && offsetLeft + delta > limitOffsetRight)
          rollerRef.current.style.left = limitOffsetRight + "%";
        else if (offsetLeft + delta < 0) rollerRef.current.style.left = 0;
        else if (offsetLeft + delta > 100)
          rollerRef.current.style.left = 100 + "%";
        else if (offsetLeft + delta >= 0 && offsetLeft + delta <= 100)
          rollerRef.current.style.left = offsetLeft + delta + "%";
        if (limitOffsetLeft !== null) {
          const rollLeftOffset = parseFloat(
            anotherRollerRef.current.style.left
          );
          const rollRightOffset = parseFloat(rollerRef.current.style.left);
          priceAdjustRef.current.style.left = rollLeftOffset + "%";
          priceAdjustRef.current.style.width =
            rollRightOffset - rollLeftOffset + "%";
          setTempPrice(parseInt((maxPrice * rollRightOffset) / 100));
        }
        if (limitOffsetRight !== null) {
          const rollLeftOffset = parseFloat(rollerRef.current.style.left);
          const rollRightOffset = parseFloat(
            anotherRollerRef.current.style.left
          );
          priceAdjustRef.current.style.left = rollLeftOffset + "%";
          priceAdjustRef.current.style.width =
            rollRightOffset - rollLeftOffset + "%";
          setTempPrice(parseInt((maxPrice * rollLeftOffset) / 100));
        }
      });
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limitOffsetLeft, limitOffsetRight, offsetLeft]);
  useEffect(() => {
    const subscription = fromEvent(window, "mouseup")
      .pipe(filter(() => isMouseDown.current))
      .subscribe(() => {
        isMouseDown.current = false;
        setOffsetLeft(parseFloat(rollerRef.current.style.left));
        let rollLeftOffset;
        let rollRightOffset;
        if (limitOffsetLeft !== null) {
          rollLeftOffset = parseFloat(anotherRollerRef.current.style.left);
          rollRightOffset = parseFloat(rollerRef.current.style.left);
          setPrice(parseInt((maxPrice * rollRightOffset) / 100));
        }
        if (limitOffsetRight !== null) {
          rollLeftOffset = parseFloat(rollerRef.current.style.left);
          rollRightOffset = parseFloat(anotherRollerRef.current.style.left);
          setPrice(parseInt((maxPrice * rollLeftOffset) / 100));
        }
        const startPrice = parseInt((rollLeftOffset * maxPrice) / 100);
        const endPrice = parseInt((rollRightOffset * maxPrice) / 100);
        if (category === "") {
          history.push(
            `/shop/page/1?max_price=${endPrice}&min_price=${startPrice}`
          );
        } else {
          history.push(
            `/shop/page/1?category=${category}&max_price=${endPrice}&min_price=${startPrice}`
          );
        }
        posX1 = 0;
        posX2 = 0;
        delta = 0;
      });
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
  useEffect(() => {
    const subscription = fromEvent(rollerRef.current, "mousedown").subscribe(
      (e) => {
        e.preventDefault();
        isMouseDown.current = true;
      }
    );
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
