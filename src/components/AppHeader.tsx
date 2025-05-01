import React from 'react'
import { Layout, Typography, Button, Dropdown } from 'antd'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeSwitcher from './ThemeSwitcher'
import { useTheme } from '../contexts/ThemeContext'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { logout } from '../redux/slices/authSlice'

const { Header } = Layout

interface AppHeaderProps {}

const AppHeader: React.FC<AppHeaderProps> = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.auth)
  
  const headerStyle = {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    background: theme === 'dark' ? '#1f1f1f' : undefined
  }

  const handleLogout = () => {
    dispatch(logout())
  }
  
  // User menu items for dropdown
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: user?.username || 'User'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('logout'),
      onClick: handleLogout
    }
  ]

  return (
    <Header style={headerStyle}>
      <Typography.Title level={4} style={{ margin: 0, color: 'white' }}>
        {t('app_title')}
      </Typography.Title>
    </Header>
  )
}

export default AppHeader