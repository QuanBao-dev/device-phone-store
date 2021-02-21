import "./PriceAdjust.css";

import React, { useEffect, useRef, useState } from "react";

import { parseCurrency } from "../../Epics/Share";
import { filterByQuery, shopStream } from "../../Epics/Shop";
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
  const [startPrice, setStartPrice] = useState(minPriceAdjust);
  const [endPrice, setEndPrice] = useState(maxPriceAdjust);
  const [startTempPrice, setStartTempPrice] = useState(minPriceAdjust);
  const [endTempPrice, setEndTempPrice] = useState(maxPriceAdjust);
  const rollerLeftRef = useRef();
  const rollerRightRef = useRef();
  const priceAdjustRef = useRef();
  useRollerScroll(
    priceAdjustRef,
    rollerLeftRef,
    rollerRightRef,
    offsetRollLeft,
    setOffsetRollLeft,
    null,
    offsetRollRight,
    setStartPrice,
    setStartTempPrice,
    maxPrice,
    category,
    keySearch,
    stream
  );
  useRollerScroll(
    priceAdjustRef,
    rollerRightRef,
    rollerLeftRef,
    offsetRollRight,
    setOffsetRollRight,
    offsetRollLeft,
    null,
    setEndPrice,
    setEndTempPrice,
    maxPrice,
    category,
    keySearch,
    stream
  );
  useEffect(() => {
    const rollLeftOffset = parseFloat(rollerLeftRef.current.style.left);
    const rollRightOffset = parseFloat(rollerRightRef.current.style.left);
    priceAdjustRef.current.style.left = rollLeftOffset + "%";
    priceAdjustRef.current.style.width = rollRightOffset - rollLeftOffset + "%";
    filterByQuery(stream, category, keySearch, minPriceAdjust, maxPriceAdjust);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startPrice, endPrice, minPriceAdjust, maxPriceAdjust]);
  useEffect(() => {
    setStartPrice(minPriceAdjust);
    setEndPrice(maxPriceAdjust);
  }, [minPriceAdjust, maxPriceAdjust]);
  useEffect(() => {
    setStartPrice(minPriceAdjust);
    setEndPrice(maxPriceAdjust);
    setOffsetRollLeft((minPriceAdjust / maxPrice) * 100);
    setOffsetRollRight((maxPriceAdjust / maxPrice) * 100);
    stream.updateDataQuick({
      maxPriceAdjust,
      minPriceAdjust,
    });
  }, [category, maxPrice, maxPriceAdjust, minPriceAdjust, stream]);
  return (
    <>
      <div className="price-adjust-container">
        <div className="price-adjust" ref={priceAdjustRef}></div>
        <span ref={rollerLeftRef} style={{ left: offsetRollLeft + "%" }}></span>
        <span
          ref={rollerRightRef}
          style={{ left: offsetRollRight + "%" }}
        ></span>
      </div>
      <p>
        Price: ${parseCurrency(startTempPrice.toString())} — $
        {parseCurrency(endTempPrice.toString())}
      </p>
    </>
  );
};

export default PriceAdjust;
