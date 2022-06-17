import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import "./Login.css";
import { auth, provider } from "../firebase";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

export default function Login() {
  const dispatch = useDispatch();

  const signin = () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );
        console.log(user);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/11/Gmail-Emblem.png"
          alt=""
        />
        <Button variant="contained" color="primary" onClick={signin}>
          Login
        </Button>
      </div>
    </div>
  );
}
