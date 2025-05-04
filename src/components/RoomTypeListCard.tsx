import { App, Button, Card, Divider, Input, Space, Table } from 'antd'
import * as Repo from '../repository/repository'
import { useTranslation } from 'react-i18next'
import { RoomType } from '../models/RoomModel'
import { useEffect, useState } from 'react'
import * as Icons from '@ant-design/icons'

export const RoomTypeListCard: React.FC<{onChange: (roomTypes: RoomType[]) => void}> = (prop) => {
    const [t] = useTranslation()
    const [roomTypes, setRoomTypes] = useState<RoomType[]>([])
    const { message } = App.useApp()
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [enableAdd, setEnableAdd] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        Repo.getAllRoomTypes()
            .then((roomTypes) => {
                setRoomTypes(roomTypes)
            })
            .catch((error) => {
                message.error(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {
        setEnableAdd(id.length === 0 || name.length === 0)
    }, [id, name])

    const addNewRoomType = () => {
        setIsLoading(true)
        Repo.updateOrCreateRoomType({ id, name, description: desc })
            .then((res) => {
                message.success(t('success'))
                setRoomTypes(res)
                prop.onChange(res)
                setId('')
                setName('')
                setDesc('')
            })
            .catch((error) => {
                message.error(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <Card title={t('add_new_room_type')} style={{ margin: 16 }}>
            <Space direction="horizontal">
                <Input
                    placeholder='id'
                    value={id}
                    allowClear
                    onChange={(e) => setId(e.target.value)}
                />
                <Input
                    placeholder='name'
                    value={name}
                    allowClear
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    placeholder='description'
                    value={desc}
                    allowClear
                    onChange={(e) => setDesc(e.target.value)}
                />
                <Button onClick={addNewRoomType} disabled={enableAdd} type='primary'><Icons.PlusOutlined /></Button>
            </Space>

            <Divider />

            <Table bordered loading={isLoading} dataSource={roomTypes} columns={[
                { title: 'id', key: 'id', dataIndex: 'id' },
                { title: 'name', key: 'name', dataIndex: 'name' },
                { title: 'description', key: 'description', dataIndex: 'description' }]} />
        </Card>
    )
}