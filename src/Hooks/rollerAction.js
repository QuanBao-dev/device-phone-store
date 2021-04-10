import { useEffect, useRef } from "react";
import { fromEvent } from "rxjs";
import { filter } from "rxjs/operators";

export const useRollerScroll = (
  priceAdjustContainerRef,
  priceAdjustRef,
  rollerRef,
  anotherRollerRef,
  offsetLeft,
  setOffsetLeft,
  limitOffsetLeft,
  limitOffsetRight,
  setTempPrice,
  maxPrice,
  category,
  keySearch,
  stream,
  setRollerMove,
  rollerMove,
  setIsMouseDown
) => {
  const isMouseDown = useRef(false);
  useEffect(() => {
    const subscription = fromEvent(window, "mousemove")
      .pipe(filter(() => isMouseDown.current))
      .subscribe((e) => {
        setIsMouseDown(true);
        handleDragRoller(
          rollerRef,
          priceAdjustRef,
          isMouseDown,
          e,
          priceAdjustContainerRef,
          limitOffsetLeft,
          limitOffsetRight,
          anotherRollerRef,
          setTempPrice,
          maxPrice
        );
      });
    const subscriptionMobile = fromEvent(window, "touchmove")
      .pipe(filter(() => isMouseDown.current))
      .subscribe((e) => {
        handleDragRoller(
          rollerRef,
          priceAdjustRef,
          isMouseDown,
          e,
          priceAdjustContainerRef,
          limitOffsetLeft,
          limitOffsetRight,
          anotherRollerRef,
          setTempPrice,
          maxPrice,
          true
        );
      });
    return () => {
      subscription.unsubscribe();
      subscriptionMobile.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limitOffsetLeft, limitOffsetRight, offsetLeft]);
  useEffect(() => {
    const subscription = fromEvent(window, "mouseup")
      .pipe(filter(() => isMouseDown.current))
      .subscribe(() => {
        setTimeout(() => {
          setIsMouseDown(false);
        }, 30);
        handleDropRoller(isMouseDown, setOffsetLeft, rollerRef, priceAdjustRef);
      });
    const subscriptionMobile = fromEvent(window, "touchend")
      .pipe(filter(() => isMouseDown.current))
      .subscribe(() => {
        handleDropRoller(isMouseDown, setOffsetLeft, rollerRef, priceAdjustRef);
      });
    return () => {
      subscription.unsubscribe();
      subscriptionMobile.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, keySearch, limitOffsetLeft, limitOffsetRight, stream]);
  useEffect(() => {
    const subscription = fromEvent(rollerRef.current, "mousedown").subscribe(
      (e) => {
        handleGraspRoller(
          e,
          isMouseDown,
          rollerRef,
          priceAdjustRef,
          rollerMove,
          limitOffsetLeft,
          setRollerMove,
          limitOffsetRight
        );
      }
    );
    const subscriptionMobile = fromEvent(
      rollerRef.current,
      "touchstart"
    ).subscribe((e) => {
      handleGraspRoller(
        e,
        isMouseDown,
        rollerRef,
        priceAdjustRef,
        rollerMove,
        limitOffsetLeft,
        setRollerMove,
        limitOffsetRight
      );
    });
    return () => {
      subscription.unsubscribe();
      subscriptionMobile.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limitOffsetRight, rollerMove]);
};
function handleDragRoller(
  rollerRef,
  priceAdjustRef,
  isMouseDown,
  e,
  priceAdjustContainerRef,
  limitOffsetLeft,
  limitOffsetRight,
  anotherRollerRef,
  setTempPrice,
  maxPrice,
  isMobile
) {
  rollerRef.current.style.transition = "0s";
  priceAdjustRef.current.style.transition = "0s";
  isMouseDown.current = true;

  let newOffsetRoll;
  if (!isMobile)
    newOffsetRoll =
      ((e.pageX - priceAdjustContainerRef.current.getBoundingClientRect().x) /
        priceAdjustContainerRef.current.offsetWidth) *
      100;
  else
    newOffsetRoll =
      ((e.touches[0].pageX -
        priceAdjustContainerRef.current.getBoundingClientRect().x) /
        priceAdjustContainerRef.current.offsetWidth) *
      100;
  if (
    (limitOffsetLeft || limitOffsetLeft === 0) &&
    newOffsetRoll < limitOffsetLeft + 5
  )
    rollerRef.current.style.left = limitOffsetLeft + 5 + "%";
  else if (limitOffsetRight && newOffsetRoll > limitOffsetRight - 5)
    rollerRef.current.style.left = limitOffsetRight - 5 + "%";
  else if (newOffsetRoll < 0) rollerRef.current.style.left = 0;
  else if (newOffsetRoll > 100) rollerRef.current.style.left = 100 + "%";
  else if (newOffsetRoll >= 0 && newOffsetRoll <= 100)
    rollerRef.current.style.left = newOffsetRoll + "%";
  if (limitOffsetLeft !== null) {
    const rollLeftOffset = parseFloat(anotherRollerRef.current.style.left);
    const rollRightOffset = parseFloat(rollerRef.current.style.left);
    priceAdjustRef.current.style.left = rollLeftOffset + "%";
    priceAdjustRef.current.style.width = rollRightOffset - rollLeftOffset + "%";
    setTempPrice(parseInt((maxPrice * rollRightOffset) / 100));
  }
  if (limitOffsetRight !== null) {
    const rollLeftOffset = parseFloat(rollerRef.current.style.left);
    const rollRightOffset = parseFloat(anotherRollerRef.current.style.left);
    priceAdjustRef.current.style.left = rollLeftOffset + "%";
    priceAdjustRef.current.style.width = rollRightOffset - rollLeftOffset + "%";
    setTempPrice(parseInt((maxPrice * rollLeftOffset) / 100));
  }
}

function handleDropRoller(
  isMouseDown,
  setOffsetLeft,
  rollerRef,
  priceAdjustRef
) {
  isMouseDown.current = false;
  setOffsetLeft(parseFloat(rollerRef.current.style.left));
  rollerRef.current.style.transition = "0.3s";
  priceAdjustRef.current.style.transition = "0.3s";
}

function handleGraspRoller(
  e,
  isMouseDown,
  rollerRef,
  priceAdjustRef,
  rollerMove,
  limitOffsetLeft,
  setRollerMove,
  limitOffsetRight
) {
  e.preventDefault();
  isMouseDown.current = true;
  rollerRef.current.style.transition = "0s";
  priceAdjustRef.current.style.transition = "0s";
  if (rollerMove !== "right" && limitOffsetLeft !== null)
    setRollerMove("right");
  else if (rollerMove !== "left" && limitOffsetRight !== null)
    setRollerMove("left");
}
