import { AppDispatch } from "../redux/store";
import { fetchRoomsError, fetchRoomsStart, fetchRoomsSuccess } from "../redux/slices/roomsSlice";

function fetchAllRooms(dispatch: AppDispatch) {
    let api = new Promise((resolve) => {

        setTimeout(() => {
            resolve([
                {
                    id: "1",
                    name: "Room 101",
                    description: "A cozy room with a beautiful view.",
                    imageUrl: "https://example.com/room101.jpg",
                    roomType: 'standard',
                    numberOfBeds: 2,
                    status: "available",
                },
                {
                    id: "2",
                    name: "Room 102",
                    description: "A spacious room with modern amenities.",
                    imageUrl: "https://example.com/room102.jpg",
                    roomType: 'president',
                    numberOfBeds: 1,
                    status: "occupied",
                },
                {
                    id: "3",
                    name: "Room 103",
                    description: "A spacious room with modern amenities.",
                    imageUrl: "https://example.com/room102.jpg",
                    roomType: 'standard',
                    numberOfBeds: 1,
                    status: "unavailable",
                },
                {
                    id: "4",
                    name: "Room 104",
                    description: "A spacious room with modern amenities.",
                    imageUrl: "https://example.com/room102.jpg",
                    roomType: 'standard',
                    numberOfBeds: 1,
                    status: "cleaning",
                },
                {
                    id: "5",
                    name: "Room 105",
                    description: "A spacious room with modern amenities.",
                    imageUrl: "https://example.com/room102.jpg",
                    numberOfBeds: 1,
                    roomType: 'premium',
                    status: "reserved",
                },
            ])
        }, 1000)
    })
    dispatch(fetchRoomsStart())
    api.then((data) => {
        dispatch(fetchRoomsSuccess(data))
    }).catch((error) => { 
        dispatch(fetchRoomsError(error))
    })
}

export { fetchAllRooms };