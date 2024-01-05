import toast from 'react-hot-toast'

export const asyncHandler = async fn => {
	try {
		await fn()
	} catch (error) {
		const { message, validationError } = error?.response?.data
		if (message) {
			toast.error(message)
			if (message == 'validation error') {
				[...validationError].map(err => toast.error(err))
			}
			return
		} else {
			toast.error('Something went wrong. Check the console for details.')
			toast.error(error?.message || error)
			console.error('Error:', error)
		}
	}
}
