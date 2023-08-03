import React from "react";
import menuItems from "../menuItems";
import MenuLists from "./MenuLists";
import { useSelector } from "react-redux";

export const MenuContainer = () => {
  return (
    <section className="bg-[#F5EBDC] pt-4 ">
      <div className="grid sm:grid-cols-2  lg:grid-cols-3 gap-4 text-center">
        {menuItems.map((item) => {
          return <MenuLists key={item.id} {...item} item={item} />;
        })}
      </div>
    </section>
  );
};
