import "./HeaderPhoneLogin.css";

import React from "react";
import { NavLink as Link } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import { logOutHandling$, userStream } from "../../Epics/User";

const HeaderPhoneLogin = ({ isMobile, isActiveMenu, userVm }) => {
  const logOutButtonRef = useRef();
  useEffect(() => {
    let subscription;
    if (logOutButtonRef.current) {
      subscription = logOutHandling$(logOutButtonRef).subscribe((result) => {
        if (!result.error)
          userStream.updateData({
            triggerFetchUser: !userStream.currentState().triggerFetchUser,
          });
      });
    }
    return () => {
      subscription && subscription.unsubscribe();
    };
  }, [userVm]);
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
          {!userVm && <Link to="/login">Log in</Link>}
          {userVm && (
            <Link to="#" ref={logOutButtonRef}>
              Log out
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderPhoneLogin;
