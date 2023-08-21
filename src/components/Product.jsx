import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
// import { addCart } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowBackIos } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { addItem } from "../feature/cart/cartSlice2";
import LoginDialog from "./LoginDialog";
import { Button } from "@mui/material";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const notify = () => toast.success("Add product");

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
      <div className="lg:p-20  justify-center items-center px-8 j w-full flex lg:flex-row flex-col">
        <div className="mt-20 lg:w-60 ">
          <Skeleton className="rounded-md" height="250px" width="250px" />
        </div>

        <div
          style={{ lineHeight: 2 }}
          className="mt-8 lg:mt-0 lg:p-16 lg:ml-12 lg:w-1/2 h-[300px] w-[300px]"
        >
          {" "}
          <Skeleton className="py-2 w-32 mb-4" count={1} />
          <Skeleton className="py-4" count={1} />
          <Skeleton className="py-2 my-4 w-16" count={1} />
          <Skeleton className="py-2 mb-4 w-16" count={1} />
          <Skeleton count={4} />
          <Skeleton className="py-2 my-4 w-32" count={1} />
        </div>
      </div>
    );
  };

  const ShowProduct = () => {
    return (
      <div className="lg:p-20 pt-20 px-8 justify-center items-center w-full flex lg:flex-row flex-col">
        <Link to="/">
          <button className="absolute left-4 lg:left-8 top-16 lg:top-20   bg-white ml-4 px-4 py-2 text-[#8B4513] text-center">
            <MdArrowBackIos size={30} />
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
        <div className="md:p-8 p-4 lg:w-1/2">
          <h4 className="p-4 text-gray-500 uppercase ">{product.category}</h4>
          <h1 className="p-4 text-base md:text-2xl">{product.title}</h1>
          <p className="md:p-4 px-4 flex flex-row justify-start text-center items-center">
            <span>
              <FaStar className="text-yellow-500 " />
            </span>{" "}
            {product.rating && product.rating.rate}
          </p>
          <h3 className="p-4 text-[#8B4513] text-3xl">${product.price}</h3>
          <p className="p-4 text-sm md:text-base">{product.description}</p>
          {user.user !== "" ? (
            <div className="pl-4 pt-4">
              <Button
                style={{ backgroundColor: "#8B4513" }}
                onClick={() => {
                  dispatch(addItem(product));
                  notify();
                }}
                color="primary"
                variant="contained"
              >
                Add to Cart
                <Toaster position="top-center" reverseOrder={true} />
              </Button>
            </div>
          ) : (
            <LoginDialog />
          )}
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
