import React from "react";
import { BsLine } from "react-icons/bs";
import { Link } from "react-router-dom";

const LineBtn = () => {
  return (
    <div className="fixed bottom-10  right-10 ">
      <button
        onClick={() => {
          window.open(
            "https://line.me/ti/p/V_Ro8K7kJ2?fbclid=IwAR2NqrXVLE9p7Nkv7rG13RiyNLmrHAgy0CAEWw0qTra4OLS7GRmHd_OsBj0",
            "_blank"
          );
        }}
        className="bg-white rounded-full p-3 shadow-md"
      >
        <BsLine className="text-green-500" size={30} />
      </button>
    </div>
  );
};

export default LineBtn;
