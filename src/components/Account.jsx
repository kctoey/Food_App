import React from "react";
import { useSelector } from "react-redux";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Account = () => {
  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <div className=" bg-white w-screen h-screen pt-40 font-Kanit flex flex-row justify-center items-center p-20">
      <div className="w-full h-full  shadow-md rounded-md p-4">
        <h1 className="text-xl">My Profile</h1>
        <hr />
        <div className="py-4">
          <p>Name: {user.displayName}</p>
          <p>E-mail: {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Account;
