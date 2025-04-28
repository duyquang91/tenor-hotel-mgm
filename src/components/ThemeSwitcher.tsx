import React from 'react'
import { Button, Switch } from 'antd'
import { BulbOutlined, BulbFilled, BulbTwoTone, SunFilled, MoonFilled } from '@ant-design/icons'
import { useTheme } from '../contexts/ThemeContext'
import { useTranslation } from 'react-i18next'

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginRight: 16 }}>
      <Button icon={theme == 'dark' ? <SunFilled /> : <MoonFilled />} onClick={toggleTheme} />
    </div>
  )
}

export default ThemeSwitcher