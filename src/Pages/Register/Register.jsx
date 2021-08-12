import "./Register.css";

import React, { useEffect, useRef } from "react";

import HeadLine from "../../Components/HeadLine/HeadLine";
import Input from "../../Components/Input/Input";
import { registerHandling$ } from "../../Epics/User";
import { useState } from "react";
const Register = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const registerButtonRef = useRef();

  const [errorEmail, setErrorEmail] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const [errorFirstName, setErrorFirstName] = useState();
  const [errorLastName, setErrorLastName] = useState();
  useEffect(() => {
    const subscription = registerHandling$(
      registerButtonRef,
      emailRef,
      passwordRef,
      firstNameRef,
      lastNameRef
    ).subscribe((result) => {
      console.log(result);
      if (!result.error) {
        console.log(result);
      } else {
        if (typeof result.error === "string") {
          if (result.error.includes("email")) setErrorEmail(result.error);
          else setErrorEmail(null);
          if (result.error.includes("password")) setErrorPassword(result.error);
          else setErrorPassword(null);
          if (result.error.includes("firstName"))
            setErrorFirstName(result.error);
          else setErrorFirstName(null);
          if (result.error.includes("lastName")) setErrorLastName(result.error);
          else setErrorLastName(null);
        }
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <form style={{ maxWidth: "1210px", margin: "auto" }}>
      <HeadLine pathLocation={window.location.pathname} />
      <Input
        isRequired={true}
        label={"First name"}
        type={"input"}
        errorMessage={errorFirstName}
        inputRef={firstNameRef}
      />
      <Input
        isRequired={true}
        label={"Last name"}
        type={"input"}
        errorMessage={errorLastName}
        inputRef={lastNameRef}
      />
      <Input
        isRequired={true}
        label={"Email"}
        type={"input"}
        errorMessage={errorEmail}
        inputRef={emailRef}
      />
      <Input
        isRequired={true}
        label={"Password"}
        type={"input"}
        inputRef={passwordRef}
        errorMessage={errorPassword}
        typeInput={"password"}
      />
      <button className="register-button" ref={registerButtonRef}>
        Sign up
      </button>
    </form>
  );
};

export default Register;
