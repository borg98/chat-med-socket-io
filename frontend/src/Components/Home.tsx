import React, { useEffect, useState } from "react";
import "../Styles/Home.scss";
import beer from "../assets/beer.mp4";
import { Socket, io } from "socket.io-client";
import Login from "./Login";
import { IUser } from "../models/IUser";
import { SignUp } from "./SignUp";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [socket, setSocket] = useState<Socket>();
  const [logIn, setLogIn] = useState<boolean>(false);
  const [signUp, setSignUp] = useState<boolean>(false);
  const [signUpFailed, setSignUpFailed] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({
    id: 0,
    username: "",
    email: "",
    password: "",
    active: false,
    role: "",
    messages: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const s = io("https://chat-med-socket-io-server.vercel.app:3000");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      role: "user",
      messages: [],
      id: Number(new Date()),
    });
  }

  function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    socket?.emit("sign-up", user);
    socket?.on("sign-up-response", (res: boolean) => {
      if (res) {
        setLogIn(true);
        setSignUp(false);
        setSignUpFailed(false);
        alert("User created");
      } else {
        setSignUpFailed(true);
      }
    });
  }

  useEffect(() => {
    signUpFailed && alert("User already exists");
    setSignUpFailed(false);
  }, [handleSignUp]);

  function handleLogIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    socket?.emit("log-in-check", user);
    socket?.on("log-in-response", (res: boolean, user: IUser) => {
      if (res) {
        navigate("/Chatrooms");
        localStorage.setItem("Loggedinuser", JSON.stringify(user));
      } else {
        alert("Wrong email or password");
      }
    });
  }

  return (
    <>
      <video src={beer} autoPlay loop muted id="video" />

      <div className="home-container">
        <div className="home-container__wrapper">
          {!logIn && !signUp && (
            <>
              <h1 className="home_title">Welcome to the Beer App</h1>
              <p className="home_text">
                This app is designed to help you find the best beers in the
                <br></br> world. Chat with most enthusiastic people. You can
                also add<br></br>
                your friends and share your favorite beers or bars with them.
              </p>
              <div className="button-container">
                <button
                  onClick={() => {
                    setLogIn(true);
                  }}
                  className="button-container__button"
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    setSignUp(true);
                  }}
                  className="button-container__button"
                >
                  SignUp
                </button>
              </div>
            </>
          )}
          {logIn && (
            <Login
              setLogIn={setLogIn}
              socket={socket}
              handleOnChange={handleOnChange}
              handleLogIn={handleLogIn}
            />
          )}
          {signUp && (
            <SignUp
              handleOnChange={handleOnChange}
              handleSignUp={handleSignUp}
              setSignUp={setSignUp}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
