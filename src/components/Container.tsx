import { Card, Menu, Typography, Layout } from 'antd'
import * as Icons from '@ant-design/icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { logout } from '../redux/slices/authSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { useTheme } from '../contexts/ThemeContext'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import RoomListCard from './RoomListCard'
import { AdminDashboard } from './AdminDashboard'

const Container: React.FC = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { theme, toggleTheme } = useTheme()
    const [getCollapsed, setCollapsed] = useState(false)
    const { user } = useAppSelector((state) => state.auth)
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['1.1'])
    
    const onSelect = (info: { selectedKeys: string[] }) => { 
        if (['3.1', '3.4'].includes(info.selectedKeys[0])) return
        setSelectedKeys(info.selectedKeys)
    }

    return (
        <Layout>
            <Sider className='ant-sider' theme={theme} width='260' style={{ margin: 8, borderRadius: 8 }} collapsible onCollapse={(e) => { setCollapsed(e) }} >
                <Typography.Title level={5} style={{ paddingLeft: 32 }}> <Icons.HomeOutlined /> {!getCollapsed && t('app_title')} </Typography.Title>
                <Menu defaultOpenKeys={['1']} selectedKeys={selectedKeys} onSelect={onSelect} mode='inline' title='Action' >
                    <Menu.SubMenu key='1' icon={<Icons.EditOutlined />} title={t('actions')}>
                        <Menu.Item key="1.1" icon={<Icons.HomeOutlined />}> {t('rooms')} </Menu.Item>
                        <Menu.Item key="1.2" icon={<Icons.ContactsOutlined />}> {t('guests')} </Menu.Item>
                        <Menu.Item key="1.3" icon={<Icons.BellOutlined />}> {t('services')} </Menu.Item>
                    </Menu.SubMenu>

                    <Menu.SubMenu key='2' icon={<Icons.BarChartOutlined />} title={t('finalcial')}>
                        <Menu.Item key="2.1" icon={<Icons.CreditCardOutlined />}> {t('payments')} </Menu.Item>
                        <Menu.Item key="2.2" icon={<Icons.PercentageOutlined />}> {t('promotions')} </Menu.Item>
                        <Menu.Item key="2.3" icon={<Icons.LineChartOutlined />}> {t('finalcial_report')} </Menu.Item>
                    </Menu.SubMenu>

                    <Menu.SubMenu key='3' icon={<Icons.SettingOutlined />} title={t('settings')}>
                        <Menu.Item key="3.1" icon={theme === 'light' ? <Icons.SunOutlined /> : <Icons.MoonOutlined />} onClick={() => toggleTheme()}> {t(theme === 'light' ? 'theme_light' : 'theme_dark')}  </Menu.Item>
                        <Menu.Item key="3.2" icon={<Icons.LockOutlined />} > {t('change_password')}  </Menu.Item>
                        { user?.role === 'admin' && <Menu.Item key="3.3" icon={<Icons.SettingOutlined />} > {t('administrator')}  </Menu.Item>}
                        <Menu.Item key="3.4" icon={<Icons.LogoutOutlined />} onClick={() => dispatch(logout())}> {t('logout')}  </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Sider>

            <Content style={{ paddingTop: 8, height: '100vh' }}>
                { 
                    selectedKeys[0] === '1.1' ? <RoomListCard /> :
                    selectedKeys[0] === '3.3' ? <AdminDashboard /> : undefined
                }
            </Content>

        </Layout>
    )
}

export default Container