import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useLoadingContext } from '../Context/LoadingProvider'
import logo from '../assets/logo.svg'
import { footerSocial } from '../constants/data'
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
		<footer className="text-[--main-color] py-4 border-t bg-gray-50">
			<div className="max-container">
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full mb-4 ">
					<div className="px-5 mx-auto">
						<img src={logo} alt="logo" className="w-36 mb-4" />
						<Link to={'mailto:info@mercypharm.com'} className="underline">
							info@mercypharm.com
						</Link>
					</div>
					<FooterColumn title={t('navlinks.products')}>
						{loading.getAllCategoriesWithFooter ? (
							<div className="text-center">
								<div className="mx-auto rounded-full w-10 h-10 border-r-2 border-black animate-spin"></div>
							</div>
						) : (
							<ul className="text-center">
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
					<FooterColumn title={t('links')}>
						<ul className="text-center ">
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
					<FooterColumn title={t('social')}>
						<ul className="text-center mx-auto">
							{footerSocial.map((item, i) => (
								<li key={i} className="text-center">
									<Link
										to={item.link}
										className="text-gray-500 hover:text-gray-950 transition-all flex items-center gap-2"
									>
										<item.icon />
										<span>{item.title}</span>
									</Link>
								</li>
							))}
						</ul>
					</FooterColumn>
				</div>
				{/* copy right */}
				<p className="text-sm text-center border-t pt-4">
					Mercy Pharm &copy; {new Date().getFullYear()} - All Rights Reserved
				</p>
			</div>
		</footer>
	)
}

const FooterColumn = ({ title, children }) => {
	if (!title) {
		return <div className="flex flex-col gap-2 px-5">{children}</div>
	}
	if (title)
		return (
			<div className="flex flex-col gap-4 px-5">
				<p className="text-3xl font-bold relative p-1 text-center w-fit mx-auto">
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

export default Footer
