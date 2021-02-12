import './Register.css';

import React from 'react';

import HeadLine from '../../Components/HeadLine/HeadLine';
import Input from '../../Components/Input/Input';

const Register = () => {
  return (
    <form style={{ maxWidth: "1210px", margin: "auto" }}>
      <HeadLine pathLocation={window.location.pathname} />
      <Input isRequired={true} label={"Username"} type={"input"} />
      <Input isRequired={true} label={"Email"} type={"input"} />
      <Input isRequired={true} label={"Password"} type={"input"} />
      <button className="register-button">Sign up</button>
    </form>
  );
};

export default Register;
