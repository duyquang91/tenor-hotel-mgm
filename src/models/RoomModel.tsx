import * as Colors from '@ant-design/colors'

export interface RoomModelType {
    id: string
    name: string
    description: string
    imageUrl: string
    roomType: RoomType
    status: RoomStatusType
}

export enum RoomStatusEnum {
    available = 'available',
    occupied = 'occupied',
    unavailable = 'unavailable',
    cleaning = 'cleaning',
    reserved = 'reserved'
}

export interface RoomStatusType {
    key: string
    color: string
}

export interface RoomType {
    id: string
    name: string
    description: string | undefined
}