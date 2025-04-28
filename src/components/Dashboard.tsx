import React from 'react'
import { Layout, Typography, Button, Space, Card, Divider } from 'antd'
import { 
  HeartOutlined, 
  HomeOutlined 
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../contexts/ThemeContext'

const { Content } = Layout
const { Title, Paragraph } = Typography

const Dashboard: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  
  return (
    <Content style={{ padding: '0 50px', minHeight: 'calc(100vh - 64px - 70px)' }}>
      <div className="content-container">
        <Title level={2}>{t('welcome')}</Title>
        <Paragraph>
          {t('description')}
        </Paragraph>
        
        <Divider />
        
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card title={t('quick_actions')} bordered={false}>
            <Space>
              <Button type="primary" icon={<HomeOutlined />}>{t('dashboard')}</Button>
              <Button icon={<HeartOutlined />}>{t('bookings')}</Button>
              <Button>{t('rooms')}</Button>
              <Button>{t('guests')}</Button>
            </Space>
          </Card>
          
          <Card title={t('system_stats')} bordered={false}>
            <div className="stats-grid" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Card.Grid style={{ width: '25%', textAlign: 'center' }}>
                <Title level={3}>42</Title>
                <Paragraph>{t('total_rooms')}</Paragraph>
              </Card.Grid>
              <Card.Grid style={{ width: '25%', textAlign: 'center' }}>
                <Title level={3}>18</Title>
                <Paragraph>{t('occupied_rooms')}</Paragraph>
              </Card.Grid>
              <Card.Grid style={{ width: '25%', textAlign: 'center' }}>
                <Title level={3}>24</Title>
                <Paragraph>{t('available_rooms')}</Paragraph>
              </Card.Grid>
              <Card.Grid style={{ width: '25%', textAlign: 'center' }}>
                <Title level={3}>5</Title>
                <Paragraph>{t('maintenance')}</Paragraph>
              </Card.Grid>
            </div>
          </Card>
        </Space>
      </div>
    </Content>
  )
}

export default Dashboard