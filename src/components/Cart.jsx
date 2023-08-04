import React from "react";
import { useSelector } from "react-redux";
import { addCart } from "../redux/action";
import { useDispatch } from "react-redux";
import { delCart } from "../redux/action";
const Cart = () => {
  const product = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  console.log(product);
  const deleteButton = (product) => {
    dispatch(delCart(product));
  };
  const addButton = (product) => {
    dispatch(addCart(product));
  };
  if (product < 1) {
    return <h1 className="text-center p-20">No item in cart</h1>;
  }
  return (
    <div className="p-20">
      {product.map((productincart) => {
        return (
          <div>
            <div className=" grid grid-cols-4 gap-4 shadow-sm h-48 p-8  items-center  ">
              <div className="">
                <img
                  className="object-contain  h-36 w-36 "
                  src={productincart.image}
                  alt={productincart.title}
                  height="200px"
                  width="180px"
                />
              </div>
              <div>
                <h3 className="text-center truncate">{productincart.title}</h3>
              </div>
              <div>
                <p className="text-center ">
                  ${productincart.qty * productincart.price}
                </p>
              </div>
              <div className="text-center ">
                <button onClick={() => deleteButton(productincart)}>-</button>
                {productincart.qty}
                <button onClick={() => addButton(productincart)}>+</button>
              </div>
            </div>
            <hr className="mx-8" />
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
