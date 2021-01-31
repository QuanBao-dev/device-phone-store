import "./Shop.css";

import React, { useEffect, useRef, useState } from "react";

import HeadLine from "../../Components/HeadLine/HeadLine";
import PaginationProducts from "../../Components/PaginationProducts/PaginationProducts";
import { useInitStream } from "../../Hooks/InitStream";
import { cartStream, removeFromCart } from "../../Epics/Cart";
import { Link, useHistory } from "react-router-dom";
import { useProductFilterBySelect } from "../../Hooks/productFilterBySelect";
import { filterByQuery, shopStream } from "../../Epics/Shop";
import PriceAdjust from "../../Components/PriceAdjust/PriceAdjust";
import { useSearchProduct } from "../../Hooks/searchProduct";
import { dataListProduct } from "../../Epics/Share";
const optionSelect = [
  "Acoustics",
  "Action Camcorders",
  "Apple",
  "Apple iMac",
  "Apple iPads",
  "Apple iPads Mini",
  "Apple LED TVs",
  "Apple Macbook",
  "Asus",
  "Cameras",
  "Cell Phones",
  "Computer Hardware",
  "Daydream View",
  "Dell Laptop",
  "Dell LED TVs",
  "Digital Camcorders",
  "Ear Headphones",
  "HTC",
  "IPhone",
  "Keyboards",
  "Laptops",
  "LED TVs ",
  "Meizu",
  "Mice",
  "Monitors",
  "Motorola",
  "Nintendo Switch",
  "Nokia",
  "OnePlus",
  "Over-Ear & On-Ear Headphones",
  "Powerbank",
  "Samsung",
  "Smart Watches",
  "Sony",
  "Tablets",
  "Televisions",
  "Uncategorized",
  "Video Games",
  "Xbox PlayStation",
  "Xiaomi",
];

const maxPrice = 1120;
const Shop = (props) => {
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
  const inputSearchRef = useRef();
  const history = useHistory();
  const [shopState, setShopState] = useState(shopStream.currentState());
  const [cartState, setCartState] = useState(cartStream.currentState());
  const selectRef = useRef();
  useInitStream(setCartState, cartStream);
  useInitStream(setShopState, shopStream);
  useProductFilterBySelect(selectRef, history, maxPriceAdjust, minPriceAdjust);
  useEffect(() => {
    window.scroll({ top: 0 });
    shopStream.updateData({
      dataList: dataListProduct,
      dataOriginalList: dataListProduct,
      dataTemp: dataListProduct,
    });
  }, []);

  useSearchProduct(inputSearchRef, shopStream);

  useEffect(() => {
    selectRef.current.value = categoryQuery;
    filterByQuery(shopStream, categoryQuery, history);
  }, [history, categoryQuery]);

  return (
    <div style={{ maxWidth: 1200, margin: "auto" }}>
      <HeadLine pathLocation={props.location.pathname} />
      <div className="container-shop-pagination">
        <aside className="first-aside-shop">
          {shopState.dataList.length > 0 && (
            <PaginationProducts
              dataListProduct={shopState.dataList}
              page={
                props.match.params.page ? parseInt(props.match.params.page) : 1
              }
              maxPage={Math.ceil(shopState.dataList.length / 9)}
              query={`?category=${categoryQuery.replace(/ /g, "-"
              )}&min_price=${minPriceAdjust}&max_price=${maxPriceAdjust}`}
            />
          )}
          {shopState.dataList.length === 0 && (
            <div>No products were found matching your selection.</div>
          )}
        </aside>
        <aside className="second-aside-shop">
          <div className="input-container">
            <input
              type="text"
              placeholder="Search Products"
              ref={inputSearchRef}
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
              />
            </div>
            <div>
              <h4>Carts</h4>
              <div>
                {cartState.dataCart.map(
                  ({ title, originalPrice, newPrice, imageUrl }, key) => (
                    <div key={key}>
                      <div className="cart-item-product">
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
                            <Link to="#">
                              <h5>{title}</h5>
                            </Link>
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                removeFromCart(title);
                              }}
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
