// import { createSlice } from "@reduxjs/toolkit";
// import { FaProductHunt } from "react-icons/fa";
// import menuItems from "../../menuItems";

// const initialState = {
//   menuItems: menuItems,
//   amount: 0,
//   total: 0,
// };
// const items =
//   localStorage.getItem("cartItems") !== null
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : [];

// const amount =
//   localStorage.getItem("amount") !== null
//     ? JSON.parse(localStorage.getItem("amount"))
//     : 0;

// const total =
//   localStorage.getItem("total") !== null
//     ? JSON.parse(localStorage.getItem("total"))
//     : 0;
// const setItemFunc = (item, amount, total) => {
//   localStorage.setItem("menuItems", JSON.stringify(item));
//   localStorage.setItem("amount", JSON.stringify(amount));
//   localStorage.setItem("total", JSON.stringify(total));
// };
// export const menuSlice = createSlice({
//   name: "menu",
//   initialState,
//   reducers: {
//     clearCart: (state) => {
//       state.menuItems = [];
//     },

//     removeItem: (state, action) => {
//       const itemId = action.payload;
//       state.menuItems = state.menuItems.filter((item) => item.id !== itemId);
//     },
//     increase: (state, { payload }) => {
//       const menuItem = state.menuItems.find((item) => item.id === payload.id);
//       menuItem.amount++;
//     },
//     decrease: (state, { payload }) => {
//       const menuItem = state.menuItems.find((item) => item.id === payload.id);
//       menuItem.amount = menuItem.amount - 1;
//     },
//     calculateTotals: (state) => {
//       let amount = 0;
//       let total = 0;
//       state.menuItems.forEach((item) => {
//         amount += item.amount;
//         total += item.amount * item.price;
//       });
//       state.amount = amount;
//       state.total = total;
//     },
//     addItem(state, action) {
//       const newItem = action.payload;
//       const existingItem = state.menuItems.find(
//         (item) => item.id === newItem.id
//       );
//       state.amount++;
//       existingItem;

//       // if (!existingItem) {
//       //   // ===== note: if you use just redux you should not mute state array instead of clone the state array, but if you use redux toolkit that will not a problem because redux toolkit clone the array behind the scene

//       //   state.cartItems.push({
//       //     id: newItem.id,
//       //     title: newItem.title,
//       //     image01: newItem.image01,
//       //     price: newItem.price,
//       //     quantity: 1,
//       //     totalPrice: newItem.price,
//       //   });
//       // } else {
//       //   existingItem.quantity++;
//       //   existingItem.totalPrice =
//       //     Number(existingItem.totalPrice) + Number(newItem.price);
//       // }

//       // state.amount = state.menuItems.reduce(
//       //   (total, item) => total + Number(item.price) * Number(item.quantity),

//       //   0
//       // );

//       setItemFunc(
//         state.menuItems.map((item) => item),
//         state.amount,
//         state.total
//       );
//     },
//     recievedMenu(state, action) {
//       const menu = action.payload;
//       menu.forEach((product) => {
//         state.menu[product.id] = product;
//       });
//     },
//   },
// });
// export default menuSlice.reducer;

// // export const selectMenuById = (state, productId) =>
// //   state.menuItems.find((post) => post.id === productId);
// export const {
//   clearCart,
//   removeItem,
//   increase,
//   decrease,
//   calculateTotals,
//   addItem,
//   recievedMenu,
// } = menuSlice.actions;
import React from "react";

const menuSlice = () => {
  return <div>menuSlice</div>;
};

export default menuSlice;
