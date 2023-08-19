import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const product = action.payload;
      console.log(product);
      const exist = state.find((x) => x.id === product.id);
      if (exist) {
        exist.qty++;
      } else {
        state.push({ ...product, qty: 1 });
      }
    },
    removeItem(state, action) {
      const product = action.payload;
      const exist = state.find((x) => x.id === product.id);
      if (exist.qty === 1) {
        state = state.filter((x) => x.id !== product.id);
      } else {
        exist.qty--;
      }
    },
    clearCart(state, action) {
      const product = action.payload;

      const cart = state.find((x) => x.id === product.id);

      return state.filter((x) => x.id !== cart.id);
    },
    clearAllCart(state) {
      return initialState;
    },
  },
});

export const { addItem, removeItem, clearCart, clearAllCart } =
  cartSlice.actions;

export default cartSlice.reducer;
