/* eslint-disable */
import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import AdminNav from '../../Components/AdminNav'

const AdminDashboard = () => {
	return (
		<motion.div
			className="max-container flex gap-4 p-2 relative"
			style={{ minHeight: 'calc(100vh - 60px)' }}
		>
			{/* Links */}
			<AdminNav />
			{/* content */}
			<div className="p-2 flex-1">
				<Outlet />
			</div>
		</motion.div>
	)
}

export default AdminDashboard
