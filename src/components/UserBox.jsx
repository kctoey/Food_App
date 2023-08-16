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

  const [open, setOpen] = useState(false);
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
          <div onClick={() => setOpen(true)}>
            <img
              className="w-6 h-6 md:w-12 md:h-12 rounded-full md:scale-50"
              src={profile}
              width="40"
              height="40"
            />
            <span className="text-sm ">{user?.displayName}</span>
          </div>
          <div>
            {open && (
              <div className="z-20 bg-white absolute right-0 top-16">
                <div className="lg:w-80 h-full shadow-lg rounded-xl p-4">
                  <div className="flex flex-col    ">
                    <div className="flex flex-col">
                      <Link to="/user/account">
                        <button>My account</button>
                      </Link>
                      <Link to="/user/purchase">
                        <button>Purchase history</button>
                      </Link>
                      <button onClick={() => dispatch(signUserOut())}>
                        Sign Out
                      </button>
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
