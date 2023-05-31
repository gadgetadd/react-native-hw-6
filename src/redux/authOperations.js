import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../firebase/config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut
} from 'firebase/auth';
import { updateUser } from './authSlice';


// axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

// const setToken = token => axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// const removeToken = () => axios.defaults.headers.common.Authorization = '';

export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {


        try {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const userData = {
                        name: user.displayName,
                        userId: user.uid,
                        email: user.email

                    }
                    console.log('userData', userData);
                    thunkAPI.dispatch(updateUser(userData))

                } else {
                    console.log('else', user);
                }
            });
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const signUp = createAsyncThunk(
    'auth/signup',
    async (data, thunkAPI) => {

        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(auth.currentUser, {
                displayName: data.name,
            })
            const { displayName, email, uid } = auth.currentUser;

            return ({
                name: displayName,
                userId: uid,
                email
            });
        } catch (error) {
            console.log('error.message', error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logIn = createAsyncThunk(
    'auth/login',
    async (data, thunkAPI) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            const { displayName, email, uid } = auth.currentUser;

            return ({
                name: displayName,
                userId: uid,
                email
            });
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await signOut(auth);

    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});



