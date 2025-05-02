import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomModelType } from "../../models/RoomModel";

const roomsSlice = createSlice({
  name: "rooms",
    initialState: {
        isLoading: false,
        error: null,
        rooms: [] as RoomModelType[],
    },
    reducers: {
        fetchRoomsStart: (state) => {
            state.isLoading = true
            state.error = null
        },
        fetchRoomsSuccess: (state, action) => {
            state.isLoading = false
            state.error = null
            state.rooms = action.payload
        },
        fetchRoomsError: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
  }
})

export const { fetchRoomsStart, fetchRoomsSuccess, fetchRoomsError } = roomsSlice.actions
export default roomsSlice.reducer