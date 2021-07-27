import { useEffect } from "react";
import { combineLatest, timer } from "rxjs";
import { filter, switchMapTo, startWith } from "rxjs/operators";
import { fetchProduct$ } from "../Epics/Product";
import { fetchProductSubscription } from "../Subscription/products";

export const useFetchHomeProducts = (productState, productStream) => {
  useEffect(() => {
    const subscription = combineLatest([
      timer(0)
        .pipe(
          filter(() => productState.dataSaleList.length === 0),
          switchMapTo(fetchProduct$("/api/product?isSale=true"))
        )
        .pipe(startWith({ products: [] })),
      timer(0)
        .pipe(
          filter(() => productState.dataTopList.length === 0),
          switchMapTo(fetchProduct$("/api/product?kind=top-list"))
        )
        .pipe(startWith({ products: [] })),
      timer(0)
        .pipe(
          filter(() => productState.dataFeaturedList.length === 0),
          switchMapTo(fetchProduct$("/api/product?kind=featured-list"))
        )
        .pipe(startWith({ products: [] })),
      timer(0)
        .pipe(
          filter(() => productState.dataSaleProductList.length === 0),
          switchMapTo(fetchProduct$("/api/product?kind=sale-list"))
        )
        .pipe(startWith({ products: [] })),
      timer(0)
        .pipe(
          filter(() => productState.dataRecentList.length === 0),
          switchMapTo(fetchProduct$("/api/product?kind=recent-list"))
        )
        .pipe(startWith({ products: [] })),
      timer(0)
        .pipe(
          filter(() => productState.dataBestSeller.length === 0),
          switchMapTo(fetchProduct$("/api/product?kind=best-seller"))
        )
        .pipe(startWith({ products: [] })),
    ]).subscribe(([res1, res2, res3, res4, res5, res6]) => {
      if (!res1.error) {
        if (res1.products.length !== 0)
          productStream.updateData({ dataSaleList: res1.products });
      }
      if (!res2.error) {
        if (res2.products.length !== 0)
          productStream.updateData({ dataTopList: res2.products });
      }
      if (!res3.error) {
        if (res3.products.length !== 0)
          productStream.updateData({ dataFeaturedList: res3.products });
      }
      if (!res4.error) {
        if (res4.products.length !== 0)
          productStream.updateData({ dataSaleProductList: res4.products });
      }
      if (!res5.error) {
        if (res5.products.length !== 0)
          productStream.updateData({ dataRecentList: res5.products });
      }
      if (!res6.error) {
        if (res6.products.length !== 0)
          productStream.updateData({ dataBestSeller: res6.products });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useFetchDetailProduct = (
  id,
  setProductData,
  setDataRelatedProduct,
  isRelatedProductsIncluded
) => {
  useEffect(() => {
    const subscription = fetchProductSubscription(
      id,
      setProductData,
      setDataRelatedProduct,
      isRelatedProductsIncluded
    );
    return () => {
      setProductData({});
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
};
