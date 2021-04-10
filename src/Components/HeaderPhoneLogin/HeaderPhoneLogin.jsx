import "./HeaderPhoneLogin.css";

import React from "react";
import { NavLink as Link } from "react-router-dom";

const HeaderPhoneLogin = ({ isMobile, isActiveMenu }) => {
  return (
    <div
      className={`header__phone-login-container${isMobile ? " mobile" : ""}${
        isActiveMenu ? " active" : ""
      }`}
    >
      <div className="header__phone-login">
        <div className="header__phone-area">
          <div>Welcome to Device</div>
          <div style={{ display: "flex" }}>
            <div>Custom Care:</div>
            <div className="header__phone-number">
              <Link to="tel:1-800-123-4567">1-800-123-4567</Link>
            </div>
          </div>
        </div>
        <div className="header__login-area">
          {isMobile && (
            <Link to={"/"} activeClassName="active" exact>
              Home
            </Link>
          )}
          {isMobile && (
            <Link to={"/shop"} activeClassName="active">
              Shop
            </Link>
          )}
          <Link to="/register">Sign Up</Link>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderPhoneLogin;
