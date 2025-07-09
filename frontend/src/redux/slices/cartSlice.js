import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Thunks
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
            try {
                        const { data } = await axios.get("http://localhost:3000/api/v1/user/carts", {
                                    withCredentials: true,
                        });
                        return data.carts;
            } catch (error) {
                        console.log(error.message);
            }
});

export const addToCart = createAsyncThunk("cart/addToCart", async (id) => {
            try {
                        const { data } = await axios.post(
                                    `http://localhost:3000/api/v1/user/product/`,
                                    { productId: id, quantity: 1 },
                                    { withCredentials: true }
                        );
                        toast.success(data.message);
                        return id; // return the productId to update state
            } catch (error) {
                        console.log(error);
            }
});

// Slice
const cartSlice = createSlice({
            name: "cart",
            initialState: {
                        cartItems: [],
                        loading: false,
                        isCartItemExist: [],
                        searchProduct: []
            },

            reducers: {
                        setSearchProduct: (state, action) => {
                                    state.searchProduct = action.payload;
                        }
            },

            extraReducers: (builder) => {
                        builder
                                    .addCase(addToCart.pending, (state) => {
                                                state.loading = true;
                                    })
                                    .addCase(addToCart.fulfilled, (state, action) => {
                                                state.loading = false;
                                                state.isCartItemExist.push(action.payload);
                                    })
                                    .addCase(fetchCart.pending, (state) => {
                                                state.loading = true;
                                    })
                                    .addCase(fetchCart.fulfilled, (state, action) => {
                                                state.loading = false;
                                                state.cartItems = action.payload;
                                                state.isCartItemExist =
                                                            action.payload?.item?.map((item) => item?.productId) || [];
                                    });
            },
});

export const { setCartIds, setSearchProduct } = cartSlice.actions;
export default cartSlice.reducer;
