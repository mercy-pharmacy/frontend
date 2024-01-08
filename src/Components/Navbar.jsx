import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiMenu } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'
import useClickOutside from '../hooks/useClickOutside'
import SearchAndLanguages from './SearchAndLanguages'

const Navbar = () => {
	const [showNav, setShowNav] = useState(false)
	const [showSearch, setShowSearch] = useState(false)
	const toggle = () => setShowNav(prev => !prev)
	const {
		i18n: { language },
	} = useTranslation()

	return (
		<header
			className="fixed top-0 w-full h-[60px] bg-white z-[9999] shadow-lg"
			dir={language == 'en' ? 'ltr' : 'rtl'}
		>
			<motion.nav
				initial={{ opacity: 0, y: -100 }}
				animate={{ opacity: 1, y: 0 }}
				className="h-full max-container flex items-center justify-between max-sm:px-3 "
			>
				{/* Toggle Button */}
				<button onClick={toggle} className="md:hidden text-2xl">
					{!showNav ? <FiMenu /> : <IoClose />}
				</button>
				{/* logo */}
				<div className="max-md:self-center">
					<Link to={'/'}>
						<img src={logo} alt="Logo" className="w-40 max-md:w-32 h-full aspect-[25/9] object-contain" />
					</Link>
				</div>
				{/* nav items */}
				<DesktopNav />
				<MobileNav showNav={showNav} toggle={toggle} setShowNav={setShowNav} />
				{/* search and languages */}
				<SearchAndLanguages setShowSearch={setShowSearch} showSearch={showSearch} />
			</motion.nav>
		</header>
	)
}

export default Navbar

const MobileNav = ({ showNav, toggle, setShowNav }) => {
	const {
		t,
		i18n: { language },
	} = useTranslation()
	const { ref } = useClickOutside(() => setShowNav(false))
	return (
		<motion.ul
			ref={ref}
			className={`md:hidden absolute top-full ${
				language == 'en' ? 'left-0 rounded-tr-md rounded-br-md' : 'right-0 rounded-tl-md rounded-bl-md'
			} bg-[--main-color]  pt-7
			px-6 flex flex-col gap-5 
			`}
			style={{ height: 'calc(100vh - 60px)' }}
			variants={{
				hidden: { x: language == 'en' ? -200 : 200, opacity: 0 },
				visible: { x: 0, opacity: 1, transition: { ease: 'linear' } },
			}}
			initial="hidden"
			animate={showNav ? 'visible' : 'hidden'}
		>
			<li className="w-full ">
				<NavLink to={'/'} className={`mobile-nav-item`} onClick={toggle}>
					{t('navlinks.home')}
				</NavLink>
			</li>
			<li className="w-full">
				<NavLink to={'/products'} className={`mobile-nav-item`} onClick={toggle}>
					{t('navlinks.products')}
				</NavLink>
			</li>
			<li className="w-full ">
				<NavLink to={'/about'} className={`mobile-nav-item`} onClick={toggle}>
					{t('navlinks.about')}
				</NavLink>
			</li>
			<li className="w-full ">
				<NavLink to={'/contact'} className={`mobile-nav-item`} onClick={toggle}>
					{t('navlinks.contact')}
				</NavLink>
			</li>
		</motion.ul>
	)
}
const DesktopNav = () => {
	const { t } = useTranslation()
	return (
		<ul className="flex-1 hidden md:flex flex-wrap items-center justify-center  gap-5 lg:gap-16 ">
			<li className="nav-item">
				<NavLink to={'/'}>{t('navlinks.home')}</NavLink>
			</li>
			<li className="nav-item">
				<NavLink to={'/products'}>{t('navlinks.products')}</NavLink>
			</li>
			<li className="nav-item">
				<NavLink to={'/about'}>{t('navlinks.about')}</NavLink>
			</li>
			<li className="nav-item">
				<NavLink to={'/contact'}>{t('navlinks.contact')}</NavLink>
			</li>
		</ul>
	)
}
