import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice';
import problemsReducer from './problemsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        problems: problemsReducer
    }
});

export default store;