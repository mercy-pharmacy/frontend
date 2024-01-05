import React from 'react'
import { motion } from 'framer-motion'
import { useAuthContext } from '../Context/AuthProvider'
import { NavLink, useLocation } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import { BiCategory } from 'react-icons/bi'
import { FaSitemap } from 'react-icons/fa6'
import { IoBarChartSharp } from 'react-icons/io5'
import { GrUserAdmin } from 'react-icons/gr'
import { adminNavItems } from '../constants/data'

const AdminNav = () => {
	const { adminLogout } = useAuthContext()

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			style={{ height: 'calc(100vh - 60px)' }}
			className="shadow-md border p-2 px-5 sticky max-md:px-2"
		>
			{/* title */}
			<div className="flex items-center gap-3 border-b p-2 mb-5">
				<h2 className="text-xl font-medium max-md:hidden">Admin Dashboard</h2>
				<button onClick={adminLogout}>
					<FiLogOut />
				</button>
			</div>
			{/* links */}
			<ul className="flex flex-col gap-2">
				{adminNavItems.map((item, i) => (
					<AdminNavItem text={item.text} icon={item.icon} to={item.to} key={i} />
				))}
			</ul>
		</motion.div>
	)
}

export default AdminNav

const AdminNavItem = ({ to, icon: Icon, text }) => {
	const activeClass = `bg-[--main-color] text-white rounded`
	const { pathname } = useLocation()
	return (
		<li>
			<NavLink
				to={to}
				className={({ isActive }) =>
					`flex items-center gap-2 p-2 ${
						(isActive || (pathname == '/admin' && text == 'Categories')) && activeClass
					} 
					
					`
				}
			>
				<Icon />
				<span className="max-md:hidden">{text}</span>
			</NavLink>
		</li>
	)
}
