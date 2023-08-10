import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./feature/menu/menuSlice";
import cartReducer from "./feature/cart/cartSlice2";
import userReducer from "./feature/user/userslice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
    user: userReducer,
  },
});
