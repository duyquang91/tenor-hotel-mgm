import { Button, Card, Form, Input, App, Dropdown, Select } from "antd"
import { useTranslation } from "react-i18next"
import * as Icons from "@ant-design/icons"
import * as Repo from "../repository/repository"
import { use, useEffect, useState } from "react"
import { RoomType } from "../models/RoomModel"

export const NewRoomCard: React.FC = () => { 
    const [ t ] = useTranslation()
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
        <Card title={t('add_new_room')} style={{ margin: 16 }}>
            <Form layout="vertical">
                <Form.Item label="id" name="id" required>
                    <Input allowClear/>
                </Form.Item>
                <Form.Item label={t('name')} name="name" required>
                    <Input allowClear/>
                </Form.Item>
                <Form.Item label="description" name="description">
                    <Input allowClear/>
                </Form.Item>
                <Form.Item label="room_type" name="room_type" required>
                    <Select>
                        {roomTypes.map((roomType) => (
                            <Select.Option key={roomType.id} value={roomType.id}>
                                {roomType.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        <Icons.PlusOutlined/>
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}