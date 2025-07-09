import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
            name: "user",
            initialState: {
                        isLogin: false,
                        userName: ""
            },
            reducers: {
                        setIsLogin: (state, action) => {
                                    state.isLogin = action.payload;
                        },
                        setUserName: (state, action) => {
                                    state.userName = action.payload
                        }
            },
});


export const { setIsLogin, setUserName } = userSlice.actions;
export default userSlice.reducer;