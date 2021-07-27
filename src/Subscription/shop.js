import { fromEvent } from "rxjs";
import { filter } from "rxjs/operators";
export const productFilterBySelectSubscription = (
  selectRef,
  maxPriceAdjust,
  history,
  minPriceAdjust,
  keySearch
) => {
  return fromEvent(selectRef.current, "change").subscribe((e) => {
    if (e.target.value.trim() === "") {
      if (!maxPriceAdjust && !minPriceAdjust) {
        history.push("/shop/page/1");
      }
      if (maxPriceAdjust || minPriceAdjust) {
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
      }
      if (maxPriceAdjust || minPriceAdjust) {
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
};
export const searchProductShopSubscription = (
  stream,
  searchRef,
  history,
  categoryQuery,
  maxPriceAdjust,
  minPriceAdjust
) => {
  return fromEvent(searchRef.current, "keydown")
    .pipe(filter((e) => e.keyCode === 13))
    .subscribe((e) => {
      if (stream.currentState().keySearch !== e.target.value.trim())
        history.push(
          `/shop/page/1?${
            e.target.value.trim() !== ""
              ? `key=${e.target.value.trim().replace(/ /g, "-")}&`
              : ""
          }${
            categoryQuery !== ""
              ? "category=" + categoryQuery.replace(/ /g, "-") + "&"
              : ""
          }max_price=${maxPriceAdjust}&min_price=${minPriceAdjust}`
        );
    });
};
