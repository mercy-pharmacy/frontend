import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdClose } from "react-icons/io"
import {motion} from 'framer-motion'
import { FiDelete } from "react-icons/fi"

const AddKeywords = ({ keywords, setKeywords }) => {
	const [value, setValue] = useState('')
	function addKey() {
		if (value) {
			if ([...keywords].includes(value)) toast.error(`this value "${value}" already exists`)
			else {
				setKeywords(prev => [...prev, value])
				setValue('')
			}
		} else {
			toast.error('Please add a value')
		}
	}
	function deleteKey(key) {
		setKeywords(prev => prev.filter(k => k !== key))
	}

	return (
		<div className="flex items-stretch gap-3 max-md:flex-col max-md:gap-1">
			<span className="flex-1 font-rubik">Keywords</span>
			<div className="flex-[3]">
				{/* Add */}
				<div className="flex items-stretch gap-2 flex-wrap">
					<input
						type="text"
						placeholder="Add keyword..."
						className="form-input flex-1"
						onChange={e => setValue(e.target.value)}
						onKeyDown={e => {
							if (e.key == 'Enter') {
								e.preventDefault()
								addKey()
							}
						}}
						value={value}
					/>
					<button className="custom-button !px-5" type="button" onClick={addKey}>
						Add
					</button>
					<button
						className="custom-button !px-5 !bg-red-500"
						type="button"
						onClick={() => setKeywords([])}
					>
						<IoMdClose />
					</button>
				</div>
				{/* Display Keywords */}
				<div className="flex items-center flex-wrap gap-2 mt-3">
					{keywords?.map((key, i) => (
						<motion.div
							initial={{ opacity: 0, x: -70 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -70 }}
							transition={{ delay: i * 0.1 }}
							key={`${i} - ${key}`}
							className="p-1 px-3 flex items-center gap-2 border border-[--main-color] rounded-md"
						>
							<span className="text-blue-500">#{key}</span>
							<FiDelete className="cursor-pointer hover:scale-105" onClick={() => deleteKey(key)} />
						</motion.div>
					))}
				</div>
			</div>
		</div>
	)
}

export default AddKeywords
