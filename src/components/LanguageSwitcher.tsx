import React from 'react'
import { Select } from 'antd'
import { useTranslation } from 'react-i18next'
import { GlobalOutlined } from '@ant-design/icons'

const { Option } = Select

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Select
        prefix ={<GlobalOutlined />}
        defaultValue={i18n.language}
        onChange={changeLanguage}
      >
        <Option value="vi">Tiếng Việt</Option>
        {/* Add more languages here as needed */}
      </Select>
    </div>
  )
}

export default LanguageSwitcher