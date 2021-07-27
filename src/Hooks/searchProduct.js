import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { searchProductShopSubscription } from '../Subscription/shop';

export const useSearchProduct = (
  searchRef,
  maxPriceAdjust,
  minPriceAdjust,
  categoryQuery,
  stream
) => {
  const history = useHistory();
  useEffect(() => {
    const subscription = searchProductShopSubscription(
      stream,
      searchRef,
      history,
      categoryQuery,
      maxPriceAdjust,
      minPriceAdjust
    );
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryQuery, maxPriceAdjust, minPriceAdjust]);
};
