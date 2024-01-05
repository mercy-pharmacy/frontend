import { useEffect, useRef } from 'react'

const useClickOutside = callback => {
	const ref = useRef()

	useEffect(() => {
		const handler = event => {
			if (!ref.current.contains(event.target)) {
				callback()
			}
		}

		window.addEventListener('mousedown', handler)

		return () => window.removeEventListener('mousedown', handler)
	}, [])

	return { ref }
}

export default useClickOutside
