import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosinstance from "../../axios/axios";

// Thunks
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
            try {
                        const { data } = await axiosinstance.get("/v1/user/carts");
                        return data.carts;
            } catch (error) {
                        console.log(error.message);
            }
});

export const addToCart = createAsyncThunk("cart/addToCart", async (id) => {
            try {
                        const { data } = await axiosinstance.post(
                                    `/v1/user/product`,
                                    { productId: id, quantity: 1 },
                        );
                        toast.success(data.message);
                        return id; // return the productId to update state
            } catch (error) {
                        console.log(error.message);
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
