import React from 'react'
import { Layout, Typography, Button, Space, Card, Divider } from 'antd'
import * as AntIcons from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../contexts/ThemeContext'

const { Content } = Layout
const { Title, Paragraph } = Typography

const Dashboard: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  
  return (
    <Content>
      <div className="content-container">
        <Title level={2}>{t('welcome')}</Title>
        <Paragraph>
          {t('description')}
        </Paragraph>
        
        <Divider />
        
        <Space direction='vertical' size="large" style={{ width: '100%' }}>
          <Card title={t('actions')} variant='outlined'>
            <Space wrap>
              <Button icon={<AntIcons.PlusCircleOutlined />}> {t('bookings')} </Button>
              <Button icon={<AntIcons.HomeOutlined />}> {t('rooms')} </Button>
              <Button icon={<AntIcons.ContactsOutlined />}> {t('guests')} </Button>
              <Button icon={<AntIcons.BellOutlined />}> {t('services')} </Button>
              <Button icon={<AntIcons.CreditCardOutlined />}> {t('payments')} </Button>
              <Button icon={<AntIcons.PercentageOutlined />}> {t('promotions')} </Button>
            </Space>
          </Card>
          
          <Card title={t('system_stats')} variant='outlined'>
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