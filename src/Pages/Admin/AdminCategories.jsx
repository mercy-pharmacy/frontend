import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdAdd, MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useCategoriesContext } from '../../Context/CategoriesProvider'
import { useLoadingContext } from '../../Context/LoadingProvider'

const AdminCategories = () => {
	const { withLoading, loading } = useLoadingContext()
	const { getAllCategories, categories } = useCategoriesContext()

	useEffect(() => {
		withLoading(() => {
			return getAllCategories()
		}, 'getAllCategories')
	}, [])

	if (loading.getAllCategories === true)
		return <div className="mx-auto rounded-full w-10 h-10 border-r-2 border-black animate-spin"></div>
	else if (loading.getAllCategories == undefined) return null

	return (
		<div>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="flex justify-end"
			>
				<Link
					to={'/admin/create-category'}
					className="w-fit border-2 border-[--main-color] flex items-center text-[--main-color] py-1 px-2 rounded mb-5 hover:bg-[--main-color] hover:text-white transition-all"
				>
					<p>Add</p>
					<MdAdd className="text-2xl" />
				</Link>
			</motion.div>

			{/* categories */}
			<>
				{categories?.length == 0 ? (
					<h1 className="text-2xl font-rubik text-center mt-20">No Categories.</h1>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{categories?.map((cate, i) => (
							<Category category={cate} key={cate._id} index={i} />
						))}
					</div>
				)}
			</>
		</div>
	)
}

export default AdminCategories

const Category = ({ category, index }) => {
	const allProducts = [...category.subcategories].flatMap(sub => sub.products)
	const { deleteCategory } = useCategoriesContext()
	const { withLoading, loading } = useLoadingContext()

	const handleDeleteCategory = categoryId => {
		Swal.fire({
			title: 'Are you sure?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'var(--main-color)',
			iconColor: 'red',
		}).then(result => {
			if (result.isConfirmed) {
				withLoading(() => deleteCategory(categoryId), 'deleteCategory')
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
			<motion.img
				src={category?.image?.secure_url}
				alt=""
				className="w-full h-32 object-cover mb-4 rounded object-center"
			/>
			{/* content */}
			<div className="p-2 flex flex-col flex-1">
				<h2 className="text-lg font-medium font-rubik mb-2">{category?.name_en}</h2>
				<p className="mb-3 text-sm text-gray-500 flex-1">
					{category.description_en?.split('\n').map((line, i) => (
						<span key={i} className="block">
							{line}
						</span>
					))}
				</p>
				<div className="flex flex-col gap-1 mt-auto text-md text-gray-600 mb-2">
					<p className="">Subcategories: {category?.subcategories?.length} </p>
					<p>Products: {allProducts?.length} </p>
				</div>
			</div>

			{/* buttons */}
			<div className="flex items-center gap-1 p-2 mt-auto flex-wrap">
				<Link
					to={`/admin/update-category/${category?._id}`}
					className="bg-blue-500 flex-1 text-white py-1 px-3 rounded flex items-center gap-1 justify-center"
				>
					<span>Update</span>
					<CiEdit />
				</Link>
				<button
					className="bg-red-500 flex-1 text-white py-1 px-3 rounded flex items-center gap-1 justify-center"
					onClick={() => handleDeleteCategory(category._id)}
				>
					<span>{loading.deleteCategory ? 'Loading...' : 'Delete'}</span>
					<MdDelete />
				</button>
			</div>
		</motion.div>
	)
}
