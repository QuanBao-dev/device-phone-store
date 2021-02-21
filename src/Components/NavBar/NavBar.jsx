import "./NavBar.css";

import React, { useRef } from "react";
import { NavLink as Link, useHistory } from "react-router-dom";

import { optionSelect } from "../../Epics/Share";
import CartShoppingNav from "../CartShoppingNav/CartShoppingNav";

const NavBar = () => {
  const history = useHistory();
  const selectRef = useRef();
  const inputRef = useRef();
  return (
    <header>
      <div className="header__phone-login-container">
        <div className="header__phone-login">
          <div className="header__phone-area">
            <div>Welcome to Device</div>
            <div>Custom Care</div>
            <div className="header__phone-number">
              <Link to="tel:1-800-123-4567">1-800-123-4567</Link>
            </div>
          </div>
          <div className="header__login-area">
            <Link to="/register">Sign Up</Link>
            <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
      <div className="header__area-logo-container">
        <div className="header__area-logo">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <h1 className="header__logo">Device</h1>
          </Link>
          <div className="header__select-search">
            <select ref={selectRef} style={{ outline: "none" }}>
              <option value="">All Categories</option>
              {optionSelect.map((data, key) => (
                <option key={key}>{data}</option>
              ))}
            </select>
            <input
              placeholder="Search for products"
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  searchSubmit(inputRef, selectRef, history);
                }
              }}
            />
            <i
              className="fas fa-search"
              onClick={() => {
                searchSubmit(inputRef, selectRef, history);
              }}
            ></i>
          </div>
          <CartShoppingNav />
        </div>
        <nav className="header__nav-bar">
          <Link to="/" activeClassName="active" exact>
            <div>Home</div>
          </Link>
          <Link to="/shop" activeClassName="active">
            <div>Shop</div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

function searchSubmit(inputRef, selectRef, history) {
  if (
    ![inputRef.current.value.trim(), selectRef.current.value.trim()].includes(
      ""
    )
  ) {
    history.push(
      "/shop/page/1?category=" +
        selectRef.current.value.trim().replace(/ /g, "-") +
        "&key=" +
        inputRef.current.value.trim().replace(/ /g, "-")
    );
    selectRef.current.value = "";
    inputRef.current.value = "";  
    return;
  }
  if (inputRef.current.value.trim() !== "") {
    history.push(
      "/shop/page/1?key=" + inputRef.current.value.trim().replace(/ /g, "-")
    );
    selectRef.current.value = "";
    inputRef.current.value = "";  
    return;
  }
  if (selectRef.current.value.trim() !== "") {
    history.push(
      "/shop/page/1?category=" + selectRef.current.value.trim().replace(/ /g, "-")
    );
  }
  selectRef.current.value = "";
  inputRef.current.value = "";
}

export default NavBar;
