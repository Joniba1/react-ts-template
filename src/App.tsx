import Layout from '@/pages/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ExampleProvider from './contexts/ExampleProvider'
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
	const [count, setCount] = useState(0)

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<ExampleProvider>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
						</Route>
					</Routes>
				</ExampleProvider>
			</ThemeProvider>
		</QueryClientProvider>
	)
}

export default App
