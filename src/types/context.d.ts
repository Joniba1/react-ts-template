import { ReactNode } from 'react'

declare global {
	type ContextProps = {
		children: ReactNode
	}
}
