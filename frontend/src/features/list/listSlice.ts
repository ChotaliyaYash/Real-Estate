import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { addListCall, getListCall } from './listApi'

const initialState: listStateType = {
    error: null,
    loading: false,
    listing: [],
}

export const addListAsyncThunk = createAsyncThunk(
    "list/add",
    async (data: listModelType, { rejectWithValue }) => {
        try {
            console.log("data", data);

            const res = await addListCall(data);
            const resData: listResponseType = res.data;
            return resData.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const getListAsyncThunk = createAsyncThunk(
    "list/get",
    async () => {
        try {
            const res = await getListCall();
            const resData: listResponseType = res.data;
            return resData.data;
        } catch (error) {
            return error;
        }
    }
)

export const listSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder

            // add list
            .addCase(addListAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(addListAsyncThunk.fulfilled, (state, action: PayloadAction<listModelType>) => {
                state.loading = false;
                state.listing!.push(action.payload);
            })
            .addCase(addListAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as catchErrorType;
            })

            // get list
            .addCase(getListAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getListAsyncThunk.fulfilled, (state, action: PayloadAction<listModelType[]>) => {
                state.loading = false;
                state.listing = action.payload;
            })
            .addCase(getListAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as catchErrorType;
            })

        // 
    },
})

export const { } = listSlice.actions

export default listSlice.reducer