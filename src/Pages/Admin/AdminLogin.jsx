/* eslint-disable */
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../Context/AuthProvider'
import { useLoadingContext } from '../../Context/LoadingProvider'

const AdminLogin = () => {
	const { withLoading, loading } = useLoadingContext()
	const { setAuth, setToken, adminLogin } = useAuthContext()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleLogin = e => {
		e.preventDefault()
		const infos = { username, password }
		withLoading(
			() =>
				adminLogin(infos, data => {
					localStorage.token = JSON.stringify(data.token)
					setToken(data.token)
					localStorage.auth = true
					setAuth(true)
					navigate('/admin')
				}),
			'login',
		)
	}

	return (
		<section>
			<motion.div
				initial={{ opacity: 0, x: 300 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ x: '-100%', opacity: 0, transition: { duration: 0.1 } }}
				className="max-container p-10"
			>
				<h1 className="text-center text-4xl font-medium mb-10">Admin Login</h1>

				<form className="flex flex-col max-w-sm mx-auto gap-3" onSubmit={handleLogin}>
					<input
						type="text"
						placeholder="Username..."
						className="form-input"
						onChange={e => setUsername(e.target.value)}
						required
					/>
					<input
						type="password"
						className="form-input"
						placeholder="********"
						onChange={e => setPassword(e.target.value)}
						required
					/>
					<button type="submit" className="bg-[--main-color] text-white py-2 px-4 rounded">
						{loading.login ? 'Loading...' : 'Login'}
					</button>
				</form>
			</motion.div>
		</section>
	)
}

export default AdminLogin
