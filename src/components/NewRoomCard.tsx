import { Button, Card, Form, Input, App, Dropdown, Select } from "antd"
import { useTranslation } from "react-i18next"
import * as Icons from "@ant-design/icons"
import * as Repo from "../repository/repository"
import { use, useEffect, useState } from "react"
import { RoomModelType, RoomType } from "../models/RoomModel"

export const NewRoomCard: React.FC<{ onSuccess: (rooms:RoomModelType[]) => void }> = (props) => {
    const [t] = useTranslation()
    const [roomTypes, setRoomTypes] = useState<RoomType[]>([])
    const { message } = App.useApp()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        Repo.getAllRoomTypes()
            .then((roomTypes) => {
                setRoomTypes(roomTypes)
            })
            .catch((error) => {
                message.error(error.message)
            })
    }, [])

    const onFormFinish = (room: RoomModelType) => { 
        setLoading(true)
        Repo.updateOrCreateRoom(room)
            .then((rooms) => {
                message.success(t("success"))
                props.onSuccess(rooms)
            })
            .catch((error) => {
                message.error(error.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Form layout="vertical" onFinish={ onFormFinish }>
            <Form.Item label="id" name="id" rules={[{ required: true, whitespace: true }]}>
                <Input allowClear />
            </Form.Item>
            <Form.Item label={t('name')} name="name" rules={[{ required: true, whitespace: true }]}>
                <Input allowClear />
            </Form.Item>
            <Form.Item label={t("description")} name="description">
                <Input allowClear />
            </Form.Item>
            <Form.Item label={t('room_type')} name="roomTypeId" rules={[{ required: true, whitespace: true }]}>
                <Select>
                    {roomTypes.map((roomType) => (
                        <Select.Option key={roomType.id} value={roomType.id}>
                            {roomType.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit">
                    <Icons.PlusOutlined />
                </Button>
            </Form.Item>
        </Form>
    )
}