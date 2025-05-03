import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RoomModelType } from "../../models/RoomModel";
import * as Repo from "../../repository/repository";

export const fetchAllRooms = createAsyncThunk<RoomModelType[]>('rooms/fetch', async (_, thunk) => {
    return await Repo.getAllRooms()
})

const roomsSlice = createSlice({
  name: "rooms",
    initialState: {
        isLoading: false,
        error: undefined as string | undefined,
        rooms: [] as RoomModelType[],
    },
    reducers: {},
    extraReducers: (builder) => { 
        builder
            .addCase(fetchAllRooms.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(fetchAllRooms.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = undefined
                state.rooms = action.payload
            })
            .addCase(fetchAllRooms.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})

export default roomsSlice.reducer
