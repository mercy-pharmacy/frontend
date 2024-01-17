const InputItem = ({ name, text, onChange, textarea, type = 'text', ...props }) => {
	return (
		<label htmlFor={name} className="flex items-stretch gap-3 max-md:flex-col max-md:gap-1">
			<span className="flex-1 ">{text}</span>
			{textarea ? (
				<textarea
					type={type}
					placeholder={`${text}...`}
					name={name}
					id={name}
					onChange={onChange}
					className={`form-input flex-[3] resize-none`}
					{...props}
				/>
			) : (
				<input
					type={type}
					placeholder={`${text}...`}
					name={name}
					id={name}
					onChange={onChange}
					className={`form-input flex-[3]`}
					{...props}
				/>
			)}
		</label>
	)
}

export default InputItem
