import { Card, Table, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../redux/hooks";
import { useRoomStatus } from "../models/RoomModel";

const RoomListCard: React.FC = () => {
    const { t } = useTranslation()
    const { rooms } = useAppSelector(state => state.rooms)

	return (
        <Card title={ t('rooms') }>
            <Table dataSource={rooms} columns={[
                { key: 'name', title: t('room_name'), dataIndex: 'name' },
                { key: 'status', title: t('status'), dataIndex: 'status', render: (status) => <Tag key={status}> {t(status)}</Tag> },
            ]} />
        </Card>
	)
};

export default RoomListCard;
