import axios from 'axios'
import { createContext, useContext, useState } from 'react'
import { asyncHandler } from '../services/asyncHandler'
import { useAuthContext } from './AuthProvider'
import toast from 'react-hot-toast'

const ProductsContext = createContext(null)

const ProductsProvider = ({ children }) => {
	const { token } = useAuthContext()

	const [products, setProducts] = useState([])
	const [searchProducts, setSearchProducts] = useState([])
	const [currentProduct, setCurrentProduct] = useState({})

	function getProducts(search, callback) {
		return asyncHandler(async () => {
			const params = search ? { search } : {}
			const { data } = await axios.get(`/products`, { params })
			if (data.message == 'success') {
				callback && callback(data) // setSearchProducts or setProducts
			}
		})
	}
	function getProduct(productId, callback) {
		return asyncHandler(async () => {
			const { data } = await axios.get(`/products/${productId}`)
			if (data.message == 'success') {
				setCurrentProduct(data.product)
				callback && callback(data)
			}
		})
	}
	function createProduct(formData, callback) {
		return asyncHandler(async () => {
			const { data } = await axios.post(`/products`, formData, {
				headers: {
					'Content-Type': 'multipart/form',
					'admin-token': token,
				},
			})
			if (data.message == 'success') {
				setProducts(prev => [...prev, data.product])
				toast.success('Created Successfully')
				callback && callback(data)
			}
		})
	}
	function updateProduct(productId, formData, callback) {
		return asyncHandler(async () => {
			const { data } = await axios.put(`/products/${productId}`, formData, {
				headers: {
					'Content-Type': 'multipart/form',
					'admin-token': token,
				},
			})
			if (data.message == 'success') {
				setCurrentProduct(data.product)
				setProducts(prev => prev.map(p => (p._id === productId ? data.product : p)))
				toast.success('Updated Successfully')
				callback && callback(data)
			}
		})
	}
	function deleteProduct(productId, callback) {
		return asyncHandler(async () => {
			const { data } = await axios.delete(`/products/${productId}`, {
				headers: { 'admin-token': token },
			})
			if (data.message == 'success') {
				setProducts(prev => prev.filter(p => p._id !== productId))
				toast.success('Deleted Successfully')
				callback && callback(data)
			}
		})
	}

	return (
		<ProductsContext.Provider
			value={{
				products,
				setProducts,
				searchProducts,
				setSearchProducts,
				setCurrentProduct,
				currentProduct,
				getProduct,
				getProducts,
				createProduct,
				updateProduct,
				deleteProduct,
			}}
		>
			{children}
		</ProductsContext.Provider>
	)
}

export default ProductsProvider

export const useProductsContext = () => {
	const {
		products,
		setProducts,
		searchProducts,
		setSearchProducts,
		setCurrentProduct,
		currentProduct,
		getProduct,
		getProducts,
		createProduct,
		updateProduct,
		deleteProduct,
	} = useContext(ProductsContext)
	return {
		products,
		setProducts,
		searchProducts,
		setSearchProducts,
		setCurrentProduct,
		currentProduct,
		getProduct,
		getProducts,
		createProduct,
		updateProduct,
		deleteProduct,
	}
}
