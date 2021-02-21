import "./Login.css";

import React, { useRef } from "react";

import HeadLine from "../../Components/HeadLine/HeadLine";
import Input from "../../Components/Input/Input";

const Login = () => {
  const checkboxRef = useRef();
  return (
    <form style={{ maxWidth: "1210px", margin: "auto" }}>
      <HeadLine pathLocation={window.location.pathname} />
      <Input
        isRequired={true}
        label={"Username or email address"}
        type={"input"}
      />
      <Input isRequired={true} label={"Password"} type={"input"} />
      <Input
        type={"checkbox"}
        label={"Remember me"}
        inputRef={checkboxRef}
        checkBoxRef={checkboxRef}
      />
      <button className="login-button">Login</button>
    </form>
  );
};

export default Login;
