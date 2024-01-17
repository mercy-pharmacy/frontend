import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InputItem from '../../Components/InputItem'
import { useCategoriesContext } from '../../Context/CategoriesProvider'
import { useLoadingContext } from '../../Context/LoadingProvider'

const UpdateCategory = () => {
	const { id } = useParams()
	const { withLoading, loading } = useLoadingContext()
	const { currentCategory, getCategory, updateCategory } = useCategoriesContext()

	const [inputs, setInputs] = useState({})
	const [file, setFile] = useState(null)
	const handleChangeInput = e => {
		setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleUpdateCategory = e => {
		e.preventDefault()
		const formData = new FormData()
		if (file) {
			formData.append('image', file)
		}
		Object.keys(inputs).forEach(input => {
			formData.append(input, inputs[input])
		})
		withLoading(() => updateCategory(id, formData), 'updateCategory')
	}

	useEffect(() => {
		withLoading(() => getCategory(id), 'getCategory')
	}, [id])

	if (loading.getCategory === true) {
		return <h1 className="text-4xl font-bold w-full text-center">Loading...</h1>
	} else if (loading.getCategory == undefined) return null

	return (
		<>
			<motion.div
				initial={{ opacity: 0, x: 300 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ x: '-100%', opacity: 0, transition: { duration: 0.1 } }}
			>
				<h1 className="text-3xl text-center ">Update Category</h1>

				<form className="mt-7 flex flex-col gap-4" onSubmit={handleUpdateCategory}>
					<InputItem name={'name_en'} text={'English name'} onChange={handleChangeInput} required defaultValue={currentCategory?.name_en}/>
					<InputItem name={'name_ar'} text={'Arabic name'} onChange={handleChangeInput} required defaultValue={currentCategory?.name_ar}/>
					<InputItem
						name={'description_en'}
						text={'English Description'}
						onChange={handleChangeInput}
						textarea
						defaultValue={currentCategory?.description_en}
						/>
					<InputItem
						name={'description_ar'}
						text={'Arabic Description'}
						onChange={handleChangeInput}
						textarea
						defaultValue={currentCategory?.description_ar}
					/>
					<InputItem
						name={'sort_order'}
						text={'Sort Order'}
						onChange={handleChangeInput}
						type="number"
						defaultValue={currentCategory?.sort_order}
					/>
					<div className="flex items-stretch gap-3 max-md:flex-col max-md:gap-1">
						<span className="flex-1 ">Category image</span>

						<div className="flex-[3] flex flex-col gap-2 items-center justify-center max-md:items-start">
							<input type="file" onChange={e => setFile(e.target.files[0])} id="file" />
							<img
								src={file ? URL.createObjectURL(file) : currentCategory?.image?.secure_url}
								alt=""
								className="max-h-[300px] object-contain max-w-full border-2"
							/>
						</div>
					</div>
					<button
						className="p-2  rounded text-[--main-color] transition-all hover:bg-[--main-color] hover:text-white ring ring-[--light-main-color]"
						type="submit"
					>
						{loading.updateCategory ? 'Loading...' : 'Update'}
					</button>
				</form>
			</motion.div>
		</>
	)
}

export default UpdateCategory
