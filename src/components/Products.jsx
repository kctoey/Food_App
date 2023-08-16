import React, { useState, useEffect, useReducer } from "react";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

import { AiFillShop, AiOutlineSearch } from "react-icons/ai";
import { GiShirt } from "react-icons/gi";
import { GiLargeDress } from "react-icons/gi";
import { GiDiamondRing } from "react-icons/gi";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { AiOutlineClear } from "react-icons/ai";
import Countdown from "react-countdown";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
import { TextField } from "@mui/material";
const myTheme = createTheme({
  palette: {
    light: "#abffbb",
    main: "#00ffbb",
    dark: "#ffffbb",
  },
});
const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState("");
  const [random, setRandom] = useState([]);
  const [onSale, setonSale] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleBlur = () => {
    setCursorPosition(value.length);
  };
  const [{ sortBy }, dispatch] = useReducer(
    function reducer(state, action) {
      switch (action.type) {
        case "SORT":
          return {
            ...state,
            sortBy: action.payload,
          };

        default:
          return state;
      }
    },
    {
      sortBy: null,
    }
  );
  function getSortedData(productList, sortBy) {
    if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
      return productList.sort((a, b) => b["price"] - a["price"]);
    }

    if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
      return productList.sort((a, b) => a["price"] - b["price"]);
    }
    if (sortBy && sortBy === "RATE_HIGH_TO_LOW") {
      return productList.sort(
        (a, b) => b["rating"]["rate"] - a["rating"]["rate"]
      );
    }
    if (sortBy && sortBy === "RATE_LOW_TO_HIGH") {
      return productList.sort(
        (a, b) => a["rating"]["rate"] - b["rating"]["rate"]
      );
    }
    if (sortBy && sortBy === "RATE_LOW_TO_HIGH") {
      return productList.sort(
        (a, b) => a["rating"]["rate"] - b["rating"]["rate"]
      );
    }
    return productList;
  }
  const clearFilter = () => {
    setOption("");
  };
  function getHighRatings(ratings, option) {
    let a = ratings;

    const updatedList = a.filter((x) => x.rating.rate > option);

    return updatedList;
  }
  const makeRequest = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setData(data);

      setRandom(data.filter((product) => product.category === "electronics"));

      setFilter(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    makeRequest();
  }, []);

  const Loading = () => {
    return (
      <div className="flex flex-row justify-around w-full mx-auto">
        <div>
          <div>
            <Skeleton height="250px" width="300px" />
          </div>
          <div style={{ lineHeight: 2 }}>
            <Skeleton count={5} />
          </div>
        </div>
        <div>
          <div>
            <Skeleton height="250px" width="300px" />
          </div>
          <div style={{ lineHeight: 2 }}>
            <Skeleton count={5} />
          </div>
        </div>
        <div>
          <div>
            <Skeleton height="250px" width="300px" />
          </div>
          <div style={{ lineHeight: 2 }}>
            <Skeleton count={5} />
          </div>
        </div>
      </div>
    );
  };
  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);

    return setFilter(updatedList);
  };

  getSortedData(filter, sortBy);
  const result = getHighRatings(filter, option);
  const filteredUsers = result.filter((results) => {
    return results.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  const getStars = (rating) => {
    const stars = [];
    const floatRating = parseFloat(rating);
    for (let i = 0; i < floatRating; i++) {
      stars.push("⭐");
    }

    return stars;
  };
  // function random_item(items) {
  //   return items[Math.floor(Math.random() * items.length)];
  // }
  // const flashsaleProduct = random_item(data);
  const discount5 = (price) => {
    const discount = price * 0.05;
    return (price - discount).toFixed(2);
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const ShowProduct = () => {
    return (
      <div className="w-full  font-Kanit text-[#502314]">
        <hr className="my-4 mx-8" />
        <div className="w-fit mx-auto grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 px-4 py-16 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {filteredUsers.map((product) => {
            return (
              <>
                <ProductCard onSale={onSale} product={product} loading="lazy" />
                {/* <div
                  className="bg-white rounded-md p-4 items-center  border border-gray-200 text-center"
                  key={product.id}
                >
                  <p className="uppercase text-center bg-gray-400 text-white w-32 text-xs rounded-md m-4">
                    {product.category}
                  </p>
                  <img
                    className="inline-grid h-48 max-w-full    object-cover"
                    height={150}
                    src={product.image}
                    alt={product.title}
                  />
                  <div className="">
                    <h5 className="">{product.title.substring(0, 12)}...</h5>
                    <p className="">${product.price}</p>
                    <p> {getStars(product.rating.rate)}</p>
                    <Link to={`/products/${product.id}`} className="">
                      <button
                        type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        {" "}
                        Buy Now
                      </button>
                    </Link>
                  </div>
                </div> */}
              </>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className=" m-8 font-Kanit">
        <h2 className="text-[#502314] text-center text-2xl font-bold py-4">
          New Product
        </h2>

        <Carousel
          responsive={responsive}
          autoPlay={true}
          swipeable={true}
          draggable={true}
          showDots={false}
          infinite={true}
          partialVisible={false}
          dotListClass="custom-dot-list-style"
        >
          {random.map((product) => {
            return (
              <div
                key={product.id}
                className="text-[#502314] mx-auto product-card  p-2  w-48 md:w-fit items-center flex flex-col justify-center  bg-white shadow-md  rounded-xl duration-500 mb-6  md:p-4"
              >
                <Link
                  to={`/products/${product.id}`}
                  className="items-center flex flex-col justify-center"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="inline-grid h-24 md:h-48  max-w-full  object-cover "
                  />
                  <div className="md:px-4 px-2 py-3 w-48 md:w-72">
                    <span className="text-gray-400 mr-3 uppercase text-xs ">
                      {" "}
                      {product.category}
                    </span>
                    <p className="text-sm md:text-lg font-bold truncate block capitalize text-center">
                      {product.title}
                    </p>
                    <div className="items-center flex flex-col">
                      <div className=" cursor-auto my-3">${product.price}</div>
                      {/* <p className="text-red-500">
                        {" "}
                        ${discount5(product.price)}
                      </p> */}
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
          })}
        </Carousel>
      </div>
      <div className="flex flex-col justify-center items-center">
        {/* <input
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          placeholder="Search by name"
        /> */}
        <div className="text-[#502314] flex flex-col justify-center text-center items-center p-4">
          <div>
            <h2 className="text-left mb-4 text-2xl font-bold">Category</h2>
          </div>
          <div className="grid grid-cols-5 gap-4  " role="group">
            <button
              type="button"
              onClick={() => {
                setonSale(false);
                setFilter(data);
              }}
              className="text-md flex flex-col justify-center items-center py-2.5 px-5 mr-2 mb-2  font-medium text-gray-900 focus:outline-none bg-white rounded-md b hover:bg-gray-100 hover:text-[#502314] focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <AiFillShop className="text-[#502314]" />
              All
            </button>

            <button
              onClick={() => {
                setonSale(false);
                filterProduct("men's clothing");
              }}
              className="flex flex-col justify-center items-center py-2.5 px-5 mr-2 mb-2 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-md b hover:bg-gray-100 hover:text-[#502314] focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <GiShirt className="text-[#502314]" />
              Men
            </button>
            <button
              onClick={() => {
                setonSale(false);
                filterProduct("women's clothing");
              }}
              className="flex flex-col justify-center items-center py-2.5 px-5 mr-2 mb-2 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-md b hover:bg-gray-100 hover:text-[#502314] focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <GiLargeDress className="text-[#502314]" />
              Woman
            </button>
            <button
              onClick={() => {
                setonSale(false);
                filterProduct("jewelery");
              }}
              className=" flex flex-col justify-center items-center py-2.5 px-5 mr-2 mb-2 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-md b hover:bg-gray-100 hover:text-[#502314] focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <GiDiamondRing className="text-[#502314]" />
              Jewelery
            </button>
            <button
              onClick={() => {
                setonSale(true);
                filterProduct("electronics");
              }}
              className=" flex flex-col justify-center items-center py-2.5 px-5 mr-2 mb-2 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-md b hover:bg-gray-100 hover:text-[#502314] focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <HiOutlineDesktopComputer className="text-[#502314] items-center text-center justify-center" />
              Electronic
            </button>
          </div>
        </div>

        <div className="font-Kanit grid grid-flow-col auto-cols-max items-center text-center justify-center">
          <div className="flex md:flex-row md:justify-center flex-col px-2 space-y-4 md:space-y-0">
            <div className="flex md:flex-row justify-center items-center text-center">
              <AiOutlineSearch size={20} className="w-16 text-[#502314]" />

              <TextField
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                id="standard-search"
                label="Search"
                type="search"
                variant="standard"
                InputLabelProps={{
                  sx: { color: "brown", "&.Mui-focused": { color: "brown" } },
                }}
              />
            </div>
            <h1 className="py-2 px-4">Sort By</h1>
            <select
              className="bg-[#502314] text-white text-sm px-4 rounded inline-flex items-center"
              value={sortBy}
              onChange={(e) =>
                dispatch({ type: "SORT", payload: e.target.value })
              }
            >
              <option value="PRICE_HIGH_TO_LOW">Price - High to Low</option>
              <option value="PRICE_LOW_TO_HIGH">Price - Low to High</option>
              <option value="RATE_HIGH_TO_LOW">Rate - High to Low</option>
              <option value="RATE_LOW_TO_HIGH">Rate - Low to High</option>
            </select>
            <div className="flex md:flex-row md:justify-center flex-col items-center">
              <h1 className="py-2 px-4">Product Ratings</h1>
              <select
                className="bg-[#502314] text-white text-sm py-1 px-4 rounded inline-flex items-center"
                value={option}
                onChange={(e) => setOption(e.target.value)}
              >
                <option value="" disabled>
                  Select Rating Option
                </option>
                <option value="1">1 Star or More</option>
                <option value="2">2 Stars or More</option>
                <option value="3">3 Stars or More</option>
                <option value="4">4 Stars or More</option>
              </select>
            </div>
            <div>
              <Tooltip title="Clear filter">
                <button className="text-[#502314] p-4" onClick={clearFilter}>
                  <AiOutlineClear size={20} />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        {loading ? <Loading /> : <ShowProduct />}
      </div>
    </div>
  );
};
export default Products;
