import { App, Button, Card, Divider, Form, Input, Layout, Space, Table, Typography } from 'antd'
import * as Repo from '../repository/repository'
import { useTranslation } from 'react-i18next'
import { RoomType } from '../models/RoomModel'
import { useEffect, useState } from 'react'
import * as Icons from '@ant-design/icons'
import { TableRowSelection } from 'antd/es/table/interface'

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
        <Space direction='vertical' style={{ width: '100%' }}>
            <Form style={{ paddingTop: 16 }} labelCol={{ span: 5 }} labelAlign='left' form={form} layout='horizontal' onFinish={addNewRoomType}>
                <Form.Item label="id" name="id" rules={[{ required: true, whitespace: true }]}>
                    <Input allowClear />
                </Form.Item>
                <Form.Item label={t('name')} name="name" rules={[{ required: true, whitespace: true}]}>
                    <Input allowClear />
                </Form.Item>
                <Form.Item label={t("description")} name="description">
                    <Input allowClear />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        <Icons.PlusOutlined />
                    </Button>
                </Form.Item>
            </Form>

            {/* <Divider /> */}

            <Table
                bordered
                loading={isLoading}
                dataSource={roomTypes}
                columns={[
                    { title: 'id', dataIndex: 'id' },
                    { title: t('name'), dataIndex: 'name' },
                    { title: t('description'), dataIndex: 'description' },
                    {
                        title: t('action'),
                        render: (text, record) =>
                            <Button
                                size='small'
                                danger
                                onClick={() => { 
                                    setIsLoading(true)
                                    Repo.deleteRoomType(record.id)
                                        .then((res) => {
                                            message.success(t('success'))
                                            setRoomTypes(res)
                                            prop.onChange(res)
                                        })
                                        .catch((error) => {
                                            message.error(error.message)
                                        })
                                        .finally(() => {
                                            setIsLoading(false)
                                        })
                                }}>
                                <Icons.DeleteOutlined />
                            </Button>
                    },
                ]}
            />
        </Space>
    )
}