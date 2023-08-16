import React, { useState, useRef, useEffect } from "react";
import Logo from "../../public/image/logonavbar.png";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineShoppingCart } from "react-icons/ai";
import profile from "../../public/image/profile.png";
import CartItemBox from "./CartItemBox";
const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="bg-[#F5EBDC] fixed mx-auto w-full h-[60px] shadow-lg font-Kanit z-10 ">
      <div className="flex flex-row justify-between ">
        <div className="pl-2 ">
          <Link to={`/`}>
            <img className="h-[60px] w-[60px] absolute" src={Logo} alt="logo" />
          </Link>
        </div>

        <div className="flex flex-row px-4 justify-center text-center items-center md:h-full  ">
          <div>
            {!user ? (
              <div className="py-4">
                <Link to={`/login`}>
                  <div className="text-center w-20 ">
                    <button className="bg-[#502314] items-center  text-white  px-3 rounded-full md:py-1 hover:shadow-sm">
                      Sign In
                    </button>
                  </div>
                </Link>
              </div>
            ) : (
              <div>
                <div className="flex flex-row justify-center items-center  md:space-x-8 text-sm ">
                  <img
                    className="w-6 h-6 md:w-12 md:h-12 rounded-full md:scale-50"
                    src={profile}
                    width="40"
                    height="40"
                  />
                  <span className="text-sm ">{user?.displayName}</span>

                  <button
                    className="bg-[#502314] items-center  text-white mx-4  px-4 rounded-full md:py-1 hover:shadow-sm"
                    onClick={signUserOut}
                  >
                    Sign Out
                  </button>
                  <div className="invisible lg:visible z-10">
                    <CartItemBox />
                  </div>
                  <div className="flex flex-row visible lg:invisible  z-20">
                    <div>
                      <Link to={`/cart`}>
                        <AiOutlineShoppingCart size={"2rem"} />
                      </Link>
                    </div>
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D62300]">
                      <p className="text-white">{cart.length ?? "0"}</p>
                    </div>
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
