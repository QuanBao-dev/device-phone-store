import shopStore from "../Store/Shop";
import { ajax } from "rxjs/ajax";
import { pluck, catchError, map, switchMapTo, takeWhile } from "rxjs/operators";
import { of, timer } from "rxjs";

export const shopStream = shopStore;

export function filterByQuery(
  stream = shopStream,
  category,
  keySearch,
  minPrice,
  maxPrice,
  history
) {
  filterShopProduct(stream, category, keySearch, minPrice, maxPrice);
  navigateQuery(minPrice, stream, maxPrice, category, history, keySearch);
}

export const filterShopProduct = (
  stream,
  category,
  keySearch,
  minPrice,
  maxPrice
) => {
  let dataOriginalList = [...stream.currentState().dataOriginalList];
  if (category.trim() !== "") {
    dataOriginalList = dataOriginalList.filter(({ tags }) =>
      tags.includes(category.trim())
    );
  }
  if (keySearch.trim() !== "") {
    dataOriginalList = dataOriginalList.filter(({ title }) => {
      const keyReg = new RegExp(keySearch.trim(), "i");
      return title.match(keyReg);
    });
  }
  if (minPrice !== undefined && maxPrice !== undefined) {
    dataOriginalList = dataOriginalList.filter(
      ({ newPrice, originalPrice }) => {
        const priceDisplay = parseFloat(
          (newPrice ? newPrice : originalPrice).replace("$", "")
        );
        return minPrice <= priceDisplay && priceDisplay <= maxPrice;
      }
    );
  }
  stream.updateData({
    dataList: dataOriginalList,
  });
};

export function navigateQuery(
  startPrice,
  stream,
  endPrice,
  category,
  history,
  keySearch
) {
  if (
    (startPrice !== stream.currentState().minPriceAdjust ||
      endPrice !== stream.currentState().maxPriceAdjust) &&
    startPrice < endPrice
  )
    if (category === "") {
      history.push(
        `/shop/page/1?${
          keySearch !== "" ? `key=${keySearch}&` : ""
        }max_price=${endPrice}&min_price=${startPrice}`
      );
    } else {
      history.push(
        `/shop/page/1?${
          keySearch !== "" ? `key=${keySearch}&` : ""
        }category=${category.replace(
          / /g,
          "-"
        )}&max_price=${endPrice}&min_price=${startPrice}`
      );
    }
}

export const fetchShopProducts$ = () => {
  return timer(0).pipe(
    takeWhile(() => shopStream.currentState().dataOriginalList.length === 0),
    switchMapTo(
      ajax({ url: "/api/product" }).pipe(
        pluck("response", "message"),
        catchError((error) =>
          of(error).pipe(
            pluck("response", "error"),
            map(() => ({ error }))
          )
        )
      )
    )
  );
};
