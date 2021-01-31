import './PriceAdjust.css';

import React, { useEffect, useRef, useState } from 'react';

import { parseCurrency } from '../../Epics/Share';
import { shopStream } from '../../Epics/Shop';
import { useRollerScroll } from '../../Hooks/rollerAction';

const PriceAdjust = ({
  maxPriceAdjust,
  minPriceAdjust,
  maxPrice,
  category,
  stream = shopStream,
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
    category
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
    category
  );
  const { dataTemp } = stream.currentState();
  useEffect(() => {
    const rollLeftOffset = parseFloat(rollerLeftRef.current.style.left);
    const rollRightOffset = parseFloat(rollerRightRef.current.style.left);
    priceAdjustRef.current.style.left = rollLeftOffset + "%";
    priceAdjustRef.current.style.width = rollRightOffset - rollLeftOffset + "%";
    stream.updateData({
      dataList: dataTemp.filter(({ newPrice, originalPrice }) => {
        const priceDisplay = parseFloat(
          (newPrice ? newPrice : originalPrice).replace("$", "")
        );
        return startPrice <= priceDisplay && priceDisplay <= endPrice;
      }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startPrice, endPrice, dataTemp.length]);
  useEffect(() => {
    setStartPrice(minPriceAdjust);
    setEndPrice(maxPriceAdjust);
  }, [minPriceAdjust, maxPriceAdjust]);
  useEffect(() => {
    setStartPrice(minPriceAdjust);
    setEndPrice(maxPriceAdjust);
    setOffsetRollLeft((minPriceAdjust / maxPrice) * 100);
    setOffsetRollRight((maxPriceAdjust / maxPrice) * 100);
  }, [category, maxPrice, maxPriceAdjust, minPriceAdjust]);
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
