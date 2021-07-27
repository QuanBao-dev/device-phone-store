import "./Shop.css";

import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import HeadLine from "../../Components/HeadLine/HeadLine";
import PaginationProducts from "../../Components/PaginationProducts/PaginationProducts";
import PriceAdjust from "../../Components/PriceAdjust/PriceAdjust";
import { cartStream, removeFromCart } from "../../Epics/Cart";
import { optionSelect, parseUrlTitle } from "../../Epics/Share";
import {
  filterByQuery,
  shopStream,
  fetchShopProducts$,
} from "../../Epics/Shop";
import { useInitStream } from "../../Hooks/InitStream";
import { useProductFilterBySelect } from "../../Hooks/productFilterBySelect";
import { useSearchProduct } from "../../Hooks/searchProduct";

const maxPrice = 1120;
const Shop = (props) => {
  const { maxPriceAdjust, minPriceAdjust, categoryQuery, keySearch } =
    extractQuery(props);
  const inputSearchRef = useRef();
  const history = useHistory();
  const [shopState, setShopState] = useState(shopStream.currentState());
  const [cartState, setCartState] = useState(cartStream.currentState());
  const selectRef = useRef();
  useInitStream(setCartState, cartStream);
  useInitStream(setShopState, shopStream);
  useEffect(() => {
    shopStream.updateData({ page: props.match.params.page });
  }, [maxPriceAdjust, minPriceAdjust, props.match.params.page]);
  useProductFilterBySelect(
    selectRef,
    history,
    maxPriceAdjust,
    minPriceAdjust,
    keySearch
  );

  useEffect(() => {
    fetchShopProducts$().subscribe((res) => {
      if (!res.error) {
        const { products } = res;
        shopStream.updateData({
          dataList: products,
          dataOriginalList: products,
          isLoading: false,
        });
        filterByQuery(
          shopStream,
          categoryQuery,
          keySearch,
          minPriceAdjust,
          maxPriceAdjust
        );    
      }
    });
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useSearchProduct(
    inputSearchRef,
    maxPriceAdjust,
    minPriceAdjust,
    categoryQuery,
    shopStream
  );

  useEffect(() => {
    selectRef.current.value = categoryQuery;
    inputSearchRef.current.value = keySearch;
    filterByQuery(
      shopStream,
      categoryQuery,
      keySearch,
      minPriceAdjust,
      maxPriceAdjust
    );
    shopStream.updateDataQuick({
      keySearch,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryQuery, keySearch, minPriceAdjust, maxPriceAdjust]);

  return (
    <div style={{ maxWidth: 1210, margin: "auto", width: "100%" }}>
      <HeadLine pathLocation={props.location.pathname} />
      <div className="container-shop-pagination">
        <aside className="first-aside-shop">
          {shopState.isLoading && (
            <i className="fas fa-spinner fa-spin fa-4x"></i>
          )}

          {shopState.dataList.length > 0 && !shopState.isLoading && (
            <PaginationProducts
              dataListProduct={shopState.dataList}
              page={
                props.match.params.page ? parseInt(props.match.params.page) : 1
              }
              maxPage={Math.ceil(shopState.dataList.length / 9)}
              query={`?${
                categoryQuery.replace(/ /g, "-") !== ""
                  ? "category=" + categoryQuery.replace(/ /g, "-")
                  : ""
              }${
                keySearch !== ""
                  ? (categoryQuery.replace(/ /g, "-") !== "" ? "&" : "") +
                    "key=" +
                    keySearch
                  : ""
              }&min_price=${minPriceAdjust}&max_price=${maxPriceAdjust}`}
            />
          )}
          {shopState.dataList.length === 0 && !shopState.isLoading && (
            <div>No products were found matching your selection.</div>
          )}
        </aside>
        <aside className="second-aside-shop">
          <div
            className="input-container"
            onClick={() => {
              inputSearchRef.current.focus();
            }}
          >
            <input
              type="text"
              placeholder="Search Products"
              ref={inputSearchRef}
              defaultValue={keySearch}
            />
            <i className="fas fa-search"></i>
          </div>
          <div>
            <div>
              <h4>Product categories</h4>
              <select
                className="select-product"
                defaultValue={categoryQuery}
                ref={selectRef}
              >
                <option value="">Select a category</option>
                {optionSelect.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h4>Filter by price</h4>
              <PriceAdjust
                maxPriceAdjust={maxPriceAdjust}
                minPriceAdjust={minPriceAdjust}
                maxPrice={maxPrice}
                category={categoryQuery}
                stream={shopStream}
                keySearch={keySearch}
              />
            </div>
            <div>
              <h4>Carts</h4>
              {cartState.dataCart.length === 0 && (
                <div>No Products in the cart</div>
              )}
              <div className="cart-list-product">
                {cartState.dataCart.length > 0 &&
                  cartState.dataCart.map(
                    ({ title, originalPrice, newPrice, imageUrl }, key) => (
                      <div className="cart-item-product" key={key}>
                        <div className="image-container">
                          <img
                            src={imageUrl}
                            alt="not_found"
                            width={"100%"}
                            height={"100%"}
                          />
                        </div>
                        <div className="container-text">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Link to={`/product/${parseUrlTitle(title)}`}>
                              <h5>{title}</h5>
                            </Link>
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => removeFromCart(title)}
                            >
                              <i className="fas fa-times"></i>
                            </span>
                          </div>
                          <div>
                            {newPrice ? newPrice : originalPrice} x{" "}
                            {cartState.cartNumberOfProduct[title]}
                          </div>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Shop;
function extractQuery(props) {
  const keySearch = props.location.search.match(/key=[a-zA-Z0-9]+/)
    ? props.location.search
        .match(/key=[a-zA-Z0-9 -]+/)[0]
        .replace("key=", "")
        .replace(/-/g, " ")
    : "";
  const maxPriceAdjust = props.location.search.match(/max_price=[0-9]+/)
    ? parseInt(
        props.location.search.match(/max_price=[0-9]+/)[0].match(/[0-9]+/)[0]
      )
    : 1120;
  const minPriceAdjust = props.location.search.match(/min_price=[0-9]+/)
    ? parseInt(
        props.location.search.match(/min_price=[0-9]+/)[0].match(/[0-9]+/)[0]
      )
    : 0;
  const categoryQuery = props.location.search.match(/category=[A-Za-z0-9 -]+/)
    ? props.location.search
        .match(/category=[A-Za-z0-9 -]+/)[0]
        .replace("category=", "")
        .replace(/-/g, " ")
    : "";
  return { maxPriceAdjust, minPriceAdjust, categoryQuery, keySearch };
}
