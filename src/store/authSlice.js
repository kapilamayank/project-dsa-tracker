import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authStatus: false,
    userData: null,
    loading: true
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.authStatus = true;
            state.userData = action.payload;
        },
        logout: (state, action) => {
            state.authStatus = false;
            state.userData = null;
            state.loading = true;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { login, logout, setLoading } = authSlice.actions;

export default authSlice.reducer;