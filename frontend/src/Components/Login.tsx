import React from "react";
import "../Styles/Login.scss";
import { Socket } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep } from "@fortawesome/free-solid-svg-icons";

interface LoginProps {
  setLogIn: (logIn: boolean) => void;
  socket?: Socket;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogIn: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Login = (props: LoginProps) => {
  return (
    <>
      <button
        onClick={() => {
          props.setLogIn(false);
        }}
        className="return-button"
      >
        <FontAwesomeIcon icon={faBackwardStep} />
      </button>
      <h3 className="login-title">Log in</h3>
      <form onSubmit={props.handleLogIn} className="form-container">
        <input
          required
          type="text"
          name="email"
          onChange={(e) => {
            props.handleOnChange(e);
          }}
          placeholder="Email"
          className="form-container__input"
          autoFocus
        />
        <input
          required
          type="password"
          name="password"
          onChange={(e) => {
            props.handleOnChange(e);
          }}
          placeholder="Password"
          className="form-container__input"
        />
        <button className="form-container__button">Log In</button>
      </form>
    </>
  );
};

export default Login;
