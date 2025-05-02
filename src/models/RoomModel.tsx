import * as Colors from '@ant-design/colors'
import { useTranslation } from 'react-i18next'

interface RoomModelType {
    id: string
    name: string
    description: string 
    imageUrl: string
    numberOfBeds: number
    roomType: string
    status: string
}

const getRoomStatusColor = (status: string) => {
    return RoomStatus[status as keyof typeof RoomStatus].color
}

const RoomStatus = {
    available: { color: 'green' },
    occupied: { color: 'red' },
    cleaning: { color: 'orange' },
    reserved: { color: 'blue' },
    unavailable: { color: 'gray' },
};

const RoomType = {
    president: 'president',
    premium: 'premium',
    standard: 'standard',
}

export { RoomType, RoomStatus, getRoomStatusColor }
export type { RoomModelType }