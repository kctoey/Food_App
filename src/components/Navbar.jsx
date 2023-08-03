import React, { useState } from "react";
import Logo from "../../public/image/logonavbar.png";
// import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { auth } from "../config/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineShoppingCart } from "react-icons/ai";
import profile from "../../public/image/profile.png";
const Navbar = () => {
  // const { menu } = useSelector((state) => ({ ...state }));
  const mycart = useSelector((state) => state.handleCart);
  console.log(mycart);
  // const [user] = useAuthState(auth);
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
          {/* <div className=" invisible md:visible ">
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
          </div> */}
          <div className="flex flex-col justify-center">
            <div className="flex flex-row pl-3 pt-2">
              <Link to={`/cart`}>
                <AiOutlineShoppingCart size={"2rem"} />
              </Link>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D62300]">
                <p className="text-white">{mycart.length}</p>
              </div>
            </div>
            <div className="flex  justify-center text-center text-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
