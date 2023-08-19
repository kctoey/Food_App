import React, { useState } from "react";
import { login } from "../feature/user/userslice";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import animationData from "../../public/image/animation_llenkk18.json";
import Lottie from "lottie-react";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "../config/firebase";
import { Button, TextField } from "@mui/material";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.value);
  const [user] = useAuthState(auth);

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        updateProfile(userAuth.user, {
          displayName: name,
        })
          .then(
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
              })
            )
          )
          .catch((err) => {
            console.log(err);
            setError(err.message);
          });
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  if (user) {
    console.log(user);
    return (
      <div className="bg-[#F5EBDC] w-screen h-screen p-20  font-Kanit">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <h1 className="text-center text-xl  mx-auto text-[#8B4513]">
            Your registration has been successful.
          </h1>
          <div style={{ padding: 10, height: 200, width: 200 }}>
            <Lottie loop={false} animationData={animationData} />
          </div>
          <Link to="/">
            <button className=" rounded-md bg-[#8B4513] p-4 text-white ">
              Back to homepage
            </button>
          </Link>
        </div>
      </div>
    );
  }
  const style = {
    "& label.Mui-focused": {
      color: "brown",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "brown",
      },
    },
  };
  return (
    <div className="bg-[#F5EBDC] w-screen h-screen pt-20 font-Kanit">
      <div className=" bg-white rounded-lg w-80 mx-auto p-8 space-y-2">
        <div className="text-center">
          <h1 className="font-bold">Register</h1>
        </div>

        <div className="flex flex-row justify-center space-x-2 py-4">
          <form onSubmit={register} className="space-y-4">
            <TextField
              sx={style}
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name (required for registering)"
              type="text"
            />

            <TextField
              sx={style}
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
            />
            <TextField
              sx={style}
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />
            {error && (
              <p className="text-red-500 text-sm">{error.split(":")[1]}</p>
            )}
            <Button
              style={{ backgroundColor: "#8B4513" }}
              fullWidth
              variant="contained"
              type="submit"
            >
              Register Now
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
