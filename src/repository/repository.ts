import { RoomModelType, RoomType } from "../models/RoomModel"

export const getAllRooms = (): Promise<RoomModelType[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const rooms = JSON.parse(localStorage.getItem("rooms") || "[]")
            resolve(rooms)
        }, 1000)
    })
}

export const updateOrCreateRoom = (room: RoomModelType): Promise<RoomModelType> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const rooms: RoomModelType[] = JSON.parse(localStorage.getItem("rooms") || "[]")
            const index = rooms.findIndex(r => r.id === room.id)
            if (index === -1) {
                rooms.push(room)
            } else { 
                rooms[index] = room
            }
            localStorage.setItem("rooms", JSON.stringify(rooms))
            resolve(room)
        }, 1000)
    })
}

export const deleteRoom = (roomId: string): Promise<RoomModelType[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const rooms: RoomModelType[] = JSON.parse(localStorage.getItem("rooms") || "[]")
            const index = rooms.findIndex(r => r.id === roomId)
            if (index === -1) { 
                reject(new Error("Room not found"))
            } else {
                rooms.splice(index, 1)
                localStorage.setItem("rooms", JSON.stringify(rooms))
            }
            resolve(rooms)
        }, 1000)
    })
}

export const getAllRoomTypes = (): Promise<RoomType[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const roomTypes = JSON.parse(localStorage.getItem("roomTypes") || "[]")
            resolve(roomTypes)
        }, 1000)
    })
}

export const updateOrCreateRoomType = (roomType: RoomType): Promise<RoomType> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const roomTypes: RoomType[] = JSON.parse(localStorage.getItem("roomTypes") || "[]")
            const index = roomTypes.findIndex(rt => rt.id === roomType.id)
            if (index === -1) {
                roomTypes.push(roomType)
            } else { 
                roomTypes[index] = roomType
            }
            localStorage.setItem("roomTypes", JSON.stringify(roomTypes))
            resolve(roomType)
        }, 1000)
    })
}

export const deleteRoomType = (roomTypeId: string): Promise<RoomType[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const roomTypes: RoomType[] = JSON.parse(localStorage.getItem("roomTypes") || "[]")
            const index = roomTypes.findIndex(rt => rt.id === roomTypeId)
            if (index === -1) { 
                reject(new Error("Room type not found"))
            } else {
                roomTypes.splice(index, 1)
                localStorage.setItem("roomTypes", JSON.stringify(roomTypes))
            }
            resolve(roomTypes)
        }, 1000)
    })
}

