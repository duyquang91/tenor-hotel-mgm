import { Card, Menu, Typography, Layout } from 'antd'
import * as Icons from '@ant-design/icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { logout } from '../redux/slices/authSlice'
import { useAppDispatch } from '../redux/hooks'
import { useTheme } from '../contexts/ThemeContext'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import RoomListCard from './RoomListCard'

const Container: React.FC = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { theme, toggleTheme } = useTheme()
    const [getCollapsed, setCollapsed] = useState(false)

    return (
        <Layout>
            <Sider className='ant-sider' theme={theme} width='260' style={{ margin: 8, borderRadius: 8 }} collapsible onCollapse={(e) => { setCollapsed(e) }} >
                <Typography.Title level={5} style={{ paddingLeft: 32 }}> <Icons.HomeOutlined /> {!getCollapsed && t('app_title')} </Typography.Title>
                <Menu mode='inline' title='Action' defaultOpenKeys={['1']}>
                    <Menu.SubMenu key='1' icon={<Icons.EditOutlined />} title={t('actions')}>
                        <Menu.Item key="1.1" icon={<Icons.UserAddOutlined />}> {t('bookings')} </Menu.Item>
                        <Menu.Item key="1.2" icon={<Icons.HomeOutlined />}> {t('rooms')} </Menu.Item>
                        <Menu.Item key="1.3" icon={<Icons.ContactsOutlined />}> {t('guests')} </Menu.Item>
                        <Menu.Item key="1.4" icon={<Icons.BellOutlined />}> {t('services')} </Menu.Item>
                    </Menu.SubMenu>

                    <Menu.SubMenu key='2' icon={<Icons.BarChartOutlined />} title={t('finalcial')}>
                        <Menu.Item key="2.1" icon={<Icons.CreditCardOutlined />}> {t('payments')} </Menu.Item>
                        <Menu.Item key="2.2" icon={<Icons.PercentageOutlined />}> {t('promotions')} </Menu.Item>
                        <Menu.Item key="2.3" icon={<Icons.LineChartOutlined />}> {t('finalcial_report')} </Menu.Item>
                    </Menu.SubMenu>

                    <Menu.SubMenu key='3' icon={<Icons.SettingOutlined />} title={t('settings')}>
                        <Menu.Item key="3.1" icon={theme === 'light' ? <Icons.SunOutlined /> : <Icons.MoonOutlined />} onClick={() => toggleTheme()}> {t(theme === 'light' ? 'theme_light' : 'theme_dark')}  </Menu.Item>
                        <Menu.Item key="3.2" icon={<Icons.LogoutOutlined />} onClick={() => dispatch(logout())}> {t('logout')}  </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Sider>

            <Content style={{ margin: 8, height: '100vh'}}>
                <RoomListCard />
            </Content>

        </Layout>
    )
}

export default Container