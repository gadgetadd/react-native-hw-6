import { configureStore } from '@reduxjs/toolkit'
// import { setupListeners } from '@reduxjs/toolkit/query'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import authReducer from './authSlice';
// import filterReducer from './filterSlice'
// import postssApi from './postsApi'
// import modalReducer from './modalSlice';

const authPersistConfig = {
    key: 'auth',
    storage: AsyncStorage,
    // whitelist: ['token'],
};

export const store = configureStore({
    reducer: {
        auth: persistReducer(authPersistConfig, authReducer),
        // [contactsApi.reducerPath]: contactsApi.reducer,
        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            // .concat(postsApi.middleware)
})

export const persistor = persistStore(store);

setupListeners(store.dispatch)