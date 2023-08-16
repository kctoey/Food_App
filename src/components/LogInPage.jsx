import React, { useState } from "react";
// import { login } from "../feature/user/userslice";
import { useSelector, useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "../config/firebase";
import GoogleButton from "react-google-button";
import { Button, TextField } from "@mui/material";
export const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
  };
  const signUserOut = async () => {
    await signOut(auth);
  };
  const loginToApp = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
          })
        );
      })
      .catch((err) => {
        setError(err.message);
      });
  };
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
          <h1 className="font-bold">Sign In</h1>
        </div>

        <div className="flex flex-row justify-center space-x-2 py-4">
          {!user ? (
            <div>
              <form onSubmit={loginToApp} className="space-y-4">
                <TextField
                  sx={style}
                  fullWidth
                  required
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  sx={style}
                  fullWidth
                  required
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
                {error && (
                  <p className="text-red-500 text-sm">
                    {error.split("Error ")[1]}
                  </p>
                )}
                <div className="text-center">
                  <Button
                    style={{ backgroundColor: "#8B4513" }}
                    fullWidth
                    variant="contained"
                    type="submit"
                  >
                    Sign In
                  </Button>
                </div>
              </form>
              <div className="pt-4">
                <p>
                  Are you a new customer?
                  <Link to="/register">
                    <button className="underline decoration-1 text-[#502314] font-bold line pb-4 hover:opacity-75">
                      Register now
                    </button>
                  </Link>
                </p>
                <div className="flex justify-center">
                  <GoogleButton onClick={signInWithGoogle} />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center space-y-4 items-center">
              <div>
                <BsCheckCircle className="h-14 w-14 drop-shadow-lg text-green-500 text-center " />
              </div>
              <h1 className="py-4 text-2xl">Success login</h1>
              <div className="hover:opacity-75 bg-[#502314] text-center text-sm text-white py-1 px-3 rounded-full">
                <button className="">
                  <Link to="/">Back to home page</Link>
                </button>
              </div>
              {/* <button
                className="bg-[#502314] hover:opacity-75 text-sm text-white py-1 px-3 rounded-full"
                onClick={signUserOut}
              >
                ออกจากระบบ
              </button> */}
            </div>
          )}

          {/* <button
            className="bg-[#502314]  text-sm text-white py-1 px-3 rounded-full"
            onClick={() => dispatch(logout())}
          >
            Login
          </button> */}
        </div>
      </div>
    </div>
  );
};
