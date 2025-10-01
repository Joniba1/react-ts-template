import { useEffect, useState } from 'react'

function supportsLocalStorage() {
	try {
		return 'localStorage' in window && window.localStorage !== null
	} catch (e) {
		return false
	}
}

function useLocalStorageState<T>(key: string, initialValue: T) {
	const [state, setState] = useState<T>(() => {
		if (supportsLocalStorage()) {
			const item = window.localStorage.getItem(key)
			return item ? (JSON.parse(item) as T) : initialValue
		}

		return initialValue
	})

	useEffect(() => {
		if (supportsLocalStorage()) window.localStorage.setItem(key, JSON.stringify(state))
	}, [key, state])

	return [state, setState] as [T, typeof setState]
}

export default useLocalStorageState
