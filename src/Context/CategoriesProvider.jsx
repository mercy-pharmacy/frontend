/* eslint-disable */

import axios from 'axios'
import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { asyncHandler } from '../services/asyncHandler'
import { useAuthContext } from './AuthProvider'

const CategoriesContext = createContext(null)

const CategoriesProvider = ({ children }) => {
	const { token } = useAuthContext()

	const [categories, setCategories] = useState([])
	const [currentCategory, setCurrentCategory] = useState({})

	function getAllCategories(callback) {
		return asyncHandler(async () => {
			const { data } = await axios.get(`/categories`)
			if (data.message == 'success') {
				setCategories(data.categories)
				callback && callback(data)
			}
		})
	}

	function createCategory(formData, callback) {
		return asyncHandler(async () => {
			const { data } = await axios.post('/categories', formData, {
				headers: {
					'Content-Type': 'multipart/form',
					'admin-token': token,
				},
			})
			if (data.message === 'success') {
				setCategories(prev => [...prev, data.category])
				toast.success('Created Successfully!')
				callback && callback(data)
			}
		})
	}

	function updateCategory(categoryId, formData, callback) {
		return asyncHandler(async () => {
			const { data } = await axios.put(`/categories/${categoryId}`, formData, {
				headers: {
					'Content-Type': 'multipart/form',
					'admin-token': token,
				},
			})
			if (data.message === 'success') {
				setCurrentCategory(data.category)
				setCategories(prev => prev.map(item => (item._id === data.category._id ? data.category : item)))
				toast.success('Updated Successfully!')
				callback && callback(data)
			}
		})
	}

	function getCategory(categoryId, callback) {
		return asyncHandler(async () => {
			const { data } = await axios.get(`/categories/${categoryId}`)
			if (data.message === 'success') {
				setCurrentCategory(data.category)
				callback && callback(data)
			}
		})
	}

	function deleteCategory(categoryId, callback) {
		return asyncHandler(async () => {
			const { data } = await axios.delete(`/categories/${categoryId}`, {
				headers: { 'admin-token': token },
			})
			if (data.message == 'success') {
				setCategories(prev => prev.filter(category => category._id !== categoryId))
				toast.success('Deleted Successfully')
				callback && callback(data)
			}
		})
	}

	return (
		<CategoriesContext.Provider
			value={{
				getAllCategories,
				categories,
				setCategories,
				createCategory,
				currentCategory,
				setCurrentCategory,
				getCategory,
				updateCategory,
				deleteCategory,
			}}
		>
			{children}
		</CategoriesContext.Provider>
	)
}

export default CategoriesProvider

export const useCategoriesContext = () => {
	const {
		categories,
		setCategories,
		getAllCategories,
		createCategory,
		currentCategory,
		setCurrentCategory,
		getCategory,
		updateCategory,
		deleteCategory,
	} = useContext(CategoriesContext)
	return {
		categories,
		setCategories,
		getAllCategories,
		createCategory,
		currentCategory,
		setCurrentCategory,
		getCategory,
		updateCategory,
		deleteCategory,
	}
}
