import { useEffect } from 'react';

import { productFilterBySelectSubscription } from '../Subscription/shop';

export const useProductFilterBySelect = (
  selectRef,
  history,
  maxPriceAdjust,
  minPriceAdjust,
  keySearch
) => {
  useEffect(() => {
    let subscription;
    if (selectRef.current) {
      subscription = productFilterBySelectSubscription(
        selectRef,
        maxPriceAdjust,
        history,
        minPriceAdjust,
        keySearch
      );
    }
    return () => {
      subscription && subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxPriceAdjust, minPriceAdjust, keySearch]);
};
