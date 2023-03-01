import React from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { increase } from "../feature/menu/menuSlice";
import { decrease } from "../feature/menu/menuSlice";

const MenuItems = ({ amount, id, title, price, image, option }) => {
  const dispatch = useDispatch();

  const notify = () => toast.success("เพิ่มลงตะกร้า");
  const handleClick = () => {
    notify();
    dispatch(increase({ id }));
  };

  return (
    <div className="py-12">
      <article className=" cursor-pointer container px-8 py-2 font-Kanit font-bold border-[#F5EBDC] border-2 rounded-xl ">
        <Link to={`/products/${id}`}>
          <img
            className="hover:opacity-75   p-4 z-auto object-cover rounded-full max-w-full h-auto "
            src={image}
            alt={title}
            width="600px"
            height="400px"
          />
          <div className="flex flex-row justify-between">
            <h1 className="truncate ">{title}</h1>
            <h2 className="whitespace-nowrap text-[#D62300]">{price} บาท</h2>
          </div>
        </Link>
        <div className="flex flex-row justify-between pt-2 ">
          <div className="flex flex-row justify-center ">
            <img width="40px" src={option} />
          </div>
          <div className="flex flex-row  pt-2 ">
            <div>
              <button
                key={id}
                onClick={handleClick}
                className="text-white rounded-full px-2 md:px-4 py-2  bg-[#D62300] hover:opacity-75"
              >
                +
              </button>
              <Toaster position="top-center" reverseOrder={true} />
            </div>
            <div>
              <p className="px-5  ">{amount}</p>
            </div>
            <div>
              <button
                onClick={() => {
                  if (amount === 0) {
                    <div className="hidden "></div>;
                    return;
                  }
                  dispatch(decrease({ id }));
                }}
                className="text-white rounded-full px-2 md:px-4 py-2 bg-[#D62300] hover:opacity-75"
              >
                -
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};
export default MenuItems;
