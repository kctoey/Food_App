import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./feature/menu/menuSlice";
import cartReducer from "./feature/cart/cartSlice2";
import userReducer from "./feature/user/userslice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import { combineReducers } from "redux";
const rootReducer = combineReducers({
  menu: menuReducer,
  cart: cartReducer,
  user: userReducer,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
