import { HiOutlineMail } from 'react-icons/hi'
import { FaFacebookF, FaPhone, FaSitemap } from 'react-icons/fa6'
import { FaInstagram } from 'react-icons/fa'
import { BiCategory } from "react-icons/bi"
import { IoBarChartSharp } from "react-icons/io5"
import { GrUserAdmin } from "react-icons/gr"

export const socials = [
	{
		icon: HiOutlineMail,
		link: 'https://www.google.com',
		title: 'Email',
	},
	// {
	// 	icon: FaPhone,
	// 	link: 'https://www.whatsapp.com',
	// 	title: '+970594999303',
	// },
	{
		icon: FaInstagram,
		link: 'https://www.instagram.com',
		title: 'Instagram',
	},
	{
		icon: FaFacebookF,
		link: 'https://www.facebook.com',
		title: 'Facebook',
	},
]

export const adminNavItems = [
	{
		to: `/admin/categories`,
		icon: BiCategory,
		text: 'Categories',
	},
	{
		to: `/admin/subcategories`,
		icon: FaSitemap,
		text: 'Sub Categories',
	},
	{
		to: `/admin/products`,
		icon: IoBarChartSharp,
		text: 'Products',
	},
	{
		to: `/admin/update-admin`,
		icon: GrUserAdmin,
		text: 'Admin',
	},
]
