import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../Context/AuthProvider'
import { useLoadingContext } from '../../Context/LoadingProvider'
import InputItem from "../../Components/InputItem"

const UpdateAdminInfos = () => {
	const { withLoading, loading } = useLoadingContext()
	const { adminUpdate, getAdminUsername } = useAuthContext()
	const [inputs, setInputs] = useState({})

	const [adminName, setAdminName] = useState('')
	useEffect(() => {
		withLoading(() => getAdminUsername(data => setAdminName(data.username)), 'getAdmin')
	}, [])

	const handleChangeInput = e => {
		setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleUpdateAdmin = e => {
		e.preventDefault()
		const infos = {}
		Object.keys(inputs).forEach(input => {
			if (inputs[input]) {
				infos[input] = inputs[input]
			}
		})
		withLoading(() => adminUpdate(infos), 'updateAdmin')
	}

	return (
		<div className="p-2 grid place-items-center" style={{ height: 'calc(100vh - 100px)' }}>
			<form className="flex flex-col gap-4 w-full max-w-lg" onSubmit={handleUpdateAdmin}>
				<InputItem
					name={'username'}
					text={'New Username'}
					onChange={handleChangeInput}
					defaultValue={adminName}
				/>

				<InputItem
					name={'oldPassword'}
					text={'Old Password'}
					onChange={handleChangeInput}
					type="password"
				/>

				<InputItem
					name={'newPassword'}
					text={'New Password'}
					onChange={handleChangeInput}
					type="password"
				/>

				<button
					className="p-2  rounded text-[--main-color] transition-all hover:bg-[--main-color] hover:text-white ring ring-[--light-main-color]"
					type="submit"
				>
					{loading.updateAdmin ? 'Loading...' : 'Update'}
				</button>
			</form>
		</div>
	)
}

export default UpdateAdminInfos

 
