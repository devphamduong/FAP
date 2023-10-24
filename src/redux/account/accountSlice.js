import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        email: "",
        fullName: "",
        username: "",
        gender: "",
        id: "",
        dob: "",
        address: "",
        role: ""
    },
    isAuthenticated: false,
    isLoading: true,
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        loginAction: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        getAccountAction: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
    },
});

export const { loginAction, getAccountAction } = accountSlice.actions;

export default accountSlice.reducer;