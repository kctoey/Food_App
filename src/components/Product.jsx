import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { addCart } from "../redux/action";
import { useDispatch } from "react-redux";
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
  };
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      setProduct(await response.json());
      setLoading(false);
    };
    getProduct();
  }, []);
  const Loading = () => {
    return (
      <div className="p-20 w-screen">
        <div>
          <Skeleton height="400px" width="280px" />
        </div>
        <div style={{ lineHeight: 2 }}>
          <Skeleton count={5} />
        </div>
      </div>
    );
  };

  const ShowProduct = () => {
    return (
      <div className="lg:p-20 pt-20 px-8 justify-center items-center w-full flex lg:flex-row flex-col">
        <Link to="/">
          <button className="absolute left-4 lg:left-8 top-16 lg:top-20  rounded-xl border border-[#8B4513] bg-white ml-4 px-4 py-2 text-[#8B4513] text-center">
            Back
          </button>
        </Link>
        <div className="p-8 lg:w-60">
          <img
            src={product.image}
            alt={product.title}
            height="400px"
            width="280px"
          />
        </div>
        <div className="p-8 lg:w-1/2">
          <h4 className="py-4 text-gray-500 uppercase ">{product.category}</h4>
          <h1 className="py-4 text-2xl">{product.title}</h1>
          <p className="flex flex-row justify-start text-center items-center">
            <span>
              <FaStar className="text-yellow-500 " />
            </span>{" "}
            {product.rating && product.rating.rate}
          </p>
          <h3 className="py-4 text-[#8B4513] text-xl">${product.price}</h3>
          <p className="py-4">{product.description}</p>

          <button
            onClick={() => addProduct(product)}
            className="mt-4 lg:w-32 rounded-xl bg-[#8B4513] px-4 py-2 text-white "
          >
            Add to Cart
          </button>

          <Link
            to="/cart"
            className="w-32 rounded-xl border border-[#8B4513] bg-white ml-4 px-4 py-2 text-[#8B4513] text-center"
          >
            Go to cart
          </Link>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div>
        <div className=" font-Kanit">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
};

export default Product;
