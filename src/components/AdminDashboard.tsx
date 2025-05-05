import { Card } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const AdminDashboard: FC = () => { 
    const { t } = useTranslation()
    return (
        <Card title={ t('administrator') }>

        </Card>
    )
}