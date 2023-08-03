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
    return <h1 className="text-center mt-5">No item in cart</h1>;
  }
  return (
    <div>
      {product.map((productincart) => {
        return (
          <div className="row">
            <div className="col-md-4">
              <img
                src={productincart.image}
                alt={productincart.title}
                height="200px"
                width="180px"
              />
            </div>
            <div>
              <h3>{productincart.title}</h3>
              <p className="lead fw-bold">
                {productincart.qty} X ${productincart.price} = $
                {productincart.qty * productincart.price}
              </p>
              <button onClick={() => deleteButton(productincart)}>-</button>
              <button onClick={() => addButton(productincart)}>+</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
