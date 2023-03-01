import React from "react";

import MenuItems from "./MenuItems";
import { useSelector } from "react-redux";

export const MenuContainer = () => {
  const { menuItems } = useSelector((store) => store.menu);

  return (
    <section className="bg-[#F5EBDC] pt-4 ">
      <div className="grid sm:grid-cols-2  lg:grid-cols-3 gap-4 text-center">
        {menuItems.map((item) => {
          return <MenuItems key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};
