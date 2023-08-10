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
export const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.value);
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
      .catch((err) => {});
  };

  return (
    <div className="bg-[#F5EBDC] w-screen h-screen pt-20 font-Kanit">
      <div className=" bg-white rounded-lg w-80 mx-auto p-8 space-y-2">
        <div className="text-center">
          <h1 className="font-bold">เข้าสู่ระบบ</h1>
        </div>

        <div className="flex flex-row justify-center space-x-2 py-4">
          {!user ? (
            <div>
              <form className="space-y-4">
                <input
                  className="w-full h-10 border-solid border-2 border-[#e7c695] rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 pl-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  type="email"
                />
                <input
                  className="w-full h-10 border-solid border-2 border-[#e7c695] rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 pl-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  type="password"
                />

                <button
                  type="submit"
                  onClick={loginToApp}
                  className="py-2 px-4 hover:opacity-75 bg-[#502314] text-center text-sm text-white rounded-full"
                >
                  เข้าสู่ระบบ
                </button>
              </form>
              <div className="pt-4">
                <p>
                  เพิ่งเคยเข้ามาในร้านใช่หรือไม่
                  <Link to="/register">
                    <button className="underline decoration-1 text-[#502314] font-bold line pb-4 hover:opacity-75">
                      สมัครสมาชิกใหม่
                    </button>
                  </Link>
                </p>
                <GoogleButton onClick={signInWithGoogle} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center space-y-4 items-center">
              <div>
                <BsCheckCircle className="h-14 w-14 drop-shadow-lg text-green-500 text-center " />
              </div>
              <h1 className="py-4 text-2xl">เข้าสู่ระบบสำเร็จ</h1>
              <div className="hover:opacity-75 bg-[#502314] text-center text-sm text-white py-1 px-3 rounded-full">
                <button className="">
                  <Link to="/">กลับสู่หน้าหลัก</Link>
                </button>
              </div>
              <button
                className="bg-[#502314] hover:opacity-75 text-sm text-white py-1 px-3 rounded-full"
                onClick={signUserOut}
              >
                ออกจากระบบ
              </button>
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
