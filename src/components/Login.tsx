import React, { useState } from 'react'
import { Form, Input, Button, Card, Typography, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../redux/hooks'
import { login } from '../redux/slices/authSlice'

const { Title } = Typography

interface LoginFormValues {
  username: string
  password: string
  remember: boolean
}

const Login: React.FC = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  const handleSubmit = (values: LoginFormValues) => {
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      // Demo credentials check (in a real app, this would be handled by a backend API)
      if (values.username === 'admin' && values.password === 'password') {
        message.success(t('login_success'))
        
        // Dispatch login action to Redux store
        dispatch(login({ 
          username: values.username,
          role: 'admin',
          isLoggedIn: true 
        }))
      } else {
        message.error(t('login_failed'))
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(to right, #667eea, #764ba2)'
    }}>
      <Card 
        style={{ 
          width: 400, 
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px' 
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2}>{t('app_title')}</Title>
        </div>
        
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: t('username_required') }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder={t('username')}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: t('password_required') }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t('password')}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t('remember_me')}</Checkbox>
              </Form.Item>
              <a href="#forgot">{t('forgot_password')}</a>
            </div>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              style={{ width: '100%' }} 
              size="large"
              loading={loading}
            >
              {t('login')}
            </Button>
          </Form.Item>
        </Form>
        
        <div style={{ textAlign: 'center' }}>
          <p>{t('demo_credentials')}</p>
          <p>Username: admin / Password: password</p>
        </div>
      </Card>
    </div>
  )
}

export default Login