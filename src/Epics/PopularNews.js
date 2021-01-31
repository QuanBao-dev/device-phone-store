import { fromEvent, interval } from "rxjs";
import { debounceTime, distinctUntilChanged, filter } from "rxjs/operators";
import popularNewsStore from "../Store/PopularNews";

export const popularNewsStream = popularNewsStore;

export const resizeHandle$ = () => {
  return fromEvent(window, "resize").pipe(
    distinctUntilChanged(),
    debounceTime(500)
  );
};

export const autoScrollSellerProductList$ = () => {
  return interval(4000).pipe(
    distinctUntilChanged(),
    filter(() => popularNewsStream.currentState().mode === "interval")
  );
};
