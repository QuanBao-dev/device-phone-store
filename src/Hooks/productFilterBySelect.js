import { useEffect } from "react";
import { fromEvent } from "rxjs";

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
      subscription = fromEvent(selectRef.current, "change").subscribe((e) => {
        if (e.target.value.trim() === "") {
          if (!maxPriceAdjust && !minPriceAdjust) {
            history.push("/shop/page/1");
          } else {
            history.push(
              `/shop/page/1?${
                keySearch !== "" ? `key=${keySearch}&` : ""
              }max_price=${maxPriceAdjust}&min_price=${minPriceAdjust}`
            );
          }
        } else {
          if (!maxPriceAdjust && !minPriceAdjust) {
            history.push(
              `/shop/page/1?${
                keySearch !== "" ? `key=${keySearch}&` : ""
              }category=${e.target.value.trim().replace(/ /g, "-")}`
            );
          } else {
            history.push(
              `/shop/page/1?${
                keySearch !== "" ? `key=${keySearch}&` : ""
              }category=${e.target.value
                .trim()
                .replace(
                  / /g,
                  "-"
                )}&max_price=${maxPriceAdjust}&min_price=${minPriceAdjust}`
            );
          }
        }
      });
    }
    return () => {
      subscription && subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxPriceAdjust, minPriceAdjust, keySearch]);
};
