import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";



export const toggleWishlist = createAsyncThunk("wishlist/toggleWishlist", async (productId, { isRejectedWithValue }) => {
            try {

                        const { data } = await axios.post(`http://localhost:3000/api/v1/user/wishlist/${productId}`, {}, { withCredentials: true });
                        if (data.success) {
                                    toast.success(data.message)
                        } else {
                                    toast.success(data.message);
                        }
                        return { productId, message: data.message };
            } catch (error) {
                        return isRejectedWithValue(error.response?.data || error.message);
            }
});

const wishlistSlice = createSlice({
            name: "wishlist",
            initialState: {
                        wishlistIds: [],
                        loading: false,
                        error: null
            },
            reducers: {
                        setWishlistIds: (state, action) => {
                                    state.wishlistIds = action.payload
                        }
            },
            extraReducers: (builder) => {
                        builder.addCase(toggleWishlist.pending, (state) => {
                                    state.loading = true
                        })
                                    .addCase(toggleWishlist.fulfilled, (state, action) => {
                                                state.loading = false;
                                                const { productId, message } = action.payload;

                                                if (message.includes("added")) {
                                                            state.wishlistIds.push(productId)
                                                } else {
                                                            state.wishlistIds = state.wishlistIds.filter(id => id !== productId);
                                                }
                                    })
                                    .addCase(toggleWishlist.rejected, (state, action) => {
                                                state.loading = false;
                                                state.error = action.payload;
                                    })
            }
});


export const { setWishlistIds } = wishlistSlice.actions;
export default wishlistSlice.reducer