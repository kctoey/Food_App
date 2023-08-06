import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addCart, clearCart } from "../redux/action";
import { useDispatch } from "react-redux";
import { delCart } from "../redux/action";
import { Tooltip } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import cart from "../../public/image/ic068.png";
const Cart = () => {
  const product = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const deleteButton = (product) => {
    dispatch(delCart(product));
  };
  const addButton = (product) => {
    dispatch(addCart(product));
  };
  const clearButton = (product) => {
    dispatch(clearCart(product));
  };

  const [summary, setSummary] = useState({
    totalPrice: 0,
    vat: 0,
    subtotal: 0,
  });

  const calculateSummary = () => {
    const totalPrice = product.reduce((acc, current) => {
      return acc + current.qty * current.price;
    }, 0);
    const vat = totalPrice * 0.07;
    const subtotal = totalPrice + vat;

    setSummary({
      totalPrice,
      vat,
      subtotal,
    });
  };

  useEffect(() => {
    calculateSummary();
  }, [product]);
  if (product < 1) {
    return (
      <div className="font-Kanit h-screen w-screen flex flex-col items-center justify-center">
        <img
          src={cart}
          width={300}
          height={300}
          className="bg-[#F5EBDC] p-2 rounded-full "
        />
        <h1 className="text-center  md:p-20 mx-auto text-[#8B4513]">
          No item in cart
        </h1>
        <Link to={`/`}>
          <button className="w-32 rounded-md bg-[#8B4513] p-4 text-white ">
            Go Shopping
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div className="font-Kanit md:p-20 p-12 pt-20 flex md:flex-row flex-col justify-between">
      <div className="md:w-[1400px]  shadow-lg rounded-xl p-4">
        <h1 className="py-8 text-2xl">Your Cart</h1>
        <hr></hr>
        {product.map((productincart) => {
          return (
            <div key={productincart.id}>
              <div className=" grid md:grid-cols-4  grid-cols-2  grid-flow-row  md:gap-4 shadow-sm h-48 md:p-8  items-center">
                <div className="p-2 text-center  row-start-1 row-end-4 ">
                  <img
                    className="object-contain  h-36 w-36  "
                    src={productincart.image}
                    alt={productincart.title}
                    height="300px"
                    width="300px"
                  />
                </div>
                <div className="p-2   col-start-2 col-end-4">
                  <h3 className=" truncate">{productincart.title}</h3>

                  <button
                    className="text-red-500 text-sm md:invisible visible"
                    onClick={() => clearButton(productincart)}
                  >
                    Remove
                  </button>
                </div>
                <div className="text-right md:pr-0 pr-16 md:visible invisible">
                  <Tooltip title="Click to delete from cart ">
                    <button onClick={() => clearButton(productincart)}>
                      <RiDeleteBin6Line />
                    </button>
                  </Tooltip>
                </div>

                <div className="p-2  ">
                  <p className="md:text-left text-right text-gray-500 md:pl-0 ">
                    ${productincart.price}
                  </p>
                </div>
                <div className="lg:px-20 md:grid md:grid-cols-3 flex md:flex-none text-center ">
                  <Tooltip title="Click to reduce">
                    <button
                      className="rounded-xl border bg-white px-4  text-black disabled:bg-gray-300"
                      onClick={() => deleteButton(productincart)}
                      disabled={productincart.qty === 1}
                    >
                      -
                    </button>
                  </Tooltip>
                  <p className=" p-2"> {productincart.qty}</p>

                  <Tooltip title="Click to add">
                    <button
                      className="rounded-xl bg-orange-900 px-4 text-white"
                      onClick={() => addButton(productincart)}
                    >
                      +
                    </button>
                  </Tooltip>
                  <div className="px-2 visible md:invisible ">
                    <p className=" ">
                      ${productincart.qty * productincart.price}
                    </p>
                  </div>
                </div>
                <div className="p-2 md:visible invisible ">
                  <p className="text-right pl-16 ">
                    ${productincart.qty * productincart.price}
                  </p>
                </div>
              </div>
              <hr className="mx-8" />
            </div>
          );
        })}
      </div>
      <div className="md:w-72 md:h-72  shadow-lg rounded-xl p-4">
        <div className="flex flex-col    ">
          <div>
            {" "}
            <h1 className="text-2xl py-8">Summary</h1>
            <hr />
          </div>
          <div className="flex flex-row justify-between">
            {" "}
            <h2>Total</h2>
            <p>$ {summary.totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex flex-row justify-between">
            {" "}
            <h2>Vat 7%</h2>
            <p>$ {summary.vat.toFixed(2)}</p>
          </div>
          <div className="flex flex-row justify-between pb-8">
            <h2>Subtotal</h2>
            <p>$ {summary.subtotal.toFixed(2)}</p>
          </div>
          <Link to={`/payment`}>
            <button className="rounded-md text-white bg-[#8B4513] w-full">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
