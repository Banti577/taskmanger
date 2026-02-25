import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { AuthState } from '@/lib/types/interface'

export const checkAuth = createAsyncThunk("auth/getUser",
    async () => {
        try {
            const res = await fetch(`/api/user`, {
                credentials: "include",
            });
            const data = await res.json();

            console.log('dataa is reduxe', data)

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