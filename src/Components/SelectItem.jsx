import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useLoadingContext } from '../Context/LoadingProvider'

const SelectItem = ({
	selectedItem,
	setSelectedItem,
	showDrop,
	setShowDrop,
	items,
	getItems,
	title,
}) => {
	const { loading, withLoading } = useLoadingContext()
	useEffect(() => {
		withLoading(() => getItems(), 'getItems')
	}, [])

	function handleClickOnItem(item) {
		if (selectedItem)
			if (selectedItem._id == item._id) setSelectedItem(null)
			else setSelectedItem(item)
		else setSelectedItem(item)

		setShowDrop(false)
	}

	if (loading.getItems == true) return <h1 className="font-rubik text-3xl text-center">Loading...</h1>
	else if (loading.getItems == undefined) return null

	return (
		<div className="flex items-stretch gap-1 max-md:flex-col max-md:gap-1">
			<span className="flex-1 font-rubik">{title}</span>

			<div className="flex-[3] ">
				{/* selected option */}
				<div
					className={`border rounded flex items-center justify-between cursor-pointer overflow-hidden ${
						showDrop && 'ring ring-[--light-main-color]'
					}`}
					onClick={() => setShowDrop(prev => !prev)}
				>
					{selectedItem ? (
						<div className="flex items-start gap-2">
							{selectedItem?.image && (
								<img
									src={selectedItem?.image?.secure_url}
									alt={selectedItem?.name_en}
									className="w-[50px] h-[50px] object-cover"
								/>
							)}
							<p className="flex-[4] font-itim p-2">{selectedItem?.name_en}</p>
						</div>
					) : (
						<span className="select-none p-2">{title}</span>
					)}
					<IoMdArrowDropdown
						className={`text-lg cursor-pointer transition-all ${showDrop && 'rotate-180'}`}
					/>
				</div>
				{/* drop down options */}
				<motion.div
					variants={{
						hidden: { opacity: 0, height: 0 },
						visible: { opacity: 1, height: 'fit-content' },
					}}
					className="mt-1 max-h-[300px] overflow-y-auto border rounded flex flex-col"
					initial="hidden"
					animate={showDrop ? 'visible' : 'hidden'}
				>
					{items?.map((item, i) => {
						const isSelected = selectedItem ? selectedItem._id == item._id : false
						return (
							<div
								key={item._id}
								className={`w-full flex items-start center gap-2 cursor-pointer hover:bg-gray-100 ${
									isSelected && 'bg-gray-200'
								}`}
								onClick={() => handleClickOnItem(item)}
							>
								{item?.image && (
									<img
										src={item?.image?.secure_url}
										alt={item?.name_en}
										className="w-[50px] h-[50px] object-cover"
									/>
								)}
								<p className="font-itim p-2">
									{item?.name_en}
									{item?.categoryId && <span className="text-gray-600 text-sm"> ({item?.categoryId?.name_en})</span>}
								</p>
							</div>
						)
					})}
				</motion.div>
			</div>
		</div>
	)
}

export default SelectItem
