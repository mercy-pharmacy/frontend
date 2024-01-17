import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import InputItem from '../../Components/InputItem'
import SelectItem from '../../Components/SelectItem'
import { useCategoriesContext } from '../../Context/CategoriesProvider'
import { useLoadingContext } from '../../Context/LoadingProvider'
import { useSubcategoriesContext } from '../../Context/SubcategoriesProvider'

const UpdateSubcategory = () => {
	const { currentSubcategory, getSubcategory, updateSubcategory } = useSubcategoriesContext()
	const { withLoading, loading } = useLoadingContext()
	const { getAllCategories, categories } = useCategoriesContext()
	const { id } = useParams()
	const [inputs, setInputs] = useState({})
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [showDrop, setShowDrop] = useState(false)

	useEffect(() => {
		withLoading(
			() => getSubcategory(id, data => setSelectedCategory(data.subcategory.categoryId)),
			'getSubcategory',
		)
	}, [id])

	function handleUpdateSubCategory(e) {
		e.preventDefault()
		if (!selectedCategory) {
			return toast.error('Please select a category')
		}
		const infos = { ...inputs }
		if (selectedCategory !== currentSubcategory?.categoryId) {
			infos.categoryId = selectedCategory._id
		}
		withLoading(() => updateSubcategory(id, infos), 'updateSubcategory')
	}

	const handleChangeInput = e => {
		setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
	}

	if (loading.getSubcategory === true) {
		return <h1 className="text-4xl font-bold w-full text-center">Loading...</h1>
	} else if (loading.getSubcategory == undefined) return null

	return (
		<motion.div
			initial={{ opacity: 0, x: 300 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ x: '-100%', opacity: 0, transition: { duration: 0.1 } }}
		>
			<h1 className="text-3xl text-center ">Create New SubCategory</h1>

			<form className="mt-7 flex flex-col gap-4" onSubmit={handleUpdateSubCategory}>
				<InputItem
					name={'name_en'}
					text={'English name'}
					onChange={handleChangeInput}
					required
					defaultValue={currentSubcategory?.name_en}
				/>
				<InputItem
					name={'name_ar'}
					text={'Arabic name'}
					onChange={handleChangeInput}
					required
					defaultValue={currentSubcategory?.name_ar}
				/>
				<InputItem
					name={'description_en'}
					text={'English Description'}
					onChange={handleChangeInput}
					textarea
					defaultValue={currentSubcategory?.description_en}
				/>
				<InputItem
					name={'description_ar'}
					text={'Arabic Description'}
					onChange={handleChangeInput}
					textarea
					defaultValue={currentSubcategory?.description_ar}
				/>

				<InputItem
					name={'sort_order'}
					text={'Sort Order'}
					onChange={handleChangeInput}
					type="number"
					defaultValue={currentSubcategory?.sort_order}
				/>

				<SelectItem
					getItems={getAllCategories}
					items={categories}
					selectedItem={selectedCategory}
					setSelectedItem={setSelectedCategory}
					setShowDrop={setShowDrop}
					showDrop={showDrop}
					title={'Select Category'}
				/>

				<button
					className="p-2  rounded text-[--main-color] transition-all hover:bg-[--main-color] hover:text-white ring ring-[--light-main-color]"
					type="submit"
				>
					{loading.updateSubcategory ? 'Loading...' : 'Update'}
				</button>
			</form>
		</motion.div>
	)
}

export default UpdateSubcategory
