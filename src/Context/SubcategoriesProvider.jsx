/* eslint-disable */

import axios from 'axios'
import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { asyncHandler } from '../services/asyncHandler'
import { useAuthContext } from './AuthProvider'

const SubcategoriesContext = createContext(null)

const SubcategoriesProvider = ({ children }) => {
	const { token } = useAuthContext()

	const [subcategories, setSubcategories] = useState([])
	const [currentSubcategory, setCurrentSubcategory] = useState({})

	function getSubcategories(callback) {
		return asyncHandler(async () => {
			const { data } = await axios.get(`/subcategory`)
			if (data.message == 'success') {
				setSubcategories(data.subcategories)
				callback && callback(data)
			}
		})
	}
	function createSubcategory(infos, callback) {
		return asyncHandler(async () => {
			const { data } = await axios.post(`/subcategory`, infos, {
				headers: { 'admin-token': token },
			})
			if (data.message == 'success') {
				setSubcategories(prev => [...prev, data.subcategory])
				setCurrentSubcategory(data.subcategory)
				toast.success('Created Successfully')
				callback && callback(data)
			}
		})
	}
	function updateSubcategory(subcategoryId, infos, callback) {
		return asyncHandler(async () => {
			const { data } = await axios.put(`/subcategory/${subcategoryId}`, infos, {
				headers: { 'admin-token': token },
			})
			if (data.message == 'success') {
				setCurrentSubcategory(data.subcategory)
				setSubcategories(prev => prev.map(sub => (sub._id === subcategoryId ? data.subcategory : sub)))
				toast.success('Updated Successfully')
				callback && callback(data)
			}
		})
	}
	function getSubcategory(subcategoryId, callback) {
		return asyncHandler(async () => {
			const { data } = await axios.get(`/subcategory/${subcategoryId}`)
			if (data.message == 'success') {
				setCurrentSubcategory(data.subcategory)
				callback && callback(data)
			}
		})
	}
	function deleteSubcategory(subcategoryId, callback) {
		return asyncHandler(async () => {
			const { data } = await axios.delete(`/subcategory/${subcategoryId}`, {
				headers: { 'admin-token': token },
			})
			if (data.message == 'success') {
				setSubcategories(prev => prev.filter(sub => sub._id !== subcategoryId))
                toast.success("Deleted Successfully")
				callback && callback(data)
			}
		})
	}

	return (
		<SubcategoriesContext.Provider
			value={{
				subcategories,
				setSubcategories,
				currentSubcategory,
				setCurrentSubcategory,
				createSubcategory,
				getSubcategories,
				getSubcategory,
				updateSubcategory,
				deleteSubcategory,
			}}
		>
			{children}
		</SubcategoriesContext.Provider>
	)
}

export default SubcategoriesProvider

export const useSubcategoriesContext = () => {
	const {
		subcategories,
		setSubcategories,
		currentSubcategory,
		setCurrentSubcategory,
		createSubcategory,
		getSubcategories,
		getSubcategory,
		updateSubcategory,
		deleteSubcategory,
	} = useContext(SubcategoriesContext)
	return {
		subcategories,
		setSubcategories,
		currentSubcategory,
		setCurrentSubcategory,
		createSubcategory,
		getSubcategories,
		getSubcategory,
		updateSubcategory,
		deleteSubcategory,
	}
}
