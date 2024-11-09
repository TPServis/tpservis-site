import { useEffect, useState } from 'react'

type Theme = 'light' | 'blue'

const useTheme = () => {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return { theme, setTheme }
}

export default useTheme
