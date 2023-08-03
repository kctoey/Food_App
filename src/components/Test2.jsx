import React from "react";
import { useDispatch } from "react-redux";

import { login, logout } from "../feature/cart/cartSlice2";
const Test2 = () => {
  const user = {
    username: "roitai",
    password: "123456",
  };
  const handleLogin = () => {
    dispatch(login(user));
  };
  const handleLogout = () => {
    dispatch(logout(user));
  };
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Componnent2</h1>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Test2;
