import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../firebase/config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth';



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
            console.log(auth.currentUser);
            return ({
                name: displayName,
                userId: uid,
                email
            });
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



