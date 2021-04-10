import "./NavBar.css";

import React, { useEffect, useRef, useState } from "react";
import { NavLink as Link, useHistory } from "react-router-dom";
import { fromEvent } from "rxjs";
import { filter } from "rxjs/operators";

import { userStream } from "../../Epics/User";
import { useInitStream } from "../../Hooks/InitStream";
import CartShoppingNav from "../CartShoppingNav/CartShoppingNav";
import HeaderPhoneLogin from "../HeaderPhoneLogin/HeaderPhoneLogin";
import HeaderSearch from "../HeaderSearch/HeaderSearch";
import SearchMobile from "../SearchMobile/SearchMobile";

const NavBar = () => {
  const history = useHistory();
  const selectRef = useRef();
  const inputRef = useRef();
  const menuContainerRef = useRef();
  const headerRef = useRef();
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const [userState, setUserState] = useState(userStream.currentState());
  useInitStream(setUserState, userStream);
  useEffect(() => {
    const subscription = fromEvent(window, "resize").subscribe(() => {
      userStream.updateData({ innerWidth: window.innerWidth });
      headerRef.current.style.boxShadow = "none";
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  const { innerWidth } = userState;
  useEffect(() => {
    const subscription = fromEvent(window, "scroll")
      .pipe(filter(() => innerWidth <= 1069))
      .subscribe(() => {
        if (window.scrollY === 0) {
          headerRef.current.style.boxShadow = "none";
        } else {
          headerRef.current.style.boxShadow = "0 0 20px 1px black";
        }
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [innerWidth]);
  return (
    <header ref={headerRef}>
      {innerWidth <= 1169 && (
        <SearchMobile
          isActive={isActiveSearch}
          setIsActive={setIsActiveSearch}
        />
      )}
      <HeaderPhoneLogin
        isMobile={innerWidth <= 1169}
        isActiveMenu={isActiveMenu}
      />
      {isActiveMenu && (
        <div
          className="header__block-background"
          onClick={() => setIsActiveMenu(!isActiveMenu)}
        ></div>
      )}
      <div className="header__area-logo-container">
        <div className="header__area-logo">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <h1 className="header__logo">Device</h1>
          </Link>
          {innerWidth >= 1114 && (
            <HeaderSearch
              selectRef={selectRef}
              inputRef={inputRef}
              history={history}
            />
          )}
          <div className="cart-shopping-nav-container">
            {innerWidth < 1114 && (
              <div className="search-symbol-container">
                <Link to={"/checkout"} style={{ color: "black" }}>
                  <i className="fa fa-money-check-alt fa-2x"></i>
                </Link>
              </div>
            )}
            {innerWidth < 1114 && (
              <div
                className="search-symbol-container"
                onClick={() => setIsActiveSearch(!isActiveSearch)}
              >
                <i className="fa fa-search fa-2x"></i>
              </div>
            )}
            <CartShoppingNav />
            {innerWidth <= 1169 && (
              <div
                className={`menu-container${isActiveMenu ? " active" : ""}`}
                ref={menuContainerRef}
                onClick={() => setIsActiveMenu(!isActiveMenu)}
              >
                <span className="one"></span>
                <span className="two"></span>
                <span className="three"></span>
              </div>
            )}
          </div>
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

export default NavBar;
