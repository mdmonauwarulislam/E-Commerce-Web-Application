import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice/index'
import cartReducer from './cartSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
