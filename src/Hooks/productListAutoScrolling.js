import { useEffect } from 'react';

import { autoScrollSellerProductListSubscription, resizeHandleSubscription } from '../Subscription/productListAutoScrolling';

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
  }, [stream, dataList.length]);
};

export const useProductResizeHandle = (
  stream,
  productListContainerRef,
  dataList
) => {
  useEffect(() => {
    const subscription = resizeHandleSubscription(
      stream,
      productListContainerRef,
      dataList
    );
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stream, dataList.length]);
};

export const useModeChangeHandle = (stream, state) => {
  useEffect(() => {
    let subscription;
    if (state.mode === "interval") {
      subscription = autoScrollSellerProductListSubscription(stream);
    }
    return () => {
      subscription && subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stream, state.mode, state.currentPage]);
};
