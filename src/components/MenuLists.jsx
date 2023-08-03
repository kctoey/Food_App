import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";

const MenuLists = (item, amount) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  console.log(item);
  const notify = () => toast.success("เพิ่มลงตะกร้า");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const handleAddProduct = (product) => {
    const ProductExist = item.find((items) => items.id === product.id);
    if (ProductExist) {
      setCartItems(
        item.map((items) =>
          items.id === product.id
            ? { ...ProductExist, quantity: ProductExist.quantity + 1 }
            : items
        )
      );
    } else {
      setCartItems([
        ...item,
        {
          ...product,
          quantity: ProductExist.quantity + 1, // <-- error is here
        },
      ]);
    }
  };
  function add(item) {
    if (item.id === 0) {
      setCart((current) => [...current, item.title]);
      setTotal((current) => current + item.price);
    } else {
    }
  }
  console.log(cart);
  console.log(total);
  const handleClick = (id) => {
    console.log(id);

    // notify();
    // dispatch(addItem({ id }));
  };
  const addCart = (id) => {
    setCount(count + 1);
  };
  return (
    <div className="py-12">
      <article className=" cursor-pointer container px-8 py-2 font-Kanit font-bold border-[#F5EBDC] border-2 rounded-xl ">
        <Link to={`/products/${item.id}`}>
          <img
            className="hover:opacity-75   p-4 z-auto object-cover rounded-full max-w-full h-auto "
            src={item.image}
            alt={item.title}
            width="600px"
            height="400px"
          />
          <div className="flex flex-row justify-between">
            <h1 className="truncate ">{item.title}</h1>
            <h2 className="whitespace-nowrap text-[#D62300]">
              {item.price} บาท
            </h2>
          </div>
        </Link>
        <div className="flex flex-row justify-between pt-2 ">
          <div className="flex flex-row justify-center ">
            <img width="40px" src={item.option} />
          </div>
          <div className="flex flex-row  pt-2 ">
            <div>
              <button
                // key={item.id}
                onClick={handleAddProduct}
                // onClick={handleClick}
                className="text-white rounded-full px-2 md:px-4 py-2  bg-[#D62300] hover:opacity-75"
              >
                +
              </button>
              <Toaster position="top-center" reverseOrder={true} />
            </div>
            <div>{/* <p className="px-5  ">{amount}</p> */}</div>
            <div>
              <button
                // onClick={() => {
                //   if (amount === 0) {
                //     <div className="hidden "></div>;
                //     return;
                //   }
                //   dispatch(decrease({ id }));
                // }}
                className="text-white rounded-full px-2 md:px-4 py-2 bg-[#D62300] hover:opacity-75"
              >
                -
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};
export default MenuLists;
