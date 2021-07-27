import { fromEvent } from "rxjs";
import { debounceTime, filter, takeWhile, tap } from "rxjs/operators";
import {
  autoScrollSellerProductList$,
  resizeHandle$,
} from "../Epics/PopularNews";
import { userStream } from "../Epics/User";

export const mouseUpSub = (
  isWrap,
  cardProductListRef,
  productListStream,
  layerNoWrapRef
) => {
  return fromEvent(window, "mouseup").subscribe(() => {
    if (!isWrap && productListStream) {
      cardProductListRef.current.style.transition = "0.3s";
      const newOffsetLeft =
        productListStream.currentState().offsetLeft +
        productListStream.currentState().delta *
          productListStream.currentState().speed;
      let newPage = Math.round(
        newOffsetLeft /
          (productListStream.currentState().widthItem +
            productListStream.currentState().margin)
      );
      if (newPage < 0) newPage = 0;
      if (newPage > productListStream.currentState().maxPage)
        newPage = productListStream.currentState().maxPage;
      if (productListStream.currentState().currentPage === newPage)
        cardProductListRef.current.style.transform = `translateX(-${
          productListStream.currentState().offsetLeft
        }px)`;
      if (
        productListStream.currentState().currentPage !== newPage &&
        productListStream.currentState().offsetLeft !== newOffsetLeft
      )
        productListStream.updateData({
          currentPage: newPage,
          offsetLeft: newOffsetLeft,
        });
      productListStream.updateDataQuick({
        posX1: 0,
        posX2: 0,
        delta: 0,
      });
      if (productListStream.currentState().mode !== "interval")
        productListStream.updateData({ mode: "interval" });
      setTimeout(() => {
        layerNoWrapRef &&
          layerNoWrapRef.current &&
          (layerNoWrapRef.current.style.zIndex = -1);
        if (cardProductListRef.current)
          cardProductListRef.current.style.transition =
            productListStream.currentState().transition;
      }, 300);
    }
  });
};

export const mouseDownSub = (isWrap, cardProductListRef, productListStream) => {
  return fromEvent(cardProductListRef.current, "mousedown").subscribe((e) => {
    if (!isWrap && productListStream) {
      e.preventDefault();
      productListStream.updateDataQuick({
        posX1: 0,
        posX2: 0,
        delta: 0,
      });
      productListStream.updateData({ mode: "mousedown" });
    }
  });
};

export const mouseMoveSub = (
  isWrap,
  cardProductListRef,
  productListStream,
  layerNoWrapRef
) => {
  return fromEvent(window, "mousemove").subscribe((e) => {
    if (
      productListStream &&
      productListStream.currentState().mode === "mousedown" &&
      !isWrap
    ) {
      productListStream.updateDataQuick({
        posX2: productListStream.currentState().posX1 - e.clientX,
      });
      if (productListStream.currentState().posX1 !== 0) {
        productListStream.updateDataQuick({
          delta:
            productListStream.currentState().delta +
            productListStream.currentState().posX2,
        });
      }
      productListStream.updateDataQuick({
        posX1: e.clientX,
      });
      if (productListStream.currentState().delta !== 0) {
        const newOffsetLeft =
          productListStream.currentState().offsetLeft +
          productListStream.currentState().delta *
            productListStream.currentState().speed;
        cardProductListRef.current.style.transition = "0s";
        cardProductListRef.current.style.transform = `translateX(-${newOffsetLeft}px)`;
        if (layerNoWrapRef && layerNoWrapRef.current)
          layerNoWrapRef.current.style.zIndex = 10;
      }
    }
  });
};

