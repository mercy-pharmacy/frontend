import { motion } from 'framer-motion'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import InputItem from "../../Components/InputItem"
import SelectItem from '../../Components/SelectItem'
import { useCategoriesContext } from '../../Context/CategoriesProvider'
import { useLoadingContext } from '../../Context/LoadingProvider'
import { useSubcategoriesContext } from '../../Context/SubcategoriesProvider'

const CreateSubcategory = () => {
	const { loading, withLoading } = useLoadingContext()
	const { createSubcategory } = useSubcategoriesContext()
	const { getAllCategories, categories } = useCategoriesContext()

	const [inputs, setInputs] = useState({})
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [showDrop, setShowDrop] = useState(false)

	const handleChangeInput = e => {
		setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleCreateSubCategory = e => {
		e.preventDefault()
		if (!selectedCategory) {
			return toast.error('Please Select a category')
		}
		const infos = { ...inputs, categoryId: selectedCategory?._id }
		withLoading(() => createSubcategory(infos, data => console.log(data)), 'createSubcategory')
	}

	return (
		<motion.div
			initial={{ opacity: 0, x: 300 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ x: '-100%', opacity: 0, transition: { duration: 0.1 } }}
		>
			<h1 className="text-3xl text-center ">Create New SubCategory</h1>

			<form className="mt-7 flex flex-col gap-4" onSubmit={handleCreateSubCategory}>
				<InputItem name={'name_en'} text={'English name'} onChange={handleChangeInput} required />
				<InputItem name={'name_ar'} text={'Arabic name'} onChange={handleChangeInput} required />
				<InputItem
					name={'description_en'}
					text={'English Description'}
					onChange={handleChangeInput}
					textarea
				/>
				<InputItem
					name={'description_ar'}
					text={'Arabic Description'}
					onChange={handleChangeInput}
					textarea
				/>
				<InputItem
					name={'sort_order'}
					text={'Sort Order'}
					onChange={handleChangeInput}
					type="number"
					defaultValue={0}
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
					{loading.createSubcategory ? 'Loading...' : 'Create'}
				</button>
			</form>
		</motion.div>
	)
}

export default CreateSubcategory

 

 