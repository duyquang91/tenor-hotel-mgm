import React from 'react'
import Login from './components/Login'
import { ThemeProvider } from './contexts/ThemeContext'
import { useAppSelector } from './redux/hooks'
import './App.css'
import Container from './components/Container'

const AppContent: React.FC = () => {
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
