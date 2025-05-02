import { Button, Card, Flex, Space, Table, Tag, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getRoomStatusColor, RoomStatus, RoomType } from "../models/RoomModel";
import Icon, * as Icons from "@ant-design/icons";
import * as UseCase from "../usecase/roomsUsecase";
import { useEffect } from "react";


const RoomListCard: React.FC = () => {
    const { t } = useTranslation()
    const { isLoading, rooms } = useAppSelector(state => state.rooms)
    const dispatch = useAppDispatch()

    useEffect(() => {
        UseCase.fetchAllRooms(dispatch)
    }, [dispatch])

    const title = (
        <Flex justify="space-between" align="center">
            {t('rooms')}
            <Space direction="horizontal">
                <Button title={t('create')} ><Icons.PlusOutlined /></Button>
                <Button title={t('refresh')} onClick={() => UseCase.fetchAllRooms(dispatch)}><Icons.ReloadOutlined /></Button>
            </Space>
        </Flex>
    )

    return (
        <Card title={title}>
            <Table loading={isLoading} dataSource={rooms} columns={[
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
                    render: (roomType) => <Typography.Text>{ t(roomType) }</Typography.Text>,
                    filters: Object.keys(RoomType).map((roomType) => ({ text: t(roomType), value: roomType })),
                    filterMode: 'menu',
                    filterSearch: true,
                    onFilter(value, record) {
                        return record.roomType === value
                    }
                },
                {
                    key: 'status',
                    width: 150,
                    title: t('status'),
                    dataIndex: 'status',
                    render: (status) => <Tag key={status} color={getRoomStatusColor(status)}> {t(status)}</Tag>,
                    filters: Object.keys(RoomStatus).map((status) => ({ text: t(status), value: status })),
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
                    render: (text, record) => (
                        <Space size={0}>
                            <Button disabled={record.status !== 'available'} size="small"> <Icons.UserAddOutlined/> </Button>
                            <Button disabled={record.status !== 'occupied'} size="small"> <Icons.UserDeleteOutlined /> </Button>
                            <Button disabled={record.status === 'unavailable'} size="small"> <Icons.ClearOutlined/> </Button>
                        </Space>
                    )
                }
            ]} />
        </Card>
    )
};

export default RoomListCard;
