import * as Colors from '@ant-design/colors'
import { useTranslation } from 'react-i18next'

interface RoomModelType {
    id: string
    name: string
    description: string 
    imageUrl: string
    numberOfBeds: number
    status: string
}

function useRoomStatus(status: string): { color: string | undefined; title: string } {
    const { t } = useTranslation();
    const roomStatus = RoomStatus[status as keyof typeof RoomStatus];
    return {
        color: roomStatus.color.primary,
        title: t(status),
    }
}

const RoomStatus = {
    available: { color: Colors.green },
    occupied: { color: Colors.orange },
    cleaning: { color: Colors.yellow },
    reserved: { color: Colors.blue },
    unavailable: { color: Colors.red },
};

enum BedType {
    Single = 'Single',
    Double = 'Double',
    Queen = 'Queen',
    King = 'King',
}

export { RoomStatus, useRoomStatus }
export type { BedType, RoomModelType }