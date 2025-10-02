import Layout from '@/pages/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom'
import ThemeProvider from './contexts/ThemeProvider'
import Home from './pages/Home'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 1000 * 60 * 30, //* 30 minutes
		},
	},
})

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
					</Route>
				</Routes>
			</ThemeProvider>
		</QueryClientProvider>
	)
}

export default App
