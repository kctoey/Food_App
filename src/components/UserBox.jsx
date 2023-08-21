import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearAllCart } from "../feature/cart/cartSlice2";
import { Tooltip } from "@mui/material";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import profile from "../../public/image/profile.png";
import { Routes, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const UserBox = () => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);

  let navigate = useNavigate();
  const path = useLocation().pathname;

  const signUserOut = async () => {
    await signOut(auth), dispatch(clearAllCart());
    const isAccountOrOrderPath =
      path === "/user/account" || path === "/user/order";

    if (isAccountOrOrderPath) {
      return navigate("/");
    }
  };

  const dispatch = useDispatch();
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      {user ? (
        <div ref={menuRef}>
          <div
            className="flex flex-row items-center"
            onClick={() => setOpen(!open)}
          >
            <img
              className="w-6 h-6 md:w-12 md:h-12 rounded-full md:scale-50"
              src={user.photoURL ?? profile}
              width="40"
              height="40"
            />
            <span className="text-sm px-4">{user?.displayName}</span>
          </div>
          <div>
            {open && (
              <div className="lg:z-20 bg-white absolute right-0  lg:right-36 top-16 ">
                <div className="w-screen h-screen md:w-40   md:h-full shadow-lg rounded-xl p-4">
                  <div className="flex flex-col    ">
                    <div
                      className="flex flex-col text-xl space-y-8 md:text-base
                      md:space-y-0"
                    >
                      <Link to="/user/account">
                        <button
                          onClick={() => setOpen(false)}
                          className="hover:text-gray-400"
                        >
                          My account
                        </button>
                      </Link>
                      <Link to="/user/purchase">
                        <button
                          onClick={() => setOpen(false)}
                          className="hover:text-gray-400"
                        >
                          Purchase history
                        </button>
                      </Link>
                      <Link to="/">
                        <button
                          className="hover:text-gray-400"
                          onClick={() => dispatch(signUserOut())}
                        >
                          Sign Out
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserBox;
