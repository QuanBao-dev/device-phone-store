import { of, timer } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, map, pluck, switchMapTo } from "rxjs/operators";
import productStore from "../Store/Product";

export const productStream = productStore;
export const fetchProduct$ = (url) => {
  return timer(0).pipe(
    switchMapTo(
      ajax(url).pipe(
        pluck("response", "message"),
        catchError((error) =>
          of(error).pipe(
            pluck("response", "error"),
            map((error) => ({ error }))
          )
        )
      )
    )
  );
};

export const putProduct$ = (url, body) => {
  return ajax({ url, method: "PUT", body }).pipe(
    pluck("response", "message"),
    catchError((error) =>
      of(error).pipe(
        pluck("response", "error"),
        map((error) => ({ error }))
      )
    )
  );
};

export const deleteProduct$ = (url) => {
  return ajax({ url, method: "DELETE" }).pipe(
    pluck("response", "message"),
    catchError((error) =>
      of(error).pipe(
        pluck("response", "error"),
        map((error) => ({ error }))
      )
    )
  );
};
