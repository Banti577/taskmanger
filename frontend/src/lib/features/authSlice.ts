import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { AuthState, AuthResponse } from '@/lib/types/interface'

export const checkAuth = createAsyncThunk<AuthResponse | null>("auth/getUser",
    async () => {
        try {
            const res = await fetch(`/api/user`, {
                credentials: "include",
            });
            const data = await res.json();

            return data;
        }
        catch (err) {
            console.error("Error fetching user:", err);

        }
    }
)

const initialState: AuthState = {
    user: null,
    isLoading: false,
    isChecked: false,
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null

        },
        updateUser: (state) => {

        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                console.log('action payload 888 ', action.payload)
                state.user = action.payload.user;

                state.isLoading = false;
                state.isChecked = true;

            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.isChecked = true;
            });
    },
})



export const { logout, updateUser } = authSlice.actions;
export default authSlice.reducer;