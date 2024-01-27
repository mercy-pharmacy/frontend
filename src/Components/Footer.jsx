import axios from 'axios'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useLoadingContext } from '../Context/LoadingProvider'
import logo from '../assets/logo.svg'
import { socials } from '../constants/data'
import useClickOutside from '../hooks/useClickOutside'
import { asyncHandler } from '../services/asyncHandler'
import { translate } from '../services/translate'

const Footer = () => {
	const {
		t,
		i18n: { language },
	} = useTranslation()
	const { loading, withLoading } = useLoadingContext()
	const [footerCategories, setFooterCategories] = useState([])
	useEffect(() => {
		withLoading(() => {
			return asyncHandler(async () => {
				const { data } = await axios.get('/categories?select=name_en,name_ar,_id')
				if (data.message === 'success') {
					setFooterCategories(data.categories)
				}
			})
		}, 'getAllCategoriesWithFooter')
	}, [])

	return (
		<footer className="text-[--main-color] py-4 border-t-[3px] border-[--main-color] bg-green-50 max-md:text-sm">
			<div className="max-container">
				{/* footer wrapper */}
				<div className="flex items-center justify-between max-md:justify-center max-md:gap-4 flex-wrap w-full mb-4 ">
					<div className="px-5 max-md:mx-auto max-md:order-3 max-md:w-full flex flex-col items-center justify-center">
						<img src={logo} alt="logo" className="w-36 mb-4" />
						<SocialIcons />
					</div>
					<FooterColumn title={t('footer.links')}>
						<ul className="max-md:text-center">
							<li>
								<Link to={'/about'} className="text-gray-500 hover:text-gray-950  transition-all">
									{t('navlinks.about')}
								</Link>
							</li>
							<li>
								<Link to={'/contact'} className="text-gray-500 hover:text-gray-950  transition-all">
									{t('navlinks.contact')}
								</Link>
							</li>
							<li>
								<Link to={'/products'} className="text-gray-500 hover:text-gray-950  transition-all">
									{t('navlinks.products')}
								</Link>
							</li>
							<li>
								<Link to={'/'} className="text-gray-500 hover:text-gray-950  transition-all">
									{t('navlinks.home')}
								</Link>
							</li>
						</ul>
					</FooterColumn>
					<FooterColumn title={t('footer.our-products')}>
						{loading.getAllCategoriesWithFooter ? (
							<div className="text-center">
								<div className="mx-auto rounded-full w-10 h-10 border-r-2 border-black animate-spin"></div>
							</div>
						) : (
							<ul className="max-md:text-center">
								{footerCategories?.map((category, i) => (
									<li key={category._id}>
										<Link
											to={`/category/${category._id}`}
											className="text-gray-500 hover:text-gray-950 transition-all"
										>
											{translate(language, category.name_en, category.name_ar)}
										</Link>
									</li>
								))}
							</ul>
						)}
					</FooterColumn>
				</div>
				{/* copy right */}
				<p className="text-sm text-center border-t border-gray-400 pt-4">
					Mercy Pharm &copy; {new Date().getFullYear()} - All Rights Reserved
				</p>
			</div>
		</footer>
	)
}

const FooterColumn = ({ title, children }) => {
	return (
		<div className="flex flex-col gap-4 px-5">
			<p className="text-3xl max-md:text-xl font-bold relative p-1 w-fit whitespace-nowrap max-md:mx-auto">
				{title}
				<img
					src="/images/basic/line.svg"
					alt=""
					className="h-[20px] absolute -bottom-[10px] left-0 w-full object-cover"
				/>
			</p>
			{children}
		</div>
	)
}

const SocialIcons = () => {
	return (
		<div className="flex items-center gap-3">
			{socials.map((item, i) => {
				const { icon: Icon, title, children, link } = item
				if (children) return <WithChildren item={item} key={i} />
				return (
					<Link
						to={link}
						target="_blank"
						key={i}
						className="p-2 rounded border border-[--main-color] group hover:bg-[--main-color] transition-all"
					>
						<Icon className="text-2xl max-md:text-lg text-[--main-color] group-hover:text-white transition-all" />
					</Link>
				)
			})}
		</div>
	)
}
const WithChildren = ({ item }) => {
	const [show, setShow] = useState(false)
	const { ref } = useClickOutside(() => setShow(false))
	return (
		<div
			className="relative p-2 rounded border border-[--main-color] group hover:bg-[--main-color] transition-all"
			ref={ref}
		>
			<item.icon
				onClick={() => setShow(prev => !prev)}
				className="text-2xl max-md:text-lg cursor-pointer text-[--main-color] group-hover:text-white transition-all"
			/>
			{show && (
				<motion.div
					initial={{ opacity: 0, y: -100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.2 }}
					className="absolute top-[110%] left-0 bg-[--main-color] p-2 rounded-md z-40 w-fit "
				>
					{item.children.map((item, i) => {
						const { title, link } = item
						return (
							<motion.div
								initial={{ opacity: 0, x: -100 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.3 }}
								key={i}
							>
								<Link
									to={link}
									className="text-white whitespace-nowrap block"
									onClick={() => setShow(false)}
									target="_blank"
								>
									{title}
								</Link>
							</motion.div>
						)
					})}
				</motion.div>
			)}
		</div>
	)
}

export default Footer
