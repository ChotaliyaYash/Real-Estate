import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { addListCall, getListCall, deleteUserListCall, getUserListCall, updateUserListCall, getListByIdCall } from './listApi'

const initialState: listStateType = {
    error: null,
    loading: false,
    listing: [],
}

export const addListAsyncThunk = createAsyncThunk(
    "list/add",
    async (data: listModelType, { rejectWithValue }) => {
        try {
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

export const deleteUserListAsyncThunk = createAsyncThunk(
    "list/delete",
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await deleteUserListCall(id);
            const resData: listResponseType = res.data;
            return resData;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const getUserListAsyncThunk = createAsyncThunk(
    "list/getUserListing",
    async () => {
        try {
            const res = await getUserListCall();
            const resData: listResponseType = res.data;
            return resData.data;
        } catch (error) {
            return error;
        }
    }
)

export const updateUserListAsyncThunk = createAsyncThunk(
    "list/update",
    async (data: { id: string, data: listModelType }, { rejectWithValue }) => {
        try {
            const res = await updateUserListCall(data.id, data.data);
            const resData: listResponseType = res.data;
            return resData.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const getListByIdAsyncThunk = createAsyncThunk(
    "list/getById",
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await getListByIdCall(id);
            const resData: listResponseType = res.data;
            return resData.data;
        } catch (error) {
            return rejectWithValue(error);
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

            // delete user list
            .addCase(deleteUserListAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUserListAsyncThunk.fulfilled, (state, action: PayloadAction<listResponseType>) => {
                state.loading = false;
                state.listing = state.listing!.filter((list) => list._id !== action.payload.data._id);
                state.error = null;
            })
            .addCase(deleteUserListAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as catchErrorType;
            })

            // get user list
            .addCase(getUserListAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserListAsyncThunk.fulfilled, (state, action: PayloadAction<listModelType[]>) => {
                state.loading = false;
                state.listing = action.payload;
            })
            .addCase(getUserListAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as catchErrorType;
            })

            // update user list
            .addCase(updateUserListAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserListAsyncThunk.fulfilled, (state, action: PayloadAction<listModelType>) => {
                state.loading = false;
                state.listing = state.listing!.map((list) => list._id === action.payload._id ? action.payload : list);
            })
            .addCase(updateUserListAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as catchErrorType;
            })
    },
})

export const { } = listSlice.actions

export default listSlice.reducer