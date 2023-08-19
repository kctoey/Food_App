import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="bg-[#502314] w-full mx-auto text-white text-center font-Kanit ">
      <div className="py-4">
        <h1 className="text-2xl">My Shop</h1>
        <div className="py-4 flex flex-row justify-center space-x-2 text-sm">
          <p>Privacy Policy</p>
          <p className="border-x-2  border-white px-3 ">Terms & Conditions</p>
          <p>Contact us</p>
        </div>
        <div className="flex flex-row  justify-center space-x-6">
          <AiOutlineInstagram size={32} />
          <FaFacebook size={32} />
        </div>
      </div>
    </div>
  );
};
