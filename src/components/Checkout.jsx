import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import promtpay from "../../public/image/promtpay.jpg";
import { clearAllCart } from "../feature/cart/cartSlice2";
import { Toaster, toast } from "react-hot-toast";
import Lottie from "lottie-react";
import animationData from "../../public/image/animation_llbvl66r.json";
import { Link } from "react-router-dom";
const Checkout = () => {
  const product = useSelector((state) => state.cart);
  const [start, setStart] = useState(false);
  const dispatch = useDispatch();
  console.log(product);
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
  const notify = () => toast.success("Payment suscessfully");
  const handleClick = () => {
    dispatch(clearAllCart());
    setStart(true);
    notify();
  };
  return (
    <div className="bg-white w-screen h-screen pt-20 font-Kanit flex flex-col justify-center items-center">
      {start ? (
        <>
          <h1>Payment Successful! Your order has been placed</h1>
          <Lottie loop={false} animationData={animationData} />
          <Link to={`/`}>
            <button className="w-64 rounded-md bg-[#8B4513] p-4 text-white ">
              Back to homepage
            </button>
          </Link>
        </>
      ) : (
        <>
          <div>
            <h1>Promtpay Payment</h1>
            <p>Total amount : ${summary.subtotal.toFixed(2)}</p>
          </div>
          <img width={300} height={300} src={promtpay} alt="" />
          <button onClick={handleClick}> Confirm payment</button>
        </>
      )}
    </div>
  );
};

export default Checkout;
