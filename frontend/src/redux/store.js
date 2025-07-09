import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice.js"
import wishlistReducer from "./slices/wishlistSlice.js"
import userSlice from "./slices/userSlice.js"
export const store = configureStore({
            reducer: {
                        cart: cartReducer,
                        wishlist: wishlistReducer,
                        user: userSlice
            }
});