export const touchEndSub = (isWrap, cardProductListRef, productListStream) => {
  return fromEvent(window, "touchend").subscribe(() => {
    if (!isWrap && productListStream) {
      cardProductListRef.current.style.transition = "0.3s";
      const newOffsetLeft =
        productListStream.currentState().offsetLeft +
        productListStream.currentState().delta *
          productListStream.currentState().speed;
      const delta = productListStream.currentState().delta;
      if (delta === 0) return;
      let newPage;
      if (delta > 0) {
        newPage = Math.round(
          newOffsetLeft /
            (productListStream.currentState().widthItem +
              productListStream.currentState().margin) +
            0.3
        );
      }
      if (delta < 0) {
        newPage = Math.round(
          newOffsetLeft /
            (productListStream.currentState().widthItem +
              productListStream.currentState().margin) -
            0.3
        );
      }
      if (newPage < 0) newPage = 0;
      else {
        if (newPage > productListStream.currentState().maxPage)
          newPage = productListStream.currentState().maxPage;
      }
      if (productListStream.currentState().currentPage === newPage)
        cardProductListRef.current.style.transform = `translateX(-${
          productListStream.currentState().offsetLeft
        }px)`;
      productListStream.updateData({
        currentPage: newPage,
        offsetLeft: newOffsetLeft,
      });
      productListStream.updateDataQuick({
        posX1: 0,
        posX2: 0,
        delta: 0,
      });
      productListStream.updateData({ mode: "interval" });
      setTimeout(() => {
        if (cardProductListRef.current)
          cardProductListRef.current.style.transition =
            productListStream.currentState().transition;
      }, 300);
    }
  });
};

export const touchStartSub = (
  isWrap,
  cardProductListRef,
  productListStream
) => {
  return fromEvent(cardProductListRef.current, "touchstart").subscribe((e) => {
    if (!isWrap && productListStream) {
      productListStream.updateDataQuick({
        posX1: 0,
        posX2: 0,
        delta: 0,
      });
      productListStream.updateData({
        mode: "touchstart",
      });
    }
  });
};

export const touchMoveSub = (isWrap, cardProductListRef, productListStream) => {
  return fromEvent(cardProductListRef.current, "touchmove")
    .pipe(
      filter(
        () =>
          productListStream &&
          productListStream.currentState().mode === "touchstart"
      )
    )
    .subscribe((e) => {
      if (!isWrap && productListStream) {
        productListStream.updateDataQuick({
          posX2: productListStream.currentState().posX1 - e.touches[0].clientX,
        });
        if (productListStream.currentState().posX1 !== 0) {
          productListStream.updateDataQuick({
            delta:
              productListStream.currentState().delta +
              productListStream.currentState().posX2,
          });
        }
        productListStream.updateDataQuick({
          posX1: e.touches[0].clientX,
        });
        const newOffsetLeft =
          productListStream.currentState().offsetLeft +
          productListStream.currentState().delta *
            productListStream.currentState().speed;
        cardProductListRef.current.style.transition = "0s";
        cardProductListRef.current.style.transform = `translateX(-${newOffsetLeft}px)`;
      }
    });
};

export const scrollAllowSlidingHandle = (isWrap, productListStream) => {
  return fromEvent(window, "scroll")
    .pipe(
      takeWhile(() => userStream.currentState().isMobile && !isWrap),
      tap(() => {
        productListStream.updateDataQuick({ mode: "not allow sliding" });
      }),
      debounceTime(1000)
    )
    .subscribe(() => {
      productListStream.updateDataQuick({ mode: "interval" });
    });
};

export const autoScrollSellerProductListSubscription = (stream) => {
  return autoScrollSellerProductList$().subscribe(() => {
    if (stream.currentState().currentPage < stream.currentState().maxPage) {
      stream.updateData({
        currentPage: stream.currentState().currentPage + 1,
      });
    } else {
      stream.updateData({
        currentPage: 0,
      });
    }
  });
};

export const resizeHandleSubscription = (
  stream,
  productListContainerRef,
  dataList
) => {
  return resizeHandle$().subscribe(() => {
    stream.updateData({
      widthItem:
        (productListContainerRef.current.offsetWidth -
          stream.currentState().margin *
            (stream.currentState().numberOfProductPerPage - 1)) /
          stream.currentState().numberOfProductPerPage -
        5,
      maxPage: dataList.length - stream.currentState().numberOfProductPerPage,
    });
  });
};
