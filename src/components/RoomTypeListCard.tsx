import { App, Card, Table } from 'antd'
import * as Repo from '../repository/repository'
import { useTranslation } from 'react-i18next'
import { RoomType } from '../models/RoomModel'
import { useEffect, useState } from 'react'

export const RoomTypeListCard: React.FC = () => {
    const [t] = useTranslation()
    const [roomTypes, setRoomTypes] = useState<RoomType[]>([])
    const { message } = App.useApp()

    useEffect(() => {
        Repo.getAllRoomTypes()
            .then((roomTypes) => {
                setRoomTypes(roomTypes)
            })
            .catch((error) => {
                message.error(error.message)
            })
    }, [])

    return (
        <Card title={t('room_type')}>
            <Table dataSource={roomTypes} columns={ [ { title:'id', key:'id', dataIndex: 'id' }, { title:'name', key:'name', dataIndex: 'name' }, { title:'description', key:'description', dataIndex: 'description' } ] } />
        </Card>
    )
}