import React from 'react'
import { Layout, Menu } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import AppHeader from './components/AppHeader'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { useAppSelector } from './redux/hooks'
import './App.css'
import Container from './components/Container'

const { Header, Footer } = Layout

const AppContent: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { isAuthenticated } = useAppSelector(state => state.auth)
  
  // If user is not authenticated, show login page
  if (!isAuthenticated) {
    return <Login />
  }
  
  return (
    <Container />
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
