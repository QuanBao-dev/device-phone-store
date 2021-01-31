import { useEffect } from "react";
import {
  autoScrollSellerProductList$,
  resizeHandle$,
} from "../Epics/PopularNews";

export const useProductWidthHandle = (
  stream,
  productListContainerRef,
  dataList
) => {
  useEffect(() => {
    stream.updateData({
      widthItem:
        (productListContainerRef.current.offsetWidth -
          stream.currentState().margin *
            (stream.currentState().numberOfProductPerPage - 1)) /
          stream.currentState().numberOfProductPerPage -
        5,
      maxPage: dataList.length - stream.currentState().numberOfProductPerPage,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useProductResizeHandle = (
  stream,
  productListContainerRef,
  dataList
) => {
  useEffect(() => {
    const subscription = resizeHandle$().subscribe(() => {
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
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useModeChangeHandle = (stream, state) => {
  useEffect(() => {
    let subscription;
    if (state.mode === "interval") {
      subscription = autoScrollSellerProductList$().subscribe(() => {
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
    }
    return () => {
      subscription && subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.mode, state.currentPage]);
};
