import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { addItem, removeItem, clearCart } from "../feature/cart/cartSlice2";
import { Tooltip } from "@mui/material";

const CartItemBox = () => {
  const cart = useSelector((state) => state.cart);
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
      <div ref={menuRef}>
        <div onClick={() => setOpen(!open)} className="flex flex-row ">
          {/* <Link to={`/cart`}> */}
          <AiOutlineShoppingCart size={"2rem"} />
          {/* </Link> */}
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D62300]">
            <p className="text-white">{cart.length ?? "0"}</p>
          </div>
        </div>
        <div>
          {open && (
            <div className="z-20 bg-white absolute right-0 top-16">
              <div className="lg:w-80 h-full shadow-lg rounded-xl p-4">
                <div className="flex flex-col    ">
                  <div>
                    {cart.length ? (
                      cart.map((productincart) => {
                        return (
                          <div
                            key={productincart.id}
                            className="flex flex-row border-b-gray-100 border-b-2 w-full h-full"
                          >
                            <div className="w-16 py-2">
                              <img
                                className="  object-cover p-2 "
                                width={80}
                                height={80}
                                src={productincart.image}
                                alt={productincart.title}
                              />
                            </div>
                            <div className="text-sm w-56 py-2 items-center justify-center">
                              <div>
                                <p className="truncate text-left py-4">
                                  {productincart.title}
                                </p>
                              </div>
                              <div className="flex flex-row">
                                <Tooltip title="Click to add">
                                  <button
                                    className="rounded-md bg-orange-900 px-2 text-white"
                                    onClick={() =>
                                      dispatch(addItem(productincart))
                                    }
                                  >
                                    +
                                  </button>
                                </Tooltip>
                                <p className="px-2">{productincart.qty}</p>
                                <Tooltip title="Click to reduce">
                                  <button
                                    className="rounded-md border bg-white px-2  text-black disabled:bg-gray-300"
                                    onClick={() =>
                                      dispatch(removeItem(productincart))
                                    }
                                    disabled={productincart.qty === 1}
                                  >
                                    -
                                  </button>
                                </Tooltip>
                              </div>
                              <div className="p-2  justify-between flex flex-co">
                                <p className="text-gray-500">
                                  {productincart.qty}X{productincart.price}
                                </p>
                                <p>
                                  {" "}
                                  ${productincart.qty * productincart.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="">
                        <p className="  ">No item in cart</p>
                      </div>
                    )}
                    {cart.length ? (
                      <Link to="/cart">
                        <div className="p-2">
                          <button
                            onClick={() => setOpen(false)}
                            className="bg-[#502314] text-white py-2 px-4 rounded"
                          >
                            Go to cart
                          </button>
                        </div>
                      </Link>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartItemBox;
