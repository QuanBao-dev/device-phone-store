import "./PriceAdjust.css";

import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { fromEvent, iif, timer } from "rxjs";
import {
  filter,
  mergeMapTo,
  switchMapTo,
  take,
  takeWhile,
} from "rxjs/operators";

import { parseCurrency } from "../../Epics/Share";
import { filterByQuery, filterShopProduct, shopStream } from "../../Epics/Shop";
import { useRollerScroll } from "../../Hooks/rollerAction";

const PriceAdjust = ({
  maxPriceAdjust,
  minPriceAdjust,
  maxPrice,
  category,
  stream = shopStream,
  keySearch,
}) => {
  const [offsetRollLeft, setOffsetRollLeft] = useState(
    (minPriceAdjust / maxPrice) * 100
  );
  const [offsetRollRight, setOffsetRollRight] = useState(
    (maxPriceAdjust / maxPrice) * 100
  );
  // console.log(minPriceAdjust, maxPriceAdjust);
  const [startTempPrice, setStartTempPrice] = useState(minPriceAdjust);
  const [endTempPrice, setEndTempPrice] = useState(maxPriceAdjust);
  const [rollerMoveMode, setRollerMoveMode] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const rollerLeftRef = useRef();
  const rollerRightRef = useRef();
  const priceAdjustContainerRef = useRef();
  const priceAdjustRef = useRef();
  const history = useHistory();
  useRollerScroll(
    priceAdjustContainerRef,
    priceAdjustRef,
    rollerLeftRef,
    rollerRightRef,
    offsetRollLeft,
    setOffsetRollLeft,
    null,
    offsetRollRight,
    setStartTempPrice,
    maxPrice,
    category,
    keySearch,
    stream,
    setRollerMoveMode,
    rollerMoveMode,
    setIsMouseDown
  );
  useRollerScroll(
    priceAdjustContainerRef,
    priceAdjustRef,
    rollerRightRef,
    rollerLeftRef,
    offsetRollRight,
    setOffsetRollRight,
    offsetRollLeft,
    null,
    setEndTempPrice,
    maxPrice,
    category,
    keySearch,
    stream,
    setRollerMoveMode,
    rollerMoveMode,
    setIsMouseDown
  );

  useEffect(() => {
    const subscription = fromEvent(
      priceAdjustContainerRef.current,
      "mouseleave"
    )
      .pipe(switchMapTo(fromEvent(window, "mousedown").pipe(take(1))))
      .subscribe((e) => {
        rollerLeftRef.current.style.transition = "0.3s";
        rollerRightRef.current.style.transition = "0.3s";
        if (!priceAdjustContainerRef.current.contains(e.target)) {
          setRollerMoveMode(null);
        }
      });
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const subscription = timer(0)
      .pipe(
        mergeMapTo(
          iif(
            () => rollerMoveMode === "left",
            fromEvent(window, "keydown").pipe(
              takeWhile(() => rollerMoveMode === "left")
            ),
            timer(0).pipe(
              filter(() => rollerMoveMode !== null),
              mergeMapTo(
                fromEvent(window, "keydown").pipe(
                  takeWhile(() => rollerMoveMode === "right")
                )
              )
            )
          )
        )
      )
      .subscribe((e) => {
        if (rollerMoveMode === "left") {
          priceAdjustRef.current.style.transition = "0s";
          rollerLeftRef.current.style.transition = "0s";
          changePriceByKey(
            e,
            startTempPrice,
            setStartTempPrice,
            setOffsetRollLeft,
            maxPrice,
            endTempPrice,
            rollerMoveMode
          );
        }
        if (rollerMoveMode === "right") {
          priceAdjustRef.current.style.transition = "0s";
          rollerRightRef.current.style.transition = "0s";
          changePriceByKey(
            e,
            endTempPrice,
            setEndTempPrice,
            setOffsetRollRight,
            maxPrice,
            startTempPrice,
            rollerMoveMode
          );
        }
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [rollerMoveMode, startTempPrice, endTempPrice, maxPrice]);

  useEffect(() => {
    const subscription = fromEvent(priceAdjustContainerRef.current, "click")
      .pipe(filter(() => !isMouseDown))
      .subscribe((e) => {
        const length =
          e.pageX - priceAdjustContainerRef.current.getBoundingClientRect().x;
        const maxLength = priceAdjustContainerRef.current.offsetWidth;
        if (rollerMoveMode === null || rollerMoveMode === "left") {
          if (rollerMoveMode === null) setRollerMoveMode("left");
          const startPrice = parseInt(maxPrice * (length / maxLength));
          if (startPrice < endTempPrice - (maxPrice * 5) / 100) {
            priceAdjustRef.current.style.transition = "0.3s";
            rollerLeftRef.current.style.transition = "0.3s";
            setOffsetRollLeft((length / maxLength) * 100);
            setStartTempPrice(startPrice);
          }
          if (startPrice > endTempPrice) {
            priceAdjustRef.current.style.transition = "0.3s";
            rollerLeftRef.current.style.transition = "0.3s";
            setOffsetRollRight((length / maxLength) * 100);
            setEndTempPrice(startPrice);
            setRollerMoveMode("right");
          }
        }
        if (rollerMoveMode === "right") {
          const endPrice = parseInt(maxPrice * (length / maxLength));
          if (startTempPrice + (maxPrice * 5) / 100 < endPrice) {
            priceAdjustRef.current.style.transition = "0.3s";
            rollerLeftRef.current.style.transition = "0.3s";
            setOffsetRollRight((length / maxLength) * 100);
            setEndTempPrice(endPrice);
          }
          if (startTempPrice > endPrice) {
            priceAdjustRef.current.style.transition = "0.3s";
            rollerLeftRef.current.style.transition = "0.3s";
            setOffsetRollLeft((length / maxLength) * 100);
            setStartTempPrice(endPrice);
            setRollerMoveMode("left");
          }
        }
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [startTempPrice, endTempPrice, rollerMoveMode, maxPrice, isMouseDown]);

  useEffect(() => {
    const rollLeftOffset = parseFloat(rollerLeftRef.current.style.left);
    const rollRightOffset = parseFloat(rollerRightRef.current.style.left);
    priceAdjustRef.current.style.left = rollLeftOffset + "%";
    priceAdjustRef.current.style.width = rollRightOffset - rollLeftOffset + "%";
  }, [
    startTempPrice,
    endTempPrice,
    stream,
    category,
    keySearch,
    offsetRollLeft,
    offsetRollRight,
  ]);
  useEffect(() => {
    setOffsetRollLeft((minPriceAdjust / maxPrice) * 100);
    setOffsetRollRight((maxPriceAdjust / maxPrice) * 100);
    stream.updateDataQuick({
      maxPriceAdjust,
      minPriceAdjust,
    });
  }, [category, maxPrice, maxPriceAdjust, minPriceAdjust, stream]);
  useEffect(() => {
    setEndTempPrice(maxPriceAdjust);
    setStartTempPrice(minPriceAdjust);
    filterShopProduct(
      stream,
      category,
      keySearch,
      minPriceAdjust,
      maxPriceAdjust
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxPriceAdjust, minPriceAdjust]);
  return (
    <div style={{ minHeight: "50px", width: "90%" }}>
      <div className="price-adjust-container" ref={priceAdjustContainerRef}>
        <div className="price-adjust" ref={priceAdjustRef}></div>
        <span
          ref={rollerLeftRef}
          style={{
            left: offsetRollLeft + "%",
            boxShadow: rollerMoveMode === "left" ? "0 0 3px 1px black" : null,
            transition: "0.3s",
          }}
        ></span>
        <span
          ref={rollerRightRef}
          style={{
            left: offsetRollRight + "%",
            boxShadow: rollerMoveMode === "right" ? "0 0 3px 1px black" : null,
            transition: "0.3s",
          }}
        ></span>
      </div>
      <div className="container-price-display">
        <p>
          Price: ${parseCurrency(startTempPrice.toString())} — $
          {parseCurrency(endTempPrice.toString())}
        </p>
        <button
          className="button-filter-product"
          onClick={() => {
            filterByQuery(
              stream,
              category,
              keySearch,
              startTempPrice,
              endTempPrice,
              history
            );
            window.scroll({ top: 0 });
          }}
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default PriceAdjust;
function changePriceByKey(
  e,
  startTempPrice,
  setStartTempPrice,
  setOffsetRollLeft,
  maxPrice,
  limitPrice,
  rollerMoveMode
) {
  if (e.keyCode === 37) {
    const temp = startTempPrice - 10 < 0 ? 0 : startTempPrice - 10;
    if (
      (rollerMoveMode === "left" && temp > limitPrice - (maxPrice * 5) / 100) ||
      (rollerMoveMode === "right" && temp < limitPrice + (maxPrice * 5) / 100)
    ) {
      return;
    }
    setStartTempPrice(temp);
    setOffsetRollLeft((temp / maxPrice) * 100);
  }
  if (e.keyCode === 39) {
    const temp =
      startTempPrice + 10 > maxPrice ? maxPrice : startTempPrice + 10;
    if (
      (rollerMoveMode === "left" && temp > limitPrice - (maxPrice * 5) / 100) ||
      (rollerMoveMode === "right" && temp < limitPrice + (maxPrice * 5) / 100)
    ) {
      return;
    }
    setStartTempPrice(temp);
    setOffsetRollLeft((temp / maxPrice) * 100);
  }
}
