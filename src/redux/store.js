import { configureStore } from '@reduxjs/toolkit'


import authReducer from './authSlice';
// import filterReducer from './filterSlice'
// import postssApi from './postsApi'
// import modalReducer from './modalSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,


    },

})



