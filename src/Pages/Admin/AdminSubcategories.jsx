import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useLoadingContext } from '../../Context/LoadingProvider'
import { useSubcategoriesContext } from '../../Context/SubcategoriesProvider'
import { AdminFilter } from "./AdminProducts"

const AdminSubcategories = () => {
	const { getSubcategories, subcategories, setSubcategories } = useSubcategoriesContext()
	const { withLoading, loading } = useLoadingContext()

	useEffect(() => {
		withLoading(() => getSubcategories(), 'getSubcategories')
	}, [])

	const filterSubCategories = text => {
		getSubcategories(data => {
			const allSubcateogries = [...data.subcategories]
			if (text) {
				const regexp = new RegExp(text, 'i')
				const filterSubs = allSubcateogries.filter(sub => {
					return regexp.test(sub?.name_en)
				})
				setSubcategories(filterSubs)
			} else {
				setSubcategories(allSubcateogries)
			}
		})
	}

	if (loading.getSubcategories === true)
		return <div className="mx-auto rounded-full w-10 h-10 border-r-2 border-black animate-spin"></div>
	else if (loading.getSubcategories == undefined) return null

	return (
		<div>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="flex items-center justify-between gap-4 max-sm:flex-col"
			>
				<AdminFilter filterMethod={filterSubCategories}/>
				<Link
					to={'/admin/create-subcategory'}
					className="border-2 border-[--main-color] flex items-center py-1 px-2 text-[--main-color] rounded hover:bg-[--main-color] hover:text-white transition-all max-sm:w-full max-sm:justify-center"
				>
					<p>Add</p>
					<MdAdd className="text-2xl" />
				</Link>
			</motion.div>
			{/* subcategories */}
			{subcategories?.length == 0 ? (
				<h1 className="text-2xl  text-center mt-10">No Subcategories.</h1>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{subcategories.map((sub, i) => (
						<Subcateory subcategory={sub} index={i} key={sub._id} />
					))}
				</div>
			)}
		</div>
	)
}

export default AdminSubcategories

const Subcateory = ({ subcategory, index }) => {
	const { withLoading, loading } = useLoadingContext()
	const { deleteSubcategory } = useSubcategoriesContext()

	const handleDeleteSubcategory = subcategoryId => {
		Swal.fire({
			title: 'Are you sure?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'var(--main-color)',
			iconColor: 'red',
		}).then(result => {
			if (result.isConfirmed) {
				withLoading(() => deleteSubcategory(subcategoryId), 'deleteSubcategory')
			}
		})
	}

	return (
		<motion.div
			initial={{ opacity: 0, x: -70 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			key={subcategory._id}
			className="bg-white p-4 rounded-lg shadow-md flex flex-col"
		>
			<img
				src={subcategory.categoryId.image.secure_url}
				alt={subcategory.categoryId.name_en}
				className="w-full h-32 object-cover mb-4 rounded"
			/>
			<h2 className="text-lg font-semibold mb-1">{subcategory.name_en}</h2>
			<h3 className="text-md font-semibold text-gray-700 mb-3">{subcategory.categoryId.name_en}</h3>
			<p className="text-sm text-gray-500 mb-2 flex-1">
				{subcategory.description_en?.split('\n')?.map((line, i) => (
					<span className="block" key={i}>
						{line}
					</span>
				))}
			</p>
			<p className="text-sm text-gray-500 mb-2">Products: {subcategory.products.length}</p>
			<div className="flex gap-2 flex-wrap mt-auto">
				<Link
					to={`/admin/update-subcategory/${subcategory._id}`}
					className="md:flex-1 bg-blue-500 text-white px-2 py-1 rounded flex items-center gap-1"
				>
					<MdEdit />
					Update
				</Link>
				<button
					onClick={() => handleDeleteSubcategory(subcategory._id)}
					className="md:flex-1 bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1"
				>
					{loading.deleteSubcategory ? (
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
