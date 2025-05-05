import { App, Button, Card, Dropdown, Flex, Space, Table, Tag, Typography, Modal, message } from "antd"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getStatusColor, RoomModelType, RoomStatusEnum, RoomType } from "../models/RoomModel"
import Icon, * as Icons from "@ant-design/icons"
import { useEffect, useState } from "react"
import * as Repo from "../repository/repository"
import { RoomTypeListCard } from "./RoomTypeListCard"
import { NewRoomCard } from "./NewRoomCard"

const RoomListCard: React.FC = () => {
    const { t } = useTranslation()
    const { modal } = App.useApp()
    const [roomTypes, setRoomTypes] = useState<RoomType[]>([])
    const [showRoomTypeList, setShowRoomTypeList] = useState(false)
    const [showAddNewRoom, setShowAddNewRoom] = useState(false)
    const [rooms, setRooms] = useState<RoomModelType[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAppSelector((state) => state.auth)

    const reloadData = () => {
        setIsLoading(true)
        Repo.getAllRoomTypes()
            .then((roomTypes) => {
                setRoomTypes(roomTypes)
                Repo.getAllRooms()
                    .then((rooms) => { setRooms(rooms) })
                    .catch((error) => { modal.error({ title: t('error'), content: t(error) }) })
                    .finally(() => { setIsLoading(false) })
            })
            .catch((error) => {
                modal.error({ title: t('error'), content: t(error) })
                setIsLoading(false)
            })
    }

    const deleteRoom = (record: RoomModelType) => {
        setIsLoading(true)
        Repo.deleteRoom(record.id)
            .then((rooms) => {
                message.success(t('success'))
                setRooms(rooms)
            })
            .catch((error) => {
                message.error(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const find = (roomTypeId: string): RoomType | undefined => {
        return roomTypes.find((roomType) => roomType.id === roomTypeId)
    }

    useEffect(() => {
        reloadData()
    }, [])

    const title = (
        <Flex justify="space-between" align="center">
            {t('rooms')}
            <Space direction="horizontal">
                <Dropdown placement="bottomRight" menu={{
                    items: [
                        { 
                            icon: <Icons.FileAddOutlined />,
                            key: 'add_new_room',
                            label: t('add_new_room'),
                            onClick: () => { setShowAddNewRoom(true) }
                        },
                        {
                            icon: <Icons.FolderAddOutlined />,
                            key: 'add_new_room_type',
                            label: t('add_new_room_type'),
                            onClick: () => { setShowRoomTypeList(true) }
                        }]
                }}>
                    <Button style={user?.role !== 'admin' ? { display: 'none' } : undefined} title={t('create')}><Icons.PlusOutlined /></Button>
                </Dropdown>
                <Button title={t('refresh')} onClick={_ => reloadData()}><Icons.ReloadOutlined /></Button>
            </Space>
        </Flex>
    )

    return (
        <Card title={title}>
            <Modal
                title={t('add_new_room')}
                open={showAddNewRoom}
                destroyOnClose
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                onCancel={() => setShowAddNewRoom(false)}>
                <NewRoomCard onSuccess={rooms => { setRooms(rooms); setShowAddNewRoom(false) }} />
            </Modal>

            <Modal
                title={t('add_new_room_type')}
                open={showRoomTypeList}
                destroyOnClose
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                onCancel={() => setShowRoomTypeList(false)}>
                <RoomTypeListCard onChange={setRoomTypes} />
            </Modal>

            <Table loading={isLoading} dataSource={rooms} bordered columns={[
                {
                    key: 'id',
                    title: 'id',
                    dataIndex: 'id'
                },
                {
                    key: 'name',
                    title: t('room_name'),
                    dataIndex: 'name'
                },
                {
                    key: 'description',
                    title: t('description'),
                    dataIndex: 'description'
                },
                {
                    key: 'roomTypeId',
                    width: 150,
                    title: t('room_type'),
                    dataIndex: 'roomTypeId',
                    render: (roomTypeId) => <Typography.Text>{find(roomTypeId)?.name}</Typography.Text>,
                    filters: roomTypes.map((roomType) => ({ text: roomType.name, value: roomType.id })),
                    filterMode: 'menu',
                    filterSearch: true,
                    onFilter(value, record) {
                        return record.roomTypeId === value
                    }
                },
                {
                    key: 'status',
                    width: 150,
                    title: t('status'),
                    dataIndex: 'status',
                    render: (status) => <Tag color={getStatusColor(status)}> {t(status)} </Tag>,
                    filters: Object.keys(RoomStatusEnum).map((status) => ({ text: t(status), value: status })),
                    filterMode: 'menu',
                    filterSearch: true,
                    onFilter(value, record) {
                        return record.status === value
                    }
                },
                {
                    key: 'action',
                    title: t('action'),
                    dataIndex: 'action',
                    width: 150,
                    fixed: 'right',
                    render: (_, record) => (
                        <Space size={0}>
                            <Button disabled={record.status !== RoomStatusEnum.available} size="small"> <Icons.UserAddOutlined /> </Button>
                            <Button disabled={record.status !== RoomStatusEnum.occupied} size="small"> <Icons.UserDeleteOutlined /> </Button>
                            <Button disabled={record.status === RoomStatusEnum.cleaning} size="small"> <Icons.ClearOutlined /> </Button>
                            <Button danger size="small" onClick={_ => deleteRoom(record)}> <Icons.DeleteOutlined />
                            </Button>
                        </Space>
                    )
                }
            ]} />
        </Card>
    )
}

export default RoomListCard
