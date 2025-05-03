import { RoomModelType } from "../models/RoomModel";

const getAllRooms = ():Promise<RoomModelType[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                reject(new Error("This is a random mock error for testing"))
            } else { 
                const roomTypes = ['standard', 'president', 'premium'];
                const statuses = ['available', 'occupied', 'unavailable', 'cleaning', 'reserved'];
                const rooms = Array.from({ length: 50 }, (_, index) => ({
                    id: (index + 1).toString(),
                    name: `Room ${100 + index + 1}`,
                    description: "A room with randomly generated attributes.",
                    imageUrl: `https://example.com/room${100 + index + 1}.jpg`,
                    roomType: roomTypes[Math.floor(Math.random() * roomTypes.length)],
                    numberOfBeds: Math.floor(Math.random() * 3) + 1, 
                    status: statuses[Math.floor(Math.random() * statuses.length)],
                }));
                resolve(rooms);
            }
        }, 1000)
    })
}

export { getAllRooms };
