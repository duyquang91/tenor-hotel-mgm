import { App, Button, Card, Divider, Form, Input, Space, Table } from 'antd'
import * as Repo from '../repository/repository'
import { useTranslation } from 'react-i18next'
import { RoomType } from '../models/RoomModel'
import { useEffect, useState } from 'react'
import * as Icons from '@ant-design/icons'

export const RoomTypeListCard: React.FC<{ onChange: (roomTypes: RoomType[]) => void }> = (prop) => {
    const [t] = useTranslation()
    const [roomTypes, setRoomTypes] = useState<RoomType[]>([])
    const { message } = App.useApp()
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm()

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

    const addNewRoomType = (room: RoomType) => {
        setIsLoading(true)
        Repo.updateOrCreateRoomType(room)
            .then((res) => {
                message.success(t('success'))
                setRoomTypes(res)
                prop.onChange(res)
                form.resetFields()
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
            <Form form={form} layout='vertical' onFinish={addNewRoomType}>
                <Form.Item label="id" name="id" rules={[{ required: true, message: t('required') }]}>
                    <Input allowClear />
                </Form.Item>
                <Form.Item label={t('name')} name="name" rules={[{ required: true, message: t('required') }]}>
                    <Input allowClear />
                </Form.Item>
                <Form.Item label="description" name="description">
                    <Input allowClear />
                </Form.Item>
                <Form.Item>
                    <Space direction="horizontal">
                        <Button type="primary" htmlType="submit">
                            <Icons.PlusOutlined />
                        </Button>
                    </Space>
                </Form.Item>
            </Form>

            <Divider />

            <Table bordered loading={isLoading} dataSource={roomTypes} columns={[
                { title: 'id', key: 'id', dataIndex: 'id' },
                { title: 'name', key: 'name', dataIndex: 'name' },
                { title: 'description', key: 'description', dataIndex: 'description' }]} />
        </Card>
    )
}