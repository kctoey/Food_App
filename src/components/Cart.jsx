import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addCart, clearCart } from "../redux/action";
import { useDispatch } from "react-redux";
import { delCart } from "../redux/action";
import { Tooltip } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
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
      <h1 className="text-center p-16 md:p-20 mx-auto">No item in cart</h1>
    );
  }
  return (
    <div className="font-Kanit md:p-20 p-12">
      <h1>Your Cart</h1>
      <hr></hr>
      {product.map((productincart) => {
        return (
          <div key={productincart.id}>
            <div className=" grid md:grid-cols-4  grid-cols-2  grid-flow-row  md:gap-4 shadow-sm h-48 p-8  items-center">
              <div className="p-2 text-center  row-start-1 row-end-4">
                <img
                  className="object-contain  h-36 w-36 "
                  src={productincart.image}
                  alt={productincart.title}
                  height="200px"
                  width="180px"
                />
              </div>
              <div className="p-2   col-start-2 col-end-4">
                <h3 className=" truncate">{productincart.title}</h3>
              </div>
              <div className="text-right md:pr-0 pr-16">
                <Tooltip title="Click to delete from cart ">
                  <button onClick={() => clearButton(productincart)}>
                    <RiDeleteBin6Line />
                  </button>
                </Tooltip>
              </div>
              <div className="p-2  ">
                <p className="md:text-left text-gray-500 md:pl-0 pl-16">
                  ${productincart.price}
                </p>
              </div>
              <div className="p-2  flex justify- space-around">
                <Tooltip title="Click to reduce">
                  <button
                    className="rounded-xl border bg-white px-4  text-black disabled:bg-gray-300"
                    onClick={() => deleteButton(productincart)}
                    disabled={productincart.qty === 1}
                  >
                    -
                  </button>
                </Tooltip>
                <p className="w-8 p-2"> {productincart.qty}</p>

                <Tooltip title="Click to add">
                  <button
                    className="rounded-xl bg-orange-900 px-4 text-white"
                    onClick={() => addButton(productincart)}
                  >
                    +
                  </button>
                </Tooltip>
              </div>
              <div className="p-2  ">
                <p className="text-right pl-16">
                  ${productincart.qty * productincart.price}
                </p>
              </div>
            </div>
            <hr className="mx-8" />
          </div>
        );
      })}
      <div className="flex flex-col ">
        <div>
          {" "}
          <h1>Summary</h1>
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
        <div className="flex flex-row justify-between">
          <h2>Subtotal</h2>
          <p>$ {summary.subtotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
