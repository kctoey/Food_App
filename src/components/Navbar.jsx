import React, { useState, useRef, useEffect } from "react";
import Logo from "../../public/image/logonavbar.png";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Lottie from "lottie-react";
import animationData from "../../public/image/m.json";
import CartItemBox from "./CartItemBox";
import UserBox from "./UserBox";
const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="bg-[#F5EBDC] fixed mx-auto w-full h-[60px] shadow-lg font-Kanit z-10 ">
      <div className="flex flex-row justify-between ">
        <div style={{ height: 50, width: 50, paddingLeft: 8, paddingTop: 8 }}>
          <Link to={`/`}>
            <Lottie loop={false} animationData={animationData} />
          </Link>
        </div>

        <div className="flex flex-row px-4 justify-center text-center items-center md:h-full  ">
          <div>
            {!user ? (
              <div className="py-4">
                <Link to={`/login`}>
                  <div className="text-center w-20 ">
                    <button className="bg-[#8B4513] items-center  text-white  px-3 rounded-full md:py-1 hover:shadow-sm">
                      Sign In
                    </button>
                  </div>
                </Link>
              </div>
            ) : (
              <div>
                <div className="flex flex-row justify-center items-center  md:space-x-8 text-sm ">
                  <div className=" z-10">
                    <UserBox />
                  </div>

                  <div className=" z-10">
                    <CartItemBox />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
