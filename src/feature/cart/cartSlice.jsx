import { createSelector, createSlice } from "@reduxjs/toolkit";
import menuItems from "../../menuItems";

const initialState = {
  menuItems: {},
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",

  initialState,
  reducers: {
    addToCarts(state, action) {
      const { id } = action.payload;

      if (state.menuItems[id]) {
        state.menuItems[id]++;
      } else {
        state.menuItems[id] = 1;
      }
    },
    removeFromCart(state, action) {
      delete state.menuItems[action.payload];
    },
    updateQuantity(state, action) {
      const { id, amount } = action.payload;
      state.menuItems[id] = amount;
    },

    calculateTotal: (state) => {
      let total = 0;

      for (let id in menuItems) {
        total += menuItems[id].price * menuItems[id].amount;
      }
      state.total = total;

      // (item) => {
      //   amount += item.amount;
      //   total += item.amount * item.price;
      // };
      // state.amount = amount;
      // state.total = total;
    },
  },
});

export const { addToCarts, removeFromCart, updateQuantity, calculateTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
