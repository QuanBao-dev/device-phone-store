import './Login.css';

import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import HeadLine from '../../Components/HeadLine/HeadLine';
import Input from '../../Components/Input/Input';
import { loginSubscription } from '../../Subscription/login';

const Login = () => {
  const checkboxRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const loginButtonRef = useRef();
  const [errorForm, setErrorForm] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (window.localStorage.getItem("isRememberMe") === "true") {
      emailRef.current.value = window.localStorage.getItem("email");
    }
    const subscription = loginSubscription(
      loginButtonRef,
      emailRef,
      passwordRef,
      checkboxRef,
      setErrorForm,
      history
    );
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <form style={{ maxWidth: "1210px", margin: "auto" }}>
      <HeadLine pathLocation={window.location.pathname} />
      {errorForm && <div className="error-message-form">{errorForm}</div>}
      <Input
        isRequired={true}
        label={"Email address"}
        type={"input"}
        inputRef={emailRef}
        // errorMessage={errorEmail}
      />
      <Input
        isRequired={true}
        label={"Password"}
        type={"input"}
        inputRef={passwordRef}
        typeInput={"password"}
        // errorMessage={errorPassword}
      />
      <Input type={"checkbox"} label={"Remember me"} inputRef={checkboxRef} />
      <button className="login-button" ref={loginButtonRef}>
        Login
      </button>
    </form>
  );
};

export default Login;
