import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import useClickOutside from '../hooks/useClickOutside'

const Modal = ({ open, setOpen, children }) => {
	const closeModal = () => setOpen(false)

	if (open == false) return null

	return (
		<ModalOverlay>
			<ModalContent closeModal={closeModal}>{children}</ModalContent>
		</ModalOverlay>
	)
}
const ModalContent = ({ children, closeModal }) => {
	const { ref } = useClickOutside(() => closeModal())
	return (
		<div ref={ref} className="relative w-[80%] max-h-[80%] my-[15%] mx-auto rounded bg-white shadow-md p-8 overflow-auto">
			<IoIosCloseCircle size={30} color="red" className="absolute top-1 right-1 cursor-pointer" onClick={closeModal} />
			<div className="p-2">{children}</div>
		</div>
	)
}
const ModalOverlay = ({ children }) => {
	return <div className="z-50 fixed inset-0 w-full h-full bg-black/50 flex items-center justify-center">{children}</div>
}

export default Modal
