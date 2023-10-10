import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { catchErrorType, userDataType, userResponseType } from '../../vite-env'
import { loginCall, signupcall, signupWithGoogleCall } from './userApi'

export interface CounterState {
    error: catchErrorType | null,
    loading: boolean,
    currentUser: userDataType | null
}

const initialState: CounterState = {
    error: null,
    loading: false,
    currentUser: null,
}

export const loginAsyncThunk = createAsyncThunk(
    'user/login',
    async (data: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const res = await loginCall(data);
            const resData: userResponseType = res.data;
            return resData.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const signupAsyncThunk = createAsyncThunk(
    'user/register',
    async (data: { username: string, email: string, password: string }, { rejectWithValue }) => {
        try {
            const res = await signupcall(data);
            const resData: userResponseType = res.data;
            return resData.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const signupWithGoogleAsyncThunk = createAsyncThunk(
    'user/google',
    async (data: { username: string, email: string, avatar: string }, { rejectWithValue }) => {
        try {
            const res = await signupWithGoogleCall(data);
            const resData: userResponseType = res.data;
            return resData.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserFromStorage: (state) => {
            localStorage.getItem('user') && (state.currentUser = JSON.parse(localStorage.getItem('user') as string));
        }
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(loginAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginAsyncThunk.fulfilled, (state, action: PayloadAction<userDataType>) => {
                // local storage
                localStorage.setItem('user', JSON.stringify(action.payload));

                state.loading = false;
                state.currentUser = action.payload;
                state.error = null;
            })
            .addCase(loginAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as catchErrorType;
            })

            // signup
            .addCase(signupAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(signupAsyncThunk.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(signupAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as catchErrorType;
            })

            // signup with google
            .addCase(signupWithGoogleAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(signupWithGoogleAsyncThunk.fulfilled, (state, action: PayloadAction<userDataType>) => {
                // local storage
                localStorage.setItem('user', JSON.stringify(action.payload));

                state.loading = false;
                state.currentUser = action.payload;
                state.error = null;
            })
            .addCase(signupWithGoogleAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as catchErrorType;
            })
    },
})

export const { getUserFromStorage } = userSlice.actions

export default userSlice.reducer