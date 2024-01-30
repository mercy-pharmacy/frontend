import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { socials } from '../constants/data'
import useClickOutside from '../hooks/useClickOutside'

const Contact = () => {
	const {
		t,
		i18n: { language },
	} = useTranslation()
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	}, [])
	return (
		<motion.div
			initial={{ opacity: 0, x: 300 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ ease: 'easeOut', duration: 0.4 }}
			exit={{ x: '-100%', opacity: 0, transition: { duration: 0.1 } }}
		>
			{/* layout */}
			<div className="flex flex-col justify-between gap-10 relative" style={{ minHeight: 'calc(100vh - 60px)' }}>
				{/* content */}
				<div className="max-container my-4">
					{/* title */}
					<div className="text-center mb-12">
						<motion.h1
							initial={{ opacity: 0, y: -200 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className={`text-5xl max-md:text-4xl font-bold w-fit mx-auto mb-5 pb-2 text-[--main-color] uppercase relative`}
						>
							{t('contact.title')}
							<img
								src="/images/basic/line.svg"
								alt="line"
								className={`h-[40px] !w-full absolute -bottom-[20px] left-0 right-0  -z-10 object-center object-cover`}
							/>
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 200 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="text-[--main-color] font-medium  max-md:text-sm"
						>
							{t('contact.desc.first')}
							<br />
							{t('contact.desc.second')}
						</motion.p>
					</div>
					{/* socials */}
					<div className="flex items-center justify-center flex-wrap gap-7 max-md:flex-col">
						{socials.map((item, i) => {
							const { icon: Icon, link, title } = item
							return (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: (0.1 + i) * 0.3 }}
									key={i}
									className="max-md:w-full"
								>
									{!item.children ? (
										<LinkWithOutChildren icon={Icon} link={link} title={title} />
									) : (
										<LinkWithChildren children={item.children} icon={Icon} title={title} />
									)}
								</motion.div>
							)
						})}
					</div>
				</div>
				{/* image */}
				<motion.div
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.2 }}
					className=" h-[200px] md:h-[300px] lg:h-[500px]"
				>
					<img src="/images/basic/contact-bg.jpg" alt="" className="w-full h-full object-cover object-center" />
				</motion.div>
				{/* branch */}
				<motion.img
					initial={{ opacity: 0, x: -300 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.4, duration: 0.4 }}
					src="/images/basic/branch.svg"
					alt="branch"
					className="absolute top-0 w-40 left-10 !rotate-90  hidden md:block"
				/>
			</div>
		</motion.div>
	)
}

export default Contact

const LinkWithOutChildren = ({ link, title, icon: Icon }) => {
	return (
		<Link
			to={link}
			className="flex flex-col items-center gap-2 group max-md:flex-row max-md:justify-center max-md:border max-md:w-fit max-md:mx-auto max-md:p-3 max-md:rounded-lg max-md:border-[--main-color] max-md:min-w-[200px]"
			target="_blank"
		>
			<Icon size={50} color="var(--main-color)" className="transition-all group-hover:!text-[--second-color]" />
			<p className="text-[--main-color]  font-semibold max-md:flex-1">{title}</p>
		</Link>
	)
}

const LinkWithChildren = ({ title, icon: Icon, children }) => {
	const [show, setShow] = useState(false)
	const toggle = () => setShow(prev => !prev)
	const { ref } = useClickOutside(() => setShow(false))

	return (
		<div
			ref={ref}
			className="flex flex-col items-center gap-2 group max-md:flex-row max-md:justify-center max-md:border max-md:w-fit max-md:mx-auto max-md:p-3 max-md:rounded-lg max-md:border-[--main-color] max-md:min-w-[200px] relative cursor-pointer"
			onClick={toggle}
		>
			<Icon size={50} color="var(--main-color)" className="transition-all group-hover:!text-[--second-color]" />
			<p className="text-[--main-color] font-semibold max-md:flex-1">{title}</p>

			{/* children list */}
			{show && (
				<motion.ul
					initial={{ opacity: 0, y: -100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="absolute top-[105%] w-full bg-[--main-color] p-2 rounded-md z-40 md:min-w-[200px] flex flex-col gap-2"
				>
					{children.map((item, i) => {
						const { title, link } = item
						return (
							<motion.li
								initial={{ opacity: 0, x: -100 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: (0.1 + i + 1) * 0.1 }}
								key={i}
								className="text-center"
							>
								<Link
									to={link}
									target="_blank"
									className="p-2 text-white w-full h-full block font-medium  max-md:text-sm"
								>
									{title}
								</Link>
							</motion.li>
						)
					})}
				</motion.ul>
			)}
		</div>
	)
}
