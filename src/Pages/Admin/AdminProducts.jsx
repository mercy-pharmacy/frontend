import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useLoadingContext } from '../../Context/LoadingProvider'
import { useProductsContext } from '../../Context/ProductsProvider'

const AdminProducts = () => {
	const { products, getProducts, setProducts } = useProductsContext()
	const { withLoading, loading } = useLoadingContext()

	useEffect(() => {
		withLoading(
			() =>
				getProducts(null, data => {
					setProducts(data.products)
				}),
			'getProducts',
		)
	}, [])

	if (loading.getProducts === true)
		return <div className="mx-auto rounded-full w-10 h-10 border-r-2 border-black animate-spin"></div>
	else if (loading.getProducts == undefined) return null

	return (
		<div>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="flex justify-end"
			>
				<Link
					to={'/admin/create-product'}
					className="w-fit border-2 border-[--main-color] flex items-center text-[--main-color] py-1 px-2 rounded mb-5 hover:bg-[--main-color] hover:text-white transition-all"
				>
					<p>Add</p>
					<MdAdd className="text-2xl" />
				</Link>
			</motion.div>

			{/* products */}
			{products?.length == 0 ? (
				<h1 className="text-2xl  text-center mt-10">No Products.</h1>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{products?.map((product, i) => (
						<Product product={product} index={i} key={product._id} />
					))}
				</div>
			)}
		</div>
	)
}

export default AdminProducts

const Product = ({ product, index }) => {
	const { withLoading, loading } = useLoadingContext()
	const { deleteProduct } = useProductsContext()

	const handleDeleteProduct = productId => {
		Swal.fire({
			title: 'Are you sure?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'var(--main-color)',
			iconColor: 'red',
		}).then(result => {
			if (result.isConfirmed) {
				withLoading(() => deleteProduct(productId), 'deleteProduct')
			}
		})
	}

	return (
		<motion.div
			initial={{ opacity: 0, x: -70 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			className="bg-white p-4 rounded-lg shadow-md flex flex-col"
		>
			<img
				src={product.image.secure_url}
				alt={product.name_en}
				className="w-full h-32 object-cover mb-4 rounded"
			/>
			<h2 className="text-lg font-semibold mb-1">{product.name_en}</h2>
			<h3 className="text-md font-semibold text-gray-700 mb-3">{product.subcategoryId.name_en}</h3>
			<p className="text-sm text-gray-500 mb-2 flex-1">
				{product.description_en?.split('\n')?.map((line, i) => (
					<span className="block" key={i}>
						{line}
					</span>
				))}
			</p>
			<div className="flex gap-2 flex-wrap mt-auto">
				<Link
					to={`/admin/update-product/${product._id}`}
					className="md:flex-1 bg-blue-500 text-white px-2 py-1 rounded flex items-center gap-1"
				>
					<MdEdit />
					Update
				</Link>
				<button
					onClick={() => handleDeleteProduct(product._id)}
					className="md:flex-1 bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1"
				>
					{loading.deleteProduct ? (
						'Loading...'
					) : (
						<>
							<MdDelete /> Remove
						</>
					)}
				</button>
			</div>
		</motion.div>
	)
}
