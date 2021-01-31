import "./NavBar.css";

import React from "react";
import { NavLink as Link } from "react-router-dom";

import CartShoppingNav from "../CartShoppingNav/CartShoppingNav";

const NavBar = () => {
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
            <Link to="/">Sign Up</Link>
            <Link to="/">Log in</Link>
          </div>
        </div>
      </div>
      <div className="header__area-logo-container">
        <div className="header__area-logo">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <h1 className="header__logo">Device</h1>
          </Link>
          <div className="header__select-search">
            <select>
              <option value="">All Categories</option>
            </select>
            <input placeholder="Search for products" />
            <i className="fas fa-search"></i>
          </div>
          <CartShoppingNav />
        </div>
        <nav className="header__nav-bar">
          <Link to="/" activeClassName="active" exact>
            <div>Home</div>
          </Link>
          <Link to="/shop" activeClassName="active" exact>
            <div>Shop</div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
