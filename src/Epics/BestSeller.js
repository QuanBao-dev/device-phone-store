import { fromEvent, interval } from "rxjs";
import { debounceTime, distinctUntilChanged, filter } from "rxjs/operators";

import bestSellerStore from "../Store/BestSeller";

export const bestSellerStream = bestSellerStore;
export const resizeHandle$ = () => {
  return fromEvent(window, "resize").pipe(
    distinctUntilChanged(),
    debounceTime(500)
  );
};

export const autoScrollSellerProductList$ = () => {
  return interval(4000).pipe(
    distinctUntilChanged(),
    filter(() => bestSellerStream.currentState().mode === "interval")
  );
};
