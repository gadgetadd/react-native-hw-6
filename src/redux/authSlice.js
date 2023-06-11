import { createSlice } from '@reduxjs/toolkit';
import {
    signUp,
    logIn,
    logOut,

} from './authOperations';

const initialState = {
    user: { name: null, email: null, userId: null, },
    isLoading: true,
    isLoggedIn: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        resetError: (state) => { state.error = null },
        loadUser: (state) => { state.isLoading = true; },
        stopLoading: (state) => { state.isLoading = false; },
        updateUser: (state, action) => {
            state.user.name = action.payload.name;
            state.user.email = action.payload.email;
            state.user.userId = action.payload.userId;
            state.isLoggedIn = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.fulfilled, (state, action) => {
                state.user.name = action.payload.name;
                state.user.email = action.payload.email;
                state.user.userId = action.payload.userId;
                state.isLoggedIn = true;
                state.isLoading = false;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(signUp.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.user.name = action.payload.name;
                state.user.email = action.payload.email;
                state.user.userId = action.payload.userId;
                state.isLoggedIn = true;
                state.isLoading = false;
            })
            .addCase(logIn.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
            .addCase(logIn.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logOut.fulfilled, (state) => {
                state.user.name = null;
                state.user.email = null;
                state.user.userId = null;
                state.isLoggedIn = false;
                state.isLoading = false;
            })
            .addCase(logOut.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
            .addCase(logOut.pending, (state) => {
                state.isLoading = true
            })
    }
})

export const { updateUser, loadUser, stopLoading, resetError } = authSlice.actions;

export default authSlice.reducer;