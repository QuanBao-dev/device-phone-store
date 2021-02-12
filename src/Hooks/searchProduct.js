import { useEffect } from "react";
import { useHistory } from "react-router";
import { fromEvent } from "rxjs";
import { filter } from "rxjs/operators";

export const useSearchProduct = (
  searchRef,
  { maxPriceAdjust, minPriceAdjust, categoryQuery }
) => {
  const history = useHistory();
  useEffect(() => {
    const subscription = fromEvent(searchRef.current, "keydown")
      .pipe(filter((e) => e.keyCode === 13))
      .subscribe((e) => {
        history.push(
          `/shop/page/1?${
            categoryQuery !== ""
              ? "category=" + categoryQuery.replace(/ /g, "-")
              : ""
          }${categoryQuery !== "" ? "&" : ""}${
            e.target.value.trim() !== ""
              ? "key=" + e.target.value.trim() + "&"
              : ""
          }max_price=${maxPriceAdjust}&min_price=${minPriceAdjust}`
        );
      });
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryQuery, maxPriceAdjust, minPriceAdjust]);
};
