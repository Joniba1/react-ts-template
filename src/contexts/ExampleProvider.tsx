import { createContext, useContext } from 'react'

type ExampleContextType = {}

const ExampleContext = createContext<ExampleContextType | null>(null)

export const useExample = () => useContext(ExampleContext)! //* Optional

const ExampleProvider: React.FC<ContextProps> = ({ children }) => {
	return <ExampleContext.Provider value={{}}>{children}</ExampleContext.Provider>
}

export default ExampleProvider
