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
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8B4513",
    },
  },
});
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const notify = () => toast.success("Add to cart");
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  console.log(user.user);
  const dispatch = useDispatch();
  // const addItem = (product) => {
  //   dispatch({ type: "ADDITEM", payload: product });
  // };

  // const dispatch = useDispatch();
  // const addProduct = (product) => {
  //   dispatch(addCart(product));
  //   notify();
  // };
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
          <button className="absolute left-4 lg:left-8 top-16 lg:top-20  rounded-xl border border-[#8B4513] bg-white ml-4 px-4 py-2 text-[#8B4513] text-center">
            <MdArrowBackIos />
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
          <h3 className="py-4 text-[#8B4513] text-3xl">${product.price}</h3>
          <p className="py-4">{product.description}</p>
          {user.user !== "" ? (
            <>
              <button
                className="uppercase w-40 rounded-md border border-[#8B4513] bg-white ml-4 px-4 py-2 text-[#8B4513] text-center"
                onClick={() => dispatch(addItem(product))}
                color="primary"
                variant="outlined"
              >
                Add to Cart
                <Toaster position="top-center" reverseOrder={true} />
              </button>
              <Link
                to="/cart"
                className="uppercase w-40 rounded-md border border-[#8B4513] bg-white ml-4 px-4 py-2 text-[#8B4513] text-center"
              >
                Go to cart
              </Link>
            </>
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
