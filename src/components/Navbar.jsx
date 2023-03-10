import React, { useState } from "react";
import Logo from "../../public/image/logonavbar.png";
import { signOut } from "firebase/auth";
import BagBrown from "../../public/image/ic-bag-brown.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import profile from "../../public/image/profile.png";
const Navbar = () => {
  const { amount, total } = useSelector((store) => store.menu);
  const [user] = useAuthState(auth);
  const [show, setShow] = useState(true);

  const signUserOut = async () => {
    await signOut(auth);
  };
  function changeState() {
    setShow(!show);
  }
  return (
    <div className="bg-[#F5EBDC] fixed mx-auto w-screen h-[60px] shadow-lg font-Kanit z-10 ">
      <div className="flex flex-row justify-between ">
        <div className="pl-2 ">
          <Link to={`/`}>
            <img className="h-[60px] w-[60px] absolute" src={Logo} alt="logo" />
          </Link>
        </div>

        <div className="flex flex-row pr-6 justify-center text-center ">
          <div className=" invisible md:visible ">
            {user && (
              <div className="flex text-center justify-center px-8 items-center h-16">
                <img
                  className="w-6 h-4 md:w-12 md:h-12 rounded-full md:scale-50"
                  src={profile}
                  width="40"
                  height="40"
                />
                <span className="text-sm ">{user?.displayName}</span>
              </div>
            )}
          </div>
          <div className="flex pt-1 text-center justify-center px-4 items-center text-sm md:text-base hover:opacity-75 ">
            <button
              onClick={changeState}
              className="bg-[#502314]  text-white py-1 px-3 rounded-full md:py-1 hover:shadow-sm"
            >
              {!user ? (
                <Link to={`/login`}>Sign In</Link>
              ) : (
                <div className="text-center w-20">
                  <button className="text-sm " onClick={signUserOut}>
                    Sign Out
                  </button>
                </div>
              )}
            </button>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex flex-row pl-3 pt-2">
              <img width="30px" src={BagBrown} alt="BagBrown" />
              <p>{amount}</p>
            </div>
            <div className="flex  justify-center text-center text-sm">
              <p className="w-28">Total {total} Baht</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
