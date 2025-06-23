import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems(state, action) {
      state.items = action.payload;
    },
    addCartItem(state, action) {
      state.items.push(action.payload);
    },
    updateCartItem(state, action) {
      const { _id, quantity } = action.payload;
      const item = state.items.find(item => item._id === _id);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeCartItem(state, action) {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    setCartLoading(state, action) {
      state.loading = action.payload;
    },
    setCartError(state, action) {
      state.error = action.payload;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  setCartItems,
  addCartItem,
  updateCartItem,
  removeCartItem,
  setCartLoading,
  setCartError,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer; 