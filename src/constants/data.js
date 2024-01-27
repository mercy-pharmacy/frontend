import { BiCategory } from 'react-icons/bi'
import { FaInstagram } from 'react-icons/fa'
import { FaFacebookF, FaSitemap } from 'react-icons/fa6'
import { GrUserAdmin } from 'react-icons/gr'
import { HiOutlineMail } from 'react-icons/hi'
import { IoBarChartSharp } from 'react-icons/io5'

export const socials = [
	{
		icon: HiOutlineMail,
		link: 'mailto:info@mercypharm.com',
		title: 'Email',
	},
	{
		icon: FaInstagram,
		title: 'Instagram',
		children: [
			{
				link: 'https://www.instagram.com/mercypharm_italy/?igsh=a2pucGxhaXE1YWJn',
				title: 'Instagram - Italy',
			},
			{
				link: 'https://www.instagram.com/mercy.pharm.palestine/?igsh=MTlremo2N20wdDV5dg%3D%3D',
				title: 'Instagram - Palestine',
			},
		],
	},
	{
		icon: FaFacebookF,
		title: 'Facebook',
		children: [
			{
				link: 'https://www.facebook.com/people/Mercy-Pharm-Italy/61555671480547/?mibextid=hu50Ix',
				title: 'Facebook - Italy',
			},
			{
				link: 'https://www.facebook.com/mercypharmpalestine?mibextid=LQQJ4d',
				title: 'Facebook - Palestine',
			},
		],
	},
]

export const footerSocial = [
	{
		link: 'mailto:info@mercypharm.com',
		icon: HiOutlineMail,
		title: 'Email',
	},
	{
		link: 'https://www.instagram.com/mercy.pharm.palestine/?igsh=MTlremo2N20wdDV5dg%3D%3D',
		icon: FaInstagram,
		title: 'Instagram - Palestine',
	},
	{
		link: 'https://www.instagram.com/mercypharm_italy/?igsh=a2pucGxhaXE1YWJn',
		icon: FaInstagram,
		title: 'Instagram - Italy',
	},
	{
		link: 'https://www.facebook.com/mercypharmpalestine?mibextid=LQQJ4d',
		icon: FaFacebookF,
		title: 'Facebook - Palestine',
	},
	{
		link: 'https://www.facebook.com/people/Mercy-Pharm-Italy/61555671480547/?mibextid=hu50Ix',
		icon: FaFacebookF,
		title: 'Facebook - Italy',
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
