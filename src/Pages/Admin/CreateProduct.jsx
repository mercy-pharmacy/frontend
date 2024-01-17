import { motion } from 'framer-motion'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import AddKeywords from '../../Components/AddKeywords'
import InputItem from '../../Components/InputItem'
import SelectItem from '../../Components/SelectItem'
import { useLoadingContext } from '../../Context/LoadingProvider'
import { useProductsContext } from '../../Context/ProductsProvider'
import { useSubcategoriesContext } from '../../Context/SubcategoriesProvider'

const CreateProduct = () => {
	const { withLoading, loading } = useLoadingContext()
	const { createProduct } = useProductsContext()
	const { getSubcategories, subcategories } = useSubcategoriesContext()

	const [inputs, setInputs] = useState({})
	const [file, setFile] = useState(null)
	const [selectedSub, setSelectedSub] = useState(null)
	const [showDrop, setShowDrop] = useState(false)
	const [keywords, setkeywords] = useState([])

	const handleChangeInput = e => {
		setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleCreateProduct = e => {
		e.preventDefault()
		if (!selectedSub) {
			return toast.error('Please add a subcategory')
		}
		const formData = new FormData()
		formData.append('image', file)
		Object.keys(inputs).forEach(input => {
			formData.append(input, inputs[input])
		})
		// Append keywords individually
		keywords.forEach((keyword, index) => {
			formData.append(`keywords[${index}]`, keyword)
		})
		formData.append('subcategoryId', selectedSub._id)
		withLoading(() => createProduct(formData, data => console.log(data)), 'createProduct')
	}

	return (
		<motion.div
			initial={{ opacity: 0, x: 300 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ x: '-100%', opacity: 0, transition: { duration: 0.1 } }}
		>
			<h1 className="text-3xl text-center ">Create New Product</h1>

			<form className="mt-7 flex flex-col gap-4" onSubmit={handleCreateProduct}>
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
					getItems={getSubcategories}
					items={subcategories}
					selectedItem={selectedSub}
					setSelectedItem={setSelectedSub}
					setShowDrop={setShowDrop}
					showDrop={showDrop}
					title={'Select Subcategory'}
				/>

				<AddKeywords keywords={keywords} setKeywords={setkeywords} />

				<div className="flex items-stretch gap-3 max-md:flex-col max-md:gap-1">
					<span className="flex-1 ">Product image</span>

					<div className="flex-[3] flex flex-col gap-2 items-center justify-center max-md:items-start">
						<input
							type="file"
							className=""
							onChange={e => setFile(e.target.files[0])}
							id="file"
							required
						/>
						<img
							src={file ? URL.createObjectURL(file) : '/public/images/default-image.png'}
							alt=""
							className="max-h-[300px] object-contain max-w-full border-2"
						/>
					</div>
				</div>

				<button
					className="p-2  rounded text-[--main-color] transition-all hover:bg-[--main-color] hover:text-white ring ring-[--light-main-color]"
					type="button"
					onClick={handleCreateProduct}
				>
					{loading.createProduct ? 'Loading...' : 'Create'}
				</button>
			</form>
		</motion.div>
	)
}

export default CreateProduct
