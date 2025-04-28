import React, { createContext, useState, useContext, useEffect } from 'react'
import { ConfigProvider, theme } from 'antd'

type ThemeType = 'light' | 'dark'

interface ThemeContextType {
  theme: ThemeType
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Check if theme is stored in localStorage, default to light if not
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('theme')
    return (savedTheme as ThemeType) || 'light'
  })

  // Effect to update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('theme', currentTheme)
    document.body.setAttribute('data-theme', currentTheme)
  }, [currentTheme])

  const toggleTheme = () => {
    setCurrentTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  // Ant Design theme configurations
  const { defaultAlgorithm, darkAlgorithm } = theme

  // Customize theme tokens if needed
  const customTokens = {
    colorPrimary: '#1677ff',
  }

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm: currentTheme === 'dark' ? darkAlgorithm : defaultAlgorithm,
          token: customTokens,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}