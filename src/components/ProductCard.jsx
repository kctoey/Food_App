import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const product = props.product;
  const sale = props.onSale;
  const discount5 = (price) => {
    const discount = price * 0.05;
    return (price - discount).toFixed(2);
  };
  const getStars = (rating) => {
    const stars = [];
    const floatRating = parseFloat(rating);
    for (let i = 0; i < floatRating; i++) {
      stars.push("⭐");
    }

    return stars;
  };
  return (
    <div
      key={product.id}
      className="text-[#502314] product-card w-48 md:w-fit bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
    >
      <Link
        to={`/products/${product.id}`}
        className="items-center flex flex-col justify-center"
      >
        <img
          src={product.image}
          alt={product.title}
          className="inline-grid h-24 md:h-48  max-w-full  object-cover p-2"
        />
        <div className="px-4 py-3 w-48 md:w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">
            {" "}
            {product.category}
          </span>
          <p className="text-lg text-center font-bold text-[#502314] truncate block capitalize">
            {product.title}
          </p>
          <div className="flex items-center flex-col">
            <>
              <p>${product.price}</p>
            </>
            {/* {sale ? (
              <>
                <del className="text-xs  text-gray-400 cursor-auto my-3">
                  ${product.price}
                </del>
                <p className="text-red-500"> ${discount5(product.price)}</p>
              </>
            ) : (
              <>
                <p>${product.price}</p>
              </>
            )} */}

            <div>
              <p className="text-sm text-gray-600 ml-2">
                {getStars(product.rating.rate)}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
