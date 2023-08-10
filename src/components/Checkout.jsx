import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import promtpay from "../../public/image/promtpay.jpg";

const Checkout = () => {
  const product = useSelector((state) => state.cart);
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

  return (
    <div className="bg-[#F5EBDC] w-screen h-screen pt-20 font-Kanit flex flex-col justify-center items-center">
      <div>
        <h1>Promtpay Payment</h1>
        <p>Total amount : ${summary.subtotal.toFixed(2)}</p>
      </div>
      <img width={300} height={300} src={promtpay} alt="" />
      <button> แจ้งหลักฐานการโอน</button>
    </div>
  );
};

export default Checkout;
