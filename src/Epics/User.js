import { fromEvent, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  catchError,
  map,
  pluck,
  switchMap,
  switchMapTo,
  tap,
} from "rxjs/operators";

import userStore from "../Store/User";

export const userStream = userStore;

export const searchSubmit = (inputRef, selectRef, history) => {
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
      "/shop/page/1?category=" +
        selectRef.current.value.trim().replace(/ /g, "-")
    );
  }
  selectRef.current.value = "";
  inputRef.current.value = "";
};

export const registerHandling$ = (
  registerButtonRef,
  emailRef,
  passwordRef,
  usernameRef
) => {
  return fromEvent(registerButtonRef.current, "click").pipe(
    tap((e) => {
      if (
        ![
          emailRef.current.value,
          passwordRef.current.value,
          usernameRef.current.value,
        ].includes("")
      )
        e.preventDefault();
    }),
    map(() => ({
      email: emailRef.current.value,
      password: passwordRef.current.value,
      username: usernameRef.current.value,
    })),
    switchMap((body) =>
      ajax({
        url: "/api/user/register",
        method: "POST",
        body: body,
      }).pipe(
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

export const loginHandling$ = (
  loginButtonRef,
  emailRef,
  passwordRef,
  checkboxRef
) => {
  return fromEvent(loginButtonRef.current, "click").pipe(
    tap((e) => {
      if (![emailRef.current.value, passwordRef.current.value].includes("")) {
        window.localStorage.setItem(
          "isRememberMe",
          checkboxRef.current.checked
        );
        e.preventDefault();
        if (checkboxRef.current.checked) {
          window.localStorage.setItem("email", emailRef.current.value);
        } else {
          window.localStorage.removeItem("email");
        }
      }
    }),
    map(() => ({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })),
    switchMap((body) =>
      ajax({
        url: "/api/user/login",
        method: "POST",
        body: body,
      }).pipe(
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

export const fetchUserVm$ = () => {
  return ajax({
    url: "/api",
  }).pipe(
    pluck("response", "message"),
    catchError((error) =>
      of(error).pipe(
        pluck("response", "error"),
        map((error) => ({ error }))
      )
    )
  );
};

export const logOutHandling$ = (logOutButtonRef) => {
  return fromEvent(logOutButtonRef.current, "click").pipe(
    switchMapTo(
      ajax({
        url: "/api/user/logout",
        method: "delete",
      }).pipe(
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
