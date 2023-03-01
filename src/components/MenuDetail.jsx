import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const MenuDetail = () => {
  const { productId } = useParams();
  const menu = useSelector((state) => state.menu);

  const singleMenu = menu.menuItems.find(
    (product) => product.id === parseInt(productId)
  );

  return (
    <div className="w-screen h-screen bg-[#F5EBDC] pt-20 font-Kanit  px-4  ">
      <div>
        <Link to="/">Back</Link>
      </div>
      <div className=" md:px-60 flex flex-col text-center justify-center ">
        <div className="p-4">
          <img
            className=" mx-auto"
            src={singleMenu.imagefordetail}
            alt="image"
          />
          <h1 className="p-4">{singleMenu.title}</h1>
          <hr />
          <hr />
        </div>
        <div className="p-4 space-y-4 text-center mx-auto">
          <h2>{singleMenu.description_title}</h2>
          <p>{singleMenu.description}</p>
        </div>
      </div>
    </div>
  );
};
