import { Card, Layout, Menu, Space, Switch } from 'antd'
import * as Icons from '@ant-design/icons'
import React, { use } from 'react'
import { useTranslation } from 'react-i18next'
import { logout } from '../redux/slices/authSlice'
import { useAppDispatch } from '../redux/hooks'
import { useTheme } from '../contexts/ThemeContext'

const Container: React.FC = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { theme, toggleTheme } = useTheme()

    return (
        <Layout>
            <Space direction='horizontal' align='start' style={{ padding: 8 }} >
                <div style={{ width: 256 }}>
                    <Menu mode='inline' inlineCollapsed={false} title='Action' defaultOpenKeys={['1']} style={{ height: '100vh' }}>
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
                            <Menu.Item key="3.1" icon={theme === 'light' ? <Icons.SunOutlined/> : <Icons.MoonOutlined/>} onClick={() => toggleTheme()}> {t(theme === 'light' ? 'theme_light' : 'theme_dark')}  </Menu.Item>
                            <Menu.Item key="3.2" icon={<Icons.LogoutOutlined />} onClick={() => dispatch(logout())}> {t('logout')}  </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </div>

            </Space>
        </Layout>
    )
}

export default Container