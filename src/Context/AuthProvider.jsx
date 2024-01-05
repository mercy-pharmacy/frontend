/* eslint-disable */
import axios from 'axios'
import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { asyncHandler } from '../services/asyncHandler'

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(localStorage.auth ? JSON.parse(localStorage.auth) : false)
	const [token, setToken] = useState(localStorage.token ? JSON.parse(localStorage.token) : '')

	function adminLogin(infos, callback) {
		return asyncHandler(async () => {
			const { data } = await axios.post('/admin/login', infos, {
				headers: { 'Content-Type': 'application/json' },
			})
			if (data.message == 'success') {
				toast.success('Login successfully')
				callback && callback(data)
			}
		})
	}

	function adminLogout() {
		localStorage.removeItem('token')
		localStorage.removeItem('auth')
		setToken('')
		setAuth(false)
	}

	function adminUpdate(infos, callback) {
		return asyncHandler(async () => {
			const { data } = await axios.put(`/admin/update`, infos, {
				headers: {
					'admin-token': token,
				},
			})
			if (data.message == 'success') {
				toast.success('Admin updated successfully')
				callback && callback(data)
			}
		})
	}
	function getAdminUsername(callback) {
		return asyncHandler(async () => {
			const { data } = await axios.get(`/admin/info`, {
				headers: {
					'admin-token': token,
				},
			})
			if (data.message == 'success') {
				callback && callback(data)
			}
		})
	}

	return (
		<AuthContext.Provider
			value={{ auth, setAuth, token, setToken, adminLogin, adminLogout, adminUpdate, getAdminUsername }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => {
	const { auth, setAuth, token, setToken, adminLogin, adminLogout, adminUpdate, getAdminUsername } =
		useContext(AuthContext)
	return { auth, setAuth, token, setToken, adminLogin, adminLogout, adminUpdate, getAdminUsername }
}

export default AuthProvider
