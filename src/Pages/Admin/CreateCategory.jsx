import { motion } from 'framer-motion'
import React, { useState } from 'react'
import InputItem from '../../Components/InputItem'
import { useCategoriesContext } from '../../Context/CategoriesProvider'
import { useLoadingContext } from '../../Context/LoadingProvider'

const CreateCategory = () => {
	const { loading, withLoading } = useLoadingContext()
	const { createCategory } = useCategoriesContext()

	const [inputs, setInputs] = useState({})
	const [file, setFile] = useState(null)

	const handleChangeInput = e => {
		setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleCreateCategory = e => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('image', file)
		Object.keys(inputs).forEach(input => {
			formData.append(input, inputs[input])
		})
		withLoading(() => createCategory(formData), 'createCategory')
	}

	return (
		<motion.div
			initial={{ opacity: 0, x: 300 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ x: '-100%', opacity: 0, transition: { duration: 0.1 } }}
		>
			<h1 className="text-3xl text-center ">Create New Category</h1>

			<form className="mt-7 flex flex-col gap-4" onSubmit={handleCreateCategory}>
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

				<div className="flex items-stretch gap-3 max-md:flex-col max-md:gap-1">
					<span className="flex-1 ">Category image</span>

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
					type="submit"
				>
					{loading.createCategory ? 'Loading...' : 'Create'}
				</button>
			</form>
		</motion.div>
	)
}

export default CreateCategory
