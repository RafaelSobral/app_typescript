import { createContext } from "react";
import { ThemeProvider } from '@emotion/react';
import { DarkTheme, LightTheme } from "./../themes";

interface IThemeContextData {
  themeName: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext({} as IThemeContextData)

export const AppThemeProvider: React.FC = ({ children }) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light')
  const toggleTheme = useCallback(() => {
    setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light')
  },[])

  const theme = useMemo(() => {
    if (themeName === 'light') return LightTheme

    return DarkTheme
  }, [themeName])

  return (
    <ThemeContext.Provider value= {{ themeName, toggleTheme }}>
      <ThemeProvider theme={DarkTheme}>
       {children}
      </ThemeProvider>
    </ThemeContext.Provider>    
  )


}