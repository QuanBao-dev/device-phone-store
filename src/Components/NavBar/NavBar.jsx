import "./NavBar.css";

import React, { useEffect, useRef, useState } from "react";
import { NavLink as Link, useHistory } from "react-router-dom";
import { fromEvent } from "rxjs";
import { debounceTime, filter, tap } from "rxjs/operators";

import {
  fetchShopProducts$,
  filterByQuery,
  shopStream,
} from "../../Epics/Shop";
import { fetchUserVm$, userStream } from "../../Epics/User";
import { useInitStream } from "../../Hooks/InitStream";
import CartShoppingNav from "../CartShoppingNav/CartShoppingNav";
import HeaderPhoneLogin from "../HeaderPhoneLogin/HeaderPhoneLogin";
import HeaderSearch from "../HeaderSearch/HeaderSearch";
import SearchMobile from "../SearchMobile/SearchMobile";

let posY1 = 0;
let posY2 = 0;
const NavBar = () => {
  const history = useHistory();
  const selectRef = useRef();
  const inputRef = useRef();
  const menuContainerRef = useRef();
  const headerRef = useRef();
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const [userState, setUserState] = useState(userStream.currentState());
  const [shopState, setShopState] = useState(shopStream.currentState());
  const { categoryQuery, keySearch, minPriceAdjust, maxPriceAdjust } =
    shopState;
  useInitStream(setUserState, userStream);
  useInitStream(setShopState, shopStream);
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
      .pipe(
        filter(() => innerWidth > 1069),
        tap(() => {
          headerRef.current.style.transition = "0s";
          posY2 = -posY1 + window.scrollY;
          if (posY1 !== 0) {
            const currentTop = headerRef.current.getBoundingClientRect().y;
            const thresholdEnd = -220;
            if (posY2 < 0) {
              if(window.scrollY > 220){
                headerRef.current.style.boxShadow = "0 0 6px 2px grey";
              }
              if (window.scrollY === 0) {
                headerRef.current.style.boxShadow = "none";
              }
            }

            if (posY2 > 0) {
              if (window.scrollY < 220) {
                headerRef.current.style.boxShadow = "none";
              }
            }

            if (currentTop - posY2 <= 0 && currentTop - posY2 >= thresholdEnd) {
              headerRef.current.style.top = `${currentTop - posY2}px`;
            }

            if (currentTop - posY2 < thresholdEnd) {
              headerRef.current.style.top = `${thresholdEnd}px`;
            }

            if (currentTop - posY2 > 0) {
              headerRef.current.style.top = `0px`;
            }
          }
          posY1 = window.scrollY;
        }),
        debounceTime(50)
      )
      .subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, [innerWidth]);
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
  useEffect(() => {
    const subscription = fetchUserVm$().subscribe((result) => {
      if (!result.error) {
        userStream.updateData({ userVm: result });
      } else {
        userStream.updateData({ userVm: null });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [userState.triggerFetchUser]);

  useEffect(() => {
    const subscription = fetchShopProducts$().subscribe((res) => {
      if (!res.error) {
        const { products } = res;
        shopStream.updateData({
          dataList: products,
          dataOriginalList: products,
          isLoading: false,
        });
        if (
          categoryQuery !== null &&
          keySearch !== null &&
          minPriceAdjust !== null &&
          maxPriceAdjust !== null
        )
          filterByQuery(
            shopStream,
            categoryQuery,
            keySearch,
            minPriceAdjust,
            maxPriceAdjust
          );
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [categoryQuery, keySearch, maxPriceAdjust, minPriceAdjust]);
  return (
    <header ref={headerRef} className="header-container">
      {innerWidth <= 1169 && (
        <SearchMobile
          isActive={isActiveSearch}
          setIsActive={setIsActiveSearch}
        />
      )}
      <HeaderPhoneLogin
        isMobile={innerWidth <= 1169}
        isActiveMenu={isActiveMenu}
        userVm={userState.userVm}
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
