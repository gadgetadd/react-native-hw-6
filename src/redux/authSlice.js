import { createSlice } from '@reduxjs/toolkit';
import {
    signUp,

    logIn,
    logOut,
    // refreshUser
} from './authOperations';

const initialState = {
    user: { name: null, email: null },
    userId: null,
    isLoggedIn: false,
    // isAuth: false,
    // isRefreshing: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        updateUser(state, action) {
            state.user.name = action.payload.name;
            state.user.email = action.payload.email;
            state.userId = action.payload.userId;
            state.isLoggedIn = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.fulfilled, (state, action) => {
                state.user.name = action.payload.name;
                state.user.email = action.payload.email;
                state.userId = action.payload.userId;
                state.isLoggedIn = true;
                // state.isAuth = false;
            }).addCase(signUp.rejected, (state, action) => {
                // state.error = action.payload
                // state.isAuth = false;
            })
            .addCase(signUp.pending, (state) => {
                // state.isAuth = true
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.user.name = action.payload.name;
                state.user.email = action.payload.email;
                state.userId = action.payload.userId;
                state.isLoggedIn = true;
                // state.isAuth = false;
            })
            .addCase(logIn.rejected, (state, action) => {
                // state.error = action.payload
                // state.isAuth = false;
            })
            .addCase(logIn.pending, (state) => {
                // state.isAuth = true
            })
            .addCase(logOut.fulfilled, (state) => {
                state.user.name = null;
                state.user.email = null;
                state.userId = null;
                state.isLoggedIn = false;
                // state.isAuth = false;
            })
            .addCase(logOut.rejected, (state) => {
                // state.isAuth = false;
            })
            .addCase(logOut.pending, (state) => {
                // state.isAuth = true
            })
        //             .addCase(refreshUser.pending, (state) => {
        //                 state.isRefreshing = true;
        //             })
        //             .addCase(refreshUser.fulfilled, (state, action) => {
        //                 state.user = action.payload;
        //                 state.isLoggedIn = true;
        //                 state.isRefreshing = false;
        //             })
        //             .addCase(refreshUser.rejected, (state) => {
        //                 state.isRefreshing = false;
        //             })


    }
})

export const { updateUser } = authSlice.actions

export default authSlice.reducer;