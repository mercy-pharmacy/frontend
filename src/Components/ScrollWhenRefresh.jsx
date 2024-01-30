import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollWhenRefresh = ({ children }) => {
	const { pathname } = useLocation()
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	}, [pathname])

	return children
}

export default ScrollWhenRefresh
