import { createSlice } from "@reduxjs/toolkit";
import { RoomModelType } from "../../models/RoomModel";

const mockRooms = [
    {
        id: "1",
        name: "Room 101",
        description: "A cozy room with a beautiful view.",
        imageUrl: "https://example.com/room101.jpg",
        numberOfBeds: 2,
        status: "available",
    },
    {
        id: "2",
        name: "Room 102",
        description: "A spacious room with modern amenities.",
        imageUrl: "https://example.com/room102.jpg",
        numberOfBeds: 1,
        status: "occupied",
    },
]

const roomsSlice = createSlice({
  name: "rooms",
    initialState: {
        rooms: mockRooms,
    },
    reducers: {
        fetchRooms: (state) => {
            state.rooms = mockRooms
        }
  }
})

export const { fetchRooms } = roomsSlice.actions
export default roomsSlice.reducer