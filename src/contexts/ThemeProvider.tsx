import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'

import useLocalStorageState from '@/hooks/useLocalStorageState'

type ThemeOption = 'dark' | 'light'

const initialValue: ThemeOption = 'light'

interface ThemeContextValue {
	theme: ThemeOption
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
	theme: initialValue,
	toggleTheme: () => null,
})

const useTheme = () => useContext(ThemeContext)

const ThemeProvider: React.FC<ContextProps> = ({ children }) => {
	const [theme, setTheme] = useLocalStorageState<ThemeOption>('theme', initialValue)

	useEffect(() => {
		theme === 'dark' ? document.body.classList.add('dark') : document.body.classList.remove('dark')
	}, [theme])

	const toggleTheme = useCallback(() => setTheme(theme === 'dark' ? 'light' : 'dark'), [theme, setTheme])

	const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export { useTheme }

export default ThemeProvider
