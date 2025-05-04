import { App, Button, Card, Dropdown, Flex, Space, Table, Tag, Typography, Modal } from "antd"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { RoomStatusEnum, RoomType } from "../models/RoomModel"
import Icon, * as Icons from "@ant-design/icons"
import { useEffect, useState } from "react"
import { fetchAllRooms } from "../redux/slices/roomsSlice"
import * as Repo from "../repository/repository"
import { RoomTypeListCard } from "./RoomTypeListCard"
import { NewRoomCard } from "./NewRoomCard"

const RoomListCard: React.FC = () => {
    const { t } = useTranslation()
    const { isLoading, rooms, error } = useAppSelector(state => state.rooms)
    const dispatch = useAppDispatch()
    const { modal } = App.useApp()
    const [roomTypes, setRoomTypes] = useState<RoomType[]>([])
    const [showRoomTypeList, setShowRoomTypeList] = useState(false)
    const [showAddNewRoom, setShowAddNewRoom] = useState(false)

    useEffect(() => {
        dispatch(fetchAllRooms())
        Repo.getAllRoomTypes()
            .then((roomTypes) => {
                setRoomTypes(roomTypes)
            })
            .catch((error) => {
                modal.error({ title: t('error'), content: t(error) })
            })
    }, [dispatch])

    useEffect(() => {
        if (error) {
            modal.error({
                title: t('error'),
                content: t(error)
            })
        }
    }, [modal, t, error])

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
                    <Button title={t('create')}><Icons.PlusOutlined /></Button>
                </Dropdown>
                <Button title={t('refresh')} onClick={() => dispatch(fetchAllRooms())}><Icons.ReloadOutlined /></Button>
            </Space>
        </Flex>
    )

    return (
        <Card title={title}>
            <Modal
                open={showAddNewRoom}
                destroyOnClose
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                onCancel={() => setShowAddNewRoom(false)}>
                    <NewRoomCard />
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
                    key: 'name',
                    title: t('room_name'),
                    dataIndex: 'name'
                },
                {
                    key: 'roomType',
                    width: 150,
                    title: t('room_type'),
                    dataIndex: 'roomType',
                    render: (roomType) => <Typography.Text>{t(roomType)}</Typography.Text>,
                    filters: roomTypes.map((roomType) => ({ text: t(roomType.name), value: roomType.id })),
                    filterMode: 'menu',
                    filterSearch: true,
                    onFilter(value, record) {
                        return record.roomType.id === value
                    }
                },
                {
                    key: 'status',
                    width: 150,
                    title: t('status'),
                    dataIndex: 'status',
                    render: (status) => <Tag key={status} color={status.color}> {t(status)}</Tag>,
                    filters: Object.keys(RoomStatusEnum).map((status) => ({ text: t(status), value: status })),
                    filterMode: 'menu',
                    filterSearch: true,
                    onFilter(value, record) {
                        return record.status.key === value
                    }
                },
                {
                    key: 'action',
                    title: t('action'),
                    dataIndex: 'action',
                    width: 150,
                    render: (text, record) => (
                        <Space size={0}>
                            <Button disabled={record.status.key !== RoomStatusEnum.available} size="small"> <Icons.UserAddOutlined /> </Button>
                            <Button disabled={record.status.key !== RoomStatusEnum.occupied} size="small"> <Icons.UserDeleteOutlined /> </Button>
                            <Button disabled={record.status.key === RoomStatusEnum.cleaning} size="small"> <Icons.ClearOutlined /> </Button>
                        </Space>
                    )
                }
            ]} />
        </Card>
    )
}

export default RoomListCard
