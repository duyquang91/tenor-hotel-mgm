import * as Colors from '@ant-design/colors'

export interface RoomModelType {
    id: string
    name: string
    description: string
    imageUrl: string
    roomTypeId: string
    status?: string
}

export interface RoomType {
    id: string
    name: string
    description: string | undefined
}

export interface RoomStatusType {
    key: string
    color: string
}

export enum RoomStatusEnum {
    available = 'available',
    occupied = 'occupied',
    unavailable = 'unavailable',
    cleaning = 'cleaning',
    reserved = 'reserved'
}

export const getStatusColor = (status: string): string => { 
    switch (status) {
        case RoomStatusEnum.available:
            return Colors.green[5]
        case RoomStatusEnum.occupied:
            return Colors.red[5]
        case RoomStatusEnum.unavailable:
            return Colors.volcano[5]
        case RoomStatusEnum.cleaning:
            return Colors.blue[5]
        case RoomStatusEnum.reserved:
            return Colors.orange[5]
        default:
            return Colors.green[5]
    }
}

